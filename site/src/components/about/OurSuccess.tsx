import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import BackgroundMark from '../shared/BackgroundMark';
import { CalendarIcon, MapPinIcon, UsersIcon, ZapIcon } from '../shared/BrandIcons';
import OurAchievements from '../shared/OurAchievements';

const YearsIcon = () => <CalendarIcon className="size-6 text-white" />;
const ClientsIcon = () => <UsersIcon className="size-6 text-white" />;
const BrasilIcon = () => <MapPinIcon className="size-6 text-white" />;

const nextcardAchievements = [
  {
    id: 'anos-de-mercado',
    icon: YearsIcon,
    number: 8,
    label: '+ anos de mercado',
    bgColor: 'bg-primary-500',
    speed: 1200,
    interval: 220,
    rooms: 1,
  },
  {
    id: 'clientes-felizes',
    icon: ClientsIcon,
    number: 5,
    label: 'mil+ clientes felizes',
    bgColor: 'bg-brand-gray',
    speed: 1200,
    interval: 220,
    rooms: 1,
  },
  {
    id: 'todo-o-brasil',
    icon: BrasilIcon,
    label: 'Atendimento em todo o Brasil',
    bgColor: 'bg-primary-700',
  },
];

const OurSuccess = () => {
  return (
    <section className="relative isolate pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[100px] xl:pb-[100px]">
      <BackgroundLines variant="grid" />
      <BackgroundMark className="text-secondary dark:text-accent w-[380px]" position="right-[3%] top-[4%]" />
      <div className="main-container">
        <div className="mb-14 space-y-3 text-center md:mb-[70px]">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-primary mb-5">
              <ZapIcon className="-mt-0.5 mr-2 inline-block size-4 align-middle" />
              Nossos números
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <h2>8 anos de resultados</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <p className="mx-auto max-w-[744px]">
              Entregamos resultado para quem opera com a gente: números construídos com projetos sob medida, um
              cliente de cada vez, de Pinhais para todo o Brasil.
            </p>
          </RevealAnimation>
        </div>
        <OurAchievements
          achievements={nextcardAchievements}
          className="bg-[url('/images/backgrounds/fundo-preto-vermelho-linhas-diagonais.webp')] bg-cover bg-center"
        />
      </div>
    </section>
  );
};

OurSuccess.displayName = 'OurSuccess';
export default OurSuccess;
