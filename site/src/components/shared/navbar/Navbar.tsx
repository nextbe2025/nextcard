'use client';
import RevealAnimation from '@/components/animation/RevealAnimation';
import { MobileMenuProvider } from '@/context/MobileMenuContext';
import { mobileMenuData } from '@/data/navbar-data';
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { cn } from '@/utils/cn';
import mainLogo from '@public/images/shared/main-logo.svg';
import mainLogoDark from '@public/images/shared/main-logo-dark.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from '../mobile-menu/MobileMenu';
import CtaArrow from '../CtaArrow';
import Cta from '../tracking/Cta';
import MobileMenuButton from './MobileMenuButton';
import SolutionsMenu from './SolutionsMenu';

const navLinksBefore = [{ label: 'Início', href: '/' }];

const navLinksAfter = [
  { label: 'Projetos', href: '/projetos' },
  { label: 'Parceiros', href: '/parceiros-revenda' },
  { label: 'A NEXTCARD', href: '/quem-somos' },
  { label: 'Contato', href: '/contato' },
];

const Navbar = () => {
  const { isScrolled } = useNavbarScroll(150);

  const [menuDropdownId, setMenuDropdownId] = useState<string | null>(null);

  const handleMenuHover = (dropdownId?: string | null) => {
    setMenuDropdownId(dropdownId || null);
  };
  return (
    <MobileMenuProvider>
      <header
        onMouseLeave={() => handleMenuHover(null)}
        className={cn(
          'lp:!max-w-[1290px] fixed top-5 left-1/2 z-50 mx-auto w-full max-w-[350px] -translate-x-1/2 transition-all duration-500 ease-in-out max-[400px]:max-w-[350px] min-[425px]:max-w-[375px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
          isScrolled && 'top-2',
        )}>
        <RevealAnimation direction="up" offset={100} delay={0.1} instant>
          <div className="dark:bg-background-7 flex items-center justify-between rounded-full bg-white/60 px-2.5 py-2.5 backdrop-blur-[25px] xl:py-0">
            <div>
              <Link href="/">
                <span className="sr-only">Home</span>
                <figure className="block w-[150px] pl-2 sm:w-[170px] lg:w-[198px] lg:pl-0">
                  <Image src={mainLogo} alt="NEXTCARD" className="block h-auto w-full dark:hidden" />
                  <Image src={mainLogoDark} alt="NEXTCARD" className="hidden h-auto w-full dark:block" />
                </figure>
              </Link>
            </div>
            <nav className="hidden items-center xl:flex">
              <ul className="flex items-center">
                {navLinksBefore.map((link) => (
                  <li key={link.href} className="nav-item relative cursor-pointer py-2.5">
                    <Link
                      href={link.href}
                      className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
                <li
                  className="nav-item relative cursor-pointer py-2.5"
                  data-menu="solutions-dropdown-menu"
                  onMouseEnter={() => handleMenuHover('solutions-dropdown-menu')}
                  onMouseLeave={() => handleMenuHover(null)}>
                  <Link
                    href="/#solucoes"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Soluções</span>
                    <span className="nav-arrow block origin-center translate-y-px transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </Link>
                  <SolutionsMenu menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                </li>
                {navLinksAfter.map((link) => (
                  <li key={link.href} className="nav-item relative cursor-pointer py-2.5">
                    <Link
                      href={link.href}
                      className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="hidden items-center justify-center xl:flex">
              <Cta href="/contato" id="nav_solicitar_cotacao" location="navbar" className="btn btn-md btn-primary hover:btn-secondary btn-arrow">
                <span>Solicitar Cotação</span>
                <CtaArrow />
              </Cta>
            </div>
            <MobileMenuButton />
          </div>
        </RevealAnimation>
      </header>
      <MobileMenu menuData={mobileMenuData} />
    </MobileMenuProvider>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
