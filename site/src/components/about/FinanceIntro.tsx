import totemImg from '@public/images/ambientes/totem-autoatendimento-pedestal-restaurante.webp';
import Image from 'next/image';
import { ComponentType } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import { CalendarIcon, LayersIcon, MapPinIcon, SlidersIcon, UsersIcon } from '../shared/BrandIcons';
import FloatingCard from '../shared/FloatingCard';
import LinkButton from '../ui/button/LinkButton';

const highlights: { id: number; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: 1, label: 'Relações sólidas e de confiança com nossos parceiros', icon: UsersIcon },
  { id: 2, label: 'Soluções que levam resultados reais ao negócio dos clientes', icon: LayersIcon },
  { id: 3, label: 'Projetos 100% personalizados, do diagnóstico à instalação', icon: SlidersIcon },
];

const FinanceIntro = () => {
  return (
    <section className="relative isolate overflow-hidden py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
      <BackgroundLines variant="grid" />
      <div className="main-container flex flex-col-reverse items-center gap-x-24 gap-y-12 lg:flex-row">
        <div className="relative w-full max-w-[520px] md:flex-1">
          <RevealAnimation delay={0.2}>
            <figure className="group relative aspect-[4/5] overflow-hidden rounded-[20px]">
              <Image
                src={totemImg}
                alt="Totem de autoatendimento NEXTCARD em restaurante"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-[72%_center] transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </figure>
          </RevealAnimation>
          <FloatingCard
            variant="primary"
            icon={<CalendarIcon />}
            title="Desde 2018"
            subtitle="Pinhais, PR"
            direction="right"
            className="hidden -top-6 right-4 sm:flex md:-right-8 lg:-right-14"
          />
          <FloatingCard
            icon={<MapPinIcon />}
            title="Todo o Brasil"
            subtitle="Presentes em todas as regiões"
            slow
            className="hidden -bottom-6 left-4 sm:flex md:-left-8 xl:-left-14 2xl:-left-24"
          />
        </div>
        <div className="flex flex-col md:flex-1 lg:items-start lg:text-left">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-primary mb-5">
              <CalendarIcon className="-mt-0.5 mr-2 inline-block size-4 align-middle" />
              Nossa história
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.25}>
            <h2 className="mb-3">Nascemos em Pinhais</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p className="mb-6">
              Nossa história começou em 2018, em Pinhais, região metropolitana de Curitiba, transformando as dores dos
              clientes em soluções completas de Automação Comercial. Hoje, levamos essas soluções a todas as regiões do
              Brasil.
            </p>
          </RevealAnimation>
          <ul className="mb-10 space-y-3 md:mb-14 md:space-y-4">
            {highlights.map(({ id, label, icon: Icon }, idx) => (
              <RevealAnimation key={id} delay={0.4 + idx * 0.1}>
                <li className="text-tagline-1 dark:text-accent flex items-center gap-3 font-medium">
                  <span className="bg-primary-500/10 text-primary-500 flex size-9 shrink-0 items-center justify-center rounded-full">
                    <Icon className="size-[18px]" />
                  </span>
                  {label}
                </li>
              </RevealAnimation>
            ))}
          </ul>
          <RevealAnimation delay={0.7}>
            <div>
              <LinkButton
                href="/contato"
                className="btn btn-secondary hover:btn-white dark:btn-white-dark btn-xl mx-auto block w-full md:inline-block md:w-auto">
                Fale com um especialista
              </LinkButton>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

FinanceIntro.displayName = 'FinanceIntro';
export default FinanceIntro;
