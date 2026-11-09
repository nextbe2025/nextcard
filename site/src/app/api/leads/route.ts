import { leadFormsByProduct } from '@/data/lead-forms';
import { cleanText, validateField } from '@/utils/lead-validation';
import { sendToRdStation } from '@/utils/rdStation';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 8_000;
const MIN_FILL_MS = 3_000;
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

type LeadBody = {
  product?: unknown;
  fields?: Record<string, unknown>;
  consent?: unknown;
  website?: unknown;
  elapsedMs?: unknown;
  turnstileToken?: unknown;
  page?: unknown;
  referrer?: unknown;
  utm?: Record<string, unknown>;
};

// Simple per-instance rate limit. On serverless hosting each instance keeps its own counter, so treat it as one layer
// of defense (together with the origin check, honeypot, timing check and the optional Turnstile captcha).
const hits = new Map<string, number[]>();

const tooMany = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) {
        hits.delete(key);
      }
    }
  }
  return recent.length > RATE_MAX;
};

const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status });

const sameOrigin = (request: Request) => {
  const host = request.headers.get('host');
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }
  // Browsers always send Origin (or Sec-Fetch-Site) on same-site POSTs; scripts calling the API directly usually do not.
  return request.headers.get('sec-fetch-site') === 'same-origin' || process.env.NODE_ENV !== 'production';
};

const verifyTurnstile = async (token: unknown, ip: string) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return true;
  }
  if (typeof token !== 'string' || !token || token.length > 2048) {
    return false;
  }
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json({ ok: false, error: 'Origem não permitida.' }, 403);
  }
  if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
    return json({ ok: false, error: 'Requisição inválida.' }, 415);
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (tooMany(ip)) {
    return json({ ok: false, error: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.' }, 429);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'Requisição muito grande.' }, 413);
  }

  let body: LeadBody;
  try {
    body = JSON.parse(raw) as LeadBody;
  } catch {
    return json({ ok: false, error: 'Requisição inválida.' }, 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ ok: false, error: 'Requisição inválida.' }, 400);
  }

  // Bot signals: hidden field filled, or the form was "filled" faster than a person can. Pretend success so bots
  // get no feedback to tune against, and nothing is forwarded.
  const elapsed = typeof body.elapsedMs === 'number' ? body.elapsedMs : 0;
  if (cleanText(body.website) || elapsed < MIN_FILL_MS) {
    return json({ ok: true });
  }

  const product = typeof body.product === 'string' ? body.product : '';
  const definition = leadFormsByProduct[product];
  if (!definition) {
    return json({ ok: false, error: 'Produto inválido.' }, 422);
  }

  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return json(
      { ok: false, error: 'Não foi possível confirmar que você é uma pessoa. Recarregue e tente de novo.' },
      422,
    );
  }

  // Only the fields defined for this product are read, and each one is validated against its own rules.
  const submitted = body.fields && typeof body.fields === 'object' ? body.fields : {};
  const fields: Record<string, string> = {};
  for (const field of definition) {
    const result = validateField(field, submitted[field.name]);
    if (result.error) {
      return json({ ok: false, error: `${field.label}: ${result.error}.` }, 422);
    }
    fields[field.name] = result.value;
  }
  if (body.consent !== true) {
    return json({ ok: false, error: 'É preciso concordar com o contato.' }, 422);
  }

  const utm = Object.fromEntries(
    utmKeys
      .filter((key) => body.utm && typeof body.utm[key] === 'string')
      .map((key) => [key, cleanText(body.utm?.[key], 120)]),
  );

  const lead = {
    product,
    fields,
    consent: true,
    page: cleanText(body.page, 300),
    referrer: cleanText(body.referrer, 300),
    utm,
    receivedAt: new Date().toISOString(),
  };

  // Each configured destination gets the lead. The lead counts as received when at least one of them accepts it, so
  // the visitor is never asked to resend a lead that is already stored somewhere (which would duplicate it).
  const destinations: { name: string; send: () => Promise<void> }[] = [];

  const rdKey = process.env.RD_STATION_API_KEY;
  if (rdKey) {
    destinations.push({ name: 'rd_station', send: () => sendToRdStation({ product, fields, utm }, rdKey) });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    destinations.push({
      name: 'webhook',
      send: async () => {
        const response = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok) {
          throw new Error(`Webhook respondeu ${response.status}`);
        }
      },
    });
  }

  if (destinations.length === 0) {
    if (process.env.NODE_ENV === 'production') {
      return json({ ok: false, error: 'O formulário ainda não está configurado.' }, 503);
    }
    // eslint-disable-next-line no-console
    console.info(
      '[leads] Nenhum destino configurado (RD_STATION_API_KEY / LEAD_WEBHOOK_URL); lead só no console:',
      lead,
    );
    return json({ ok: true, delivered: false });
  }

  const results = await Promise.allSettled(destinations.map((destination) => destination.send()));
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      // eslint-disable-next-line no-console
      console.error(`[leads] falha ao enviar para ${destinations[index].name}:`, result.reason);
    }
  });

  if (results.some((result) => result.status === 'fulfilled')) {
    return json({ ok: true, delivered: true });
  }
  return json({ ok: false, error: 'Não foi possível enviar agora. Tente novamente.' }, 502);
}
