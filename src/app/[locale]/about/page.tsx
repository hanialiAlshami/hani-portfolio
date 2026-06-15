import { PageHero } from '@/components/shared/PageHero';
import { aboutData } from '@/data/seed';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { getSiteSettings } from '@/lib/data/site-settings';
import { IconRenderer } from '@/components/shared/IconRenderer';

import { constructMetadata } from '@/lib/seo';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    title: locale === 'en' ? 'About Me' : 'نبذة عني',
    description: locale === 'en'
      ? 'Learn more about my professional journey and development values.'
      : 'تعرف أكثر على رحلتي المهنية وقيمي في التطوير.',
    locale,
    path: '/about',
  });
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === 'en';
  const settings = await getSiteSettings();

  const eyebrow = isEn ? (settings.aboutEyebrow?.en || 'The Developer') : (settings.aboutEyebrow?.ar || 'المطور');
  const title = isEn ? (settings.aboutTitle?.en || 'About Me') : (settings.aboutTitle?.ar || 'نبذة عني');
  const subtitle = isEn 
    ? (settings.aboutSubtitle?.en || "I don't just write code — I solve business problems with precision-engineered digital solutions.") 
    : (settings.aboutSubtitle?.ar || 'أنا لا أكتب كوداً فحسب — بل أحل مشاكل الأعمال بحلول رقمية مُصممة بدقة.');
    
  const story = isEn ? (settings.aboutStory?.en || aboutData.story.en) : (settings.aboutStory?.ar || aboutData.story.ar);

  const customValuesEn = [
    settings.aboutValue1Title?.en,
    settings.aboutValue2Title?.en,
    settings.aboutValue3Title?.en,
    settings.aboutValue4Title?.en,
  ].filter(Boolean) as string[];

  const customValuesAr = [
    settings.aboutValue1Title?.ar,
    settings.aboutValue2Title?.ar,
    settings.aboutValue3Title?.ar,
    settings.aboutValue4Title?.ar,
  ].filter(Boolean) as string[];

  let finalValues = isEn ? customValuesEn : customValuesAr;
  if (finalValues.length === 0) {
    finalValues = isEn ? aboutData.values.en : aboutData.values.ar;
  }

  const credibility = [
    { 
      icon: settings.aboutAchievement1Icon || 'Shield',  
      en: settings.aboutAchievement1Text?.en || 'Practical Full-Stack Web Development Experience', 
      ar: settings.aboutAchievement1Text?.ar || 'خبرة عملية في تطوير الويب المتكامل' 
    },
    { 
      icon: settings.aboutAchievement2Icon || 'Code2',   
      en: settings.aboutAchievement2Text?.en || 'Delivered projects across different markets and industries', 
      ar: settings.aboutAchievement2Text?.ar || 'تنفيذ مشاريع لأسواق وقطاعات مختلفة' 
    },
    { 
      icon: settings.aboutAchievement3Icon || 'Zap',     
      en: settings.aboutAchievement3Text?.en || 'Specialized in performance-critical business systems', 
      ar: settings.aboutAchievement3Text?.ar || 'متخصص في أنظمة الأعمال الحساسة من حيث الأداء' 
    },
    { 
      icon: settings.aboutAchievement4Icon || 'Users',   
      en: settings.aboutAchievement4Text?.en || 'Long-term client-focused collaboration', 
      ar: settings.aboutAchievement4Text?.ar || 'تعاون طويل المدى يركز على نجاح العميل' 
    },
  ];

  return (
    <div>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
      />

      <div className="container px-6 py-24 max-w-4xl mx-auto space-y-20">

        {/* Story */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-5 bg-primary/50" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
              {isEn ? 'Professional Story' : 'القصة المهنية'}
            </span>
          </div>
          <div className="glass p-10 rounded-2xl border border-white/[0.06]">
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
              {story}
            </p>
          </div>
        </section>

        {/* Credibility Signals */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-5 bg-primary/50" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
              {isEn ? 'Track Record' : 'سجل الإنجازات'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {credibility.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-xl border border-white/[0.06] hover:border-primary/20 transition-colors flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <IconRenderer iconName={item.icon} className="w-4 h-4" />
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{isEn ? item.en : item.ar}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-5 bg-primary/50" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
              {isEn ? 'Core Values & Approach' : 'القيم الأساسية ومنهجية العمل'}
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {finalValues.map((value, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 glass p-5 rounded-xl border border-white/[0.06] hover:border-primary/20 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-primary/60 shrink-0" />
                <span className="text-sm font-medium text-foreground/85">{value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="pt-8 border-t border-white/[0.05] text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary/60 mb-4">
            {isEn ? 'Work With Me' : 'تعاون معي'}
          </p>
          <h2 className="text-3xl font-extrabold gold-gradient pb-2 mb-5 tracking-tight">
            {isEn ? 'Looking for a reliable technical partner?' : 'هل تبحث عن شريك تقني موثوق؟'}
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed max-w-md mx-auto">
            {isEn
              ? 'I take full ownership of your project — from architecture to deployment.'
              : 'أتحمل المسؤولية الكاملة لمشروعك — من البنية حتى النشر.'}
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
