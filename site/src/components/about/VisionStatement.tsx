import { ComponentType } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import { StarIcon, TargetIcon, UsersIcon } from '../shared/BrandIcons';

const pillars: { id: number; title: string; text: string; icon: ComponentType<{ className?: string }> }[] = [
  {
    id: 1,
    title: 'Nossa causa',
    text: 'Multiplicar os resultados das empresas por meio da automação comercial.',
    icon: TargetIcon,
  },
  {
    id: 2,
    title: 'Por que fazemos',
    text: 'Acreditamos que as empresas têm papel fundamental na transformação da sociedade e no desenvolvimento do país.',
    icon: UsersIcon,
  },
  {
    id: 3,
    title: 'Como fazemos',
    text: 'Com excelência: projetos personalizados, do diagnóstico à instalação, com proximidade em cada etapa.',
    icon: StarIcon,
  },
];

const VisionStatement = () => {
  return (
    <section className="relative isolate pt-14 pb-14 sm:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[100px] xl:pb-[100px]">
      <BackgroundLines variant="grid" />
      <div className="main-container space-y-12 md:space-y-16">
        <div className="mx-auto max-w-[780px] text-center">
          <RevealAnimation delay={0.2}>
            <p>
              Somos uma empresa nacional especializada em soluções de automação comercial, com projetos customizados
              para cada operação.
            </p>
          </RevealAnimation>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map(({ id, title, text, icon: Icon }, index) => (
            <RevealAnimation key={id} delay={0.3 + index * 0.12}>
              <div className="h-full">
                <div className="group bg-background-1 dark:bg-background-6 border-secondary/10 hover:border-primary-500/40 h-full rounded-[20px] border p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(35,35,31,0.12)]">
                  <span className="bg-primary-500 mb-6 flex size-12 items-center justify-center rounded-full text-white transition-transform duration-500 group-hover:scale-110">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-heading-6 mb-2">{title}</h3>
                  <p className="text-tagline-1">{text}</p>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

VisionStatement.displayName = 'VisionStatement';
export default VisionStatement;
