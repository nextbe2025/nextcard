'use client';
import { LeadField } from '@/data/lead-forms';
import { cn } from '@/utils/cn';
import { trackGenerateLead } from '@/utils/generateLead';
import { filterInput, limits, validateField } from '@/utils/lead-validation';
import { track } from '@/utils/track';
import Script from 'next/script';
import { ChangeEvent, FormEvent, ReactNode, useRef, useState } from 'react';
import { CheckCircleIcon } from './BrandIcons';

interface LeadFormProps {
  product: string;
  productLabel: string;
  fields: LeadField[];
  submitLabel?: string;
  successTitle?: string;
  successText?: ReactNode;
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id?: string) => void;
};

const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

const inputClass =
  'border-secondary/15 bg-white text-secondary placeholder:text-secondary/40 focus:border-primary-500 focus:ring-primary-500/15 h-12 w-full rounded-xl border px-4 text-[16px] transition outline-none focus:ring-4 aria-[invalid=true]:border-red-500';

const textareaClass = inputClass.replace('h-12', 'min-h-[180px]') + ' resize-y py-3 leading-[1.5]';

const LeadForm = ({
  product,
  productLabel,
  fields,
  submitLabel = 'Solicitar cotação',
  successTitle = 'Recebemos o seu pedido!',
  successText = (
    <>
      Um especialista da <strong>NEXTCARD</strong> vai entrar em contato em breve para montar a proposta ideal para a
      sua operação.
    </>
  ),
}: LeadFormProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const started = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const openedAt = useRef(0);
  const turnstileBox = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string>('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const mountTurnstile = () => {
    const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
    if (!api || !turnstileBox.current || turnstileId.current) {
      return;
    }
    turnstileId.current = api.render(turnstileBox.current, {
      sitekey: turnstileSiteKey,
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    });
  };

  const onStart = () => {
    if (!started.current) {
      started.current = true;
      openedAt.current = Date.now();
      track('quote_start', { product });
    }
  };

  const onChange =
    (field: LeadField) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = filterInput(field, e.target.value);
      setValues((prev) => ({ ...prev, [field.name]: value }));
      if (errors[field.name]) {
        setErrors((prev) => ({ ...prev, [field.name]: '' }));
      }
    };

  const validate = () => {
    const next: Record<string, string> = {};
    fields.forEach((field) => {
      const { error } = validateField(field, values[field.name]);
      if (error) {
        next[field.name] = error;
      }
    });
    if (turnstileSiteKey && !turnstileToken) {
      next.captcha = 'Confirme que você não é um robô';
    }
    if (!consent) {
      next.consent = 'É preciso concordar para podermos responder';
    }
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      track('form_error', { product, fields: Object.keys(found) });
      return;
    }

    setStatus('sending');
    setServerError('');
    const submissionId = `${product}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(utmKeys.filter((k) => params.get(k)).map((k) => [k, params.get(k)]));

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          productLabel,
          fields: values,
          consent,
          website: honeypot.current?.value ?? '',
          elapsedMs: openedAt.current ? Date.now() - openedAt.current : 0,
          turnstileToken,
          page: window.location.href,
          referrer: document.referrer,
          utm,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Não foi possível enviar agora.');
      }
      track('quote_submit', { product });
      trackGenerateLead(submissionId, product);
      setStatus('success');
      setValues({});
      setConsent(false);
      setTurnstileToken('');
    } catch (error) {
      track('form_error', { product, submit: true });
      setServerError(error instanceof Error ? error.message : 'Não foi possível enviar agora.');
      setStatus('error');
      (window as unknown as { turnstile?: TurnstileApi }).turnstile?.reset(turnstileId.current);
      setTurnstileToken('');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center" role="status">
        <span className="bg-primary-500 flex size-16 items-center justify-center rounded-full text-white">
          <CheckCircleIcon className="size-8" />
        </span>
        <h3 className="text-heading-5 text-brand-gray">{successTitle}</h3>
        <p className="text-secondary/70 max-w-[380px]">{successText}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-primary-500 hover:text-primary-600 text-tagline-2 cursor-pointer font-medium underline">
          Enviar outro pedido
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={onStart}
      noValidate
      className="space-y-5"
      aria-label={`Cotação de ${productLabel}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `${product}-${field.name}`;
          const error = errors[field.name];
          return (
            <div key={field.name} className={cn('space-y-1.5', field.full && 'sm:col-span-2')}>
              <label htmlFor={id} className="text-secondary text-tagline-2 block font-medium">
                {field.label}
                {field.required && <span className="text-primary-500"> *</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  id={id}
                  name={field.name}
                  value={values[field.name] ?? ''}
                  onChange={onChange(field)}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${id}-error` : undefined}
                  autoComplete={field.autoComplete}
                  className={cn(inputClass, !values[field.name] && 'text-secondary/50')}>
                  <option value="">Selecione</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={5}
                  value={values[field.name] ?? ''}
                  onChange={onChange(field)}
                  maxLength={limits.message}
                  spellCheck
                  placeholder={field.placeholder}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={textareaClass}
                />
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type === 'number' ? 'text' : field.type}
                  inputMode={field.type === 'number' ? 'numeric' : field.type === 'tel' ? 'tel' : undefined}
                  value={values[field.name] ?? ''}
                  onChange={onChange(field)}
                  maxLength={
                    field.type === 'email'
                      ? limits.email
                      : field.type === 'number'
                        ? limits.number
                        : field.name === 'nome'
                          ? limits.nome
                          : field.type === 'tel'
                            ? 15
                            : limits.text
                  }
                  spellCheck={false}
                  autoCapitalize={field.type === 'email' ? 'none' : field.name === 'nome' ? 'words' : undefined}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={inputClass}
                />
              )}
              {error && (
                <p id={`${id}-error`} className="text-tagline-3 text-red-600">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {turnstileSiteKey && (
        <div className="space-y-1.5">
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="lazyOnload"
            onReady={mountTurnstile}
          />
          <div ref={turnstileBox} />
          {errors.captcha && <p className="text-tagline-3 text-red-600">{errors.captcha}</p>}
        </div>
      )}

      {/* campo isca contra robôs: fica fora da tela e nunca deve ser preenchido */}
      <input
        ref={honeypot}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="space-y-1.5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) {
                setErrors((prev) => ({ ...prev, consent: '' }));
              }
            }}
            aria-invalid={!!errors.consent}
            className="accent-primary-500 mt-1 size-4 shrink-0"
          />
          <span className="text-secondary/70 text-tagline-2">
            Concordo em ser contatado pela <strong>NEXTCARD</strong> sobre esta solicitação. Os dados informados serão
            usados apenas para este contato.
          </span>
        </label>
        {errors.consent && <p className="text-tagline-3 text-red-600">{errors.consent}</p>}
      </div>

      {status === 'error' && (
        <p role="alert" className="text-tagline-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {serverError} Se preferir, fale direto com a gente pelo telefone{' '}
          <a href="tel:+554137320275" className="font-medium underline">
            (41) 3732-0275
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-primary hover:btn-secondary btn-lg w-full cursor-pointer disabled:cursor-wait disabled:opacity-70">
        <span>{status === 'sending' ? 'Enviando...' : submitLabel}</span>
      </button>
    </form>
  );
};

export default LeadForm;
