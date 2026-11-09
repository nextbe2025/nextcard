import { DEFAULT_URL } from '@/utils/generateMetaData';
import type { MetadataRoute } from 'next';

const siteUrl = DEFAULT_URL.replace(/\/$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
