import { ComponentType } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import { CheckCircleIcon, EyeIcon, HeartIcon, LayersIcon, StarIcon, UsersIcon, ZapIcon } from '../shared/BrandIcons';
import Cta from '../shared/tracking/Cta';

const benefitCards: { id: number; icon: ComponentType<{ className?: string }>; title: string; description: string }[] = [
  {
    id: 1,
    icon: UsersIcon,
    title: 'Redução de filas',
    description: 'Totens e comandas distribuem o atendimento, então ninguém fica preso numa única fila.',
  },
  {
    id: 2,
    icon: ZapIcon,
    title: 'Mais agilidade',
    description: 'Pedido, consumo e pagamento seguem juntos, sem etapas manuais entre um equipamento e outro.',
  },
  {
    id: 3,
    icon: EyeIcon,
    title: 'Controle da operação',
    description: 'Visibilidade de quem entrou, o que consumiu e quando saiu, em tempo real.',
  },
  {
    id: 4,
    icon: CheckCircleIcon,
    title: 'Redução de erros',
    description: 'Comanda eletrônica elimina o registro manual e as divergências de fechamento de caixa.',
  },
  {
    id: 5,
    icon: HeartIcon,
    title: 'Melhor experiência',
    description: 'Menos espera, mais autonomia — o cliente controla o próprio ritmo de consumo.',
  },
  {
    id: 6,
    icon: LayersIcon,
    title: 'Processos integrados',
    description: 'Totem, catracas e comandas compartilham dados com o PDV, sem operação paralela.',
  },
];

const Services = () => {
  return (
    <section className="bg-background-3 dark:bg-background-7 relative isolate py-[100px]">
      <BackgroundLines variant="grid" />
      <div className="mx-5 max-w-full space-y-14 min-[425px]:max-w-[380px] min-[475px]:max-w-[450px] sm:mx-auto sm:max-w-[600px] md:max-w-[700px] lg:max-w-[980px] xl:max-w-[1240px] 2xl:max-w-[1440px]">
        <div
          className="bg-secondary relative overflow-hidden rounded-4xl px-2 py-8 min-[425px]:py-[60px] sm:px-0 lg:py-[100px]"
          style={{
            background:
              'radial-gradient(circle at 0% 0%, rgba(200,33,39,0.5) 0%, rgba(200,33,39,0) 38%), radial-gradient(circle at 100% 100%, rgba(200,33,39,0.5) 0%, rgba(200,33,39,0) 38%), linear-gradient(135deg, #3f3f3c 0%, #23231f 55%, #3a3a37 100%)',
          }}>
          <div className="mb-[70px] space-y-5 text-center">
            <RevealAnimation delay={0.1}>
              <span className="badge badge-blur border border-white/20 backdrop-blur-md">
                <StarIcon className="-mt-0.5 mr-2 inline-block size-4 align-middle" />
                Resultado, não só equipamento
              </span>
            </RevealAnimation>
            <div className="mx-1 space-y-3 sm:mx-0">
              <RevealAnimation delay={0.2}>
                <h2 className="mx-auto max-w-[560px] text-white sm:max-w-[600px] lg:max-w-[700px]">
                  Benefícios no dia a dia
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <p className="text-accent/60">
                  Para quem opera todos os dias: do balcão ao caixa, cada etapa fica mais simples de gerenciar
                </p>
              </RevealAnimation>
            </div>
          </div>
          <div className="grid grid-cols-12 justify-center gap-y-6 px-5 sm:px-10 lg:gap-6 lg:px-[74px] xl:gap-8">
            {benefitCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <RevealAnimation delay={(index % 3) * 0.12} start="top 95%" key={item.id}>
                  <div className="col-span-12 flex sm:col-span-6 lg:col-span-4">
                    <div className="group flex min-h-[200px] flex-1 flex-col items-center space-y-4 rounded-[20px] border border-white/15 bg-white/10 p-6 text-center backdrop-blur-[25px] transition-all duration-500 hover:-translate-y-1.5 hover:border-white/30 hover:bg-white/15 sm:space-y-6 md:p-8">
                      <span className="bg-primary-500 mx-auto flex size-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-500 group-hover:scale-110 sm:size-16">
                        <Icon className="size-7 sm:size-8" />
                      </span>
                      <div className="space-y-2">
                        <h3 className="sm:text-heading-5 text-heading-6 text-accent">{item.title}</h3>
                        <p className="text-accent/60">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </RevealAnimation>
              );
            })}
          </div>
        </div>
        <div className="text-center">
          <RevealAnimation delay={0.9}>
            <Cta
              href="/contato"
              id="home_benefits_cta"
              location="home_benefits"
              className="btn md:btn-xl btn-lg btn-primary hover:btn-secondary mx-auto w-[90%] md:mx-0 md:w-auto">
              Solicite uma cotação
            </Cta>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default Services;
