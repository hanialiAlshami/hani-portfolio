import { getProjects } from '@/lib/data/portfolio';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { PlaceholderImage } from '@/components/shared/PlaceholderImage';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Lock, PlayCircle, Layers, Wrench, Monitor, Terminal, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

import { constructMetadata } from '@/lib/seo';

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const projects = await getProjects();
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};

  const title = locale === 'en' ? `${project.title.en} — Case Study` : `${project.title.ar} — دراسة حالة`;
  const description = locale === 'en' ? project.summary.en : project.summary.ar;

  return constructMetadata({
    title,
    description,
    locale,
    path: `/projects/${slug}`,
    image: project.imageUrl || undefined,
  });
}

export default async function ProjectDetailsPage({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const isEn = locale === 'en';
  const projects = await getProjects();
  const project = projects.find(p => p.slug === slug);

  if (!project) notFound();

  const statusConfig = {
    live:        { label: isEn ? 'Live' : 'حي', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    private:     { label: isEn ? 'Confidential' : 'سري', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    local_demo:  { label: isEn ? 'Local Demo' : 'عرض محلي', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    in_progress: { label: isEn ? 'In Progress' : 'قيد التطوير', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  };
  const status = statusConfig[project.projectStatus] ?? statusConfig.local_demo;

  return (
    <article>
      {/* ── Page Hero ─────────────────────────────── */}
      <div className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/[0.05] overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(212,168,54,0.08),transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-[0.1em] uppercase text-muted-foreground hover:text-primary transition-colors mb-12 md:mb-20 group border border-white/10 hover:border-primary/50 px-6 py-3 rounded-full hover:bg-primary/5"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
            {isEn ? 'BACK TO PROJECTS' : 'العودة للمشاريع'}
          </Link>

          <div className="flex flex-col gap-6 md:gap-10">
            <div className="flex flex-wrap gap-3">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${status.bg} ${status.color}`}>
                {status.label}
              </span>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10 text-muted-foreground">
                {Array.isArray(project.categoryIds) && project.categoryIds.length > 0 ? project.categoryIds[0] : 'WEB'}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black text-white opacity-90 tracking-tighter mix-blend-screen uppercase drop-shadow-2xl leading-none">
              {isEn ? project.title.en : project.title.ar}
            </h1>
            
            <p className="text-lg md:text-2xl text-foreground/70 max-w-3xl font-medium leading-relaxed">
              {isEn ? project.summary.en : project.summary.ar}
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────── */}
      <div className="container px-4 sm:px-6 py-12 md:py-24 max-w-7xl mx-auto">
        {/* Hero Image */}
        <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[2rem] overflow-hidden mb-16 md:mb-32 border border-white/[0.05] shadow-[0_20px_80px_rgba(0,0,0,0.5)] relative group">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={isEn ? project.title.en : project.title.ar}
              fill
              priority
              sizes="100vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-[1.5s]"
            />
          ) : (
            <PlaceholderImage text={isEn ? 'Project Preview' : 'معاينة المشروع'} className="border-0 rounded-none" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        </div>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: Case Study Narrative */}
          <div className="lg:col-span-2 space-y-14">
            {[
              { key: 'problem',    label: isEn ? 'The Problem'             : 'المشكلة',                   quote: true  },
              { key: 'goal',       label: isEn ? 'The Goal'                : 'الهدف',                     quote: false },
              { key: 'solution',   label: isEn ? 'My Approach'             : 'نهجي في الحل',              quote: false },
              { key: 'challenges', label: isEn ? 'Challenges Overcome'     : 'التحديات التي تم التغلب عليها', quote: false },
            ].map(({ key, label, quote }) => {
              const text = isEn ? (project as any)[key]?.en : (project as any)[key]?.ar;
              if (!text) return null;
              return (
                <section key={key}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-px w-5 bg-primary/50" />
                    <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">{label}</span>
                  </div>
                  {quote ? (
                    <blockquote className="border-l-2 rtl:border-l-0 rtl:border-r-2 border-primary/40 pl-6 rtl:pl-0 rtl:pr-6 text-base text-foreground/80 leading-relaxed">
                      {text}
                    </blockquote>
                  ) : (
                    <p className="text-base text-muted-foreground leading-relaxed">{text}</p>
                  )}
                </section>
              );
            })}

            {/* Results / Business Value */}
            {(isEn ? project.results?.en : project.results?.ar) && (
              <section className="glass p-8 rounded-2xl border border-primary/15">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-px w-5 bg-primary/50" />
                  <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
                    {isEn ? 'Business Impact & Results' : 'الأثر التجاري والنتائج'}
                  </span>
                </div>
                <p className="text-base text-foreground/90 font-medium leading-relaxed">
                  {isEn ? project.results.en : project.results.ar}
                </p>
              </section>
            )}

            {/* Demo Video */}
            {project.demoVideoUrl && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-5 bg-primary/50" />
                  <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
                    {isEn ? 'Demo Recording' : 'تسجيل العرض'}
                  </span>
                </div>
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/[0.07] shadow-xl bg-black">
                  <iframe
                    src={project.demoVideoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </section>
            )}
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-28 self-start">
            {/* Project Brief */}
            <div className="glass p-7 rounded-2xl border border-primary/15">
              <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70 mb-6">
                {isEn ? 'Project Brief' : 'ملخص المشروع'}
              </h3>
              <div className="space-y-5">
                <div>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider block mb-1">
                    {isEn ? 'My Role' : 'دوري'}
                  </span>
                  <strong className="text-sm text-foreground">{isEn ? project.role?.en : project.role?.ar}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider block mb-1">
                    {isEn ? 'Status' : 'الحالة'}
                  </span>
                  <span className={`text-sm font-semibold ${status.color}`}>{status.label}</span>
                </div>
                {project.projectStatus === 'private' && (
                  <div className="pt-3 border-t border-white/[0.06] flex items-start gap-2">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {isEn ? 'Private demo available on request. NDA-protected.' : 'عرض خاص متاح عند الطلب. محمي باتفاقية سرية.'}
                    </p>
                  </div>
                )}
                {project.projectStatus === 'local_demo' && (
                  <div className="pt-3 border-t border-white/[0.06] flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {isEn ? 'Local demo build — fully functional in a private environment.' : 'نسخة تجريبية محلية — تعمل بالكامل في بيئة خاصة.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            {(project.projectFrameworks?.length > 0 || project.projectTools?.length > 0 || project.techStack?.length > 0) && (
              <div className="glass p-7 rounded-2xl border border-white/[0.06]">
                <h3 className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground mb-6">
                  {isEn ? 'Technical Stack' : 'التقنيات المستخدمة'}
                </h3>
                <div className="space-y-5">
                  {project.projectFrameworks?.length > 0 && (
                    <div>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                        <Layers className="w-3.5 h-3.5" /> {isEn ? 'Frameworks' : 'أطر العمل'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.projectFrameworks.map(fw => (
                          <span key={fw} className="text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">{fw}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.projectTools?.length > 0 && (
                    <div>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                        <Wrench className="w-3.5 h-3.5" /> {isEn ? 'Tools' : 'الأدوات'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.projectTools.map(tool => (
                          <span key={tool} className="text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">{tool}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(!project.projectFrameworks || project.projectFrameworks.length === 0) && project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-[11px] font-medium text-primary/80 bg-primary/8 border border-primary/15 px-2.5 py-1 rounded-md">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {project.projectStatus === 'live' && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold text-sm py-3.5 px-6 rounded-xl cta-glow hover:scale-[1.02] transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  {isEn ? 'Visit Live Site' : 'زيارة الموقع الحي'}
                </a>
              )}
              {project.projectStatus === 'local_demo' && project.demoVideoUrl && (
                <a
                  href={project.demoVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold text-sm py-3.5 px-6 rounded-xl cta-glow hover:scale-[1.02] transition-all duration-200"
                >
                  <PlayCircle className="w-4 h-4" />
                  {isEn ? 'Watch Demo' : 'مشاهدة العرض'}
                </a>
              )}
              {project.projectStatus === 'private' && (
                <div className="flex items-center justify-center gap-2 w-full bg-white/[0.03] border border-white/[0.08] text-muted-foreground text-sm py-3.5 px-6 rounded-xl">
                  <Lock className="w-4 h-4" />
                  {isEn ? 'Available on Request' : 'متاح عند الطلب'}
                </div>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-white/10 hover:border-primary/30 bg-white/[0.02] hover:bg-primary/5 text-foreground/70 hover:text-foreground text-sm font-medium py-3.5 px-6 rounded-xl transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                  {isEn ? 'View Source Code' : 'مراجعة الكود'}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/[0.05]">
            <div className="flex items-center gap-3 mb-12">
              <span className="h-px w-5 bg-primary/50" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
                {isEn ? 'Project Gallery' : 'معرض المشروع'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img) => (
                <div key={img.id} className="group relative rounded-2xl overflow-hidden border border-white/[0.07] shadow-xl">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                      src={img.imageUrl}
                      alt={isEn ? img.alt?.en || 'Screenshot' : img.alt?.ar || 'لقطة شاشة'}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  {(img.caption?.en || img.caption?.ar) && (
                    <div className="p-4 bg-black/60 backdrop-blur border-t border-white/[0.06]">
                      <p className="text-sm text-foreground/70 text-center">{isEn ? img.caption.en : img.caption.ar}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-24 pt-16 border-t border-white/[0.05] text-center">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-primary/60 mb-4">
            {isEn ? 'Similar Project?' : 'مشروع مماثل؟'}
          </p>
          <h3 className="text-3xl md:text-4xl font-extrabold gold-gradient pb-2 mb-5 tracking-tight">
            {isEn ? 'Need a similar solution?' : 'هل تحتاج إلى حل مماثل؟'}
          </h3>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            {isEn
              ? "Let's talk about your requirements and build something that delivers real results."
              : 'دعنا نتحدث عن متطلباتك ونبني شيئاً يحقق نتائج حقيقية.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-10 py-4 rounded-full cta-glow transition-all duration-300 hover:scale-[1.03] group"
          >
            {isEn ? 'Discuss Your Project' : 'ناقش مشروعك'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
