"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createService, updateService, deleteService } from "@/lib/admin/services";
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

const serviceSchema = z.object({
  title_ar: z.string().min(1, "Title (AR) is required"),
  title_en: z.string().min(1, "Title (EN) is required"),
  excerpt_ar: z.string().min(1, "Excerpt (AR) is required"),
  excerpt_en: z.string().min(1, "Excerpt (EN) is required"),
  description_ar: z.string().min(1, "Description (AR) is required"),
  description_en: z.string().min(1, "Description (EN) is required"),
  icon: z.string().optional().nullable(),
  expected_result_ar: z.string().min(1, "Expected result (AR) is required"),
  expected_result_en: z.string().min(1, "Expected result (EN) is required"),
  is_published: z.boolean().default(true),
  sort_order: z.coerce.number().default(0),
});

export async function createServiceAction(locale: string, formData: FormData) {
  await requireAdmin(locale);

  const data: any = {
    title_ar: formData.get("title_ar"),
    title_en: formData.get("title_en"),
    excerpt_ar: formData.get("excerpt_ar"),
    excerpt_en: formData.get("excerpt_en"),
    description_ar: formData.get("description_ar"),
    description_en: formData.get("description_en"),
    expected_result_ar: formData.get("expected_result_ar"),
    expected_result_en: formData.get("expected_result_en"),
    is_published: formData.get("is_published") === "true" || formData.get("is_published") === "on",
    sort_order: formData.get("sort_order") || 0,
  };

  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  const finalData = { ...parsed.data };

  const iconFile = formData.get("icon_file") as File | null;
  if (iconFile && iconFile.size > 0) {
    const uploadResult = await uploadIcon(iconFile, "services");
    if (uploadResult?.error) {
      redirect(`/${locale}/admin/services/new?error=${uploadResult.error}`);
    }
    if (uploadResult?.url) {
      finalData.icon = uploadResult.url;
    }
  }

  try {
    await createService(finalData);
  } catch (err: any) {
    throw new Error(err.message);
  }

  revalidatePath(`/${locale}/admin/services`);
  revalidatePath(`/${locale}/services`);
  redirect(`/${locale}/admin/services?status=created`);
}

export async function updateServiceAction(id: string, locale: string, formData: FormData) {
  await requireAdmin(locale);

  const data: any = {
    title_ar: formData.get("title_ar"),
    title_en: formData.get("title_en"),
    excerpt_ar: formData.get("excerpt_ar"),
    excerpt_en: formData.get("excerpt_en"),
    description_ar: formData.get("description_ar"),
    description_en: formData.get("description_en"),
    expected_result_ar: formData.get("expected_result_ar"),
    expected_result_en: formData.get("expected_result_en"),
    is_published: formData.get("is_published") === "true" || formData.get("is_published") === "on",
    sort_order: formData.get("sort_order") || 0,
  };

  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  const finalData = { ...parsed.data };

  const iconFile = formData.get("icon_file") as File | null;
  if (iconFile && iconFile.size > 0) {
    const uploadResult = await uploadIcon(iconFile, "services");
    if (uploadResult?.error) {
      redirect(`/${locale}/admin/services/${id}/edit?error=${uploadResult.error}`);
    }
    if (uploadResult?.url) {
      finalData.icon = uploadResult.url;
    }
  }

  try {
    await updateService(id, finalData);
  } catch (err: any) {
    throw new Error(err.message);
  }

  revalidatePath(`/${locale}/admin/services`);
  revalidatePath(`/${locale}/services`);
  redirect(`/${locale}/admin/services?status=updated`);
}

export async function deleteServiceAction(id: string, locale: string) {
  try {
    await deleteService(id);
  } catch (err: any) {
    throw new Error(err.message);
  }

  revalidatePath(`/${locale}/admin/services`);
  revalidatePath(`/${locale}/services`);
  redirect(`/${locale}/admin/services?status=deleted`);
}
