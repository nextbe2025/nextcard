export type LeadField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'number' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  autoComplete?: string;
  full?: boolean;
};

export const states = [
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
];

// Same wording as the RD Station selection field "Qual é o segmento do seu negócio?" (cf_qual_e_o_segmento_do_seu_negocio).
// "Loja de conveniência" has no RD option and is sent to that field as "Outros" (src/utils/rdStation.ts).
export const foodSegments = [
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
  'Loja de conveniência',
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
];

// Same options as the RD Station field "Em quanto tempo pretende implantar?" (cf_em_quanto_tempo_pretende_implantar).
export const deadlines = ['Imediatamente', 'Nos próximos 30 dias', 'Em até 3 meses', 'Apenas pesquisando'];

// Same options as the matching RD Station selection fields (see src/utils/rdStation.ts).
export const unitOptions = ['1', '2 a 3', '4 a 10', '11 a 30', 'Mais de 30'];
export const turnstileOptions = ['1', '2', '3', '4 ou mais', 'Ainda não sei'];
export const kioskOptions = ['1', '2', '3 a 5', '6 a 10', 'Mais de 10', 'Ainda não sei'];
export const tabOptions = [
  'Até 100',
  'De 101 a 300',
  'De 301 a 500',
  'De 501 a 1.000',
  'Mais de 1.000',
  'Ainda não sei',
];
export const dailyFlowOptions = ['Até 100', '100 a 300', '300 a 600', '600 a 1.000', 'Mais de 1.000'];

const contactFields: LeadField[] = [
  { name: 'nome', label: 'Nome', type: 'text', required: true, autoComplete: 'name', placeholder: 'Seu nome completo' },
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    required: true,
    autoComplete: 'email',
    placeholder: 'voce@empresa.com.br',
  },
  {
    name: 'telefone',
    label: 'Telefone / WhatsApp',
    type: 'tel',
    required: true,
    autoComplete: 'tel',
    placeholder: '(41) 99999-9999',
  },
  {
    name: 'estado',
    label: 'De qual Estado você fala?',
    type: 'select',
    required: true,
    options: states,
    autoComplete: 'address-level1',
  },
  {
    name: 'segmento',
    label: 'Qual é o segmento do seu negócio?',
    type: 'select',
    required: true,
    options: foodSegments,
    full: true,
  },
];

export const totemFormFields: LeadField[] = [
  ...contactFields,
  { name: 'unidades', label: 'Quantas unidades possui?', type: 'select', options: unitOptions },
  { name: 'caixas', label: 'Quantos caixas existem em cada unidade?', type: 'number', placeholder: 'Ex.: 2' },
  { name: 'totens', label: 'Quantos totens pretende instalar inicialmente?', type: 'select', options: kioskOptions },
  {
    name: 'pdv',
    label: 'Já utiliza sistema de gestão/PDV? Qual?',
    type: 'text',
    placeholder: 'Ex.: Não uso / Nome do sistema',
  },
  { name: 'prazo', label: 'Em quanto tempo pretende implantar?', type: 'select', options: deadlines, full: true },
];

export const catracaFormFields: LeadField[] = [
  ...contactFields,
  { name: 'unidades', label: 'Quantas unidades possui?', type: 'select', options: unitOptions },
  { name: 'catracas', label: 'Quantas catracas pretende instalar?', type: 'select', options: turnstileOptions },
  { name: 'fluxo', label: 'Qual o fluxo médio de clientes por dia?', type: 'select', options: dailyFlowOptions },
  {
    name: 'pdv',
    label: 'Já utiliza sistema de gestão/PDV? Qual?',
    type: 'text',
    placeholder: 'Ex.: Não uso / Nome do sistema',
  },
  { name: 'prazo', label: 'Em quanto tempo pretende implantar?', type: 'select', options: deadlines, full: true },
];

export const comandaFormFields: LeadField[] = [
  ...contactFields,
  { name: 'unidades', label: 'Quantas unidades possui?', type: 'select', options: unitOptions },
  { name: 'comandas', label: 'Quantas comandas você precisa aproximadamente?', type: 'select', options: tabOptions },
  {
    name: 'pdv',
    label: 'Já utiliza sistema de gestão/PDV? Qual?',
    type: 'text',
    placeholder: 'Ex.: Não uso / Nome do sistema',
  },
  { name: 'prazo', label: 'Em quanto tempo pretende implantar?', type: 'select', options: deadlines },
];

export const partnerFormFields: LeadField[] = [
  { name: 'nome', label: 'Nome', type: 'text', required: true, autoComplete: 'name', placeholder: 'Seu nome completo' },
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    required: true,
    autoComplete: 'email',
    placeholder: 'voce@empresa.com.br',
  },
  {
    name: 'telefone',
    label: 'Telefone / WhatsApp',
    type: 'tel',
    required: true,
    autoComplete: 'tel',
    placeholder: '(41) 99999-9999',
  },
  {
    name: 'razaoSocial',
    label: 'Razão Social',
    type: 'text',
    required: true,
    autoComplete: 'organization',
    placeholder: 'Nome da sua empresa',
  },
  { name: 'cnpj', label: 'CNPJ', type: 'text', required: true, placeholder: '00.000.000/0000-00' },
  {
    name: 'estado',
    label: 'De qual Estado você fala?',
    type: 'select',
    required: true,
    options: states,
    autoComplete: 'address-level1',
  },
  {
    name: 'cidade',
    label: 'Cidade',
    type: 'text',
    required: true,
    autoComplete: 'address-level2',
    placeholder: 'Sua cidade',
    full: true,
  },
  {
    name: 'interesse',
    label: 'O que você busca com a nossa parceria?',
    type: 'textarea',
    required: true,
    placeholder: 'Conte um pouco sobre o seu negócio e o que espera da parceria',
    full: true,
  },
];

// General contact page: same identity fields, but a free message instead of product details.
export const contactPageFields: LeadField[] = [
  { name: 'nome', label: 'Nome', type: 'text', required: true, autoComplete: 'name', placeholder: 'Seu nome completo' },
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    required: true,
    autoComplete: 'email',
    placeholder: 'voce@empresa.com.br',
  },
  {
    name: 'telefone',
    label: 'Telefone / WhatsApp',
    type: 'tel',
    required: true,
    autoComplete: 'tel',
    placeholder: '(41) 99999-9999',
  },
  {
    name: 'estado',
    label: 'De qual Estado você fala?',
    type: 'select',
    required: true,
    options: states,
    autoComplete: 'address-level1',
  },
  {
    name: 'mensagem',
    label: 'Mensagem',
    type: 'textarea',
    required: true,
    placeholder: 'Como podemos ajudar?',
    full: true,
  },
];

// The API only accepts these products and only the fields defined here.
export const leadFormsByProduct: Record<string, LeadField[]> = {
  totem: totemFormFields,
  catraca: catracaFormFields,
  comanda: comandaFormFields,
  contato: contactPageFields,
  parceria: partnerFormFields,
};
