import c120 from '@public/images/produtos/catraca-expedidora-tecnibra-c120-entrada.webp';
import c180Exp from '@public/images/produtos/catraca-expedidora-tecnibra-c180-economy.webp';
import c180Rec from '@public/images/produtos/catraca-receptora-tecnibra-c180-economy-saida.webp';
import fitTopdata from '@public/images/produtos/catraca-expedidora-fit-topdata-entrada.webp';
import r120 from '@public/images/produtos/catraca-receptora-tecnibra-r120-saida.webp';
import fitUrna from '@public/images/produtos/catraca-receptora-fit-urna-topdata-saida.webp';
import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import { CheckCircleIcon, TurnstileIcon } from '../shared/BrandIcons';
import Cta from '../shared/tracking/Cta';

type Model = {
  name: string;
  text: string;
  image?: StaticImageData;
  alt?: string;
  specs: { label: string; value: string }[];
};

type Group = {
  id: string;
  title: string;
  tag: string;
  text: string;
  models: Model[];
};

const groups: Group[] = [
  {
    id: 'expedidora',
    title: 'Catraca Expedidora',
    tag: 'Entrada',
    text: 'Libera a entrada e entrega a comanda ao cliente, que passa a registrar o consumo desde o primeiro momento.',
    models: [
      {
        name: 'Tecnibra C120',
        text: 'Compacta, robusta e confiável.',
        image: c120,
        alt: 'Catraca expedidora de comandas Tecnibra C120',
        specs: [
          { label: 'Dimensões', value: '252,89 × 1746,92 × 1637,06 mm' },
          { label: 'Comandas', value: '9 × 7 cm (5 mm ou 3,5 mm)' },
        ],
      },
      {
        name: 'Tecnibra C180 com Economy',
        text: 'Dispensadora e catraca separadas, compatível com três tamanhos de comanda.',
        image: c180Exp,
        alt: 'Catraca expedidora Tecnibra C180 com Economy',
        specs: [
          { label: 'Dispensadora', value: '377,64 × 258,88 × 1463 mm' },
          { label: 'Catraca', value: '318,10 × 719,79 × 1068,69 mm' },
          { label: 'Comandas', value: '15 × 10 cm, 14 × 8 cm e 9 × 7 cm' },
        ],
      },
      {
        name: 'Expedidora Fit Topdata',
        text: 'Adaptável a diversos ambientes.',
        image: fitTopdata,
        alt: 'Catraca expedidora Fit Topdata com dispensador de cartões',
        specs: [
          { label: 'Dimensões', value: '690 × 1133 × 820 mm' },
          { label: 'Cartões', value: '54 × 86 mm' },
        ],
      },
    ],
  },
  {
    id: 'receptora',
    title: 'Catraca Receptora',
    tag: 'Saída',
    text: 'Recebe a comanda na saída e libera a passagem só depois de conferido o consumo, evitando perdas.',
    models: [
      {
        name: 'Tecnibra R120',
        text: 'Prática, robusta e confiável.',
        image: r120,
        alt: 'Catraca receptora de comandas Tecnibra R120',
        specs: [
          { label: 'Dimensões', value: '252,89 × 1746,92 × 1034,7 mm' },
          { label: 'Comandas', value: '9 × 7 cm (5 mm ou 3,5 mm)' },
        ],
      },
      {
        name: 'Tecnibra C180 com Economy',
        text: 'Receptora com catraca, para o controle da saída.',
        image: c180Rec,
        alt: 'Catraca receptora Tecnibra C180 com Economy',
        specs: [
          { label: 'Receptora', value: '231,50 × 227,50 × 117,59 mm' },
          { label: 'Catraca', value: '719,79 × 318,10 × 1068,69 mm' },
          { label: 'Comandas', value: '9 × 7 cm' },
        ],
      },
      {
        name: 'Catraca Fit Urna Topdata',
        text: 'Discreta e adaptável a diversos ambientes.',
        image: fitUrna,
        alt: 'Catraca receptora Fit Topdata com urna para recolher cartões',
        specs: [
          { label: 'Dimensões', value: '690 × 1050 × 810 mm' },
          { label: 'Cartões', value: '54 × 86 mm' },
        ],
      },
    ],
  },
];

