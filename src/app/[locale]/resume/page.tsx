import { PageHero } from '@/components/shared/PageHero';
import { getResumeSections } from '@/lib/data/portfolio';
import { Metadata } from 'next';
import { Download, Briefcase, ArrowRight } from 'lucide-react';
import { getSiteSettings } from '@/lib/data/site-settings';
import Link from 'next/link';

import { constructMetadata } from '@/lib/seo';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    title: locale === 'en' ? 'Resume' : 'السيرة الذاتية',
    description: locale === 'en'
      ? 'View my professional experience and qualifications.'
      : 'عرض خبراتي ومؤهلاتي المهنية.',
    locale,
    path: '/resume',
  });
}

export default async function ResumePage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === 'en';
  const settings = await getSiteSettings();
  const allResumeSections = await getResumeSections();
  const experience = allResumeSections.filter(r => r.type === 'experience').sort((a, b) => a.order - b.order);

  return (
    <div>
      <PageHero
        eyebrow={isEn ? 'Career History' : 'المسيرة المهنية'}
        title={isEn ? 'Resume & Experience' : 'السيرة الذاتية والخبرات'}
        subtitle={isEn
          ? 'A record of professional impact — each role chosen to deepen expertise and deliver higher-value outcomes.'
          : 'سجل الأثر المهني — كل دور اخترته لتعميق الخبرة وتحقيق نتائج أعلى قيمة.'}
      >
        {settings.cvUrl && (
          <a href={settings.cvUrl} target="_blank" rel="noopener noreferrer">
            <button className="inline-flex items-center gap-2 border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200">
              <Download className="w-4 h-4" />
              {isEn ? 'Download CV' : 'تحميل السيرة الذاتية'}
            </button>
          </a>
        )}
      </PageHero>

      <div className="container px-6 py-24 max-w-3xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-14">
          <Briefcase className="w-4 h-4 text-primary/60" />
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
            {isEn ? 'Professional Experience' : 'الخبرة المهنية'}
          </span>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-5 rtl:left-auto rtl:right-5 w-px bg-gradient-to-b from-primary/30 via-white/[0.08] to-transparent" />

          <div className="space-y-10">
            {experience.map((item, idx) => (
              <div key={item.id} className="relative pl-14 rtl:pl-0 rtl:pr-14">
                {/* Timeline dot */}
                <div className="absolute left-[17px] rtl:left-auto rtl:right-[17px] top-5 w-4 h-4 rounded-full bg-background border-2 border-primary/60 shadow-[0_0_12px_rgba(212,168,54,0.3)]" />

                <div className="glass p-7 rounded-2xl border border-white/[0.06] hover:border-primary/20 transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{isEn ? item.title.en : item.title.ar}</h3>
                      <p className="text-sm text-primary font-semibold">{isEn ? item.organization.en : item.organization.ar}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground bg-white/[0.04] border border-white/[0.07] px-3 py-1.5 rounded-full whitespace-nowrap w-fit">
                      {item.startDate} — {item.isCurrent ? (isEn ? 'Present' : 'الآن') : item.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isEn ? item.description.en : item.description.ar}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 pt-16 border-t border-white/[0.05] text-center">
          <h2 className="text-2xl font-extrabold gold-gradient pb-2 mb-4 tracking-tight">
            {isEn ? 'Want to work together?' : 'هل تريد العمل معاً؟'}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {isEn ? "Let's discuss how my experience maps to your project needs." : 'دعنا نناقش كيف تنطبق خبرتي على احتياجات مشروعك.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-10 py-4 rounded-full cta-glow transition-all duration-300 hover:scale-[1.03] group"
          >
            {isEn ? 'Get in Touch' : 'تواصل معي'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
