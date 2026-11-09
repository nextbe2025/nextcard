import { blogPosts } from '@/data/blog-posts';
import { DEFAULT_URL } from '@/utils/generateMetaData';
import type { MetadataRoute } from 'next';

const siteUrl = DEFAULT_URL.replace(/\/$/, '');

const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/totem-autoatendimento', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/catracas', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/comandas-eletronicas', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/projetos', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/quem-somos', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/parceiros-revenda', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contato', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/politica-de-privacidade', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Only articles migrated to this site have their own page; the others still live at their old address.
  const articles = blogPosts
    .filter((post) => post.body)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    }));

  return [
    ...pages.map(({ path, priority, changeFrequency }) => ({ url: `${siteUrl}${path}`, changeFrequency, priority })),
    ...articles,
  ];
}
