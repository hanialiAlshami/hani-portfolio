import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlaceholderImage({ className, text = "Image Placeholder" }: { className?: string, text?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center bg-secondary/30 border border-border/50 text-muted-foreground rounded-lg w-full h-full min-h-[200px]", className)}>
      <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
