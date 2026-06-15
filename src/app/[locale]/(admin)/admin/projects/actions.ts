"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createProject, updateProject, deleteProject, getAdminProjectById, addProjectImage, deleteProjectImage, getProjectImageById, updateProjectImage, getNextProjectImageSortOrder } from "@/lib/admin/projects";
import { requireAdmin } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

const projectSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  title_ar: z.string().min(1, "Title (AR) is required"),
  title_en: z.string().min(1, "Title (EN) is required"),
  summary_ar: z.string().min(1, "Summary (AR) is required"),
  summary_en: z.string().min(1, "Summary (EN) is required"),
  problem_ar: z.string().min(1, "Problem (AR) is required"),
  problem_en: z.string().min(1, "Problem (EN) is required"),
  goal_ar: z.string().min(1, "Goal (AR) is required"),
  goal_en: z.string().min(1, "Goal (EN) is required"),
  solution_ar: z.string().min(1, "Solution (AR) is required"),
  solution_en: z.string().min(1, "Solution (EN) is required"),
  role_ar: z.string().min(1, "Role (AR) is required"),
  role_en: z.string().min(1, "Role (EN) is required"),
  challenges_ar: z.string().min(1, "Challenges (AR) is required"),
  challenges_en: z.string().min(1, "Challenges (EN) is required"),
  results_ar: z.string().min(1, "Results (AR) is required"),
  results_en: z.string().min(1, "Results (EN) is required"),
  tech_stack: z.array(z.string()).default([]),
  live_url: z.string().optional().nullable(),
  github_url: z.string().optional().nullable(),
  demo_video_url: z.string().optional().nullable(),
  project_status: z.enum(['live', 'private', 'local_demo', 'in_progress']).default('private'),
  project_languages: z.array(z.string()).default([]),
  project_frameworks: z.array(z.string()).default([]),
  project_tools: z.array(z.string()).default([]),
  project_platforms: z.array(z.string()).default([]),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
  sort_order: z.coerce.number().default(0),
});

async function uploadCover(file: File | null): Promise<{ url?: string; error?: string } | null> {
  if (!file || file.size === 0) return null;

  const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { error: 'invalid-file-type' };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { error: 'file-too-large' };
  }

  const supabase = createClient();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  const ext = file.name.split('.').pop() || 'png';
  const filename = `${crypto.randomUUID()}.${ext}`;
  const filePath = `covers/${filename}`;

  const { error } = await supabase.storage
    .from('portfolio-projects')
    .upload(filePath, file);

  if (error) {
    console.error("Storage upload error:", error);
    return { error: 'upload-failed' };
  }

  const { data } = supabase.storage
    .from('portfolio-projects')
    .getPublicUrl(filePath);

  return { url: data.publicUrl };
}

function generateSlug(title: string): string {
  return title.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');
}

export async function createProjectAction(locale: string, formData: FormData) {
  await requireAdmin(locale);

  let slug = formData.get("slug") as string;
  const title_en = formData.get("title_en") as string;
  if (!slug || slug.trim() === '') {
    slug = generateSlug(title_en);
  }

  const techStackString = formData.get("tech_stack") as string;
  const tech_stack = techStackString ? techStackString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const languagesString = formData.get("project_languages") as string;
  const project_languages = languagesString ? languagesString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const frameworksString = formData.get("project_frameworks") as string;
  const project_frameworks = frameworksString ? frameworksString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const toolsString = formData.get("project_tools") as string;
  const project_tools = toolsString ? toolsString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const platformsString = formData.get("project_platforms") as string;
  const project_platforms = platformsString ? platformsString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const data: any = {
    slug,
    title_ar: formData.get("title_ar"),
    title_en: title_en,
    summary_ar: formData.get("summary_ar"),
    summary_en: formData.get("summary_en"),
    problem_ar: formData.get("problem_ar"),
    problem_en: formData.get("problem_en"),
    goal_ar: formData.get("goal_ar"),
    goal_en: formData.get("goal_en"),
    solution_ar: formData.get("solution_ar"),
    solution_en: formData.get("solution_en"),
    role_ar: formData.get("role_ar"),
    role_en: formData.get("role_en"),
    challenges_ar: formData.get("challenges_ar"),
    challenges_en: formData.get("challenges_en"),
    results_ar: formData.get("results_ar"),
    results_en: formData.get("results_en"),
    tech_stack: tech_stack,
    live_url: formData.get("live_url") || null,
    github_url: formData.get("github_url") || null,
    demo_video_url: formData.get("demo_video_url") || null,
    project_status: formData.get("project_status") || 'private',
    project_languages,
    project_frameworks,
    project_tools,
    project_platforms,
    is_featured: formData.get("is_featured") === "true" || formData.get("is_featured") === "on",
    is_published: formData.get("is_published") === "true" || formData.get("is_published") === "on",
    sort_order: formData.get("sort_order") || 0,
  };

  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    redirect(`/${locale}/admin/projects/new?error=validation-failed`);
  }

  const finalData = { ...parsed.data };

  const coverFile = formData.get("cover_image") as File | null;
  if (coverFile && coverFile.size > 0) {
    const uploadResult = await uploadCover(coverFile);
    if (uploadResult?.error) {
      redirect(`/${locale}/admin/projects/new?error=${uploadResult.error}`);
    }
    if (uploadResult?.url) {
      (finalData as any).image_url = uploadResult.url;
    }
  }

  try {
    await createProject(finalData);
  } catch (err: any) {
    if (err.message?.includes('projects_slug_key')) {
        redirect(`/${locale}/admin/projects/new?error=slug-exists`);
    } else if (err.message?.includes('row-level security') || err.message?.includes('rls')) {
        redirect(`/${locale}/admin/projects/new?error=rls-blocked`);
    } else {
        redirect(`/${locale}/admin/projects/new?error=create-failed`);
    }
  }

  revalidatePath(`/${locale}/admin/projects`);
  revalidatePath(`/${locale}/projects`);
  redirect(`/${locale}/admin/projects?status=created`);
}

