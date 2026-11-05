import RevealAnimation from '../animation/RevealAnimation';
import { HeadsetIcon, SlidersIcon } from '../shared/BrandIcons';
import FloatingCard from '../shared/FloatingCard';
import Cta from '../shared/tracking/Cta';

const FinalCta = () => {
  return (
    <section className="relative overflow-x-clip py-[50px] md:py-20 lg:py-28" aria-label="Chamada final para cotação">
      <div className="main-container relative">
        <div className="bg-secondary relative space-y-6 overflow-hidden rounded-4xl bg-[url('/images/backgrounds/fundo-concreto-escuro-neon-vermelho.webp')] bg-cover bg-center px-6 py-16 text-center md:px-10 lg:py-24">
          <RevealAnimation delay={0.1}>
            <h2 className="mx-auto max-w-[620px] text-white">Vamos transformar sua operação?</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <p className="text-accent/70 mx-auto max-w-[520px]">
              Conte para a gente como funciona sua operação e nosso time de especialistas apresentará a melhor solução
              e proposta para o seu negócio.
            </p>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <Cta
              href="/contato"
              id="home_final_cta"
              location="home_final_cta"
              className="btn btn-primary hover:btn-white btn-xl mt-4 inline-block">
              <span>Solicitar uma cotação</span>
            </Cta>
          </RevealAnimation>
        </div>
        <FloatingCard
          icon={<SlidersIcon />}
          title="Projeto sob medida"
          subtitle="Do diagnóstico à instalação"
          className="-bottom-6 left-6 hidden md:flex xl:-left-6 2xl:-left-16"
        />
        <FloatingCard
          icon={<HeadsetIcon />}
          title="Suporte especializado"
          subtitle="Em todas as etapas"
          slow
          direction="right"
          className="-top-6 right-6 hidden md:flex xl:-right-6 2xl:-right-16"
        />
      </div>
    </section>
  );
};

export default FinalCta;
