import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function GlassCard({ children, className, hover = true }: { children: ReactNode, className?: string, hover?: boolean }) {
  return (
    <div className={cn(
      "glass rounded-2xl",
      hover && "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(212,168,54,0.08)] hover:border-white/[0.12]",
      className
    )}>
      {children}
    </div>
  );
}
