import { IBM_Plex_Sans_Arabic, Sora } from "next/font/google";
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from '@/lib/data/site-settings';
import { getServices } from '@/lib/data/portfolio';

import { HideOnAdmin } from "@/components/layout/HideOnAdmin";

import { Metadata } from 'next';
import { getGlobalMetadata, getBaseUrl } from '@/lib/seo';
const sora = Sora({ subsets: ["latin"], variable: "--font-latin", display: "swap", preload: false });
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ weight: ["400", "700"], subsets: ["arabic"], variable: "--font-arabic", display: "optional" });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return getGlobalMetadata(locale);
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Enable static rendering for this locale-aware segment (next-intl v3).
  setRequestLocale(locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? ibmPlexSansArabic.className : sora.className;
  const variableClass = locale === 'ar' ? ibmPlexSansArabic.variable : sora.variable;
  const messages = await getMessages();
  const settings = await getSiteSettings();
  const services = await getServices();

  const baseUrl = getBaseUrl();
  const isAr = locale === 'ar';
  const personName = isAr ? 'هاني الشامي' : 'Hani Alshami';
  const businessName = settings.ownerName?.[isAr ? 'ar' : 'en'] || personName;
  const locality = settings.location?.[isAr ? 'ar' : 'en'];
  const socialLinks = [
    settings.social?.github,
    settings.social?.linkedin,
    settings.social?.x,
    settings.social?.instagram,
    settings.social?.facebook,
    'https://github.com/hanialiAlshami',
    'https://www.linkedin.com/in/hani-alshami-9ba227403',
  ].filter((v, i, arr): v is string => Boolean(v) && arr.indexOf(v) === i);

  const serviceOffers = services.map((service, index) => ({
    '@type': 'Offer',
    position: index + 1,
    itemOffered: {
      '@type': 'Service',
      name: service.title?.[isAr ? 'ar' : 'en'],
      description: service.description?.[isAr ? 'ar' : 'en'],
      serviceType: service.title?.[isAr ? 'ar' : 'en'],
      provider: { '@id': `${baseUrl}/#business` },
      areaServed: { '@type': 'Place', name: isAr ? 'اليمن والخليج والعالم' : 'Yemen, the Gulf, and worldwide' },
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${baseUrl}/${locale}/contact`,
        availableLanguage: ['ar', 'en'],
      },
    },
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: personName,
        alternateName: isAr ? 'Hani Alshami' : 'هاني الشامي',
        jobTitle: isAr ? 'مبرمج ومطور ويب متكامل (Full Stack Web Developer)' : 'Full Stack Web Developer',
        url: baseUrl,
        image: `${baseUrl}/brand/logo-icon.jpeg`,
        email: settings.email ? `mailto:${settings.email}` : undefined,
        sameAs: socialLinks,
        worksFor: { '@id': `${baseUrl}/#business` },
        description: isAr
          ? 'مهندس ومطور ويب متكامل متخصص في إنشاء المواقع الإلكترونية والمتاجر ولوحات التحكم وأنظمة الأعمال وتطوير الواجهات البرمجية.'
          : 'Full Stack Web Developer specialized in building websites, online stores, admin dashboards, business systems, and secure APIs.',
        knowsAbout: [
          isAr ? 'إنشاء وتصميم المواقع الإلكترونية' : 'Website development',
          isAr ? 'برمجة المتاجر الإلكترونية' : 'E-commerce development',
          isAr ? 'أنظمة إدارة ولوحات تحكم' : 'Admin dashboards & business systems',
          isAr ? 'تطوير وربط الواجهات البرمجية API' : 'API development & integration',
          isAr ? 'تحسين محركات البحث SEO' : 'Search engine optimization',
          'Full Stack Web Development',
          'Next.js',
          'React',
          'Laravel',
          'TypeScript',
          'Node.js',
          'Supabase',
          'PostgreSQL',
          'WooCommerce',
          'Tailwind CSS'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: isAr ? 'هاني الشامي | معرض الأعمال' : 'Hani Alshami | Portfolio',
        publisher: {
          '@id': `${baseUrl}/#person`
        },
        inLanguage: [locale === 'ar' ? 'ar' : 'en']
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${baseUrl}/#business`,
        name: businessName,
        alternateName: isAr ? 'Hani Alshami — Web Development' : 'هاني الشامي — تطوير المواقع',
        description: isAr
          ? 'خدمات إنشاء وتصميم المواقع الإلكترونية والمتاجر الإلكترونية ولوحات التحكم وأنظمة الأعمال المخصصة، وربط الأنظمة والواجهات البرمجية، مع تحسين السرعة ومحركات البحث.'
          : 'Website design and development, e-commerce stores, admin dashboards, custom business systems, and API integrations — built fast, secure, and SEO-ready.',
        url: baseUrl,
        image: `${baseUrl}/brand/social-preview.jpeg`,
        logo: `${baseUrl}/brand/logo-icon.jpeg`,
        email: settings.email || undefined,
        telephone: settings.whatsapp || settings.phone || undefined,
        address: {
          '@type': 'PostalAddress',
          ...(locality ? { addressLocality: locality } : {}),
          addressCountry: 'YE'
        },
        areaServed: [
          { '@type': 'Country', name: isAr ? 'اليمن' : 'Yemen' },
          { '@type': 'Place', name: isAr ? 'الخليج العربي' : 'The Gulf region' },
          { '@type': 'Place', name: isAr ? 'جميع أنحاء العالم (عن بُعد)' : 'Worldwide (remote)' }
        ],
        availableLanguage: ['ar', 'en'],
        founder: { '@id': `${baseUrl}/#person` },
        sameAs: socialLinks,
        priceRange: '$$',
        knowsAbout: isAr
          ? ['تصميم المواقع', 'المتاجر الإلكترونية', 'لوحات التحكم', 'الأتمتة', 'تحسين محركات البحث']
          : ['Web design', 'E-commerce', 'Dashboards', 'Automation', 'SEO'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: isAr ? 'خدمات تطوير الويب' : 'Web Development Services',
          itemListElement: serviceOffers
        }
      }
    ]
  };

  return (
    <html lang={locale} dir={dir}>
      <body className={`${fontClass} ${variableClass} min-h-screen flex flex-col bg-background text-foreground`}>
        {locale === 'ar' && (
          <>
            <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/_next/static/media/9da48a48bf6500f8-s.p.woff2" />
            <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/_next/static/media/fb66eb17bf011c3b-s.p.woff2" />
            <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/_next/static/media/17efc7caebbb6a73-s.woff2" />
            <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/_next/static/media/99dc19e540dbb87b-s.woff2" />
          </>
        )}
        {locale === 'en' && (
          <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="/_next/static/media/f3f7e95f2dbc4fe4-s.woff2" />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <HideOnAdmin>
            <Header 
              locale={locale} 
              ownerName={{
                en: settings.ownerName?.en || 'Hani Alshami',
                ar: settings.ownerName?.ar || 'هاني الشامي'
              }}
              primaryCta={settings.primaryCta}
            />
          </HideOnAdmin>
          
          <main className="flex-1">
            {children}
          </main>

          <HideOnAdmin>
            <Footer locale={locale} />
          </HideOnAdmin>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