const ModelCard = ({ model }: { model: Model }): ReactNode => (
  <div className="h-full">
    <div className="group bg-background-1 dark:bg-background-6 border-secondary/10 hover:border-primary-500/40 flex h-full flex-col overflow-hidden rounded-[20px] border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(35,35,31,0.16)]">
      <div className="from-background-2 to-background-1 relative flex h-[300px] items-center justify-center bg-gradient-to-b px-6 pt-8">
        {model.image ? (
          <Image
            src={model.image}
            alt={model.alt ?? model.name}
            sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 80vw"
            className="h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <span className="bg-primary-500 flex size-24 items-center justify-center rounded-full text-white transition-transform duration-700 ease-out group-hover:scale-110">
            <TurnstileIcon className="size-11" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h4 className="text-heading-6">{model.name}</h4>
        <p className="text-tagline-1">{model.text}</p>
        <dl className="border-secondary/10 mt-auto space-y-1.5 border-t pt-4">
          {model.specs.map(({ label, value }) => (
            <div key={label} className="text-tagline-2 flex flex-wrap gap-x-2">
              <dt className="text-secondary font-medium">{label}:</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

const CatracaModels = () => {
  return (
    <section
      id="modelos"
      className="bg-background-3 dark:bg-background-7 relative isolate scroll-mt-24 py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
      <BackgroundLines variant="vertical" />
      <div className="main-container space-y-14 md:space-y-20">
        <div className="mx-auto max-w-[680px] space-y-4 text-center">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-primary">
              <TurnstileIcon className="-mt-0.5 mr-2 inline-block size-4 align-middle" />
              Linha NEXTCARD
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Nossos modelos</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p>Uma catraca para a entrada e outra para a saída: escolha o modelo ideal para o seu espaço.</p>
          </RevealAnimation>
        </div>

        {groups.map((group) => (
          <div key={group.id} id={group.id} className="scroll-mt-28 space-y-8">
            <RevealAnimation delay={0.1} start="top 90%">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div className="max-w-[640px] space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-heading-4">{group.title}</h3>
                    <span className="bg-secondary/70 text-tagline-3 rounded-full border border-white/20 px-3 py-1.5 font-bold text-white backdrop-blur-md">
                      {group.tag}
                    </span>
                  </div>
                  <p className="text-tagline-1">{group.text}</p>
                </div>
              </div>
            </RevealAnimation>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.models.map((model, index) => (
                <RevealAnimation key={model.name} delay={(index % 3) * 0.1} start="top 95%">
                  <ModelCard model={model} />
                </RevealAnimation>
              ))}
            </div>
          </div>
        ))}

        <RevealAnimation delay={0.1} start="top 92%">
          <div className="bg-secondary relative isolate overflow-hidden rounded-[24px] px-6 py-10 text-white md:px-12 md:py-12">
            <div
              aria-hidden
              className="bg-primary-500/30 absolute -top-20 -right-20 -z-10 size-64 rounded-full blur-3xl"
            />
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="space-y-2">
                <h3 className="text-heading-4 text-white">Não sabe qual escolher?</h3>
                <p className="flex items-start gap-2 text-white/90">
                  <CheckCircleIcon className="mt-1 size-5 shrink-0" />
                  Nossa equipe indica o modelo certo para o espaço e o fluxo da sua operação.
                </p>
              </div>
              <Cta
                href="#cotacao"
                id="catraca_modelos_cta"
                location="catraca_modelos"
                className="btn btn-primary hover:btn-white btn-lg">
                <span>Solicitar cotação</span>
              </Cta>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default CatracaModels;
