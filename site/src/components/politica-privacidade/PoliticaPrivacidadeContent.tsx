import { ReactNode } from 'react';
import RevealAnimation from '../animation/RevealAnimation';

type PolicySection = {
  title: string;
  paragraphs?: ReactNode[];
  items?: ReactNode[];
};

const sections: PolicySection[] = [
  {
    title: '1. Quem somos',
    paragraphs: [
      <>
        A <strong>NEXTCARD</strong> Automação Comercial, com sede em Pinhais, PR, é a responsável (controladora) pelos
        dados pessoais tratados por meio deste site. Esta Política explica, de acordo com a Lei Geral de Proteção de
        Dados (Lei nº 13.709/2018 – LGPD), quais dados coletamos, para que os usamos e quais são os seus direitos.
      </>,
    ],
  },
  {
    title: '2. Quais dados coletamos',
    paragraphs: ['Coletamos apenas os dados que você nos envia e os necessários para o funcionamento do site:'],
    items: [
      'Dados de contato informados nos formulários: nome, e-mail, telefone/WhatsApp, estado e cidade.',
      'Informações sobre o seu negócio: segmento, quantidade de unidades, caixas ou equipamentos, sistema de gestão/PDV utilizado, prazo de implantação e a mensagem que você escrever.',
      'No formulário de parceiros: razão social, CNPJ, cidade e o que você busca com a parceria.',
      'Dados técnicos do envio: página de origem, endereço de referência (referrer), parâmetros de campanha (UTM), data e hora.',
      'Endereço IP, usado apenas para a verificação de segurança contra robôs e para limitar envios repetidos.',
    ],
  },
  {
    title: '3. Para que usamos os dados',
    items: [
      'Responder ao seu contato e preparar uma cotação ou proposta para a sua operação.',
      'Avaliar e dar andamento a solicitações do programa de parceiros.',
      'Entender de quais páginas e campanhas chegam os contatos, para melhorar o site e a comunicação.',
      'Proteger o site contra spam, robôs e uso indevido.',
    ],
    paragraphs: [
      'Tratamos esses dados com base no seu consentimento, informado no envio do formulário, e no legítimo interesse da NEXTCARD em responder às solicitações e manter o site seguro.',
    ],
  },
  {
    title: '4. Compartilhamento',
    paragraphs: [
      'Não vendemos nem alugamos os seus dados. Eles podem ser compartilhados apenas com fornecedores que nos ajudam a operar o site e o atendimento, sempre para as finalidades descritas aqui:',
    ],
    items: [
      'Serviços de hospedagem do site e de gestão de contatos, que recebem os dados enviados pelos formulários.',
      'Cloudflare Turnstile, serviço de verificação contra robôs usado nos formulários.',
      'YouTube (Google), que exibe o vídeo da página inicial e pode registrar dados de navegação conforme a política própria do Google.',
      'Autoridades públicas, quando houver obrigação legal ou ordem judicial.',
    ],
  },
  {
    title: '5. Cookies e tecnologias semelhantes',
    paragraphs: [
      'O site pode usar cookies e tecnologias semelhantes para funcionar corretamente, medir o acesso às páginas e entender a interação com os botões de contato. Conteúdos de terceiros, como o vídeo do YouTube, podem gravar cookies próprios. Você pode bloquear ou apagar cookies nas configurações do seu navegador, mas algumas funções do site podem deixar de funcionar.',
    ],
  },
  {
    title: '6. Por quanto tempo guardamos',
    paragraphs: [
      'Mantemos os dados pelo tempo necessário para atender à sua solicitação e manter o relacionamento comercial, ou pelo prazo exigido por lei. Depois disso, eles são excluídos ou anonimizados.',
    ],
  },
  {
    title: '7. Segurança',
    paragraphs: [
      'Adotamos medidas técnicas e administrativas para proteger os seus dados, como conexão criptografada (HTTPS), verificação contra robôs e acesso restrito às informações recebidas.',
    ],
  },
  {
    title: '8. Seus direitos',
    paragraphs: ['Pela LGPD, você pode, a qualquer momento:'],
    items: [
      'Confirmar se tratamos os seus dados e ter acesso a eles.',
      'Corrigir dados incompletos, inexatos ou desatualizados.',
      'Pedir a anonimização, o bloqueio ou a exclusão de dados desnecessários.',
      'Revogar o seu consentimento e pedir a exclusão dos dados tratados com base nele.',
      'Pedir informações sobre com quem compartilhamos os seus dados.',
      'Solicitar a portabilidade dos dados a outro fornecedor.',
    ],
  },
  {
    title: '9. Contato',
    paragraphs: [
      <>
        Para exercer os seus direitos ou tirar dúvidas sobre esta Política, fale com a gente pelo e-mail{' '}
        <a href="mailto:comercial@nextcard.com.br" className="text-primary-500 underline">
          comercial@nextcard.com.br
        </a>{' '}
        ou pelo telefone (41) 3732-0275.
      </>,
    ],
  },
  {
    title: '10. Atualizações desta Política',
    paragraphs: [
      'Esta Política pode ser atualizada para refletir mudanças no site ou na legislação. A versão em vigor é sempre a publicada nesta página.',
    ],
  },
];

const PoliticaPrivacidadeContent = () => {
  return (
    <section className="pt-32 pb-[100px] sm:pt-36 md:pt-42 xl:pt-[180px]">
      <div className="main-container">
        <div className="privacy-policy mx-auto max-w-[860px] space-y-12">
          <div className="space-y-3">
            <RevealAnimation delay={0.1}>
              <h1 className="text-heading-4 md:text-heading-3">Política de Privacidade</h1>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p>Última atualização: novembro de 2026.</p>
            </RevealAnimation>
          </div>
          {sections.map((section) => (
            <RevealAnimation key={section.title} delay={0.1}>
              <div className="space-y-3">
                <h3 className="text-heading-6 md:text-heading-5">{section.title}</h3>
                {section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                {section.items && (
                  <ul className="text-tagline-1 text-secondary/60 dark:text-accent/60 space-y-2">
                    {section.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoliticaPrivacidadeContent;
