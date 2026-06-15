"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSkill, updateSkill, deleteSkill } from "@/lib/admin/skills";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

async function uploadIcon(file: File | null, folder: string): Promise<{ url?: string; error?: string } | null> {
  if (!file || file.size === 0) return null;

  const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { error: 'invalid-file-type' };
  }

  if (file.size > 2 * 1024 * 1024) {
    return { error: 'file-too-large' };
  }

  const supabase = createClient();
  if (!supabase) {
    throw new Error("Supabase is not configured. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  const ext = file.name.split('.').pop() || 'png';
  const filename = `${crypto.randomUUID()}.${ext}`;
  const filePath = `${folder}/${filename}`;

  const { error } = await supabase.storage
    .from('portfolio-icons')
    .upload(filePath, file);

  if (error) {
    console.error("Storage upload error:", error);
    return { error: 'upload-failed' };
  }

  const { data } = supabase.storage
    .from('portfolio-icons')
    .getPublicUrl(filePath);

  return { url: data.publicUrl };
}

const skillSchema = z.object({
  category_id: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  icon: z.string().optional().nullable(),
  business_value_ar: z.string().min(1, "Business value (AR) is required"),
  business_value_en: z.string().min(1, "Business value (EN) is required"),
  is_published: z.boolean().default(true),
  sort_order: z.coerce.number().default(0),
});

export async function createSkillAction(locale: string, formData: FormData) {
  await requireAdmin(locale);

  const data: any = {
    category_id: formData.get("category_id"),
    name: formData.get("name"),
    business_value_ar: formData.get("business_value_ar"),
    business_value_en: formData.get("business_value_en"),
    is_published: formData.get("is_published") === "true" || formData.get("is_published") === "on",
    sort_order: formData.get("sort_order") || 0,
  };

  const parsed = skillSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  const finalData = { ...parsed.data };

  const iconFile = formData.get("icon_file") as File | null;
  if (iconFile && iconFile.size > 0) {
    const uploadResult = await uploadIcon(iconFile, "skills");
    if (uploadResult?.error) {
      redirect(`/${locale}/admin/skills/new?error=${uploadResult.error}`);
    }
    if (uploadResult?.url) {
      finalData.icon = uploadResult.url;
    }
  }

  try {
    await createSkill(finalData);
  } catch (err: any) {
    throw new Error(err.message);
  }

  revalidatePath(`/${locale}/admin/skills`);
  revalidatePath(`/${locale}/skills`);
  redirect(`/${locale}/admin/skills?status=created`);
}

export async function updateSkillAction(id: string, locale: string, formData: FormData) {
  await requireAdmin(locale);

  const data: any = {
    category_id: formData.get("category_id"),
    name: formData.get("name"),
    business_value_ar: formData.get("business_value_ar"),
    business_value_en: formData.get("business_value_en"),
    is_published: formData.get("is_published") === "true" || formData.get("is_published") === "on",
    sort_order: formData.get("sort_order") || 0,
  };

  const parsed = skillSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  const finalData = { ...parsed.data };

  const iconFile = formData.get("icon_file") as File | null;
  if (iconFile && iconFile.size > 0) {
    const uploadResult = await uploadIcon(iconFile, "skills");
    if (uploadResult?.error) {
      redirect(`/${locale}/admin/skills/${id}/edit?error=${uploadResult.error}`);
    }
    if (uploadResult?.url) {
      finalData.icon = uploadResult.url;
    }
  }

  try {
    await updateSkill(id, finalData);
  } catch (err: any) {
    throw new Error(err.message);
  }

  revalidatePath(`/${locale}/admin/skills`);
  revalidatePath(`/${locale}/skills`);
  redirect(`/${locale}/admin/skills?status=updated`);
}

export async function deleteSkillAction(id: string, locale: string) {
  try {
    await deleteSkill(id);
  } catch (err: any) {
    throw new Error(err.message);
  }

  revalidatePath(`/${locale}/admin/skills`);
  revalidatePath(`/${locale}/skills`);
  redirect(`/${locale}/admin/skills?status=deleted`);
}
