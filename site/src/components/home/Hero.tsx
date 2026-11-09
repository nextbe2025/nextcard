import RevealAnimation from '../animation/RevealAnimation';
import SplitHeading from '../animation/SplitHeading';
import { KioskIcon, TicketIcon, TurnstileIcon } from '../shared/BrandIcons';
import FloatingCard from '../shared/FloatingCard';
import CtaArrow from '../shared/CtaArrow';
import Cta from '../shared/tracking/Cta';

const Hero = () => {
  return (
    <section className="overflow-x-clip pt-[90px] pb-12 xl:pb-[100px]">
      <div className="relative mx-auto max-w-[600px] md:max-w-[700px] lg:max-w-[980px] xl:max-w-[1240px] 2xl:max-w-[1440px]">
        <div className="relative z-10 mt-4 min-h-[620px] overflow-hidden rounded-4xl border-white sm:border-[10px] md:min-h-[700px]">
          <div aria-hidden className="bg-secondary absolute inset-0 z-0 overflow-hidden">
            <iframe
              className="pointer-events-none absolute top-1/2 left-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 sm:h-[200%] sm:w-[200%] lg:h-[180%] lg:w-[180%]"
              src="https://www.youtube.com/embed/CoUZjmlMkA0?autoplay=1&mute=1&loop=1&playlist=CoUZjmlMkA0&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1"
              title="Vídeo NEXTCARD"
              allow="autoplay; encrypted-media"
              tabIndex={-1}
            />
          </div>
          {/* overlay escuro/vermelho para contraste do texto */}
          <div
            aria-hidden
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(180deg, rgba(35,35,31,0.75) 0%, rgba(35,35,31,0.55) 45%, rgba(200,33,39,0.35) 100%)',
            }}
          />
          <div className="relative z-20 flex min-h-[620px] flex-col items-center justify-center px-6 py-[100px] text-center md:min-h-[700px] md:py-[150px]">
            <div className="mb-8 space-y-5 sm:mb-10 md:mb-14">
              <RevealAnimation delay={0.1}>
                <span className="badge text-secondary bg-white inline-flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1">
                    <KioskIcon className="size-4" />
                    Totens
                  </span>
                  <span className="opacity-40">·</span>
                  <span className="inline-flex items-center gap-1">
                    <TurnstileIcon className="size-4" />
                    Catracas
                  </span>
                  <span className="opacity-40">·</span>
                  <span className="inline-flex items-center gap-1">
                    <TicketIcon className="size-4" />
                    Comandas
                  </span>
                </span>
              </RevealAnimation>
              <div className="space-y-3">
                <SplitHeading
                  text="Automação comercial para food service"
                  className="mx-auto max-w-[350px] text-white sm:max-w-[450px] md:max-w-[600px] xl:max-w-[902px]"
                />
                <RevealAnimation delay={0.6}>
                  <p className="text-accent/80 mx-auto max-w-[350px] sm:max-w-[500px] xl:max-w-[620px]">
                    Tecnologia para transformar operações de consumo: totens de autoatendimento, controle de acesso com
                    catracas e comandas eletrônicas para uma jornada mais ágil e uma operação mais eficiente.
                  </p>
                </RevealAnimation>
              </div>
            </div>
            <div className="flex w-full max-w-[320px] items-center justify-center gap-3 max-sm:flex-col sm:max-w-none">
              <RevealAnimation delay={0.8}>
                <Cta
                  href="/contato"
                  id="hero_solicitar_cotacao"
                  location="hero"
                  className="btn btn-primary hover:btn-white btn-lg btn-arrow w-full sm:w-auto">
                  <span>Solicite uma cotação</span>
                  <CtaArrow className="size-[18px]" />
                </Cta>
              </RevealAnimation>
              <RevealAnimation delay={0.9}>
                <Cta
                  href="/#solucoes"
                  id="hero_conheca_solucoes"
                  location="hero"
                  className="btn btn-white-v2 hover:btn-primary btn-lg w-full sm:w-auto">
                  <span>Conheça nossas soluções</span>
                </Cta>
              </RevealAnimation>
            </div>
          </div>
        </div>
        <FloatingCard
          icon={<KioskIcon />}
          title="Autoatendimento"
          subtitle="Pedido e pagamento no totem"
          delay={1}
          direction="left"
          className="bottom-32 -left-4 hidden lg:flex xl:-left-16"
        />
        <FloatingCard
          icon={<TurnstileIcon />}
          title="Controle de acesso"
          subtitle="Catracas e comandas integradas"
          slow
          delay={1.1}
          className="right-10 -bottom-8 hidden lg:flex xl:right-20"
        />
      </div>
    </section>
  );
};

export default Hero;
