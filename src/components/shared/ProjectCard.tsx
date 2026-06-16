import Link from "next/link";
import Image from "next/image";
import { PlayCircle, Github } from "lucide-react";
import { Project } from "@/types";
import { PlaceholderImage } from "./PlaceholderImage";

export function ProjectCard({ project, locale, index }: { project: Project, locale: string, index: number }) {
  const isEn = locale === 'en';
  const title = isEn ? project.title.en : project.title.ar;
  const category = Array.isArray(project.categoryIds) && project.categoryIds.length > 0 ? project.categoryIds[0] : 'WEB';

  // Gallery images for layered effect (first extra image from gallery beyond imageUrl)
  const galleryImages = project.gallery ?? [];
  const secondaryImage = galleryImages.length > 0 ? galleryImages[0].imageUrl : null;
  const tertiaryImage = galleryImages.length > 1 ? galleryImages[1].imageUrl : null;

  return (
    <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.05] hover:border-primary/20 transition-all duration-500 group mb-10 md:mb-16 hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
      
      {/* ── Header Row ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8 md:mb-10">
        
        {/* Left: Number + Type + Title */}
        <div className="flex items-start gap-4 md:gap-6 lg:gap-10 min-w-0">
          {/* Number */}
          <span className="text-[3.5rem] md:text-[5.5rem] font-black text-white/90 tracking-tighter mix-blend-screen leading-none drop-shadow-2xl shrink-0 select-none">
            {String(index).padStart(2, '0')}
          </span>

          {/* Type + Title block */}
          <div className="flex flex-col gap-1.5 pt-1 md:pt-3 min-w-0">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-primary/70 flex items-center gap-2 flex-wrap">
              {category}
              {project.isFeatured && (
                <>
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  <span className="text-primary">{isEn ? 'FEATURED' : 'مميز'}</span>
                </>
              )}
              {project.projectStatus === 'in_progress' && (
                <>
                  <span className="w-1 h-1 rounded-full bg-amber-500/50" />
                  <span className="text-amber-400">{isEn ? 'IN PROGRESS' : 'قيد التطوير'}</span>
                </>
              )}
            </span>
            <Link href={`/${locale}/projects/${project.slug}`}>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white/90 uppercase hover:text-primary transition-colors duration-300 leading-tight">
                {title}
              </h3>
            </Link>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex flex-wrap shrink-0 gap-2 sm:gap-3 items-start sm:pt-2">
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-[11px] md:text-xs font-bold tracking-[0.1em] uppercase border border-white/20 hover:border-primary/60 px-5 py-2.5 rounded-full hover:bg-primary/5 transition-all duration-300"
          >
            {isEn ? 'DETAILS' : 'التفاصيل'}
          </Link>

          {project.projectStatus === 'live' && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] md:text-xs font-bold tracking-[0.1em] uppercase border border-primary/60 text-primary hover:bg-primary/10 px-5 py-2.5 rounded-full transition-all duration-300 cta-glow"
            >
              {isEn ? 'LIVE PROJECT' : 'المشروع المباشر'}
            </a>
          )}

          {project.projectStatus === 'local_demo' && project.demoVideoUrl && (
            <a
              href={project.demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] md:text-xs font-bold tracking-[0.1em] uppercase border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 px-5 py-2.5 rounded-full transition-all duration-300"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              {isEn ? 'DEMO' : 'العرض'}
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] md:text-xs font-bold tracking-[0.1em] uppercase border border-white/20 hover:border-white/50 px-5 py-2.5 rounded-full hover:bg-white/5 transition-all duration-300"
            >
              <Github className="w-3.5 h-3.5" />
              {isEn ? 'SOURCE' : 'المصدر'}
            </a>
          )}
        </div>
      </div>

      {/* ── Layered Image Area ──────────────────────────── */}
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="block relative w-full overflow-hidden rounded-xl md:rounded-2xl group/img"
        style={{ minHeight: '16rem' }}
      >
        {/* Ambient hover glow */}
        <div className="absolute -inset-3 bg-primary/5 rounded-2xl blur-2xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />

        {/* Layered composition: side thumbnails + main image */}
        <div className="relative flex gap-3 md:gap-4 z-10 w-full">
          
          {/* ── Side Thumbnails Column (only on desktop when gallery exists) ── */}
          {(secondaryImage || tertiaryImage) && (
            <div className="hidden md:flex flex-col gap-3 w-[30%] shrink-0">
              {/* Thumbnail 1 */}
              <div className="relative aspect-[4/3] w-full rounded-lg md:rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transform transition-transform duration-700 group-hover/img:-translate-y-1.5">
                {secondaryImage ? (
                  <Image
                    src={secondaryImage}
                    alt={title}
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/[0.02] border border-white/[0.06] rounded-lg flex items-center justify-center">
                    <span className="text-white/10 text-2xl font-black">{String(index).padStart(2, '0')}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Thumbnail 2 */}
              {tertiaryImage && (
                <div className="relative aspect-[4/3] w-full rounded-lg md:rounded-xl overflow-hidden border border-white/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transform transition-transform duration-700 group-hover/img:translate-y-1">
                  <Image
                    src={tertiaryImage}
                    alt={title}
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
              )}

              {/* If only one gallery image, decorative glass frame below */}
              {!tertiaryImage && (
                <div className="aspect-[4/3] w-full rounded-lg md:rounded-xl border border-white/[0.04] bg-white/[0.015] backdrop-blur-sm" />
              )}
            </div>
          )}

          {/* ── Main Screenshot ── */}
          <div className={`relative ${(secondaryImage || tertiaryImage) ? 'flex-1' : 'w-full'}`}>
            {/* Decorative glass frames behind main image (when no gallery) */}
            {!secondaryImage && (
              <>
                <div className="absolute top-4 -right-2 bottom-0 left-4 md:top-6 md:-right-3 md:left-6 bg-white/[0.015] border border-white/[0.05] rounded-xl md:rounded-2xl pointer-events-none z-0" />
                <div className="absolute top-2 -right-1 bottom-0 left-2 md:top-3 md:-right-1.5 md:left-3 bg-white/[0.025] border border-white/[0.07] rounded-xl md:rounded-2xl pointer-events-none z-[1]" />
              </>
            )}

            {/* Main image */}
            <div className="relative aspect-[16/10] md:aspect-[16/9] w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_16px_48px_rgba(0,0,0,0.6)] transform transition-all duration-700 group-hover/img:-translate-y-1 group-hover/img:shadow-[0_28px_64px_rgba(0,0,0,0.7)] z-[2]">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  className="object-cover transition-transform duration-[2s] ease-out group-hover/img:scale-[1.04]"
                />
              ) : (
                <PlaceholderImage text={isEn ? "Project Preview" : "معاينة المشروع"} className="rounded-none border-0" />
              )}
              {/* Subtle top gloss */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/30" />
            </div>
          </div>

        </div>
      </Link>

    </div>
  );
}