export async function updateProjectAction(id: string, locale: string, formData: FormData) {
  await requireAdmin(locale);

  let slug = formData.get("slug") as string;
  const title_en = formData.get("title_en") as string;
  if (!slug || slug.trim() === '') {
    slug = generateSlug(title_en);
  }

  const techStackString = formData.get("tech_stack") as string;
  const tech_stack = techStackString ? techStackString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const languagesString = formData.get("project_languages") as string;
  const project_languages = languagesString ? languagesString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const frameworksString = formData.get("project_frameworks") as string;
  const project_frameworks = frameworksString ? frameworksString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const toolsString = formData.get("project_tools") as string;
  const project_tools = toolsString ? toolsString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const platformsString = formData.get("project_platforms") as string;
  const project_platforms = platformsString ? platformsString.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const data: any = {
    slug,
    title_ar: formData.get("title_ar"),
    title_en: title_en,
    summary_ar: formData.get("summary_ar"),
    summary_en: formData.get("summary_en"),
    problem_ar: formData.get("problem_ar"),
    problem_en: formData.get("problem_en"),
    goal_ar: formData.get("goal_ar"),
    goal_en: formData.get("goal_en"),
    solution_ar: formData.get("solution_ar"),
    solution_en: formData.get("solution_en"),
    role_ar: formData.get("role_ar"),
    role_en: formData.get("role_en"),
    challenges_ar: formData.get("challenges_ar"),
    challenges_en: formData.get("challenges_en"),
    results_ar: formData.get("results_ar"),
    results_en: formData.get("results_en"),
    tech_stack: tech_stack,
    live_url: formData.get("live_url") || null,
    github_url: formData.get("github_url") || null,
    demo_video_url: formData.get("demo_video_url") || null,
    project_status: formData.get("project_status") || 'private',
    project_languages,
    project_frameworks,
    project_tools,
    project_platforms,
    is_featured: formData.get("is_featured") === "true" || formData.get("is_featured") === "on",
    is_published: formData.get("is_published") === "true" || formData.get("is_published") === "on",
    sort_order: formData.get("sort_order") || 0,
  };

  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) {
    redirect(`/${locale}/admin/projects/${id}/edit?error=validation-failed`);
  }

  const finalData = { ...parsed.data };

  const coverFile = formData.get("cover_image") as File | null;
  if (coverFile && coverFile.size > 0) {
    const uploadResult = await uploadCover(coverFile);
    if (uploadResult?.error) {
      redirect(`/${locale}/admin/projects/${id}/edit?error=${uploadResult.error}`);
    }
    if (uploadResult?.url) {
      (finalData as any).image_url = uploadResult.url;
    }
  }

  try {
    await updateProject(id, finalData);
  } catch (err: any) {
    if (err.message?.includes('projects_slug_key')) {
        redirect(`/${locale}/admin/projects/${id}/edit?error=slug-exists`);
    } else if (err.message?.includes('row-level security') || err.message?.includes('rls')) {
        redirect(`/${locale}/admin/projects/${id}/edit?error=rls-blocked`);
    } else {
        redirect(`/${locale}/admin/projects/${id}/edit?error=update-failed`);
    }
  }

  revalidatePath(`/${locale}/admin/projects`);
  revalidatePath(`/${locale}/projects`);
  revalidatePath(`/${locale}/projects/${parsed.data.slug}`);
  redirect(`/${locale}/admin/projects?status=updated`);
}

export async function deleteProjectAction(id: string, locale: string) {
  await requireAdmin(locale);
  try {
    await deleteProject(id);
  } catch (err: any) {
    if (err.message?.includes('row-level security') || err.message?.includes('rls')) {
        redirect(`/${locale}/admin/projects?error=rls-blocked`);
    } else {
        redirect(`/${locale}/admin/projects?error=delete-failed`);
    }
  }

  revalidatePath(`/${locale}/admin/projects`);
  revalidatePath(`/${locale}/projects`);
  redirect(`/${locale}/admin/projects?status=deleted`);
}

