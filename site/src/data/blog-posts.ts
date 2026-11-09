import catracasImg from '@public/images/ambientes/catracas-expedidora-e-receptora-de-comandas-posto-tulio.webp';
import comandasImg from '@public/images/ambientes/comandas-eletronicas-nextcard-sobre-a-mesa.webp';
import restauranteImg from '@public/images/ambientes/ambiente-restaurante-moderno-iluminacao-vermelha.webp';
import totemBancadaImg from '@public/images/ambientes/totens-autoatendimento-de-bancada-restaurante.webp';
import totemLanchoneteImg from '@public/images/ambientes/totens-autoatendimento-branco-e-preto-lanchonete.webp';
import totemPedestalImg from '@public/images/ambientes/totem-autoatendimento-pedestal-restaurante.webp';
import { StaticImageData } from 'next/image';

export type BlogCategory = 'Totens' | 'Comandas' | 'Controle de acesso' | 'Gestão e automação';

export const blogCategories: BlogCategory[] = ['Totens', 'Comandas', 'Controle de acesso', 'Gestão e automação'];

export type BlogBlock =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'dl'; items: { term: string; text: string }[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  cover: StaticImageData;
  coverAlt: string;
  body: BlogBlock[];
  // Solution page the article leads to at the end
  solution?: { label: string; href: string };
};

const solutionByCategory: Record<BlogCategory, { label: string; href: string } | undefined> = {
  Totens: { label: 'Conheça os totens NEXTCARD', href: '/totem-autoatendimento' },
  Comandas: { label: 'Conheça as comandas eletrônicas', href: '/comandas-eletronicas' },
  'Controle de acesso': { label: 'Conheça as catracas NEXTCARD', href: '/catracas' },
  'Gestão e automação': undefined,
};

const coverByCategory = (category: BlogCategory, index: number): { cover: StaticImageData; coverAlt: string } => {
  switch (category) {
    case 'Totens': {
      const options = [
        { cover: totemPedestalImg, coverAlt: 'Totem de autoatendimento NEXTCARD em restaurante' },
        { cover: totemBancadaImg, coverAlt: 'Totens de autoatendimento de bancada NEXTCARD' },
        { cover: totemLanchoneteImg, coverAlt: 'Totens de autoatendimento NEXTCARD em lanchonete' },
      ];
      return options[index % options.length];
    }
    case 'Comandas':
      return { cover: comandasImg, coverAlt: 'Comandas eletrônicas NEXTCARD sobre a mesa' };
    case 'Controle de acesso':
      return { cover: catracasImg, coverAlt: 'Catracas expedidora e receptora de comandas NEXTCARD' };
    default:
      return { cover: restauranteImg, coverAlt: 'Ambiente de restaurante moderno com iluminação vermelha' };
  }
};

type Draft = Omit<BlogPost, 'cover' | 'coverAlt' | 'solution'>;

const drafts: Draft[] = [
  {
    slug: 'comanda-de-bar-eletronica-o-que-e-beneficios-e-como-funciona',
    title: 'Comanda de bar eletrônica: o que é, benefícios e como funciona?',
    excerpt: 'Uma ótima alternativa para turbinar os negócios gastronômicos: entenda o que é e como implantar.',
    category: 'Comandas',
    body: [
      { type: 'h2', text: 'O que é comanda de bar?' },
      {
        type: 'p',
        text: 'A comanda de bar serve para controlar tudo o que o cliente consumiu durante a permanência no estabelecimento. A versão em papel é sujeita a erros, extravios e ainda pesa no meio ambiente. Já a comanda eletrônica automatiza o atendimento e organiza o trabalho em três frentes.',
      },
      {
        type: 'dl',
        items: [
          { term: 'Atendimento', text: 'o garçom registra os pedidos direto em um dispositivo móvel.' },
          { term: 'Produção', text: 'o pedido chega na hora ao bar ou à cozinha, sem recado e sem papel.' },
          { term: 'Caixa', text: 'o cliente apresenta a comanda e escolhe a forma de pagamento.' },
        ],
      },
      { type: 'h2', text: 'Quais são os benefícios da comanda eletrônica?' },
      {
        type: 'ul',
        items: [
          'Mais organização nas operações',
          'Menos erros e falhas manuais',
          'Processos mais ágeis',
          'Histórico de consumo de cada cliente',
          'Aumento do ticket médio',
          'Atendimento mais humanizado e fidelização',
          'Mais controle do caixa e fechamento mais rápido',
          'Relatórios estratégicos, controle de estoque e de vendas',
        ],
      },
      { type: 'h2', text: 'Como funciona a comanda eletrônica?' },
      {
        type: 'p',
        text: 'Você contrata uma empresa especializada em automação comercial, que fornece comandas personalizadas com o logotipo e as cores do seu estabelecimento. O cliente recebe uma comanda de PVC no lugar do papel, todos os pedidos são registrados nela e, ao final, ela é apresentada no caixa para a cobrança.',
      },
      { type: 'h2', text: 'O que é preciso para implantar?' },
      {
        type: 'dl',
        items: [
          {
            term: 'Sistema de gestão',
            text: 'software que registra o histórico do cliente e automatiza o fluxo interno.',
          },
          {
            term: 'Computador e dispositivos móveis',
            text: 'o computador para a gestão do caixa e os dispositivos para os garçons anotarem os pedidos.',
          },
          { term: 'Impressora', text: 'térmica, para cupons e notas de produção.' },
          { term: 'Internet', text: 'um roteador Wi-Fi de qualidade, para manter o fluxo rápido.' },
          {
            term: 'Totem de autoatendimento e autopagamento',
            text: 'opcional, mas ajuda a evitar filas e a fidelizar clientes.',
          },
        ],
      },
    ],
  },
];

export const blogPosts: BlogPost[] = drafts.map((draft, index) => ({
  ...draft,
  ...coverByCategory(draft.category, index),
  solution: solutionByCategory[draft.category],
}));

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
