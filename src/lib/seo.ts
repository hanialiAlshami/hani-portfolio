import { Metadata } from 'next';

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/+$/, '');
  }
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/+$/, '')}`;
  }
  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[seo] NEXT_PUBLIC_SITE_URL is not set — canonical URLs, sitemap, and Open Graph tags will point to localhost and Google will not index the site correctly. Set it to your live domain.'
    );
  }
  return 'http://localhost:3000';
}

const defaultSiteUrl = resolveSiteUrl();

export function getBaseUrl() {
  return defaultSiteUrl;
}

interface SeoProps {
  title?: string;
  description?: string;
  locale: string;
  path?: string;
  image?: string;
  keywords?: string[];
}

/** Search phrases clients actually type (AR-first, then EN). Used as a supporting signal. */
export const SITE_KEYWORDS = {
  ar: [
    'إنشاء موقع إلكتروني',
    'تصميم موقع إلكتروني',
    'مبرمج مواقع',
    'شركة برمجة مواقع',
    'برمجة تطبيقات ويب',
    'تصميم متجر إلكتروني',
    'برمجة متجر إلكتروني',
    'لوحة تحكم إلكترونية',
    'نظام إدارة',
    'برمجة أنظمة إدارة',
    'تصميم موقع شركة',
    'تطوير مواقع',
    'مبرمج ويب',
    'مطور ويب متكامل',
    'تحسين محركات البحث',
    'ربط API',
    'تصميم موقع تعريفي',
    'برمجة موقع بالعربي',
    'هاني الشامي',
    'مبرمج مواقع في اليمن',
  ],
  en: [
    'web developer',
    'website development',
    'custom web application development',
    'e-commerce development',
    'shopify alternative developer',
    'admin dashboard development',
    'API development and integration',
    'full stack developer',
    'Next.js developer',
    'Laravel developer',
    'React developer',
    'hire a web developer',
    'business web systems',
    'create a website for my business',
  ],
};

export function constructMetadata({
  title,
  description,
  locale,
  path = '',
  image = '/brand/social-preview.jpeg',
  keywords,
}: SeoProps): Metadata {
  const isEn = locale === 'en';
  const siteName = isEn ? 'Hani Alshami' : 'هاني الشامي';
  const defaultTitle = isEn 
    ? 'Websites, Online Stores & Business Systems — Built to Perform' 
    : 'إنشاء وتصميم مواقع إلكترونية ومتاجر وأنظمة أعمال';
  
  const defaultDescription = isEn
    ? 'I design and build fast, secure websites, e-commerce stores, admin dashboards, and custom business systems — SEO-ready from day one. Laravel, Next.js, Supabase.'
    : 'أقوم بإنشاء وتصميم مواقع إلكترونية سريعة وآمنة، متاجر إلكترونية، لوحات تحكم، وأنظمة أعمال مخصصة — مهيأة لمحركات البحث من اليوم الأول. Laravel · Next.js · Supabase.';

  // The layout's `%s | brand` title templates apply to nested routes only — every
  // page except the home page, which lives in the layout's own segment. So when no
  // explicit title is passed (home page) we append the brand here ourselves.
  const brandedTitle = title ? title : `${defaultTitle} | ${siteName}`;
  const finalDescription = description || defaultDescription;

  // Clean path for URL construction
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${getBaseUrl()}/${locale}${cleanPath === '/' ? '' : cleanPath}`;
  
  const enUrl = `${getBaseUrl()}/en${cleanPath === '/' ? '' : cleanPath}`;
  const arUrl = `${getBaseUrl()}/ar${cleanPath === '/' ? '' : cleanPath}`;

  const absoluteImageUrl = image.startsWith('http') ? image : `${getBaseUrl()}${image.startsWith('/') ? '' : '/'}${image}`;

  return {
    title: brandedTitle,
    description: finalDescription,
    keywords: keywords || SITE_KEYWORDS[isEn ? 'en' : 'ar'],
    authors: [{ name: siteName, url: getBaseUrl() }],
    creator: siteName,
    publisher: siteName,
    category: isEn ? 'Web Development' : 'تطوير الويب',
    alternates: {
      canonical: url,
      languages: {
        'en': enUrl,
        'ar': arUrl,
      },
    },
    openGraph: {
      title: brandedTitle,
      description: finalDescription,
      url: url,
      siteName: siteName,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: brandedTitle,
        },
      ],
      locale: locale === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description: finalDescription,
      images: [absoluteImageUrl],
    },
  };
}

export function getGlobalMetadata(locale: string): Metadata {
  const isEn = locale === 'en';
  const siteName = isEn ? 'Hani Alshami' : 'هاني الشامي';
  const title = isEn 
    ? 'Hani Alshami — Full Stack Web Developer for Business Websites & Custom Systems' 
    : 'هاني الشامي — مبرمج وبناء مواقع إلكترونية وأنظمة أعمال مخصصة';
  const description = isEn
    ? 'I build websites, online stores, admin dashboards, and custom business systems that load fast and rank well. Laravel, Next.js, and Supabase — from idea to launch.'
    : 'أقوم بإنشاء وتصميم المواقع الإلكترونية والمتاجر ولوحات التحكم وأنظمة الأعمال المخصصة: مواقع سريعة، آمنة، ومهيأة لمحركات البحث. Laravel · Next.js · Supabase — من الفكرة إلى الإطلاق.';

  const url = `${getBaseUrl()}/${locale}`;

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: SITE_KEYWORDS[isEn ? 'en' : 'ar'],
    authors: [{ name: siteName, url: getBaseUrl() }],
    creator: siteName,
    publisher: siteName,
    category: isEn ? 'Web Development' : 'تطوير الويب',
    metadataBase: new URL(getBaseUrl()),
    icons: {
      icon: [
        { url: '/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
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
