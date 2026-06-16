import { PageHero } from '@/components/shared/PageHero';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { getServices } from '@/lib/data/portfolio';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { constructMetadata } from '@/lib/seo';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    title: locale === 'en' ? 'Services' : 'الخدمات',
    description: locale === 'en'
      ? 'Professional full-stack web development services tailored to your business needs.'
      : 'خدمات تطوير الويب الشاملة الاحترافية المصممة لتلبية احتياجات عملك.',
    locale,
    path: '/services',
  });
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === 'en';
  const services = await getServices();

  return (
    <div>
      <PageHero
        eyebrow={isEn ? 'What I Offer' : 'ما أقدمه'}
        title={isEn ? 'Professional Services' : 'الخدمات الاحترافية'}
        subtitle={isEn
          ? 'End-to-end development solutions focused on security, scalability, and measurable ROI — not just writing code.'
          : 'حلول تطوير شاملة تركز على الأمان وقابلية التوسع وعائد الاستثمار الملموس — وليس مجرد كتابة الكود.'}
      />

      <div className="container px-4 sm:px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} locale={locale} index={index + 1} />
          ))}
        </div>
      </div>

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
