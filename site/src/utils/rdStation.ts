// Server-only: sends a lead to RD Station Marketing as a conversion.
// Docs: https://developers.rdstation.com/reference/conversao
// The key is read from RD_STATION_API_KEY (RD Marketing > Integrações > Tokens > token público). Never hardcode it.

const RD_ENDPOINT = 'https://api.rd.services/platform/conversions';

/** Conversion identifier shown in RD for each form (same names as the GA4 form_name). */
export const rdConversionIdentifier = (product: string) =>
  product === 'contato' || product === 'parceria' ? product : `cotacao_${product}`;

/**
 * Site fields that go to RD custom fields. RD rejects custom fields that do not exist in the account, so a field is
 * only sent once it is created in RD (Configurações > Campos personalizados) and listed here, e.g. segmento: 'cf_segmento'.
 */
const rdCustomFields: Record<string, string> = {};

export type RdLead = {
  product: string;
  fields: Record<string, string>;
  utm: Record<string, string>;
};

const onlyFilled = (obj: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== ''));

export function buildRdPayload({ product, fields, utm }: RdLead) {
  const custom = Object.fromEntries(
    Object.entries(rdCustomFields)
      .filter(([siteField]) => fields[siteField])
      .map(([siteField, rdField]) => [rdField, fields[siteField]]),
  );

  return {
    event_type: 'CONVERSION',
    event_family: 'CDP',
    payload: onlyFilled({
      conversion_identifier: rdConversionIdentifier(product),
      email: fields.email,
      name: fields.nome,
      mobile_phone: fields.telefone,
      company_name: fields.razaoSocial,
      city: fields.cidade,
      state: fields.estado,
      country: 'Brasil',
      tags: ['site', rdConversionIdentifier(product).replace(/_/g, '-')],
      traffic_source: utm.utm_source,
      traffic_medium: utm.utm_medium,
      traffic_campaign: utm.utm_campaign,
      traffic_value: utm.utm_term,
      available_for_mailing: true,
      legal_bases: [{ category: 'communications', type: 'consent', status: 'granted' }],
      ...custom,
    }),
  };
}

export async function sendToRdStation(lead: RdLead, apiKey: string) {
  const response = await fetch(`${RD_ENDPOINT}?api_key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(buildRdPayload(lead)),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    const detail = (await response.text().catch(() => '')).slice(0, 300);
    throw new Error(`RD Station respondeu ${response.status}: ${detail}`);
  }
}
