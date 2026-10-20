import { PageHero } from '@/components/shared/PageHero';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { getServices } from '@/lib/data/portfolio';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';

import { constructMetadata, getBaseUrl } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    title: locale === 'en'
      ? 'Website, E-Commerce & Business System Development Services'
      : 'إنشاء وتصميم مواقع ومتاجر إلكترونية وأنظمة إدارة',
    description: locale === 'en'
      ? 'Website development, e-commerce stores, admin dashboards, custom business systems, and API integration — built fast, secure, and SEO-ready. Request a free quote.'
      : 'خدمات إنشاء المواقع الإلكترونية، تصميم المتاجر، برمجة لوحات التحكم وأنظمة الأعمال، وربط الأنظمة والـAPI — سرعة عالية وتحسين محركات البحث. اطلب عرض سعر مجاني.',
    keywords: locale === 'en'
      ? ['website development services', 'e-commerce store development', 'custom business system', 'admin dashboard development', 'API integration services', 'hire web developer']
      : ['خدمات إنشاء مواقع', 'تصميم متجر إلكتروني', 'برمجة نظام إدارة', 'برمجة لوحة تحكم', 'ربط API', 'مطلوب مبرمج مواقع', 'أسعار تصميم المواقع'],
    locale,
    path: '/services',
  });
}

const FAQS = [
  {
    q: { en: 'How much does it cost to build a website?', ar: 'كم تكلفة إنشاء موقع إلكتروني؟' },
    a: {
      en: 'It depends on scope: number of pages, languages, dashboard, online payments, and integrations. A simple business website costs far less than a custom system or a full e-commerce store. Send me your idea and you will get a clear, itemized estimate for free — no obligation.',
      ar: 'التكلفة تعتمد على حجم المشروع: عدد الصفحات، اللغات، لوحة التحكم، الدفع الإلكتروني، والتكاملات. الموقع التعريفي البسيط يكلّف أقل بكثير من نظام مخصص أو متجر كامل. أرسل فكرتك وستصلك تقديرات واضحة ومفصّلة مجانًا ودون أي التزام.',
    },
  },
  {
    q: { en: 'How long does development take?', ar: 'كم يستغرق إنشاء الموقع أو النظام؟' },
    a: {
      en: 'A business/portfolio website typically takes 1–2 weeks. An online store or a custom dashboard takes 3–6 weeks depending on features. You receive a clear timeline and milestones before work starts.',
      ar: 'الموقع التعريفي أو موقع الشركة يستغرق عادة من أسبوع إلى أسبوعين. المتجر الإلكتروني أو نظام الإدارة من 3 إلى 6 أسابيع حسب المزايا المطلوبة. تحصل على خطة زمنية ومراحل واضحة قبل بدء العمل.',
    },
  },
  {
    q: { en: 'Do you build e-commerce stores?', ar: 'هل تقوم بتصميم وبرمجة متجر إلكتروني؟' },
    a: {
      en: 'Yes. I build complete stores — product catalog, cart, checkout, payment gateway, and an order-management dashboard — or optimize your existing WooCommerce store for speed and higher conversion.',
      ar: 'نعم، أبني متاجر إلكترونية كاملة: عرض المنتجات، سلة التسوق، الدفع الإلكتروني، ولوحة إدارة الطلبات والمنتجات. أو أُحسّن متجرك الحالي (WooCommerce) للسرعة ورفع معدل التحويل والمبيعات.',
    },
  },
  {
    q: { en: 'Can you build a custom management system for my company?', ar: 'هل تبرمج نظام إدارة خاص لشركتي؟' },
    a: {
      en: 'Yes. I develop custom systems for HR, inventory, invoices, purchases, and reporting — with role-based permissions, a responsive dashboard, and integration with your existing tools.',
      ar: 'نعم، أبرمج أنظمة إدارة مخصصة: الموارد البشرية، المخزون، الفواتير، المشتريات، والتقارير — مع صلاحيات متعددة المستويات ولوحة تحكم متجاوبة وربطها بأدواتك الحالية.',
    },
  },
  {
    q: { en: 'Will the website appear on Google (SEO)?', ar: 'هل سيظهر الموقع في جوجل؟' },
    a: {
      en: 'Every project ships on solid technical SEO foundations: clean semantic structure, fast Core Web Vitals, structured data (Schema), sitemap, and optimized metadata — plus guidance to verify your site in Google Search Console. Ongoing SEO campaigns are available as a separate service.',
      ar: 'كل مشروع يُبنى على أسس SEO تقنية سليمة: بنية نظيفة، سرعة عالية (Core Web Vitals)، بيانات منظمة Schema، خريطة موقع، وميتا مُحسَّنة — مع إرشادك لربط موقعك بـ Google Search Console. تحسين SEO المستمر خدمة منفصلة.',
    },
  },
  {
    q: { en: 'Do you offer hosting and domain setup?', ar: 'هل توفّر الاستضافة والدومين؟' },
    a: {
      en: 'I help you choose the right hosting and domain for your budget, then handle the full setup, deployment, SSL certificate, and post-launch monitoring so you can focus on your business.',
      ar: 'أساعدك في اختيار الاستضافة والدومين المناسبين لميزانيتك، وأتولّى الإعداد الكامل والنشر وشهادة الأمان SSL والمتابعة بعد الإطلاق حتى تتفرغ لأعمالك.',
    },
  },
  {
    q: { en: 'Do you work with clients outside Yemen?', ar: 'هل تعمل مع عملاء خارج اليمن؟' },
    a: {
      en: 'Yes — I work remotely with clients across the Gulf and worldwide. Communication is in Arabic or English, and progress is shared in clear milestones with regular updates.',
      ar: 'نعم، أعمل عن بُعد مع عملاء من الخليج وجميع أنحاء العالم. التواصل بالعربية أو الإنجليزية، مع تسليم على مراحل وتحديثات منتظمة حتى الإطلاق.',
    },
  },
];

