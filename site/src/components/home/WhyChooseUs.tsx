import { History, Printer, Users } from 'lucide-react';
import NumberAnimation from '../animation/NumberAnimation';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import { MapPinIcon } from '../shared/BrandIcons';
import ClientLogos from './ClientLogos';

const WhyChooseUs = () => {
  return (
    <section className="lg:py-[100px] py-[50px] bg-background-3 dark:bg-background-7 relative isolate">
      <BackgroundLines variant="vertical" />
      <div className="main-container">
        <div className="text-center space-y-4 mb-[70px]">
          <RevealAnimation delay={0.1}>
            <h2 className="max-w-[600px] sm:max-w-[720px] lg:max-w-[1100px] mx-auto">
              Milhares de consumidores por dia
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="lg:max-w-[658px] max-w-[470px] mx-auto">
              Tecnologia presente em operações que atendem milhares de consumidores todos os dias. A{' '}
              <strong>NEXTCARD</strong> é uma empresa comprometida em apoiar empreendedores a alcançarem melhores
              resultados. Com nosso know-how, experiência comprovada e ecossistema de soluções, entregamos resultados
              reais e duradouros para o seu negócio!
            </p>
          </RevealAnimation>
        </div>
        <div>
          <RevealAnimation delay={0.3}>
            <div className="flex py-6 md:px-0 px-6 flex-col md:flex-row bg-secondary dark:bg-background-6 rounded-[20px] bg-[url('/images/backgrounds/fundo-preto-vermelho-linhas-diagonais.webp')] bg-cover bg-center">
              <div className="py-6 space-y-6 flex-1 md:border-r md:border-b-0 border-b border-b-accent/20 dark:border-b-stroke-6 border-r-accent/20 dark:border-r-stroke-6">
                <div className="xl:w-20 xl:h-[52px] w-16 h-10 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                  <History className="size-6 text-white" strokeWidth={2} />
                </div>
                <div className="text-center">
                  <h3 className="text-white flex flex-wrap items-center justify-center gap-x-1 xl:text-heading-6 text-tagline-1 font-normal">
                    <span className="flex items-center whitespace-nowrap">
                      <NumberAnimation number={8} speed={1000} interval={180} rooms={1} heightSpaceRatio={2.2} />+
                    </span>
                    <span>anos de mercado</span>
                  </h3>
                </div>
              </div>
              <div className="py-6 space-y-6 flex-1 md:border-r md:border-b-0 border-b border-b-accent/20 dark:border-b-stroke-6 border-r-accent/20 dark:border-r-stroke-6">
                <div className="xl:w-20 xl:h-[52px] w-16 h-10 bg-brand-gray rounded-full mx-auto flex items-center justify-center">
                  <Users className="size-6 text-white" strokeWidth={2} />
                </div>
                <div className="text-center">
                  <h3 className="text-white flex flex-wrap items-center justify-center gap-x-1 xl:text-heading-6 text-tagline-1 font-normal">
                    <span className="flex items-center whitespace-nowrap">
                      <NumberAnimation number={5} speed={1000} interval={180} rooms={1} heightSpaceRatio={2.2} />
                      mil+
                    </span>
                    <span>clientes felizes</span>
                  </h3>
                </div>
              </div>
              <div className="py-6 space-y-6 flex-1 md:border-r md:border-b-0 border-b border-b-accent/20 dark:border-b-stroke-6 border-r-accent/20 dark:border-r-stroke-6">
                <div className="xl:w-20 xl:h-[52px] w-16 h-10 bg-primary-700 rounded-full mx-auto flex items-center justify-center">
                  <MapPinIcon className="size-6 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-white flex flex-wrap items-center justify-center gap-x-1 xl:text-heading-6 text-tagline-1 font-normal">
                    <span>Atendimento em todo o Brasil</span>
                  </h3>
                </div>
              </div>
              <div className="py-6 space-y-6 flex-1">
                <div className="xl:w-20 xl:h-[52px] w-16 h-10 bg-brand-gray rounded-full mx-auto flex items-center justify-center">
                  <Printer className="size-6 text-white" strokeWidth={2} />
                </div>
                <div className="text-center">
                  <h3 className="text-white flex flex-wrap items-center justify-center gap-x-1 xl:text-heading-6 text-tagline-1 font-normal">
                    <span className="flex items-center whitespace-nowrap">
                      <NumberAnimation number={3} speed={1000} interval={180} rooms={1} heightSpaceRatio={2.2} />
                      M+
                    </span>
                    <span>comandas produzidas</span>
                  </h3>
                </div>
              </div>
            </div>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <p className="text-secondary/50 dark:text-accent/50 text-tagline-2 mt-6 text-center">
              Presente em todas as regiões do Brasil
            </p>
          </RevealAnimation>
          <RevealAnimation delay={0.5}>
            <ClientLogos />
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
