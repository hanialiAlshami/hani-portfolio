import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/en/admin', '/ar/admin'],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
