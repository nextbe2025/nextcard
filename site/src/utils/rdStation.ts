// Server-only: sends a lead to RD Station Marketing as a conversion.
// Docs: https://developers.rdstation.com/reference/conversao
// The key is read from RD_STATION_API_KEY (RD Marketing > Integrações > Tokens > token público). Never hardcode it.

const RD_ENDPOINT = 'https://api.rd.services/platform/conversions';

/** Conversion identifier shown in RD for each form (same names as the GA4 form_name). */
export const rdConversionIdentifier = (product: string) =>
  product === 'contato' || product === 'parceria' ? product : `cotacao_${product}`;

/**
 * Site fields → RD custom fields (they must exist in RD: Configurações > Campos personalizados).
 * `textFields` are free-text fields in RD; `listFields` are RD selection lists and their values are converted to the
 * exact RD options (see rdListOptions). If RD still rejects a field, sendToRdStation retries without it.
 */
const textFields: Record<string, string> = {
  caixas: 'cf_quantos_caixas_existem_em_cada_unidade',
  pdv: 'cf_voce_ja_utiliza_algum_sistema_pdv_se_sim_qual',
  cnpj: 'cf_cnpj',
  mensagem: 'cf_mensagem',
  interesse: 'cf_o_que_voce_busca_com_a_nossa_parceria',
  // Free-text copy of the segment, so it is kept even if the selection field below rejects the value.
  segmento: 'cf_ktb_nextcard_campo_aberto_qual_e_o_segmento_do_seu',
};

const listFields: Record<string, string> = {
  segmento: 'cf_qual_e_o_segmento_do_seu_negocio',
  prazo: 'cf_em_quanto_tempo_pretende_implantar',
  estado: 'cf_estados',
  unidades: 'cf_quantas_unidades_possui',
  totens: 'cf_quantos_totens_pretende_instalar_inicialmente',
  catracas: 'cf_quantas_catracas_pretende_instalar',
  comandas: 'cf_quantas_comandas_voce_precisa',
  fluxo: 'cf_qual_o_fluxo_medio_de_clientes_por_dia',
};

// Exact option lists of the RD selection fields (RD rejects the conversion for any other value).
export const rdListOptions: Record<string, string[]> = {
  segmento: [
    'Açaiteria',
    'Bar ou Pub',
    'Bistrô',
    'Churrascaria',
    'Cafeteria',
    'Delivery',
    'Doceria',
    'Food Truck',
    'Hamburgueria',
    'Lanchonete',
    'Marmitaria',
    'Padaria',
    'Pastelaria',
    'Pizzaria',
    'Posto de Combustível',
    'Restaurante',
    'Rede/Franquia de Alimentação',
    'Salgaderia',
    'Sorveteria',
    'Outros',
  ],
  prazo: ['Imediatamente', 'Nos próximos 30 dias', 'Em até 3 meses', 'Apenas pesquisando'],
  estado: ['PR', 'SC', 'RS', 'SP', 'MG', 'RJ', 'DF', 'GO', 'UF Demais', 'Outros'],
  unidades: ['1', '2 a 3', '4 a 10', '11 a 30', 'Mais de 30'],
  catracas: ['1', '2', '3', '4 ou mais', 'Ainda não sei'],
  totens: ['1', '2', '3 a 5', '6 a 10', 'Mais de 10', 'Ainda não sei'],
  comandas: ['Até 100', 'De 101 a 300', 'De 301 a 500', 'De 501 a 1.000', 'Mais de 1.000', 'Ainda não sei'],
  fluxo: ['Até 100', '100 a 300', '300 a 600', '600 a 1.000', 'Mais de 1.000'],
};

const brazilianStates = new Set([
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]);

const matchOption = (options: string[], value: string) =>
  options.find((option) => option.localeCompare(value, 'pt-BR', { sensitivity: 'base' }) === 0);

/** Converts a site value to an exact RD option for the list field; never returns a value outside the RD list. */
export const toRdListValue: Record<string, (value: string) => string | undefined> = {
  segmento: (value) => matchOption(rdListOptions.segmento, value) ?? 'Outros',
  prazo: (value) => matchOption(rdListOptions.prazo, value),
  unidades: (value) => matchOption(rdListOptions.unidades, value),
  catracas: (value) => matchOption(rdListOptions.catracas, value),
  totens: (value) => matchOption(rdListOptions.totens, value),
  comandas: (value) => matchOption(rdListOptions.comandas, value),
  fluxo: (value) => matchOption(rdListOptions.fluxo, value),
  estado: (value) => {
    const uf = value.trim().toUpperCase();
    if (rdListOptions.estado.includes(uf)) {
      return uf;
    }
    return brazilianStates.has(uf) ? 'UF Demais' : 'Outros';
  },
};

// cf_site_de_origem is not sent: in RD it is a list whose only option is "LP NEXTBE".

export type RdLead = {
  product: string;
  fields: Record<string, string>;
  utm: Record<string, string>;
};

const onlyFilled = (obj: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== ''));

const pick = (fields: Record<string, string>, map: Record<string, string>, convert: typeof toRdListValue = {}) =>
  Object.fromEntries(
    Object.entries(map)
      .filter(([siteField]) => fields[siteField])
      .map(([siteField, rdField]) => [
        rdField,
        convert[siteField] ? convert[siteField](fields[siteField]) : fields[siteField],
      ])
      .filter(([, value]) => value !== undefined),
  );

/** `skip` lists RD custom fields to leave out ('*' leaves out every custom field). */
export function buildRdPayload({ product, fields, utm }: RdLead, skip: Set<string> = new Set()) {
  const custom = skip.has('*')
    ? {}
    : Object.fromEntries(
        Object.entries({ ...pick(fields, textFields), ...pick(fields, listFields, toRdListValue) }).filter(
          ([rdField]) => !skip.has(rdField),
        ),
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

const post = (lead: RdLead, apiKey: string, skip: Set<string>) =>
  fetch(`${RD_ENDPOINT}?api_key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(buildRdPayload(lead, skip)),
    signal: AbortSignal.timeout(10_000),
  });

/** Custom fields RD rejected, from its error body (paths like "$.payload.cf_x"). */
const rejectedCustomFields = (body: string) => {
  try {
    const { errors } = JSON.parse(body) as { errors?: { path?: string }[] };
    return (errors ?? [])
      .map((error) => error.path?.match(/\$\.payload\.(cf_\w+)/)?.[1])
      .filter((field): field is string => Boolean(field));
  } catch {
    return [];
  }
};

/**
 * Sends the conversion. When RD rejects custom fields (unknown field or value outside a list), it retries without
 * exactly those fields, and as a last resort without any custom field, so the lead itself is never lost.
 */
export async function sendToRdStation(lead: RdLead, apiKey: string) {
  const skip = new Set<string>();
  const problems: string[] = [];
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await post(lead, apiKey, skip);
    if (response.ok) {
      if (problems.length) {
        // eslint-disable-next-line no-console
        console.warn(`[leads] RD aceitou a conversão sem os campos: ${[...skip].join(', ')}`, problems);
      }
      return;
    }
    const body = (await response.text().catch(() => '')).slice(0, 600);
    problems.push(`RD Station respondeu ${response.status}: ${body}`);
    // Only field problems (400/422) are worth retrying; auth or server errors are not.
    if ((response.status !== 400 && response.status !== 422) || skip.has('*')) {
      break;
    }
    const rejected = rejectedCustomFields(body).filter((field) => !skip.has(field));
    if (rejected.length) {
      rejected.forEach((field) => skip.add(field));
    } else {
      skip.add('*');
    }
  }
  throw new Error(problems.join(' | '));
}
