import type { Metadata } from 'next';

export const DEFAULT_URL = 'https://nextcard.com.br/';
export const DEFAULT_TITLE = 'NEXTCARD | Automação Comercial para Food Service';
export const DEFAULT_DESCRIPTION =
  'Automação comercial para food service: totens de autoatendimento, controle de acesso com catracas e comandas eletrônicas para uma jornada mais ágil e uma operação mais eficiente.';
export const DEFAULT_IMAGE_URL = '';

const defaultMetadata: Metadata = {
  metadataBase: new URL(DEFAULT_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'NEXTCARD',
    url: DEFAULT_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: DEFAULT_IMAGE_URL ? [{ url: DEFAULT_IMAGE_URL, width: 1200, height: 630 }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: DEFAULT_IMAGE_URL ? [DEFAULT_IMAGE_URL] : undefined,
  },
};

const generateMetadata = (title?: string, description?: string, canonicaUrl?: string, imageUrl?: string): Metadata => {
  return {
    ...defaultMetadata,
    title: title ?? defaultMetadata.title,
    description: description ?? defaultMetadata.description,
    alternates: {
      canonical: canonicaUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title ?? defaultMetadata.openGraph?.title,
      description: description ?? defaultMetadata.openGraph?.description,
      url: canonicaUrl ?? defaultMetadata.openGraph?.url,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title ?? defaultMetadata.twitter?.title,
      description: description ?? defaultMetadata.twitter?.description,
      images: imageUrl ? [imageUrl] : defaultMetadata.twitter?.images,
    },
  };
};

export { defaultMetadata, generateMetadata };
