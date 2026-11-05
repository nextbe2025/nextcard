import AboutBanner from '@/components/about/AboutBanner';
import CTA from '@/components/about/CTA';
import FinanceIntro from '@/components/about/FinanceIntro';
import OurMission from '@/components/about/OurMission';
import OurSuccess from '@/components/about/OurSuccess';
import TrustedByUsers from '@/components/about/TrustedByUsers';
import VisionStatement from '@/components/about/VisionStatement';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Quem Somos | NEXTCARD Automação Comercial',
  description:
    'Conheça a NEXTCARD: missão, visão, valores e a história de uma empresa nacional especializada em automação comercial, presente em todas as regiões do Brasil.',
};

const page = () => {
  return (
    <main className="dark:bg-background-8 bg-white">
      <AboutBanner />
      <VisionStatement />
      <OurMission />
      <TrustedByUsers />
      <FinanceIntro />
      <OurSuccess />
      <CTA />
    </main>
  );
};

export default page;
