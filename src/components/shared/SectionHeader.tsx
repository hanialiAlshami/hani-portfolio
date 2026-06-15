import { cn } from "@/lib/utils";

interface Props {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, eyebrow, centered = false, className }: Props) {
  return (
    <div className={cn("space-y-5 mb-16", centered && "text-center", className)}>
      {eyebrow && (
        <div className={cn("flex items-center gap-3", centered && "justify-center")}>
          <span className="h-px w-6 bg-primary/60" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/80">{eyebrow}</span>
          <span className="h-px w-6 bg-primary/60" />
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold gold-gradient pb-2 tracking-tight leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed" style={centered ? { marginLeft: 'auto', marginRight: 'auto' } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
