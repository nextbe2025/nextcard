// Server-only: sends a lead to RD Station Marketing as a conversion.
// Docs: https://developers.rdstation.com/reference/conversao
// The key is read from RD_STATION_API_KEY (RD Marketing > Integrações > Tokens > token público). Never hardcode it.

const RD_ENDPOINT = 'https://api.rd.services/platform/conversions';

/** Conversion identifier shown in RD for each form (same names as the GA4 form_name). */
export const rdConversionIdentifier = (product: string) =>
  product === 'contato' || product === 'parceria' ? product : `cotacao_${product}`;

/**
 * Site fields → RD custom fields (they must exist in RD: Configurações > Campos personalizados).
 * RD rejects the whole conversion when a field is unknown or a list field gets a value outside its options, so:
 * - `textFields` are free-text/number fields and are always sent.
 * - `listFields` may be selection lists in RD; they are sent first, and if RD rejects the conversion it is retried
 *   without them (then without any custom field), so a lead is never lost because of a field mismatch.
 */
const textFields: Record<string, string> = {
  unidades: 'cf_quantas_unidades_possui',
  caixas: 'cf_quantos_caixas_existem_em_cada_unidade',
  totens: 'cf_quantos_totens_pretende_instalar_inicialmente',
  catracas: 'cf_quantas_catracas_pretende_instalar',
  comandas: 'cf_quantas_comandas_voce_precisa',
  pdv: 'cf_voce_ja_utiliza_algum_sistema_pdv_se_sim_qual',
  cnpj: 'cf_cnpj',
  mensagem: 'cf_mensagem',
  interesse: 'cf_o_que_voce_busca_com_a_nossa_parceria',
};

const listFields: Record<string, string> = {
  segmento: 'cf_qual_e_o_segmento_do_seu_negocio',
  prazo: 'cf_em_quanto_tempo_pretende_implantar',
  estado: 'cf_estados',
};

const SITE_ORIGIN = { cf_site_de_origem: 'nextcard.com.br' };

export type RdLead = {
  product: string;
  fields: Record<string, string>;
  utm: Record<string, string>;
};

const onlyFilled = (obj: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== ''));

type CustomLevel = 'all' | 'text' | 'none';

const pick = (fields: Record<string, string>, map: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(map)
      .filter(([siteField]) => fields[siteField])
      .map(([siteField, rdField]) => [rdField, fields[siteField]]),
  );

export function buildRdPayload({ product, fields, utm }: RdLead, level: CustomLevel = 'all') {
  const custom =
    level === 'none'
      ? {}
      : { ...SITE_ORIGIN, ...pick(fields, textFields), ...(level === 'all' ? pick(fields, listFields) : {}) };

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

const post = (lead: RdLead, apiKey: string, level: CustomLevel) =>
  fetch(`${RD_ENDPOINT}?api_key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(buildRdPayload(lead, level)),
    signal: AbortSignal.timeout(10_000),
  });

export async function sendToRdStation(lead: RdLead, apiKey: string) {
  const levels: CustomLevel[] = ['all', 'text', 'none'];
  let lastError = '';
  for (const level of levels) {
    const response = await post(lead, apiKey, level);
    if (response.ok) {
      if (level !== 'all') {
        // eslint-disable-next-line no-console
        console.warn(
          `[leads] RD aceitou a conversão só sem parte dos campos personalizados (nível "${level}"):`,
          lastError,
        );
      }
      return;
    }
    lastError = `RD Station respondeu ${response.status}: ${(await response.text().catch(() => '')).slice(0, 400)}`;
    // Only field problems (400/422) are worth retrying with fewer fields; auth or server errors are not.
    if (response.status !== 400 && response.status !== 422) {
      break;
    }
  }
  throw new Error(lastError);
}
