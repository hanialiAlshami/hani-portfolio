import { createClient } from '../supabase/server';
import { 
  projects as localProjects, 
  services as localServices, 
  skills as localSkills, 
  skillCategories as localSkillCategories,
  resumeSections as localResumeSections
} from '@/data/seed';
import { Project, Service, Skill, SkillCategory, ResumeSection } from '@/types';

/**
 * Data Access Layer
 * 
 * Safely fetches data from Supabase if configured.
 * If Supabase is missing or the fetch fails, it automatically falls back
 * to the local seed data in `src/data/seed.ts`.
 */

export async function getProjects(): Promise<Project[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!projectsError && projectsData && projectsData.length > 0) {
        // Fetch gallery images separately to avoid relation name issues
        const { data: imagesData, error: imagesError } = await supabase
          .from('project_images')
          .select('*')
          .order('sort_order', { ascending: true });

        const images = !imagesError && imagesData ? imagesData : [];

        return projectsData.map(p => {
          const projectImages = images.filter(img => img.project_id === p.id);
          
          return {
            id: p.id,
            slug: p.slug,
            title: { ar: p.title_ar, en: p.title_en },
            summary: { ar: p.summary_ar, en: p.summary_en },
            problem: { ar: p.problem_ar, en: p.problem_en },
            goal: { ar: p.goal_ar, en: p.goal_en },
            solution: { ar: p.solution_ar, en: p.solution_en },
            role: { ar: p.role_ar, en: p.role_en },
            challenges: { ar: p.challenges_ar, en: p.challenges_en },
            results: { ar: p.results_ar, en: p.results_en },
            techStack: p.tech_stack || [],
            liveUrl: p.live_url,
            githubUrl: p.github_url,
            demoVideoUrl: p.demo_video_url,
            projectStatus: p.project_status || 'private',
            projectLanguages: p.project_languages || [],
            projectFrameworks: p.project_frameworks || [],
            projectTools: p.project_tools || [],
            projectPlatforms: p.project_platforms || [],
            isFeatured: p.is_featured,
            imageUrl: p.image_url,
            categoryIds: [],
            order: p.sort_order,
            gallery: projectImages.map((img: any) => ({
              id: img.id,
              projectId: img.project_id,
              imageUrl: img.image_url,
              alt: { ar: img.alt_ar || '', en: img.alt_en || '' },
              caption: { ar: img.caption_ar || '', en: img.caption_en || '' },
              sortOrder: img.sort_order
            }))
          };
        });
      }
    } catch (e) {
      console.warn('Supabase fetch failed for projects, falling back to local seed data.', e);
    }
  }
  return localProjects;
}

export async function getServices(): Promise<Service[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('services').select('*').eq('is_published', true).order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map(s => ({
          id: s.id,
          title: { ar: s.title_ar, en: s.title_en },
          excerpt: { ar: s.excerpt_ar, en: s.excerpt_en },
          description: { ar: s.description_ar, en: s.description_en },
          iconClass: s.icon,
          expectedResult: { ar: s.expected_result_ar, en: s.expected_result_en },
          relatedTech: s.related_tech || [],
          order: s.sort_order
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed for services, falling back to local seed data.');
    }
  }
  return localServices;
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('skills').select('*').eq('is_published', true).order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map(s => ({
          id: s.id,
          categoryId: s.category_id,
          name: s.name,
          iconClass: s.icon,
          businessValue: { ar: s.business_value_ar, en: s.business_value_en },
          order: s.sort_order
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed for skills, falling back to local seed data.');
    }
  }
  return localSkills;
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('skill_categories').select('*').eq('is_published', true).order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map(c => ({
          id: c.id,
          name: { ar: c.name_ar, en: c.name_en },
          order: c.sort_order
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed for skill categories, falling back to local seed data.');
    }
  }
  return localSkillCategories;
}

export async function getResumeSections(): Promise<ResumeSection[]> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('resume_sections').select('*').eq('is_published', true).order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map(r => ({
          id: r.id,
          type: r.type as 'experience' | 'education' | 'certification',
          title: { ar: r.title_ar, en: r.title_en },
          organization: { ar: r.organization_ar, en: r.organization_en },
          startDate: r.start_date,
          endDate: r.end_date,
          isCurrent: r.is_current,
          description: { ar: r.description_ar, en: r.description_en },
          order: r.sort_order
        }));
      }
    } catch (e) {
      console.warn('Supabase fetch failed for resume sections, falling back to local seed data.');
    }
  }
  return localResumeSections;
}
