import { LeadField } from '@/data/lead-forms';
import { ReactNode } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from './BackgroundLines';
import { HeadsetIcon, MapPinIcon, SlidersIcon } from './BrandIcons';
import LeadForm from './LeadForm';

interface LeadSectionProps {
  product: string;
  productLabel: string;
  fields: LeadField[];
  title?: string;
  description?: string;
  badgeIcon?: ReactNode;
}

const perks = [
  { icon: SlidersIcon, title: 'Projeto sob medida', text: 'Proposta pensada para a sua operação, do diagnóstico à instalação.' },
  { icon: MapPinIcon, title: 'Entrega em todo o Brasil', text: 'Levamos o projeto até você, em todas as regiões.' },
  { icon: HeadsetIcon, title: 'Suporte especializado', text: 'Acompanhamento em todas as etapas do projeto.' },
];

const LeadSection = ({
  product,
  productLabel,
  fields,
  title = 'Solicite sua cotação',
  description = 'Conte um pouco sobre a sua operação e receba uma proposta com os equipamentos certos para o seu negócio.',
  badgeIcon,
}: LeadSectionProps) => {
  return (
    <section id="cotacao" className="relative isolate scroll-mt-24 py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
      <BackgroundLines variant="grid" />
      <div className="main-container">
        <div
          className="bg-secondary relative isolate overflow-hidden rounded-[28px] px-5 py-10 sm:px-8 md:px-12 lg:py-14"
          style={{
            background:
              'radial-gradient(circle at 0% 0%, rgba(200,33,39,0.5) 0%, rgba(200,33,39,0) 38%), radial-gradient(circle at 100% 100%, rgba(200,33,39,0.5) 0%, rgba(200,33,39,0) 38%), linear-gradient(135deg, #3f3f3c 0%, #23231f 55%, #3a3a37 100%)',
          }}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-14">
            <div className="space-y-6 text-white lg:col-span-5 lg:flex lg:flex-col lg:items-start lg:justify-center">
              <RevealAnimation delay={0.1}>
                <span className="badge border border-white/20 bg-white/10 text-white backdrop-blur-md">
                  {badgeIcon}
                  Fale com um especialista
                </span>
              </RevealAnimation>
              <RevealAnimation delay={0.2}>
                <h2 className="text-white">{title}</h2>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <p className="text-white/90">{description}</p>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <ul className="space-y-4 pt-2">
                  {perks.map(({ icon: Icon, title: perkTitle, text }) => (
                    <li key={perkTitle} className="flex items-start gap-4">
                      <span className="bg-primary-500 flex size-11 shrink-0 items-center justify-center rounded-full text-white">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <p className="text-tagline-1 font-medium text-white">{perkTitle}</p>
                        <p className="text-[16px] leading-[1.5] text-white/85">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </RevealAnimation>
              <RevealAnimation delay={0.5}>
                <p className="text-tagline-2 border-t border-white/15 pt-5 text-white/85">
                  Prefere falar agora? Ligue{' '}
                  <a href="tel:+554137320275" className="font-medium text-white underline">
                    (41) 3732-0275
                  </a>{' '}
                  ou{' '}
                  <a href="tel:+5541995507759" className="font-medium text-white underline">
                    (41) 99550-7759
                  </a>
                  .
                </p>
              </RevealAnimation>
            </div>
            <RevealAnimation delay={0.3} start="top 90%">
              <div className="rounded-[24px] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:col-span-7">
                <LeadForm product={product} productLabel={productLabel} fields={fields} />
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadSection;
