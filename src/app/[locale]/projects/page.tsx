
import { ProjectCard } from '@/components/shared/ProjectCard';
import { getProjects } from '@/lib/data/portfolio';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, FolderOpen } from 'lucide-react';

import { constructMetadata } from '@/lib/seo';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    title: locale === 'en' ? 'Projects' : 'المشاريع',
    description: locale === 'en'
      ? 'Explore case studies of full-stack web applications built by Hani Alshami.'
      : 'استكشف دراسات الحالة لتطبيقات الويب الشاملة التي بناها هاني الشامي.',
    locale,
    path: '/projects',
  });
}

export default async function ProjectsPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === 'en';
  const projects = await getProjects();

  return (
    <div>
      {/* ── Page Hero ─────────────────────────────── */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/[0.05] overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(212,168,54,0.08),transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl text-center">
          <h1 className="text-[18vw] md:text-[10vw] font-black leading-none text-white opacity-90 tracking-tighter mix-blend-screen uppercase drop-shadow-2xl mb-6">
            {isEn ? 'PROJECTS' : 'المشاريع'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-medium">
            {isEn
              ? 'A curated showcase of business-grade applications — each designed to solve a real problem, deliver measurable outcomes, and scale.'
              : 'مجموعة مختارة من التطبيقات على مستوى الأعمال — كل منها مصمم لحل مشكلة حقيقية وتحقيق نتائج قابلة للقياس والتوسع.'}
          </p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 py-16 md:py-24 max-w-7xl mx-auto">
        {projects.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">{isEn ? 'Projects coming soon.' : 'المشاريع قادمة قريباً.'}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} locale={locale} index={index + 1} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(212,168,54,0.06),transparent)]" />
        <div className="container px-6 text-center relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary/60 mb-4">
            {isEn ? 'Work With Me' : 'تعاون معي'}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold gold-gradient pb-2 mb-5 tracking-tight">
            {isEn ? 'Have a project in mind?' : 'هل لديك مشروع في ذهنك؟'}
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            {isEn
              ? "Let's discuss how I can help turn your vision into a reliable, scalable product."
              : 'دعنا نناقش كيف يمكنني مساعدتك في تحويل رؤيتك إلى منتج موثوق وقابل للتوسع.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-10 py-4 rounded-full cta-glow transition-all duration-300 hover:scale-[1.03] group"
          >
            {isEn ? 'Start a Conversation' : 'ابدأ محادثة'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
