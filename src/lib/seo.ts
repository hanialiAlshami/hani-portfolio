import { Metadata } from 'next';

const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function getBaseUrl() {
  return defaultSiteUrl;
}

interface SeoProps {
  title?: string;
  description?: string;
  locale: string;
  path?: string;
  image?: string;
}

export function constructMetadata({
  title,
  description,
  locale,
  path = '',
  image = '/brand/social-preview.jpeg'
}: SeoProps): Metadata {
  const isEn = locale === 'en';
  const siteName = isEn ? 'Hani Alshami' : 'هاني الشامي';
  const defaultTitle = isEn 
    ? 'Hani Alshami — Full Stack Web Developer' 
    : 'هاني الشامي — مطور ويب متكامل';
  
  const defaultDescription = isEn
    ? 'Secure, scalable web solutions, dashboards, and business systems built with modern technologies.'
    : 'حلول ويب آمنة وقابلة للتوسع، لوحات تحكم، وأنظمة أعمال مبنية بتقنيات حديثة.';

  const pageTitle = title ? title : defaultTitle;
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalDescription = description || defaultDescription;

  // Clean path for URL construction
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${getBaseUrl()}/${locale}${cleanPath === '/' ? '' : cleanPath}`;
  
  const enUrl = `${getBaseUrl()}/en${cleanPath === '/' ? '' : cleanPath}`;
  const arUrl = `${getBaseUrl()}/ar${cleanPath === '/' ? '' : cleanPath}`;

  const absoluteImageUrl = image.startsWith('http') ? image : `${getBaseUrl()}${image.startsWith('/') ? '' : '/'}${image}`;

  return {
    title: pageTitle, // Next.js layout template will append `| Hani Alshami` if we use a template in layout
    description: finalDescription,
    alternates: {
      canonical: url,
      languages: {
        'en': enUrl,
        'ar': arUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description: finalDescription,
      url: url,
      siteName: siteName,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: locale === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: finalDescription,
      images: [absoluteImageUrl],
    },
  };
}

export function getGlobalMetadata(locale: string): Metadata {
  const isEn = locale === 'en';
  const siteName = isEn ? 'Hani Alshami' : 'هاني الشامي';
  const title = isEn 
    ? 'Hani Alshami — Full Stack Web Developer' 
    : 'هاني الشامي — مطور ويب متكامل';
  const description = isEn
    ? 'Secure, scalable web solutions, dashboards, and business systems built with modern technologies.'
    : 'حلول ويب آمنة وقابلة للتوسع، لوحات تحكم، وأنظمة أعمال مبنية بتقنيات حديثة.';

  const url = `${getBaseUrl()}/${locale}`;

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    metadataBase: new URL(getBaseUrl()),
    icons: {
      icon: '/brand/logo-icon.jpeg',
      apple: '/brand/logo-icon.jpeg'
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${getBaseUrl()}/en`,
        'ar': `${getBaseUrl()}/ar`,
      },
    },
    openGraph: {
      title: {
        default: title,
        template: `%s | ${siteName}`,
      },
      description,
      url,
      siteName,
      images: [
        {
          url: `${getBaseUrl()}/brand/social-preview.jpeg`,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: locale === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: title,
        template: `%s | ${siteName}`,
      },
      description,
      images: [`${getBaseUrl()}/brand/social-preview.jpeg`]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
