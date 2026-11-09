// crypto marketing mobile menu
'use client';
import { useMobileMenuContext } from '@/context/MobileMenuContext';
import { cn } from '@/utils/cn';
import mainLogoDark from '@public/images/shared/main-logo-dark.svg';
import mainLogo from '@public/images/shared/main-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType } from 'react';
import BackgroundLines from '../BackgroundLines';
import BackgroundMark from '../BackgroundMark';
import { PhoneIcon, WhatsAppIcon } from '../BrandIcons';
import Cta from '../tracking/Cta';
import MenuCloseButton from './MenuCloseButton';
import MobileMenuItem from './MobileMenuItem';

export interface MobileMenuItem {
  id: string;
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
}

export interface MobileMenuGroup {
  id: string;
  title: string;
  href?: string;
  submenu: MobileMenuItem[];
}

const MobileMenu = ({ menuData }: { menuData: MobileMenuGroup[] }) => {
  const { isOpen, closeMenu } = useMobileMenuContext();
  const cotacao = menuData.find((item) => item.id === 'cotacao');
  const navItems = menuData.filter((item) => item.id !== 'cotacao');
  return (
    <aside
      className={cn(
        'dark:bg-background-8 scroll-bar isolate fixed top-0 right-0 z-[9999] h-dvh w-full translate-x-full overflow-y-auto overflow-x-hidden overscroll-contain bg-white shadow-[-24px_0_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 sm:w-1/2 sm:rounded-l-3xl xl:hidden',
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
      )}>
      <BackgroundLines variant="grid" />
      <BackgroundMark className="text-secondary dark:text-accent w-[260px]" position="right-[2%] bottom-[3%]" />
      <div className="relative space-y-4 p-5 sm:p-8 lg:p-9">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="sr-only">Home</span>
            <figure className="w-[150px] sm:w-[170px]">
              <Image src={mainLogo} alt="NEXTCARD" className="block h-auto w-full dark:hidden" />
              <Image src={mainLogoDark} alt="NEXTCARD" className="hidden h-auto w-full dark:block" />
            </figure>
          </Link>
          {/* close btn  */}
          <MenuCloseButton />
        </div>

        {/* menu items list  */}
        <div className="mt-6 w-full pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          <p className="text-secondary dark:text-accent text-tagline-1 before:bg-stroke-4 dark:before:bg-stroke-6 relative mb-2 block font-normal before:absolute before:top-1/2 before:-right-16 before:h-px before:w-full before:-translate-y-1/2 before:content-['']">
            Menu
          </p>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <MobileMenuItem
                key={item.id}
                id={item.id}
                title={item.title}
                href={item.href}
                hasSubmenu={item.submenu.length > 0}>
                {/* submenu items list  */}
                <ul>
                  {item?.submenu?.map((subItem) => {
                    const Icon = subItem.icon;
                    return (
                      <li key={subItem.id}>
                        <Link
                          href={subItem.href}
                          className="text-tagline-1 text-secondary dark:text-accent ml-4 flex items-center gap-2.5 py-2.5 text-left font-normal transition-all duration-200">
                          {Icon && (
                            <span className="bg-primary-500/10 text-primary-500 flex size-8 shrink-0 items-center justify-center rounded-full">
                              <Icon className="size-4" />
                            </span>
                          )}
                          {subItem.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </MobileMenuItem>
            ))}
          </ul>

          {cotacao?.href && (
            <Cta
              href={cotacao.href}
              id="mobile_menu_solicitar_cotacao"
              location="mobile_menu"
              onClick={closeMenu}
              className="btn btn-primary hover:btn-secondary btn-lg mt-6 block w-full text-center">
              <span>{cotacao.title}</span>
            </Cta>
          )}

          <div className="border-secondary/10 dark:border-white/10 mt-6 space-y-3 border-t pt-6">
            <p className="text-tagline-3 text-secondary/50 dark:text-accent/50 font-normal uppercase">
              Fale com a gente
            </p>
            <Link
              href="https://wa.me/5541995507759"
              target="_blank"
              onClick={closeMenu}
              className="text-tagline-1 text-secondary dark:text-accent flex items-center gap-2.5 py-1 font-normal">
              <span className="bg-primary-500/10 text-primary-500 flex size-8 shrink-0 items-center justify-center rounded-full">
                <WhatsAppIcon className="size-4" />
              </span>
              (41) 99550-7759
            </Link>
            <Link
              href="tel:+554137320275"
              onClick={closeMenu}
              className="text-tagline-1 text-secondary dark:text-accent flex items-center gap-2.5 py-1 font-normal">
              <span className="bg-primary-500/10 text-primary-500 flex size-8 shrink-0 items-center justify-center rounded-full">
                <PhoneIcon className="size-4" />
              </span>
              (41) 3732-0275
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

MobileMenu.displayName = 'MobileMenu';
export default MobileMenu;
