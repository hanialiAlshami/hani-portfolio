import { PageHero } from '@/components/shared/PageHero';
import { SkillCard } from '@/components/shared/SkillCard';
import { getSkills, getSkillCategories } from '@/lib/data/portfolio';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { constructMetadata } from '@/lib/seo';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    title: locale === 'en' ? 'Skills' : 'المهارات',
    description: locale === 'en'
      ? 'Technical skills focused on delivering business value and robust architecture.'
      : 'مهارات تقنية تركز على تقديم قيمة للأعمال وبنية قوية.',
    locale,
    path: '/skills',
  });
}

export default async function SkillsPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === 'en';
  const skills = await getSkills();
  const skillCategories = await getSkillCategories();

  return (
    <div>
      <PageHero
        eyebrow={isEn ? 'Technical Expertise' : 'الخبرة التقنية'}
        title={isEn ? 'Core Skills' : 'المهارات الأساسية'}
        subtitle={isEn
          ? 'Technologies I have mastered to build reliable, scalable, and secure production-grade systems.'
          : 'التقنيات التي أتقنتها لبناء أنظمة موثوقة وقابلة للتوسع وآمنة وجاهزة للإنتاج.'}
      />

      <div className="container px-6 py-24 max-w-6xl mx-auto space-y-20">
        {skillCategories.map(category => {
          const categorySkills = skills
            .filter(s => s.categoryId === category.id)
            .sort((a, b) => a.order - b.order);
          if (categorySkills.length === 0) return null;

          return (
            <section key={category.id}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center gap-3">
                  <span className="h-px w-5 bg-primary/50" />
                  <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
                    {isEn ? category.name.en : category.name.ar}
                  </span>
                </div>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categorySkills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} locale={locale} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="py-24 border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(212,168,54,0.06),transparent)]" />
        <div className="container px-6 text-center relative z-10 max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold gold-gradient pb-2 mb-5 tracking-tight">
            {isEn ? 'Need these skills on your project?' : 'هل تحتاج هذه المهارات في مشروعك؟'}
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            {isEn
              ? "I'm available for freelance work and technical consulting. Let's talk."
              : 'أنا متاح للعمل الحر والاستشارات التقنية. دعنا نتحدث.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-10 py-4 rounded-full cta-glow transition-all duration-300 hover:scale-[1.03] group"
          >
            {isEn ? 'Hire Me' : 'وظفني'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