const BREADCRUMB = (locale: string, isEn: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: isEn ? 'Home' : 'الرئيسية',
      item: `${getBaseUrl()}/${locale}`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: isEn ? 'Services' : 'الخدمات',
      item: `${getBaseUrl()}/${locale}/services`,
    },
  ],
});

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const services = await getServices();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: isEn ? faq.q.en : faq.q.ar,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isEn ? faq.a.en : faq.a.ar,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB(locale, isEn)) }}
      />
      <PageHero
        eyebrow={isEn ? 'What I Offer' : 'ما أقدمه'}
        title={isEn ? 'Website & Web App Development Services' : 'خدمات إنشاء المواقع وتطوير الأنظمة'}
        subtitle={isEn
          ? 'End-to-end solutions: business websites, e-commerce stores, admin dashboards, custom systems, and API integrations — focused on security, scalability, speed, and measurable ROI.'
          : 'حلول متكاملة: مواقع الشركات، المتاجر الإلكترونية، لوحات التحكم، الأنظمة المخصّصة، وربط الـAPI — بتركيز على الأمان وقابلية التوسع والسرعة وتحسين محركات البحث.'}
      />

      <div className="container px-4 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} locale={locale} index={index + 1} />
          ))}
        </div>
      </div>

      {/* FAQ — answers the questions clients actually search for */}
      <section className="border-t border-white/[0.05] py-20 md:py-28 relative">
        <div className="container px-4 sm:px-6 max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary/60 mb-4">
              {isEn ? 'Before You Start' : 'قبل أن تبدأ'}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold gold-gradient pb-2 mb-5 tracking-tight">
              {isEn ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {isEn
                ? 'Answers to what clients usually ask before building a website, store, or management system.'
                : 'إجابات عن الأسئلة التي يطرحها العملاء عادة قبل إنشاء موقع أو متجر أو نظام إدارة.'}
            </p>
          </div>

          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {FAQS.map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex cursor-pointer list-none [&::-webkit-details-marker]:hidden items-center justify-between gap-4 py-5 text-start text-base font-bold text-white/90 hover:text-primary transition-colors">
                  <span>{isEn ? faq.q.en : faq.q.ar}</span>
                  <Plus className="w-4 h-4 text-primary shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed pb-6 pe-8">
                  {isEn ? faq.a.en : faq.a.ar}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(212,168,54,0.06),transparent)]" />
        <div className="container px-6 text-center relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary/60 mb-4">
            {isEn ? 'Get Started' : 'ابدأ الآن'}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold gold-gradient pb-2 mb-5 tracking-tight">
            {isEn ? 'Ready to grow your business?' : 'هل أنت مستعد لتنمية عملك؟'}
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            {isEn
              ? "Let's discuss which service best fits your current challenge and business goals."
              : 'دعنا نناقش الخدمة التي تناسب تحديك الحالي وأهداف عملك.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-10 py-4 rounded-full cta-glow transition-all duration-300 hover:scale-[1.03] group"
          >
            {isEn ? 'Discuss Your Needs' : 'ناقش احتياجاتك'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
