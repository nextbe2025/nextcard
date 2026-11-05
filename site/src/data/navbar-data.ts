import { MobileMenuGroup } from '@/components/shared/mobile-menu/MobileMenu';
import { KioskIcon, TicketIcon, TurnstileIcon } from '@/components/shared/BrandIcons';

export const mobileMenuData: MobileMenuGroup[] = [
  { id: 'home', title: 'Início', href: '/', submenu: [] },
  {
    id: 'solucoes',
    title: 'Soluções',
    submenu: [
      { id: 'totem-autoatendimento', label: 'Totem de Autoatendimento e Autopagamento', href: '/totem-autoatendimento', icon: KioskIcon },
      { id: 'catracas', label: 'Catraca Expedidora e Receptora', href: '/catracas', icon: TurnstileIcon },
      { id: 'comandas', label: 'Comandas Eletrônicas', href: '/comandas-eletronicas', icon: TicketIcon },
    ],
  },
  { id: 'projetos', title: 'Projetos', href: '/projetos', submenu: [] },
  { id: 'parceiros', title: 'Parceiros', href: '/parceiros-revenda', submenu: [] },
  { id: 'sobre', title: 'A NEXTCARD', href: '/quem-somos', submenu: [] },
  { id: 'contato', title: 'Contato', href: '/contato', submenu: [] },
  { id: 'cotacao', title: 'Solicitar Cotação', href: '/contato', submenu: [] },
];
