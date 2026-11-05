import bgImg from '@public/images/backgrounds/fundo-preto-vermelho-luzes-diagonais.webp';
import bancadaSlimImg from '@public/images/produtos/totem-autoatendimento-bancada-nextcard.webp';
import paredeImg from '@public/images/produtos/totem-autoatendimento-parede-nextcard.webp';
import horizontalImg from '@public/images/produtos/totem-nx-18-5-h-autopagamento.webp';
import pedestalImg from '@public/images/produtos/totem-nx-24-v-autoatendimento-pedestal.webp';
import bancadaImg from '@public/images/produtos/totem-nx-bancada-autoatendimento.webp';
import Image, { StaticImageData } from 'next/image';
import { ComponentType } from 'react';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import { CpuIcon, KioskIcon, LayersIcon, MonitorIcon, ShieldCheckIcon, ZapIcon } from '../shared/BrandIcons';
import Cta from '../shared/tracking/Cta';

type Line = {
  name: string;
  type: string;
  sizes: string;
  models: string[];
  text: string;
  image: StaticImageData;
  alt: string;
};

const lines: Line[] = [
  {
    name: 'Totem Bancada Slim',
    type: 'Autoatendimento',
    sizes: '15,6" · 18,5" · 21"',
    models: ['NX15,6BS', 'NX18,5BS', 'NX21BS'],
    text: 'Compacto e discreto, para operações com pouco espaço no balcão.',
    image: bancadaSlimImg,
    alt: 'Totem de autoatendimento NEXTCARD da linha Bancada Slim',
  },
  {
    name: 'Totem Bancada',
    type: 'Autoatendimento',
    sizes: '21" · 24"',
    models: ['NX21B', 'NX24B'],
    text: 'Autoatendimento pensado para balcões e bancadas.',
    image: bancadaImg,
    alt: 'Totem de autoatendimento NEXTCARD da linha Bancada',
  },
  {
    name: 'Totem de Parede',
    type: 'Autoatendimento',
    sizes: '24" · 32"',
    models: ['NX24P', 'NX32P'],
    text: 'Fixado na parede, libera espaço no piso da operação.',
    image: paredeImg,
    alt: 'Totem de autoatendimento NEXTCARD da linha de Parede',
  },
  {
    name: 'Totem Pedestal',
    type: 'Autoatendimento',
    sizes: '24" · 32"',
    models: ['NX24V', 'NX32V'],
    text: 'O cliente faz o pedido e paga no próprio totem, no seu ritmo.',
    image: pedestalImg,
    alt: 'Totem de autoatendimento NEXTCARD da linha Pedestal',
  },
  {
    name: 'Totem Horizontal',
    type: 'Autopagamento',
    sizes: '18,5"',
    models: ['NX18,5H'],
    text: 'O cliente confere o consumo da comanda e paga sozinho, sem fila no caixa.',
    image: horizontalImg,
    alt: 'Totem de autopagamento NEXTCARD da linha Horizontal, modelo NX18,5H',
  },
];

const technologies = ['Pinpad', 'Impressora', 'Leitor de código de barras', 'Leitor Mifare', 'Leitor RFID'];

const specs: { icon: ComponentType<{ className?: string }>; title: string; text: string }[] = [
  { icon: MonitorIcon, title: 'Tela', text: 'Monitor touch screen LED Full HD, 1920 × 1080, de 15,6" a 32"' },
  { icon: CpuIcon, title: 'Processador', text: 'Intel Core i3, i5 ou i7 de 11ª geração' },
  { icon: LayersIcon, title: 'Armazenamento', text: 'SSD de 120 a 240 GB' },
  { icon: ZapIcon, title: 'Memória', text: '4 GB DDR4, com expansão até 32 GB' },
  { icon: KioskIcon, title: 'Sistema', text: 'Windows ou Android' },
  { icon: ShieldCheckIcon, title: 'Material', text: 'Aço carbono SAE 1040' },
];

const TotemModels = () => {
  return (
    <section
      id="modelos"
      className="bg-background-3 dark:bg-background-7 relative isolate scroll-mt-24 py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
      <BackgroundLines variant="vertical" />
      <div className="main-container space-y-12 md:space-y-16">
        <div className="mx-auto max-w-[680px] space-y-4 text-center">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-primary">
              <KioskIcon className="-mt-0.5 mr-2 inline-block size-4 align-middle" />
              Linha NEXTCARD
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Linha de totens 2026/2027</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p>Cinco linhas para cada tipo de operação, com o mesmo padrão de qualidade e integração.</p>
          </RevealAnimation>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {lines.map((line, index) => (
            <RevealAnimation key={line.name} delay={(index % 3) * 0.1} start="top 95%">
              <div className={`h-full lg:col-span-2 ${index === 3 ? 'lg:col-start-2' : ''}`}>
                <div className="group bg-background-1 dark:bg-background-6 border-secondary/10 flex h-full flex-col overflow-hidden rounded-[20px] border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(35,35,31,0.16)]">
                  <div className="from-background-2 to-background-1 relative flex h-[340px] items-center justify-center bg-gradient-to-b px-6 pt-16">
                    <span className="bg-secondary/70 text-tagline-3 absolute top-4 left-4 rounded-full border border-white/20 px-3 py-1.5 font-bold text-white backdrop-blur-md">
                      {line.type}
                    </span>
                    <span className="text-tagline-2 border-secondary/10 bg-background-1 text-secondary absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-medium">
                      <MonitorIcon className="text-primary-500 size-3.5" />
                      {line.sizes}
                    </span>
                    <Image
                      src={line.image}
                      alt={line.alt}
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
                      className="h-full w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="text-heading-6">{line.name}</h3>
                    <p className="text-tagline-1">{line.text}</p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                      {line.models.map((model) => (
                        <li
                          key={model}
                          className="text-tagline-2 border-secondary/10 text-secondary rounded-full border px-3 py-1 font-medium">
                          {model}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>

        <RevealAnimation delay={0.1} start="top 92%">
          <div className="bg-secondary relative isolate overflow-hidden rounded-[24px] px-6 py-10 text-white md:px-12 md:py-14">
            <Image src={bgImg} alt="" aria-hidden fill sizes="1240px" className="-z-10 object-cover opacity-60" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-black/35" />
            <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="space-y-2">
                <h3 className="text-heading-4 text-white">Especificações técnicas</h3>
                <p className="text-white/90">Configuração base da linha de totens; o tamanho da tela varia por modelo.</p>
              </div>
              <Cta
                href="#cotacao"
                id="totem_specs_cta"
                location="totem_modelos"
                className="btn btn-primary hover:btn-white btn-lg">
                <span>Solicitar cotação</span>
              </Cta>
            </div>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {specs.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-tagline-1 font-medium text-white">{title}</p>
                    <p className="text-[16px] leading-[1.5] text-white/85">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-white/20 pt-8">
              <p className="text-tagline-1 mb-2 font-medium text-white">Opções de tecnologia</p>
              <p className="mb-5 text-[16px] leading-[1.5] text-white/85">
                Todos os modelos podem ser configurados conforme a necessidade: somente impressora, pinpad e impressora,
                ou pinpad, impressora e leitor, combinando as tecnologias.
              </p>
              <ul className="flex flex-wrap gap-3">
                {technologies.map((technology) => (
                  <li
                    key={technology}
                    className="text-tagline-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white backdrop-blur-md">
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default TotemModels;
