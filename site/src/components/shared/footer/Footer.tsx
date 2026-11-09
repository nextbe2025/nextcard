import RevealAnimation from '@/components/animation/RevealAnimation';
import BackgroundMark from '@/components/shared/BackgroundMark';
import { footerLinks } from '@/data/footer-data';
import { cn } from '@/utils/cn';
import facebook from '@public/images/icons/facebook.svg';
import instagram from '@public/images/icons/instagram.svg';
import linkedin from '@public/images/icons/linkedin.svg';
import youtube from '@public/images/icons/youtube.svg';
import darkLogo from '@public/images/shared/main-logo-dark.svg';
import updoLogo from '@public/images/shared/updo-logo-branca.svg';
import Image from 'next/image';
import Link from 'next/link';
import Cta from '../tracking/Cta';
import FooterDivider from './FooterDivider';

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/nextcardautomacao', icon: facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/nextcardautomacao/', icon: instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nextcardautomacao/', icon: linkedin },
  { label: 'Youtube', href: 'https://www.youtube.com/channel/UCDiEj2EG-KmWUJD8qxzWmFw/featured', icon: youtube },
];

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn('bg-secondary dark:bg-background-8 relative z-0 overflow-hidden', className)}>
      <RevealAnimation delay={0.3} offset={50} direction="up">
        <div>
          <figure
            aria-hidden
            className="pointer-events-none absolute -top-[1250px] left-1/2 -z-1 size-[1635px] -translate-x-1/2 select-none"
            style={{
              background:
                'radial-gradient(circle, rgba(200,33,39,0.55) 0%, rgba(200,33,39,0.2) 35%, rgba(88,88,86,0.3) 55%, rgba(88,88,86,0) 75%)',
            }}
          />
          <figure
            aria-hidden
            className="pointer-events-none absolute -right-[300px] -bottom-[300px] -z-1 size-[700px] select-none"
            style={{
              background: 'radial-gradient(circle, rgba(200,33,39,0.25) 0%, rgba(200,33,39,0) 70%)',
            }}
          />
        </div>
      </RevealAnimation>
      <BackgroundMark className="text-white opacity-[0.06]" position="-right-[6%] -bottom-[10%]" />
      <div className="main-container px-5">
        <div className="grid grid-cols-12 justify-between gap-x-0 gap-y-10 pt-12 pb-8 xl:pt-16">
          <RevealAnimation delay={0.1}>
            <div className="col-span-12 xl:col-span-4">
              <div className="max-w-[340px]">
                <figure className="max-w-[170px]">
                  <Image src={darkLogo} alt="NEXTCARD" className="w-full h-auto" />
                </figure>
                <p className="text-accent/60 text-tagline-1 mt-3 mb-4 font-normal">
                  A <strong>NEXTCARD</strong> é especialista em Automação Comercial, com soluções tecnológicas que otimizam
                  a gestão, aumentam a eficiência operacional e impulsionam os resultados de negócios do setor de Food
                  Service.
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <div key={social.label} className="flex items-center gap-3">
                      {index > 0 && <div className="bg-stroke-1/20 h-6 w-px" />}
                      <Link target="_blank" href={social.href}>
                        <span className="sr-only">{social.label}</span>
                        <Image className="size-6" src={social.icon} alt={social.label} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealAnimation>
          <div className="col-span-12 grid grid-cols-12 gap-x-0 gap-y-8 xl:col-span-8">
            {footerLinks.map(({ title, links }, index) => (
              <div className="col-span-12 sm:col-span-6 md:col-span-4" key={title}>
                <RevealAnimation delay={0.2 + index * 0.1}>
                  <div className="space-y-8">
                    <p className="sm:text-heading-6 text-tagline-1 text-primary-50 font-normal">{title}</p>
                    <ul className="space-y-5">
                      {links.map(({ label, href, icon: Icon }) => (
                        <li key={label}>
                          <Link
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="footer-link !inline-flex items-center gap-2.5">
                            {Icon && (
                              <span className="bg-accent/10 text-accent inline-flex size-7 shrink-0 items-center justify-center rounded-full">
                                <Icon className="size-3.5" />
                              </span>
                            )}
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealAnimation>
              </div>
            ))}
          </div>
        </div>
        <div className="relative pt-5 pb-8">
          <FooterDivider className="bg-accent/10 dark:bg-stroke-6" />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <RevealAnimation delay={0.7} offset={10} start="top 105%">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                <p className="text-tagline-1 text-primary-50 font-normal">
                  © {new Date().getFullYear()} <strong>NEXTCARD</strong> Automação Comercial. Todos os direitos
                  reservados.
                </p>
                <div className="bg-stroke-1/20 hidden h-4 w-px sm:block" />
                <Link
                  target="_blank"
                  href="https://updo.com.br"
                  className="text-tagline-1 text-primary-50/70 hover:text-primary-50 flex items-center gap-1.5 font-normal transition-colors">
                  Desenvolvido por
                  <Image src={updoLogo} alt="UPDO" className="h-6 w-auto" />
                </Link>
              </div>
            </RevealAnimation>
            <RevealAnimation delay={0.8} offset={10} start="top 105%">
              <Cta
                href="/contato"
                id="footer_solicitar_cotacao"
                location="footer"
                className="btn btn-primary hover:btn-white btn-sm">
                <span>Solicitar Cotação</span>
              </Cta>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </footer>
  );
};
Footer.displayName = 'Footer';
export default Footer;
