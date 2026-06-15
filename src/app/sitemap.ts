import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';
import { getProjects } from '@/lib/data/portfolio';

export const dynamic = 'force-dynamic';

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
      });
    });
  });

  // Add dynamic project routes safely
  try {
    const projects = await getProjects();
    projects.forEach((project) => {
      locales.forEach((locale) => {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/projects/${project.slug}`,
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
