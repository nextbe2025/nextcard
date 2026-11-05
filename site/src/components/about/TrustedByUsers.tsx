import bgImg from '@public/images/backgrounds/fundo-preto-vermelho-luzes-diagonais.webp';
import Image from 'next/image';
import { FC } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import { CheckCircleIcon, HeartIcon, ShieldCheckIcon, TargetIcon, UsersIcon } from '../shared/BrandIcons';

const values = [
  { label: 'Transparência', icon: ShieldCheckIcon },
  { label: 'Respeito', icon: HeartIcon },
  { label: 'Comprometimento', icon: CheckCircleIcon },
  { label: 'Foco no Cliente', icon: TargetIcon },
  { label: 'Colaboração', icon: UsersIcon },
];

// 5 values: 3 per row on the first line, 2 wider ones on the second so both rows fill the width.
const spans = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'col-span-2 lg:col-span-3'];

const TrustedByUsers: FC = () => {
  return (
    <section
      className="pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[100px] xl:pb-[100px]"
      aria-label="Nossos valores">
      <div className="main-container">
        <div className="max-h-auto bg-secondary relative flex flex-col items-center gap-x-8 gap-y-10 overflow-hidden rounded-[20px] py-14 lg:flex-row lg:items-center">
          <Image
            src={bgImg}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1280px) 1240px, 100vw"
            className="pointer-events-none object-cover"
          />
          <div className="relative z-10 space-y-3 max-sm:px-3 max-sm:text-center lg:w-[37%] lg:pl-12">
            <RevealAnimation delay={0.1}>
              <h2 className="lg:text-heading-3 text-white">Nossos valores</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.2}>
              <p className="text-accent/70 px-4 md:px-0">
                Cultivamos um ambiente respeitoso e descontraído, movido por pessoas, negócios e resultados.
              </p>
            </RevealAnimation>
          </div>
          <div className="relative z-10 grid w-full grid-cols-2 gap-3 px-3 sm:px-6 lg:w-[63%] lg:grid-cols-6 lg:gap-4 lg:px-0 lg:pr-12">
            {values.map(({ label, icon: Icon }, index) => (
              <RevealAnimation delay={0.3 + index * 0.1} key={label}>
                <span
                  className={`text-tagline-2 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 font-bold tracking-wide text-white uppercase backdrop-blur-md ${spans[index]}`}>
                  <Icon className="size-4 text-white" />
                  {label}
                </span>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

TrustedByUsers.displayName = 'TrustedByUsers';
export default TrustedByUsers;
