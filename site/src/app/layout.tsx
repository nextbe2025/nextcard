import SmoothScroll from '@/components/animation/SmoothScroll';
import BackToTop from '@/components/shared/BackToTop';
import Footer from '@/components/shared/footer/Footer';
import Navbar from '@/components/shared/navbar/Navbar';
import RouteProgress from '@/components/shared/RouteProgress';
import { caveat, interTight } from '@/utils/font';
import { generateMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';
import './globals.css';

const GTM_ID = 'GTM-WHCMLGD';

export const metadata: Metadata = {
  ...generateMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body id="top" className={`${interTight.variable} ${caveat.variable} antialiased`}>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <RouteProgress />
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
