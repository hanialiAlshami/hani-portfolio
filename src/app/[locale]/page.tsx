import { Button } from '@/components/ui/Button';
import Image from 'next/image';

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

      {/* ── Cinematic Hero ──────────────────────────────────────── */}
      <section className="relative min-h-[100svh] md:min-h-[92vh] w-full flex items-center justify-center overflow-hidden bg-background">
        {/* Mesh background */}
        <div className="absolute inset-0 hero-mesh" />
        
        {/* Background Ambient Glow */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-primary/10 blur-[80px] md:blur-[150px] pointer-events-none" />

        {/* Huge Background Typography */}
        <div className="absolute top-[25%] md:top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none overflow-hidden flex justify-center items-center z-0 opacity-10 md:opacity-100 mix-blend-screen">
          <h1 className="text-[16vw] md:text-[14vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.04] md:from-white/[0.09] to-transparent whitespace-nowrap tracking-tighter">
            {isEn ? 'HANI ALSHAMI' : 'هاني الشامي'}
          </h1>
        </div>

        {/* Foreground Content (Split Composition) */}
        <div className="container relative z-20 px-4 sm:px-6 w-full h-full flex flex-col justify-start md:justify-end pb-12 md:pb-32 pt-20 sm:pt-24 lg:pt-20 min-h-[100svh] md:min-h-[92vh]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-4 items-end w-full">
            
            {/* Left/Bottom Intro Block */}
            <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6 text-left rtl:text-right items-start z-20">
              {/* Availability Badge */}
              <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-primary">
                  {isEn ? 'Available for new projects' : 'متاح لمشاريع جديدة'}
                </span>
              </div>
              
              <div className="animate-fade-in-up delay-200">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight leading-snug">
                  {isEn ? (settings.jobTitle?.en || 'Full Stack Web Developer') : (settings.jobTitle?.ar || 'مطور ويب Full Stack')}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed max-w-md">
                  {isEn
                    ? (settings.shortBio?.en || 'Building secure, scalable business systems — dashboards, APIs, and web apps — designed to grow with your company.')
                    : (settings.shortBio?.ar || 'بناء أنظمة أعمال آمنة وقابلة للتطوير — لوحات تحكم وواجهات برمجية ومواقع ويب — مصممة للنمو مع شركتك.')}
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5 text-[11px] md:text-xs font-bold tracking-wide uppercase text-primary/80">
                  <span className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">Laravel</span>
                  <span className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">Next.js</span>
                  <span className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">Supabase</span>
                </div>
              </div>
            </div>

            {/* Central Brand Visual (Mobile: Stacks in grid, Desktop: Absolute Center) */}
            <div className="lg:col-span-2 flex justify-center items-center z-10 animate-fade-in-up md:absolute md:top-[48%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 pointer-events-none py-6 md:py-0 w-full md:w-auto">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full border border-primary/20 shadow-[0_0_80px_rgba(212,168,54,0.15)] md:shadow-[0_0_100px_rgba(212,168,54,0.25)] bg-black/40 backdrop-blur-md flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-transparent opacity-60" />
                <Image src="/brand/logo-icon.jpeg" alt="Hani Alshami" fill className="object-cover opacity-90 p-2 md:p-3" priority />
                <div className="absolute inset-0 rounded-full border border-white/5" />
              </div>
            </div>

            {/* Right/Bottom CTAs & Socials */}
            <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-8 lg:text-right rtl:lg:text-left w-full mt-2 md:mt-8 lg:mt-0 z-20">
              <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href={`/${locale}/contact`} className="w-full sm:w-auto">
                  <button className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-bold text-sm md:text-base px-8 py-4 md:py-4 rounded-full cta-glow transition-all duration-300 hover:scale-[1.03]">
                    {isEn ? (settings.primaryCta?.en || 'Start a Project') : (settings.primaryCta?.ar || 'ابدأ مشروعاً')}
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
                <Link href={`/${locale}/projects`} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/10 hover:border-primary/40 bg-white/[0.02] hover:bg-primary/5 text-foreground/80 hover:text-foreground font-bold text-sm md:text-base px-8 py-4 md:py-4 rounded-full transition-all duration-300 backdrop-blur-sm">
                    {isEn ? (settings.secondaryCta?.en || 'View My Work') : (settings.secondaryCta?.ar || 'شاهد أعمالي')}
                  </button>
                </Link>
              </div>

              {/* Social/Identity Block */}
              {(settings.social?.github || settings.social?.linkedin || settings.whatsapp) && (
                <div className="animate-fade-in-up delay-400 flex items-center gap-5 md:gap-7 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground/50 w-full sm:w-auto justify-center sm:justify-start lg:justify-end pb-4 md:pb-0">
                  {settings.social?.github && (
                     <a href={settings.social.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors py-2">GitHub</a>
                  )}
                  {settings.social?.linkedin && (
                     <a href={settings.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors py-2">LinkedIn</a>
                  )}
                  {settings.whatsapp && (
                     <a href={settings.whatsapp} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors py-2">WhatsApp</a>
                  )}
                </div>
              )}
            </div>

          </div>
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
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(212,168,54,0.03),transparent)] pointer-events-none" />
        
        <div className="container px-4 sm:px-6 relative z-10 max-w-7xl mx-auto">
          {/* Huge Cinematic Title */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-[18vw] md:text-[10vw] font-black leading-none text-white opacity-90 tracking-tighter mix-blend-screen uppercase drop-shadow-2xl mb-6">
              {isEn ? 'SERVICES' : 'الخدمات'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-medium">
              {isEn
                ? 'End-to-end development services that solve real business problems — not just pixel-perfect screens.'
                : 'خدمات تطوير متكاملة تحل مشاكل الأعمال الحقيقية — وليس مجرد واجهات مثالية.'}
            </p>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 w-full">
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} locale={locale} index={index + 1} variant="row" />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href={`/${locale}/services`}>
              <button className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary/80 hover:text-primary transition-colors group px-8 py-3.5 rounded-full bg-white/[0.02] hover:bg-primary/10 border border-white/5 hover:border-primary/30 backdrop-blur-sm">
                {isEn ? 'View All Services' : 'عرض كل الخدمات'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(212,168,54,0.03),transparent)] pointer-events-none" />
        
        <div className="container px-4 sm:px-6 relative z-10 max-w-7xl mx-auto">
          {/* Huge Cinematic Title */}
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-[18vw] md:text-[10vw] font-black leading-none text-white opacity-90 tracking-tighter mix-blend-screen uppercase drop-shadow-2xl mb-6">
              {isEn ? 'PROJECTS' : 'المشاريع'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-medium">
              {isEn
                ? 'Real-world projects that delivered measurable results for clients — from business systems to consumer-facing products.'
                : 'مشاريع حقيقية حققت نتائج قابلة للقياس للعملاء — من أنظمة الأعمال إلى المنتجات الاستهلاكية.'}
            </p>
          </div>

          <div className="flex flex-col w-full">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} locale={locale} index={idx + 1} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href={`/${locale}/projects`}>
              <button className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary/80 hover:text-primary transition-colors group px-8 py-3.5 rounded-full bg-white/[0.02] hover:bg-primary/10 border border-white/5 hover:border-primary/30 backdrop-blur-sm">
                {isEn ? 'View All Projects' : 'عرض كل المشاريع'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden flex flex-col items-center border-y border-white/[0.03]">
        {/* Background ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(212,168,54,0.03),transparent)] pointer-events-none" />

        {/* Huge Cinematic Title */}
        <div className="container px-4 text-center mb-12 md:mb-20 relative z-10">
          <h2 className="text-[18vw] md:text-[10vw] font-black leading-none text-white opacity-90 tracking-tighter mix-blend-screen uppercase drop-shadow-2xl">
            {isEn ? 'SKILLS' : 'المهارات'}
          </h2>
        </div>

        {/* Marquee Rows Container */}
        <div className="w-full relative flex flex-col gap-4 md:gap-6 group z-10" dir="ltr">
          {/* Edge fade masks */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

          {/* Row 1 (Left) */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
              <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 shrink-0">
                {[...featuredSkills, ...featuredSkills].map((skill, i) => (
                  <SkillCard key={`r1a-${skill.id}-${i}`} skill={skill} locale={locale} variant="pill" />
                ))}
              </div>
              <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 shrink-0">
                {[...featuredSkills, ...featuredSkills].map((skill, i) => (
                  <SkillCard key={`r1b-${skill.id}-${i}`} skill={skill} locale={locale} variant="pill" />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 (Right) */}
          <div className="flex overflow-hidden">
            <div className="flex animate-marquee-reverse hover:[animation-play-state:paused] whitespace-nowrap">
              <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 shrink-0">
                {[...featuredSkills, ...featuredSkills].reverse().map((skill, i) => (
                  <SkillCard key={`r2a-${skill.id}-${i}`} skill={skill} locale={locale} variant="pill" />
                ))}
              </div>
              <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 shrink-0">
                {[...featuredSkills, ...featuredSkills].reverse().map((skill, i) => (
                  <SkillCard key={`r2b-${skill.id}-${i}`} skill={skill} locale={locale} variant="pill" />
                ))}
              </div>
            </div>
          </div>
          
          {/* Row 3 (Left, hidden on mobile for better compactness) */}
          <div className="hidden md:flex overflow-hidden">
            <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
              <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 shrink-0">
                {[...featuredSkills.slice(3), ...featuredSkills.slice(0, 3), ...featuredSkills.slice(3), ...featuredSkills.slice(0, 3)].map((skill, i) => (
                  <SkillCard key={`r3a-${skill.id}-${i}`} skill={skill} locale={locale} variant="pill" />
                ))}
              </div>
              <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 shrink-0">
                {[...featuredSkills.slice(3), ...featuredSkills.slice(0, 3), ...featuredSkills.slice(3), ...featuredSkills.slice(0, 3)].map((skill, i) => (
                  <SkillCard key={`r3b-${skill.id}-${i}`} skill={skill} locale={locale} variant="pill" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <div className="text-center mt-16 md:mt-24 relative z-10">
          <Link href={`/${locale}/skills`}>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-primary/80 hover:text-primary transition-colors group px-8 py-3.5 rounded-full bg-white/[0.02] hover:bg-primary/10 border border-white/5 hover:border-primary/30 backdrop-blur-sm">
              {isEn ? 'View All Skills' : 'عرض كل المهارات'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </div>
      </section>

      {/* ── About / CTA ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-background">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(212,168,54,0.04),transparent)] pointer-events-none" />
        
        {/* Decorative Floating Elements (CSS/Tailwind only) */}
        <div className="hidden md:block absolute top-[15%] left-[10%] w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 blur-[1px] animate-pulse pointer-events-none" />
        <div className="hidden md:block absolute top-[25%] right-[15%] w-20 h-20 rotate-45 bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl shadow-[0_0_30px_rgba(212,168,54,0.05)] pointer-events-none" />
        <div className="hidden md:block absolute bottom-[25%] left-[15%] w-16 h-16 -rotate-12 bg-white/[0.03] border border-white/[0.05] backdrop-blur-md rounded-xl pointer-events-none" />
        <div className="hidden md:block absolute bottom-[15%] right-[10%] w-32 h-32 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(212,168,54,0.1),transparent)] border border-primary/10 blur-[2px] animate-pulse delay-700 pointer-events-none" />

        <div className="container px-4 sm:px-6 text-center relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Huge Cinematic Title */}
          <h2 className="text-[17vw] md:text-[10vw] font-black leading-none text-white opacity-90 tracking-tighter mix-blend-screen uppercase drop-shadow-2xl mb-8 md:mb-12 animate-fade-in-up">
            {isEn ? 'ABOUT ME' : 'من أنا'}
          </h2>

          {/* Reveal Paragraph */}
          <div className="glass p-6 sm:p-8 md:p-12 rounded-3xl border border-white/[0.06] mb-10 md:mb-14 animate-fade-in-up delay-200 relative overflow-hidden group w-full max-w-3xl hover:border-primary/20 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed font-medium relative z-10">
              {isEn
                ? (settings.shortBio?.en || "I am a Full Stack Web Developer passionate about building robust software and solving complex problems. I focus on creating scalable digital solutions that help businesses grow, operate efficiently, and stand out in the digital landscape.")
                : (settings.shortBio?.ar || "أنا مطور ويب شامل شغوف ببناء برمجيات قوية وحل المشاكل المعقدة. أركز على إنشاء حلول رقمية قابلة للتطوير تساعد الشركات على النمو، والعمل بكفاءة، والتميز في العالم الرقمي.")}
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-up delay-300 w-full sm:w-auto">
            <Link href={`/${locale}/about`} className="w-full sm:w-auto inline-block">
              <button className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-bold text-sm md:text-base px-10 py-4 md:py-5 rounded-full cta-glow transition-all duration-300 hover:scale-[1.03]">
                {isEn ? 'More About Me' : 'المزيد عني'}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