const MAX_GALLERY_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadProjectGalleryImageAction(projectId: string, locale: string, formData: FormData) {
  await requireAdmin(locale);

  const supabase = createClient();
  if (!supabase) {
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-upload-failed`);
  }

  let project;
  try {
    project = await getAdminProjectById(projectId);
  } catch (err) {
    redirect(`/${locale}/admin/projects?error=not-found`);
  }

  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) {
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-invalid-file`);
  }

  const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-invalid-file`);
  }

  if (file.size > MAX_GALLERY_IMAGE_SIZE) {
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-file-too-large`);
  }

  const ext = file.name.split('.').pop() || 'png';
  const filename = `${crypto.randomUUID()}.${ext}`;
  const filePath = `gallery/${project.slug}-${filename}`;

  const { error: uploadError } = await supabase.storage
    .from('portfolio-projects')
    .upload(filePath, file);

  if (uploadError) {
    if (uploadError.message?.includes('row-level security') || uploadError.message?.includes('rls')) {
      redirect(`/${locale}/admin/projects/${projectId}/edit?error=rls-blocked`);
    }
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-upload-failed`);
  }

  const { data } = supabase.storage
    .from('portfolio-projects')
    .getPublicUrl(filePath);

  let sortOrder = formData.get("sort_order") ? Number(formData.get("sort_order")) : 0;
  if (!sortOrder || sortOrder < 1) {
    sortOrder = await getNextProjectImageSortOrder(projectId);
  }

  const newImage = {
    project_id: projectId,
    image_url: data.publicUrl,
    alt_en: formData.get("alt_en") || null,
    alt_ar: formData.get("alt_ar") || null,
    caption_en: formData.get("caption_en") || null,
    caption_ar: formData.get("caption_ar") || null,
    sort_order: sortOrder,
  };

  try {
    await addProjectImage(newImage);
  } catch (err: any) {
    console.error('[Gallery DB Save Failed]', {
      projectId,
      imageUrl: data.publicUrl,
      error: err
    });
    if (err.message?.includes('row-level security') || err.message?.includes('rls')) {
      redirect(`/${locale}/admin/projects/${projectId}/edit?error=rls-blocked`);
    }
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-save-failed`);
  }

  revalidatePath(`/${locale}/admin/projects/${projectId}/edit`);
  revalidatePath(`/${locale}/projects/${project.slug}`);
  redirect(`/${locale}/admin/projects/${projectId}/edit?status=gallery-uploaded`);
}

export async function deleteProjectGalleryImageAction(projectId: string, imageId: string, locale: string) {
  await requireAdmin(locale);
  
  let project;
  try {
    project = await getAdminProjectById(projectId);
  } catch (err) {
    redirect(`/${locale}/admin/projects?error=not-found`);
  }

  try {
    await deleteProjectImage(imageId);
  } catch (err: any) {
    if (err.message?.includes('row-level security') || err.message?.includes('rls')) {
        redirect(`/${locale}/admin/projects/${projectId}/edit?error=rls-blocked`);
    }
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-delete-failed`);
  }

  revalidatePath(`/${locale}/admin/projects/${projectId}/edit`);
  revalidatePath(`/${locale}/projects/${project.slug}`);
  redirect(`/${locale}/admin/projects/${projectId}/edit?status=gallery-deleted`);
}

export async function updateProjectGalleryImageAction(imageId: string, projectId: string, locale: string, formData: FormData) {
  await requireAdmin(locale);
  
  let project;
  try {
    project = await getAdminProjectById(projectId);
  } catch (err) {
    redirect(`/${locale}/admin/projects?error=not-found`);
  }

  let existingImage;
  try {
    existingImage = await getProjectImageById(imageId);
  } catch (err) {
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-update-failed`);
  }

  if (existingImage.project_id !== projectId) {
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-update-failed`);
  }

  let sortOrder = formData.get("sort_order") ? Number(formData.get("sort_order")) : 0;
  if (!sortOrder || sortOrder < 1) {
    sortOrder = existingImage.sort_order;
  }

  const payload = {
    alt_en: formData.get("alt_en") || null,
    alt_ar: formData.get("alt_ar") || null,
    caption_en: formData.get("caption_en") || null,
    caption_ar: formData.get("caption_ar") || null,
    sort_order: sortOrder,
  };

  try {
    await updateProjectImage(imageId, payload);
  } catch (err: any) {
    if (err.message?.includes('row-level security') || err.message?.includes('rls')) {
      redirect(`/${locale}/admin/projects/${projectId}/edit?error=rls-blocked`);
    }
    redirect(`/${locale}/admin/projects/${projectId}/edit?error=gallery-update-failed`);
  }

  revalidatePath(`/${locale}/admin/projects/${projectId}/edit`);
  revalidatePath(`/${locale}/projects/${project.slug}`);
  redirect(`/${locale}/admin/projects/${projectId}/edit?status=gallery-updated`);
}
