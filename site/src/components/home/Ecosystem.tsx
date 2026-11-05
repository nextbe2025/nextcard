import fluxoImg from '@public/images/ambientes/fluxo-entrada-comanda-autoatendimento-saida-restaurante.webp';
import Image from 'next/image';
import { ComponentType } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import { KioskIcon, TicketIcon, TurnstileIcon } from '../shared/BrandIcons';

type Step = {
  label: string;
  description: string;
  short: string;
  icon: ComponentType<{ className?: string }>;
  pin: { x: number; y: number };
};

const steps: Step[] = [
  {
    label: 'Entrada',
    description: 'Catraca Expedidora libera o acesso e entrega a comanda ao cliente.',
    short: 'Catraca libera o acesso',
    icon: TurnstileIcon,
    pin: { x: 20, y: 42 },
  },
  {
    label: 'Comanda e Consumo',
    description:
      'O cliente circula livremente pela operação — mesas, quiosques, áreas de convivência — enquanto cada consumo é registrado na comanda eletrônica, sem papel e sem erro manual.',
    short: 'Consumo sem papel',
    icon: TicketIcon,
    pin: { x: 51, y: 34 },
  },
  {
    label: 'Totem',
    description: 'No totem, o cliente confere o consumo e faz o pagamento no seu próprio ritmo.',
    short: 'Autoatendimento e pagamento no seu ritmo',
    icon: KioskIcon,
    pin: { x: 71, y: 36 },
  },
  {
    label: 'Saída',
    description: 'Catraca Receptora confirma o pagamento e libera a saída, fechando o ciclo.',
    short: 'Catraca libera a saída',
    icon: TurnstileIcon,
    pin: { x: 88, y: 46 },
  },
];

const StepCircle = ({ index }: { index: number }) => (
  <div className="bg-secondary dark:bg-background-8 border-background-1 dark:border-background-5 text-tagline-1 relative z-10 mx-auto flex size-12 shrink-0 items-center justify-center rounded-full border-4 font-medium text-white">
    {index + 1}
  </div>
);

const arrowPositions = [25, 50, 75];

const Ecosystem = () => {
  return (
    <section
      id="ecossistema"
      className="bg-background-3 dark:bg-background-7 relative isolate py-[50px] lg:py-[100px]">
      <BackgroundLines variant="vertical" />
      <div className="main-container">
        <div className="mb-10 space-y-5 text-center md:mb-14">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-primary">
              Ecossistema <strong>NEXTCARD</strong>
            </span>
          </RevealAnimation>
          <div className="space-y-3">
            <RevealAnimation delay={0.2}>
              <h2 className="mx-auto md:whitespace-nowrap">Uma infraestrutura completa</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p className="mx-auto max-w-[680px]">
                Entregamos uma infraestrutura integrada, com soluções que se conectam e otimizam toda a operação, do
                primeiro ao último passo da jornada do cliente.
              </p>
            </RevealAnimation>
          </div>
        </div>

        {/* cena real com os 4 pontos do fluxo */}
        <div className="relative mb-14 md:mb-20">
          <RevealAnimation delay={0.3}>
            <figure className="group relative aspect-[16/9] overflow-hidden rounded-[20px]">
              <Image
                src={fluxoImg}
                alt="Fluxo NEXTCARD em um restaurante: entrada com catraca expedidora, comanda, totem de autoatendimento e saída com catraca receptora"
                fill
                sizes="(min-width: 1280px) 1240px, 100vw"
                className="object-cover saturate-[.8] transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
              />
            </figure>
          </RevealAnimation>
          <div className="pointer-events-none absolute inset-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <RevealAnimation key={step.label} delay={0.6 + index * 0.15}>
                  <div
                    className="absolute -mt-[18px] flex w-0 flex-col items-center"
                    style={{ left: `${step.pin.x}%`, top: `${step.pin.y}%` }}>
                    <span className="bg-primary-500 text-tagline-2 relative flex size-9 items-center justify-center rounded-full border-2 border-white/80 font-bold text-white shadow-lg">
                      <span className="bg-primary-500/60 absolute inset-0 animate-ping rounded-full" />
                      <span className="relative">{index + 1}</span>
                    </span>
                    <div
                      className={`mt-3 hidden items-center gap-2.5 rounded-2xl border border-white/20 bg-secondary/60 px-3.5 py-2.5 text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:flex ${
                        step.label === 'Totem' ? '' : 'whitespace-nowrap'
                      } ${index % 2 === 0 ? 'animate-float' : 'animate-float-slow'}`}>
                      <span className="bg-primary-500 flex size-8 shrink-0 items-center justify-center rounded-full">
                        <Icon className="size-4 text-white" />
                      </span>
                      <span className={step.label === 'Totem' ? 'w-[170px]' : ''}>
                        <span className="text-tagline-2 block font-medium whitespace-nowrap">{step.label}</span>
                        <span className="text-tagline-3 block text-white/75">{step.short}</span>
                      </span>
                    </div>
                  </div>
                </RevealAnimation>
              );
            })}
          </div>
        </div>

        {/* trajeto com setas — telas grandes */}
        <div className="hidden lg:block">
          <RevealAnimation delay={0.3}>
            <div className="relative mb-6 h-12">
              <div className="bg-primary-200 dark:bg-primary-800 absolute top-1/2 right-[10%] left-[10%] h-px -translate-y-1/2" />
              {arrowPositions.map((pos) => (
                <svg
                  key={pos}
                  aria-hidden
                  className="text-primary-400 dark:text-primary-700 absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pos}%` }}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 2L8 6L4 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ))}
              <div className="relative grid h-full grid-cols-4 gap-6">
                {steps.map((step, index) => (
                  <div key={step.label} className="flex items-center justify-center">
                    <StepCircle index={index} />
                  </div>
                ))}
              </div>
            </div>
          </RevealAnimation>
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <RevealAnimation key={step.label} delay={0.4 + index * 0.1}>
                <div className="space-y-3 text-center">
                  <h3 className="text-tagline-1 font-medium">{step.label}</h3>
                  <p className="text-tagline-2 mx-auto max-w-[190px]">{step.description}</p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>

        {/* versão empilhada — telas pequenas/médias */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:hidden">
          {steps.map((step, index) => (
            <RevealAnimation key={step.label} delay={0.3 + index * 0.1}>
              <div className="space-y-3 text-center">
                <StepCircle index={index} />
                <h3 className="text-tagline-1 font-medium">{step.label}</h3>
                <p className="text-tagline-2 mx-auto max-w-[190px]">{step.description}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation delay={0.6}>
          <p className="text-tagline-2 text-secondary/50 dark:text-accent/50 mx-auto mt-14 max-w-[640px] text-center">
            O fluxo se adapta ao formato de cada operação — nem toda solução precisa das quatro etapas.
          </p>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Ecosystem;
