import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Lock, PlayCircle, Clock, ArrowRight } from "lucide-react";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderImage } from "./PlaceholderImage";

export function ProjectCard({ project, locale }: { project: Project, locale: string }) {
  const isEn = locale === 'en';
  
  const renderStatusBadge = () => {
    switch(project.projectStatus) {
      case 'live':
        return <Badge className="bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/20 text-[10px] font-semibold uppercase tracking-wider">{isEn ? 'Live' : 'حي'}</Badge>;
      case 'private':
        return <Badge className="bg-purple-500/15 text-purple-400 hover:bg-purple-500/25 border border-purple-500/20 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider"><Lock className="w-3 h-3" />{isEn ? 'Private' : 'خاص'}</Badge>;
      case 'local_demo':
        return <Badge className="bg-blue-500/15 text-blue-400 hover:bg-blue-500/25 border border-blue-500/20 text-[10px] font-semibold uppercase tracking-wider">{isEn ? 'Demo' : 'عرض'}</Badge>;
      case 'in_progress':
        return <Badge className="bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 border border-amber-500/20 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider"><Clock className="w-3 h-3" />{isEn ? 'In Progress' : 'قيد التطوير'}</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden group border border-white/[0.06] hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_60px_rgba(212,168,54,0.1)] flex flex-col h-full">
      {/* Image */}
      <Link href={`/${locale}/projects/${project.slug}`} className="block relative h-52 w-full overflow-hidden shrink-0">
        {project.imageUrl ? (
          <Image 
            src={project.imageUrl} 
            alt={isEn ? project.title.en : project.title.ar} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
          />
        ) : (
          <PlaceholderImage text={isEn ? "Project Preview" : "معاينة المشروع"} className="rounded-none border-0" />
        )}
        {/* Gradient overlay always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex flex-col gap-2 z-10">
          {renderStatusBadge()}
        </div>
        {project.isFeatured && (
          <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10">
            <Badge className="bg-primary/90 text-primary-foreground border-0 text-[10px] font-semibold uppercase tracking-wider shadow-md">
              {isEn ? '★ Featured' : '★ مميز'}
            </Badge>
          </div>
        )}
      </Link>
      
      {/* Body */}
      <div className="p-6 flex flex-col flex-1 bg-white/[0.01]">
        <Link href={`/${locale}/projects/${project.slug}`} className="block mb-2">
          <h3 className="text-base font-bold leading-snug tracking-tight group-hover:text-primary transition-colors duration-300">
            {isEn ? project.title.en : project.title.ar}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-5 flex-1 line-clamp-2 leading-relaxed">
          {isEn ? project.summary.en : project.summary.ar}
        </p>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 4).map(tech => (
            <span key={tech} className="text-[11px] font-medium text-primary/80 bg-primary/8 border border-primary/15 px-2 py-0.5 rounded-md">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[11px] font-medium text-muted-foreground bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-md">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center gap-2">
          <Link 
            href={`/${locale}/projects/${project.slug}`} 
            className="flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-4 rounded-lg bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] hover:border-white/[0.12] text-foreground/80 hover:text-foreground transition-all duration-200"
          >
            {isEn ? 'Case Study' : 'دراسة الحالة'}
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </Link>

          {project.projectStatus === 'live' && project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 hover:shadow-[0_4px_20px_rgba(212,168,54,0.3)]"
            >
              <ExternalLink className="w-3 h-3" />
              {isEn ? 'Visit' : 'زيارة'}
            </a>
          )}

          {project.projectStatus === 'local_demo' && project.demoVideoUrl && (
            <a 
              href={project.demoVideoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold py-2.5 px-4 rounded-lg transition-all duration-200"
            >
              <PlayCircle className="w-3 h-3" />
              {isEn ? 'Demo' : 'العرض'}
            </a>
          )}

          {project.projectStatus === 'private' && (
            <div className="flex-1 flex items-center justify-center gap-2 bg-white/[0.03] text-muted-foreground text-xs font-medium py-2.5 px-4 rounded-lg cursor-help border border-white/[0.06]" title={isEn ? "Available on request" : "متاح عند الطلب"}>
              <Lock className="w-3 h-3" />
              {isEn ? 'On Request' : 'عند الطلب'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
