// GA4 recommended event for a successful lead submission.
// https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead

type Gtag = (command: 'event', name: string, params?: Record<string, unknown>) => void;

type AnalyticsWindow = Window & {
  gtag?: Gtag;
  google_tag_manager?: Record<string, unknown>;
};

/** Form name sent to GA4, derived from the lead product. */
export const leadFormName = (product: string) => {
  if (product === 'contato' || product === 'parceria') {
    return product;
  }
  return `cotacao_${product}`;
};

const sent = new Set<string>();

/**
 * Fires `generate_lead` once per submission id. Call only after the API confirmed the lead.
 * - Always pushes to the dataLayer (for GTM triggers on the `generate_lead` custom event).
 * - Also calls gtag() when a direct GA4 tag is present and no GTM container is loaded, so a GA4 tag inside GTM
 *   listening to the same dataLayer event does not count the lead twice.
 */
export function trackGenerateLead(submissionId: string, product: string) {
  if (typeof window === 'undefined' || sent.has(submissionId)) {
    return;
  }
  sent.add(submissionId);

  const w = window as AnalyticsWindow;
  const params = {
    form_name: leadFormName(product),
    product,
    page_path: window.location.pathname,
  };

  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: 'generate_lead', ...params });

  const hasGtm = Object.keys(w.google_tag_manager ?? {}).some((key) => key.startsWith('GTM-'));
  if (typeof w.gtag === 'function' && !hasGtm) {
    w.gtag('event', 'generate_lead', params);
  }
}
