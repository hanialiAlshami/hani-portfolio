import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';
import { supabase } from '@/lib/supabase/client';
import { projects as seedProjects } from '@/data/seed';

export const revalidate = 3600; // Cache and revalidate hourly to prevent slow blocking fetches

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const locales = ['en', 'ar'];
  const staticRoutes = [
    '',
    '/projects',
    '/services',
    '/skills',
    '/about',
    '/resume',
    '/contact',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static routes
  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ar: `${baseUrl}/ar${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  // Add dynamic project routes safely without cookie dependency
  try {
    let slugs: string[] = [];
    if (supabase) {
      const { data } = await supabase
        .from('projects')
        .select('slug')
        .eq('is_published', true);
      if (data && data.length > 0) {
        slugs = data.map((p) => p.slug);
      }
    }
    
    if (slugs.length === 0) {
      slugs = seedProjects.map((p) => p.slug);
    }

    slugs.forEach((slug) => {
      locales.forEach((locale) => {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/projects/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    });
  } catch (error) {
    console.error('Failed to fetch projects for sitemap', error);
  }

  return sitemapEntries;
}
