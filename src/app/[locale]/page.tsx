import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { SkillCard } from '@/components/shared/SkillCard';
import { getProjects, getServices, getSkills } from '@/lib/data/portfolio';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/data/site-settings';
import { ArrowRight, CheckCircle2, Shield, Zap, Code2 } from 'lucide-react';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    locale,
    path: '/',
  });
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === 'en';
  const allProjects = await getProjects();
  const allServices = await getServices();
  const allSkills = await getSkills();
  const featuredProjects = allProjects.filter(p => p.isFeatured).slice(0, 4);
  const featuredServices = allServices.slice(0, 3);
  const featuredSkills = allSkills.slice(0, 6);
  const settings = await getSiteSettings();

  const trustPoints = isEn
    ? ['Clean, maintainable code architecture', 'Security-first development approach', 'On-time delivery track record', 'Business-focused, not just technical']
    : ['بنية كود نظيفة وسهلة الصيانة', 'نهج تطوير يُقدّم الأمان أولاً', 'سجل حافل بالتسليم في الوقت المحدد', 'تركيز تجاري وليس تقني فحسب'];

  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Mesh background */}
        <div className="absolute inset-0 hero-mesh" />
        {/* Animated orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="container relative z-10 px-6 flex flex-col items-center text-center pt-20 pb-24">
          {/* Availability Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-primary/90">
              {isEn ? 'Available for new projects' : 'متاح لمشاريع جديدة'}
            </span>
          </div>

          {/* Name / Headline */}
          <h1 className="animate-fade-in-up delay-100 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold gold-gradient gold-glow-text pb-4 tracking-tight leading-[0.95] mb-6">
            {isEn ? (settings.heroHeadline?.en || 'Hani Alshami') : (settings.heroHeadline?.ar || 'هاني الشامي')}
          </h1>

          {/* Job Title */}
          <h2 className="animate-fade-in-up delay-200 text-xl md:text-2xl font-medium text-foreground/70 mb-6 tracking-wide">
            {isEn ? (settings.jobTitle?.en || 'Full Stack Web Developer') : (settings.jobTitle?.ar || 'مطور ويب Full Stack')}
          </h2>

          {/* Bio */}
          <p className="animate-fade-in-up delay-300 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12">
            {isEn
              ? (settings.shortBio?.en || 'I build secure, scalable business systems — dashboards, APIs, and web apps — that are designed to grow with your company.')
              : (settings.shortBio?.ar || 'أبني أنظمة أعمال آمنة وقابلة للتطوير — لوحات تحكم وواجهات برمجية ومواقع ويب — مصممة للنمو مع شركتك.')}
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/contact`}>
              <button className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-8 py-4 rounded-full cta-glow transition-all duration-300 hover:scale-[1.03]">
                {isEn ? (settings.primaryCta?.en || 'Start a Project') : (settings.primaryCta?.ar || 'ابدأ مشروعاً')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <button className="inline-flex items-center gap-2 border border-white/15 hover:border-primary/40 bg-white/[0.03] hover:bg-primary/5 text-foreground/80 hover:text-foreground font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-sm">
                {isEn ? (settings.secondaryCta?.en || 'View My Work') : (settings.secondaryCta?.ar || 'شاهد أعمالي')}
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        </div>
      </section>

      {/* ── Trust Signals ─────────────────────────────── */}
      <section className="border-y border-white/[0.05] bg-white/[0.01] py-10">
        <div className="container px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trustPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container px-6">
          <SectionHeader
            eyebrow={isEn ? 'What I Do' : 'ما أقدمه'}
            title={isEn ? 'Services' : 'الخدمات'}
            subtitle={isEn
              ? 'End-to-end development services that solve real business problems — not just pixel-perfect screens.'
              : 'خدمات تطوير متكاملة تحل مشاكل الأعمال الحقيقية — وليس مجرد واجهات مثالية.'}
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} locale={locale} />
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href={`/${locale}/services`}>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary/80 hover:text-primary transition-colors group">
                {isEn ? 'Explore All Services' : 'استعرض كل الخدمات'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(212,168,54,0.04),transparent)]" />
        <div className="container px-6 relative z-10">
          <SectionHeader
            eyebrow={isEn ? 'Portfolio' : 'المحفظة'}
            title={isEn ? 'Selected Work' : 'أعمال مختارة'}
            subtitle={isEn
              ? 'Real-world projects that delivered measurable results for clients — from business systems to consumer-facing products.'
              : 'مشاريع من الواقع أنجزت نتائج قابلة للقياس — من أنظمة الأعمال إلى المنتجات الاستهلاكية.'}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </div>
          <div className="mt-14">
            <Link href={`/${locale}/projects`}>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary/80 hover:text-primary transition-colors group">
                {isEn ? 'View Full Portfolio' : 'عرض المحفظة الكاملة'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────── */}
      <section className="py-28 bg-white/[0.01] border-t border-white/[0.04]">
        <div className="container px-6">
          <SectionHeader
            eyebrow={isEn ? 'Technical Expertise' : 'الخبرة التقنية'}
            title={isEn ? 'Core Skills' : 'المهارات الأساسية'}
            subtitle={isEn
              ? 'Technologies I have mastered to build reliable, production-grade systems.'
              : 'التقنيات التي أتقنتها لبناء أنظمة موثوقة وجاهزة للإنتاج.'}
            centered
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} locale={locale} />
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href={`/${locale}/skills`}>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary/80 hover:text-primary transition-colors group">
                {isEn ? 'View All Skills' : 'عرض كل المهارات'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(212,168,54,0.07),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-px section-divider" />
        <div className="absolute inset-x-0 bottom-0 h-px section-divider" />
        
        <div className="container px-6 text-center relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 text-xs font-semibold tracking-[0.18em] uppercase text-primary/60">
            <span className="h-px w-5 bg-primary/40" />
            {isEn ? "Let's Build Something" : 'لنبنِ شيئاً معاً'}
            <span className="h-px w-5 bg-primary/40" />
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold gold-gradient pb-3 mb-6 tracking-tight leading-tight">
            {isEn ? 'Ready to transform your business?' : 'هل أنت مستعد لتحويل عملك؟'}
          </h2>

          <p className="text-base md:text-lg text-muted-foreground mb-12 leading-relaxed max-w-lg mx-auto">
            {isEn
              ? "Let's discuss your project and how my full-stack expertise can solve your specific challenges."
              : 'دعنا نناقش مشروعك وكيف يمكن لخبرتي الشاملة أن تحل التحديات الخاصة بك.'}
          </p>

          <Link href={`/${locale}/contact`}>
            <button className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-base px-12 py-5 rounded-full cta-glow transition-all duration-300 hover:scale-[1.03]">
              {isEn ? 'Start a Conversation' : 'ابدأ محادثة'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
