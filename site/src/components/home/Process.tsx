import { ComponentType } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import BackgroundMark from '../shared/BackgroundMark';
import { EyeIcon, HeadsetIcon, KioskIcon, LayersIcon, TargetIcon } from '../shared/BrandIcons';

type Step = {
  id: number;
  icon: ComponentType<{ className?: string }>;
  title: string;
  items: string[];
};

const steps: Step[] = [
  {
    id: 1,
    icon: EyeIcon,
    title: 'Avaliamos a operação',
    items: ['Fluxo de clientes', 'Fechamento de caixa', 'Pontos de fila'],
  },
  {
    id: 2,
    icon: KioskIcon,
    title: 'Indicamos os equipamentos',
    items: ['Totem de autoatendimento', 'Catracas expedidora e receptora', 'Comandas eletrônicas'],
  },
  {
    id: 3,
    icon: LayersIcon,
    title: 'Integramos ao seu PDV',
    items: ['PDV e sistema de gestão', 'Meios de pagamento', 'Sem operação paralela'],
  },
  {
    id: 4,
    icon: HeadsetIcon,
    title: 'Do projeto ao pós-venda',
    items: ['Planejamento do projeto', 'Instalação dos equipamentos', 'Suporte no pós-venda'],
  },
];

const Process = () => {
  return (
    <section className="relative isolate py-[50px] lg:py-[100px]">
      <BackgroundLines variant="grid" />
      <BackgroundMark className="text-secondary dark:text-accent w-[420px]" position="right-[4%] bottom-[6%]" />
      <div className="main-container">
        <div className="mx-auto mb-12 max-w-[620px] space-y-4 text-center md:mb-16">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-primary">
              <TargetIcon className="-mt-0.5 mr-2 inline-block size-4 align-middle" />
              Nosso processo
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Do diagnóstico à instalação</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p>Um caminho claro, sem etapa escondida: veja como a NEXTCARD leva sua operação até o totem no ar.</p>
          </RevealAnimation>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="bg-primary-200 dark:bg-primary-800 absolute top-8 right-[12%] left-[12%] hidden h-px lg:block"
          />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <RevealAnimation key={step.id} delay={0.2 + index * 0.1} start="top 95%">
                <div className="group bg-background-1 dark:bg-background-6 border-secondary/10 hover:border-primary-500/40 relative h-full rounded-[20px] border p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(35,35,31,0.12)]">
                  <div className="relative z-10 mb-5 flex items-center gap-3">
                    <span className="bg-secondary dark:bg-background-8 text-tagline-2 flex size-8 shrink-0 items-center justify-center rounded-full font-medium text-white">
                      {step.id}
                    </span>
                    <span className="bg-primary-500 flex size-12 items-center justify-center rounded-full text-white transition-transform duration-500 group-hover:scale-110">
                      <Icon className="size-6" />
                    </span>
                  </div>
                  <h3 className="text-heading-6 mb-3">{step.title}</h3>
                  <ul className="space-y-2">
                    {step.items.map((item) => (
                      <li key={item} className="text-tagline-2 flex items-start gap-2">
                        <span className="bg-primary-500 mt-2 size-1.5 shrink-0 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
