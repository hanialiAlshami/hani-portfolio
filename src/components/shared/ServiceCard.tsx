import { Service } from "@/types";
import { GlassCard } from "./GlassCard";
import { IconRenderer } from "./IconRenderer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServiceCard({ service, locale, index, variant = 'card' }: { service: Service, locale: string, index?: number, variant?: 'card' | 'row' }) {
  const isEn = locale === 'en';
  const displayIndex = index !== undefined ? index.toString().padStart(2, '0') : '';

  if (variant === 'row') {
    return (
      <GlassCard className="relative overflow-hidden group p-6 sm:p-10 md:p-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        {/* Ambient glow */}
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700 pointer-events-none group-hover:scale-110" />

        {/* Big Background Number */}
        <div className={`absolute top-1/2 -translate-y-1/2 ${isEn ? 'right-10 md:right-24' : 'left-10 md:left-24'} text-[8rem] md:text-[12rem] font-black text-white opacity-[0.02] group-hover:text-primary group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none select-none tracking-tighter`}>
          {displayIndex}
        </div>

        {/* Left: Number (Mobile) & Icon */}
        <div className="flex items-center gap-6 md:w-[25%] shrink-0 relative z-10">
          <span className="text-4xl md:text-5xl font-black text-white/80 opacity-90 tracking-tighter mix-blend-screen drop-shadow-2xl">
            {displayIndex}
          </span>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary border border-primary/20 shadow-inner group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(212,168,54,0.2)] transition-all duration-500 shrink-0">
            <IconRenderer iconName={service.iconClass} className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>

        {/* Right: Title, Summary, Action */}
        <div className="flex-1 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10">
          <div className="flex-1">
            <h3 className="text-xl md:text-3xl font-extrabold tracking-tight leading-snug text-white/90 uppercase group-hover:text-primary transition-colors duration-300 mb-3 md:mb-4">
              {isEn ? service.title.en : service.title.ar}
            </h3>
            <p className="text-muted-foreground/80 group-hover:text-muted-foreground text-sm md:text-base leading-relaxed transition-colors duration-300 max-w-2xl font-medium">
              {isEn ? service.excerpt.en : service.excerpt.ar}
            </p>
          </div>

          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-bold tracking-[0.1em] uppercase border border-white/10 hover:border-primary/50 text-foreground/80 hover:text-primary px-6 py-3 md:py-4 rounded-full hover:bg-primary/5 transition-all duration-300 shrink-0 mt-2 md:mt-0"
          >
            {isEn ? 'DETAILS' : 'التفاصيل'}
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform" />
          </Link>
        </div>
      </GlassCard>
    );
  }

  // Default 'card' variant for /services page
  return (
    <GlassCard className="h-full flex flex-col relative overflow-hidden group p-6 sm:p-8">
      {/* Ambient glow */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/15 transition-all duration-700 pointer-events-none group-hover:scale-110" />
      
      {/* Number Badge (Subtle) */}
      {index !== undefined && (
        <div className={`absolute top-6 ${isEn ? 'right-6' : 'left-6'} text-6xl font-extrabold text-white opacity-5 group-hover:text-primary group-hover:opacity-10 transition-colors duration-500 pointer-events-none select-none font-mono tracking-tighter`}>
          {displayIndex}
        </div>
      )}

      {/* Header (Icon + Title) */}
      <div className="flex flex-col gap-5 mb-4 md:mb-5 relative z-10">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary border border-primary/20 shadow-inner group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(212,168,54,0.15)] transition-all duration-500">
          <IconRenderer iconName={service.iconClass} className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-500" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug text-foreground/90 group-hover:text-foreground transition-colors duration-300">
          {isEn ? service.title.en : service.title.ar}
        </h3>
      </div>

      {/* Content */}
      <p className="text-muted-foreground/80 group-hover:text-muted-foreground mb-8 flex-1 text-sm sm:text-base leading-relaxed relative z-10 transition-colors duration-300">
        {isEn ? service.description.en : service.description.ar}
      </p>

      {/* Business Value Footer */}
      <div className="mt-auto pt-6 border-t border-white/[0.06] group-hover:border-primary/20 transition-colors duration-500 relative z-10">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_8px_rgba(212,168,54,0.6)] transition-all duration-500" />
          <span className="text-[10px] sm:text-xs font-bold text-primary/70 uppercase tracking-[0.2em] group-hover:text-primary/90 transition-colors duration-300">
            {isEn ? 'Business Impact' : 'الأثر التجاري'}
          </span>
        </div>
        <p className="text-sm text-foreground/80 font-medium leading-relaxed group-hover:text-foreground transition-colors duration-300">
          {isEn ? service.expectedResult.en : service.expectedResult.ar}
        </p>
      </div>
    </GlassCard>
  );
}
