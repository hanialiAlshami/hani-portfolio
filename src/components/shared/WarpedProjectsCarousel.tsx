'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types';

export interface WarpedProjectsCarouselProps {
  projects: Project[];
  locale: string;
}

/**
 * Extracts the exact website name from the project title without trailing descriptors or badges.
 */
function getWebsiteName(project: Project, isEn: boolean): string {
  const rawTitle = isEn ? project.title?.en : project.title?.ar;
  if (!rawTitle) return '';
  const clean = rawTitle.split(/—|–|-|:|\|/)[0].trim();
  return clean || rawTitle;
}

export function WarpedProjectsCarousel({ projects, locale }: WarpedProjectsCarouselProps) {
  const isEn = locale === 'en';
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Filter projects with valid, genuine image URLs
  const validProjects = useMemo(() => {
    return (projects || []).filter((p) => p.imageUrl && p.imageUrl.trim() !== '');
  }, [projects]);

  const count = validProjects.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Drag & gesture state (isolated strictly to stage viewport)
  const dragStartX = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const hasDragged = useRef(false);
  const isTransitioningRef = useRef(false);

  // Motion preference detection
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Safe navigation function
  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (count <= 1 || isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setIsTransitioning(true);
      setActiveIdx((prev) => (prev + dir + count) % count);

      setTimeout(
        () => {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        },
        prefersReducedMotion ? 50 : 450
      );
    },
    [count, prefersReducedMotion]
  );

  // Go to specific index directly (pagination dots)
  const goTo = useCallback(
    (idx: number) => {
      if (idx === activeIdx || count <= 1 || isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setIsTransitioning(true);
      setActiveIdx(idx);

      setTimeout(
        () => {
          isTransitioningRef.current = false;
          setIsTransitioning(false);
        },
        prefersReducedMotion ? 50 : 450
      );
    },
    [activeIdx, count, prefersReducedMotion]
  );

  // Smart Autoplay (5s, paused on hover, drag, or when tab is hidden)
  useEffect(() => {
    if (count <= 1 || isHovering || isDragging || prefersReducedMotion) return;
    const interval = setInterval(() => {
      if (!document.hidden && !isTransitioningRef.current) {
        navigate(1);
      }
    }, 5500);
    return () => clearInterval(interval);
  }, [count, isHovering, isDragging, prefersReducedMotion, navigate]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        !containerRef.current?.contains(document.activeElement) &&
        document.activeElement !== document.body
      ) {
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  // Pointer drag events - strictly attached to the 3D stage area only
  const onPointerDown = (e: React.PointerEvent) => {
    if (count <= 1 || isTransitioningRef.current) return;
    if (e.button !== 0) return;
    dragStartX.current = e.clientX;
    hasDragged.current = false;
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 12) {
      hasDragged.current = true;
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    }
    setDragOffset(delta);
  };

  const endDrag = (e?: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    if (e && e.currentTarget.hasPointerCapture(e.pointerId)) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    const delta = dragOffset;
    dragStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(delta) > 35) {
      navigate(delta < 0 ? 1 : -1);
    }

    setTimeout(() => {
      hasDragged.current = false;
    }, 60);
  };

  // Fallback for 0 projects
  if (count === 0) {
    return (
      <div className="w-full py-16 flex items-center justify-center text-muted-foreground/70 text-sm">
        {isEn ? 'No featured projects available.' : 'لا توجد مشاريع مميزة حالياً.'}
      </div>
    );
  }

  const activeProject = validProjects[activeIdx];

  return (
    <div
      ref={containerRef}
      className="w-full relative flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        minHeight: 'clamp(460px, 54vh, 600px)',
        touchAction: 'pan-y',
      }}
      dir="ltr"
      role="region"
      aria-roledescription="carousel"
      aria-label={isEn ? 'Featured Projects 3D Showcase' : 'معرض المشاريع المميزة ثلاثي الأبعاد'}
      tabIndex={0}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ── 3D Stage Viewport ── */}
      <div
        ref={stageRef}
        className="w-full flex items-center justify-center relative touch-pan-y"
        style={{
          height: 'clamp(380px, 48vh, 520px)',
          perspective: '1200px',
          perspectiveOrigin: 'center center',
          transformStyle: 'preserve-3d',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {validProjects.map((project, idx) => {
          let offset = 0;
          if (count > 1) {
            offset = (idx - activeIdx) % count;
            if (offset > Math.floor(count / 2)) offset -= count;
            if (offset < -Math.floor((count - 1) / 2)) offset += count;
          }

          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isVisible = isCenter || isLeft || isRight;

          // Proportional 3D Geometry for 16:9 Widescreen Cards
          let translateX = '0%';
          let translateZ = '0px';
          let rotateY = '0deg';
          let scale = 1;
          let opacity = 1;
          let zIndex = 1;

          if (isCenter) {
            translateX = '0%';
            translateZ = '0px';
            rotateY = '0deg';
            scale = 1;
            opacity = 1;
            zIndex = 20;
          } else if (isLeft) {
            translateX = '-56%';
            translateZ = '-70px';
            rotateY = prefersReducedMotion ? '0deg' : '18deg';
            scale = 0.84;
            opacity = 0.85;
            zIndex = 10;
          } else if (isRight) {
            translateX = '56%';
            translateZ = '-70px';
            rotateY = prefersReducedMotion ? '0deg' : '-18deg';
            scale = 0.84;
            opacity = 0.85;
            zIndex = 10;
          } else if (offset < -1) {
            translateX = '-105%';
            translateZ = '-180px';
            rotateY = prefersReducedMotion ? '0deg' : '30deg';
            scale = 0.7;
            opacity = 0;
            zIndex = 1;
          } else {
            translateX = '105%';
            translateZ = '-180px';
            rotateY = prefersReducedMotion ? '0deg' : '-30deg';
            scale = 0.7;
            opacity = 0;
            zIndex = 1;
          }

          let dragTransform = '';
          if (isDragging && isCenter) {
            const dragPx = Math.min(Math.max(dragOffset, -120), 120);
            dragTransform = ` translateX(${dragPx}px) rotateY(${dragPx * -0.05}deg)`;
          }

          const websiteName = getWebsiteName(project, isEn);

          return (
            <div
              key={project.id || idx}
              className="absolute"
              style={{
                width: 'clamp(320px, 48vw, 720px)',
                aspectRatio: '16 / 9',
                borderRadius: 'clamp(16px, 1.6vw, 26px)',
                overflow: 'hidden',
                backgroundColor: '#121212',
                boxShadow: isCenter
                  ? '0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 12px 28px -6px rgba(0, 0, 0, 0.65)'
                  : '0 20px 48px -10px rgba(0, 0, 0, 0.75)',
                border: isCenter
                  ? '1px solid rgba(255, 255, 255, 0.2)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                transform: `translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY}) scale(${scale})${dragTransform}`,
                opacity,
                zIndex,
                pointerEvents: isVisible ? 'auto' : 'none',
                cursor: isCenter ? (isDragging ? 'grabbing' : 'default') : 'pointer',
                transition: isDragging
                  ? 'none'
                  : prefersReducedMotion
                  ? 'opacity 150ms ease'
                  : 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1), opacity 650ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 650ms ease, border-color 650ms ease',
                willChange: 'transform, opacity',
              }}
              onClick={(e) => {
                if (hasDragged.current) return;
                if (isLeft) {
                  e.stopPropagation();
                  navigate(-1);
                } else if (isRight) {
                  e.stopPropagation();
                  navigate(1);
                }
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={websiteName}
            >
              {/* Genuine Project Screenshot - 16:9 full aspect ratio without cropping */}
              <div className="relative w-full h-full bg-zinc-950">
                <Image
                  src={project.imageUrl}
                  alt={websiteName}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 720px"
                  priority={isCenter}
                  className="object-cover object-center select-none pointer-events-none"
                />

                {/* Subtle protective bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Bottom Bar: Website Name & Elegant Details Action */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-20 flex items-center justify-between pointer-events-none">
                  {/* Refined Website Name Label */}
                  <div className="pointer-events-auto">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/95 text-[11px] sm:text-xs font-medium tracking-wide shadow-md max-w-[180px] sm:max-w-[260px] truncate"
                      dir={isEn ? 'ltr' : 'rtl'}
                    >
                      {websiteName}
                    </span>
                  </div>

                  {/* Ultra-sleek Luxury Details Button on Active Card */}
                  {isCenter && (
                    <div className="pointer-events-auto">
                      <Link
                        href={`/${locale}/projects/${project.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium text-white bg-zinc-950/80 hover:bg-zinc-900 border border-white/20 hover:border-amber-400/60 shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
                        aria-label={isEn ? `View details for ${websiteName}` : `عرض تفاصيل ${websiteName}`}
                      >
                        <span className="text-zinc-200 group-hover:text-white transition-colors">
                          {isEn ? 'View Details' : 'عرض التفاصيل'}
                        </span>
                        <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-amber-400/15 group-hover:bg-amber-400/30 flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* ── Desktop Hover Nav Arrows (Discreet Chevrons) ── */}
        {count > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="hidden lg:flex absolute left-4 xl:left-8 z-30 w-10 h-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              aria-label={isEn ? 'Previous project' : 'المشروع السابق'}
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="hidden lg:flex absolute right-4 xl:right-8 z-30 w-10 h-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              aria-label={isEn ? 'Next project' : 'المشروع التالي'}
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </>
        )}
      </div>

      {/* ── Pagination Pill (Rule 5 & Video Match: exactly 15px below center card) ── */}
      {count > 1 && (
        <div
          className="relative z-30 flex items-center justify-center mt-[15px]"
          role="tablist"
          aria-label={isEn ? 'Slide indicator' : 'مؤشر الشرائح'}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
            }}
          >
            {validProjects.map((p, idx) => (
              <button
                key={p.id || idx}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(idx);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label={`Go to slide ${idx + 1}: ${getWebsiteName(p, isEn)}`}
                className="transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  width: idx === activeIdx ? '16px' : '6px',
                  height: '6px',
                  backgroundColor:
                    idx === activeIdx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.35)',
                  boxShadow:
                    idx === activeIdx ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
                  border: 'none',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

