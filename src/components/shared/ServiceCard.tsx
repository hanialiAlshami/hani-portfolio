import { Service } from "@/types";
import { GlassCard } from "./GlassCard";
import { IconRenderer } from "./IconRenderer";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function ServiceCard({ service, locale }: { service: Service, locale: string }) {
  const isEn = locale === 'en';

  return (
    <GlassCard className="h-full flex flex-col relative overflow-hidden group p-7 md:p-8">
      {/* Ambient glow */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/8 transition-all duration-700 pointer-events-none" />
      
      {/* Icon */}
      <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-7 text-primary border border-primary/20 shadow-sm group-hover:border-primary/40 transition-colors duration-300">
        <IconRenderer iconName={service.iconClass} className="w-6 h-6" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold mb-3 tracking-tight leading-snug">{isEn ? service.title.en : service.title.ar}</h3>
      <p className="text-muted-foreground mb-7 flex-1 text-sm leading-relaxed">{isEn ? service.description.en : service.description.ar}</p>

      {/* Business Value Footer */}
      <div className="mt-auto pt-5 border-t border-white/[0.06]">
        <span className="text-[10px] font-bold text-primary/70 uppercase tracking-[0.18em] block mb-1.5">
          {isEn ? 'Business Impact' : 'الأثر التجاري'}
        </span>
        <p className="text-sm text-foreground/80 font-medium leading-relaxed">{isEn ? service.expectedResult.en : service.expectedResult.ar}</p>
      </div>
    </GlassCard>
  );
}
