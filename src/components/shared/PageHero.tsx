import { ReactNode } from "react";

export function PageHero({ title, subtitle, eyebrow, children }: { 
  title: string; 
  subtitle?: string; 
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative py-20 md:py-28 border-b border-white/[0.05] overflow-hidden">
      {/* Mesh gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(212,168,54,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-background/60" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-5 bg-primary/50" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70">{eyebrow}</span>
            <span className="h-px w-5 bg-primary/50" />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold gold-gradient pb-4 mb-5 leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
