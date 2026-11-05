import cabe from '@public/images/clients/Logo-CABE.png';
import park from '@public/images/clients/logo-park-do-churrasco.webp';
import tulio from '@public/images/clients/Posto-Tulio.png';
import redeSim from '@public/images/clients/Rede-SIM.png';
import Image, { StaticImageData } from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import BackgroundLines from '../shared/BackgroundLines';
import { CheckCircleIcon, LayersIcon, MapPinIcon, StarIcon } from '../shared/BrandIcons';

type Project = {
  name: string;
  place: string;
  segment: string;
  text: string;
  highlights: string[];
  logo: StaticImageData;
};

const projects: Project[] = [
  {
    name: 'Park do Churrasco',
    place: 'Curitiba, PR',
    segment: 'Restaurante',
    text: 'Um projeto abrangente, pensado para a experiência completa do consumidor, da entrada ao autopagamento.',
    highlights: ['Da entrada ao autopagamento', 'Ecossistema NEXTCARD'],
    logo: park,
  },
  {
    name: 'CABE PMDF',
    place: 'Distrito Federal',
    segment: 'Salão de refeições',
    text: 'Soluções integradas para segurança e desempenho, otimizando o controle de acesso e a gestão de consumo no salão.',
    highlights: ['Controle de acesso', 'Gestão de consumo'],
    logo: cabe,
  },
  {
    name: 'Posto Tulio',
    place: 'São José dos Pinhais, PR',
    segment: 'Loja de conveniência',
    text: 'Projeto completo de controle de acesso e gestão de consumo na loja de conveniência, incluindo o Clube do Caminhoneiro.',
    highlights: ['7 unidades', 'Ecossistema NEXTCARD completo'],
    logo: tulio,
  },
  {
    name: 'Rede SIM',
    place: 'RS, SC e PR',
    segment: 'Loja de conveniência',
    text: 'Projeto completo com nosso ecossistema: catracas expedidoras, comandas eletrônicas e totens de autopagamento.',
    highlights: ['18 unidades', 'Ecossistema NEXTCARD completo'],
    logo: redeSim,
  },
];

const ProjectsFeatured = () => {
  return (
    <section id="cases" className="relative isolate scroll-mt-24 py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
      <BackgroundLines variant="grid" />
      <div className="main-container space-y-12 md:space-y-14">
        <div className="mx-auto max-w-[720px] space-y-4 text-center">
          <RevealAnimation delay={0.1}>
            <span className="badge badge-primary">
              <StarIcon className="-mt-0.5 mr-2 inline-block size-4 align-middle" />
              Cases de sucesso
            </span>
          </RevealAnimation>
          <RevealAnimation delay={0.2}>
            <h2>Projetos completos</h2>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <p>
              A <strong>NEXTCARD</strong> desenvolve projetos em parceria com cada cliente: mais eficiência na operação,
              processos otimizados e uma experiência melhor para quem consome.
            </p>
          </RevealAnimation>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <RevealAnimation key={project.name} delay={0.05} start="top 92%">
              <div className="h-full">
                <article className="group bg-background-1 dark:bg-background-6 border-secondary/10 hover:border-primary-500/40 grid grid-cols-1 overflow-hidden rounded-[24px] border transition-all duration-500 hover:shadow-[0_28px_70px_rgba(35,35,31,0.14)] lg:grid-cols-12">
                  <div
                    className={
                      'from-background-2 to-background-1 relative flex min-h-[220px] items-center justify-center bg-gradient-to-br p-8 lg:col-span-4 lg:min-h-[300px] ' +
                      (index % 2 === 1 ? 'lg:order-2' : '')
                    }>
                    <span className="bg-secondary/70 text-tagline-3 absolute top-5 left-5 rounded-full border border-white/20 px-3 py-1.5 font-bold text-white backdrop-blur-md">
                      Case {String(index + 1).padStart(2, '0')}
                    </span>
                    <Image
                      src={project.logo}
                      alt={`Logotipo ${project.name}`}
                      className="h-auto max-h-[150px] w-auto max-w-[240px] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div
                    className={
                      'flex flex-col justify-center gap-4 p-7 md:p-10 lg:col-span-8 ' +
                      (index % 2 === 1 ? 'lg:order-1' : '')
                    }>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-tagline-2 border-secondary/10 bg-background-2 text-secondary inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-medium">
                        <MapPinIcon className="text-primary-500 size-3.5" />
                        {project.place}
                      </span>
                      <span className="text-tagline-2 border-secondary/10 bg-background-2 text-secondary inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-medium">
                        <LayersIcon className="text-primary-500 size-3.5" />
                        {project.segment}
                      </span>
                    </div>
                    <h3 className="text-heading-4">{project.name}</h3>
                    <p className="text-tagline-1 max-w-[620px]">{project.text}</p>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                      {project.highlights.map((item) => (
                        <li key={item} className="text-tagline-1 text-secondary flex items-center gap-2 font-medium">
                          <CheckCircleIcon className="text-primary-500 size-5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsFeatured;
