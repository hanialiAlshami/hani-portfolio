import { Skill } from "@/types";
import { GlassCard } from "./GlassCard";
import { IconRenderer } from "./IconRenderer";

export function SkillCard({ skill, locale, variant = 'default' }: { skill: Skill, locale: string, variant?: 'default' | 'pill' }) {
  const isEn = locale === 'en';

  if (variant === 'pill') {
    return (
      <div className="flex items-center gap-2.5 px-4 md:px-6 py-2.5 md:py-3.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shrink-0 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02] transition-all duration-300">
        <IconRenderer iconName={skill.iconClass} className="w-4 h-4 md:w-5 md:h-5 text-primary/80" />
        <span className="font-bold text-sm md:text-base text-foreground/90 whitespace-nowrap">{skill.name}</span>
      </div>
    );
  }

  return (
    <GlassCard className="p-6 flex flex-col h-full border border-white/[0.06] hover:border-primary/25 transition-colors group">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/15 group-hover:border-primary/35 transition-colors duration-300 shrink-0">
          <IconRenderer iconName={skill.iconClass} className="w-4 h-4" />
        </div>
        <h4 className="font-bold text-sm tracking-tight">{skill.name}</h4>
      </div>
      <div className="h-px w-full bg-white/[0.05] mb-4" />
      <p className="text-xs text-muted-foreground leading-relaxed">
        {isEn ? skill.businessValue.en : skill.businessValue.ar}
      </p>
    </GlassCard>
  );
}
