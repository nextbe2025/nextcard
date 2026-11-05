import { FooterData } from '@/interface';
import { MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/shared/BrandIcons';

export const footerLinks: FooterData[] = [
  {
    title: 'Soluções',
    links: [
      { label: 'Totem de Autoatendimento e Autopagamento', href: '/totem-autoatendimento' },
      { label: 'Catraca Expedidora e Receptora', href: '/catracas' },
      { label: 'Comandas Eletrônicas', href: '/comandas-eletronicas' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'A NEXTCARD', href: '/quem-somos' },
      { label: 'Projetos', href: '/projetos' },
      { label: 'Seja um Parceiro', href: '/parceiros-revenda' },
      { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
    ],
  },
  {
    title: 'Contato',
    links: [
      { label: '(41) 3732-0275', href: 'tel:+554137320275', icon: PhoneIcon },
      { label: '(41) 99550-7759', href: 'https://wa.me/5541995507759', icon: WhatsAppIcon },
      { label: 'comercial@nextcard.com.br', href: 'mailto:comercial@nextcard.com.br', icon: MailIcon },
    ],
  },
];
