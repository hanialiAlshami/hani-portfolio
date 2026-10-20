import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';

export const dynamic = 'force-static';
export const revalidate = 86400;

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
