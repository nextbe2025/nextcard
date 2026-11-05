'use client';
import { cn } from '@/utils/cn';
import type { ComponentType } from 'react';
import ResourcesMenuLink from './ResourcesMenuLink';

const TotemIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    className={cn('stroke-secondary dark:stroke-accent size-5', className)}>
    <rect x="6" y="2.5" width="8" height="11" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 6.25h.008M7.5 15.5h5M8.5 17.5h3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 13.5v2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GateOutIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    className={cn('stroke-secondary dark:stroke-accent size-5', className)}>
    <path d="M4 3v14M16 3v14" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 10h6M11 7l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CardIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    className={cn('stroke-secondary dark:stroke-accent size-5', className)}>
    <rect x="2.5" y="5" width="15" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 8.5h15" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 11.5h3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type SolutionLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const solutionLinks: SolutionLink[] = [
  { label: 'Totem de Autoatendimento e Autopagamento', href: '/totem-autoatendimento', icon: TotemIcon },
  { label: 'Catraca Expedidora e Receptora', href: '/catracas', icon: GateOutIcon },
  { label: 'Comandas Eletrônicas', href: '/comandas-eletronicas', icon: CardIcon },
];

const SolutionsMenu = ({
  menuDropdownId,
  setMenuDropdownId,
}: {
  menuDropdownId: string | null;
  setMenuDropdownId: (id: string | null) => void;
}) => {
  const handleClose = () => setMenuDropdownId(null);

  return (
    <div>
      <div
        className={cn(
          '0.3 ease ease absolute top-full left-1/2 z-40 h-3 w-[280px] -translate-x-1/2 bg-transparent transition-opacity duration-300',
          menuDropdownId === 'solutions-dropdown-menu'
            ? '!pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id="solutions-dropdown-menu"
        className={cn(
          'dark:bg-background-6 border-stroke-1 ease absolute top-full left-1/2 z-50 mt-2 hidden w-[280px] -translate-x-1/2 rounded-[20px] border bg-white p-3 transition-all duration-300 xl:block dark:border-white/10',
          menuDropdownId === 'solutions-dropdown-menu'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2.5 opacity-0',
        )}>
        <ul className="space-y-2">
          {solutionLinks.map((link) => (
            <ResourcesMenuLink key={link.label} {...link} onClose={handleClose} />
          ))}
        </ul>
      </div>
    </div>
  );
};

SolutionsMenu.displayName = 'SolutionsMenu';
export default SolutionsMenu;
