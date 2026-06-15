"use server";

import { requireAdmin } from "@/lib/auth/admin";
import { updateSiteSettings, uploadSiteAsset } from "@/lib/admin/site-settings";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const settingsSchema = z.object({
  owner_name_en: z.string().optional().or(z.literal('')),
  owner_name_ar: z.string().optional().or(z.literal('')),
  job_title_en: z.string().optional().or(z.literal('')),
  job_title_ar: z.string().optional().or(z.literal('')),
  hero_headline_en: z.string().optional().or(z.literal('')),
  hero_headline_ar: z.string().optional().or(z.literal('')),
  hero_subtitle_en: z.string().optional().or(z.literal('')),
  hero_subtitle_ar: z.string().optional().or(z.literal('')),
  short_bio_en: z.string().optional().or(z.literal('')),
  short_bio_ar: z.string().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  whatsapp: z.string().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  location_en: z.string().optional().or(z.literal('')),
  location_ar: z.string().optional().or(z.literal('')),
  github_url: z.string().url().optional().or(z.literal('')),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  x_url: z.string().url().optional().or(z.literal('')),
  instagram_url: z.string().url().optional().or(z.literal('')),
  facebook_url: z.string().url().optional().or(z.literal('')),
  primary_cta_en: z.string().optional().or(z.literal('')),
  primary_cta_ar: z.string().optional().or(z.literal('')),
  secondary_cta_en: z.string().optional().or(z.literal('')),
  secondary_cta_ar: z.string().optional().or(z.literal('')),
  about_eyebrow_en: z.string().optional().or(z.literal('')),
  about_eyebrow_ar: z.string().optional().or(z.literal('')),
  about_title_en: z.string().optional().or(z.literal('')),
  about_title_ar: z.string().optional().or(z.literal('')),
  about_subtitle_en: z.string().optional().or(z.literal('')),
  about_subtitle_ar: z.string().optional().or(z.literal('')),
  about_story_en: z.string().optional().or(z.literal('')),
  about_story_ar: z.string().optional().or(z.literal('')),
  about_focus_en: z.string().optional().or(z.literal('')),
  about_focus_ar: z.string().optional().or(z.literal('')),
  about_trust_title_en: z.string().optional().or(z.literal('')),
  about_trust_title_ar: z.string().optional().or(z.literal('')),
  about_trust_description_en: z.string().optional().or(z.literal('')),
  about_trust_description_ar: z.string().optional().or(z.literal('')),
  about_value_1_title_en: z.string().optional().or(z.literal('')),
  about_value_1_title_ar: z.string().optional().or(z.literal('')),
  about_value_1_description_en: z.string().optional().or(z.literal('')),
  about_value_1_description_ar: z.string().optional().or(z.literal('')),
  about_value_2_title_en: z.string().optional().or(z.literal('')),
  about_value_2_title_ar: z.string().optional().or(z.literal('')),
  about_value_2_description_en: z.string().optional().or(z.literal('')),
  about_value_2_description_ar: z.string().optional().or(z.literal('')),
  about_value_3_title_en: z.string().optional().or(z.literal('')),
  about_value_3_title_ar: z.string().optional().or(z.literal('')),
  about_value_3_description_en: z.string().optional().or(z.literal('')),
  about_value_3_description_ar: z.string().optional().or(z.literal('')),
  about_value_4_title_en: z.string().optional().or(z.literal('')),
  about_value_4_title_ar: z.string().optional().or(z.literal('')),
  about_value_4_description_en: z.string().optional().or(z.literal('')),
  about_value_4_description_ar: z.string().optional().or(z.literal('')),
  about_achievement_1_icon: z.string().optional().or(z.literal('')),
  about_achievement_1_text_en: z.string().optional().or(z.literal('')),
  about_achievement_1_text_ar: z.string().optional().or(z.literal('')),
  about_achievement_2_icon: z.string().optional().or(z.literal('')),
  about_achievement_2_text_en: z.string().optional().or(z.literal('')),
  about_achievement_2_text_ar: z.string().optional().or(z.literal('')),
  about_achievement_3_icon: z.string().optional().or(z.literal('')),
  about_achievement_3_text_en: z.string().optional().or(z.literal('')),
  about_achievement_3_text_ar: z.string().optional().or(z.literal('')),
  about_achievement_4_icon: z.string().optional().or(z.literal('')),
  about_achievement_4_text_en: z.string().optional().or(z.literal('')),
  about_achievement_4_text_ar: z.string().optional().or(z.literal('')),
});

export async function updateSiteSettingsAction(locale: string, formData: FormData) {
  await requireAdmin(locale);

  try {
    const rawData = Object.fromEntries(formData.entries());
    const dataToValidate: any = {};
    for (const [key, value] of Object.entries(rawData)) {
      if (typeof value === 'string') {
        dataToValidate[key] = value.trim();
      }
    }

    const validated = settingsSchema.parse(dataToValidate);

    const payload: any = {};
    for (const [k, v] of Object.entries(validated)) {
      payload[k] = v === '' ? null : v;
    }

    // Handle files
    const avatarFile = formData.get('avatar_image') as File | null;
    if (avatarFile && avatarFile.size > 0 && avatarFile.name !== 'undefined') {
      if (avatarFile.size > 2 * 1024 * 1024) {
        redirect(`/${locale}/admin/settings?error=avatar-too-large`);
      }
      if (!['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'].includes(avatarFile.type)) {
        redirect(`/${locale}/admin/settings?error=invalid-avatar`);
      }
      try {
        payload.avatar_image_url = await uploadSiteAsset(avatarFile, 'avatars');
      } catch (e) {
        console.error('Avatar upload failed', e);
      }
    }

    const cvFile = formData.get('cv_pdf') as File | null;
    if (cvFile && cvFile.size > 0 && cvFile.name !== 'undefined') {
      if (cvFile.size > 5 * 1024 * 1024) {
        redirect(`/${locale}/admin/settings?error=cv-too-large`);
      }
      if (cvFile.type !== 'application/pdf') {
        redirect(`/${locale}/admin/settings?error=invalid-cv`);
      }
      try {
        payload.cv_url = await uploadSiteAsset(cvFile, 'cv');
      } catch (e) {
        console.error('CV upload failed', e);
      }
    }

    await updateSiteSettings(payload);

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/about`);
    revalidatePath(`/${locale}/contact`);
    revalidatePath(`/${locale}/resume`);

  } catch (error) {
    console.error('Settings update failed:', error);
    if (error instanceof z.ZodError) {
      redirect(`/${locale}/admin/settings?error=update-failed`);
    }
    // Only redirect if it's NOT a NEXT_REDIRECT error
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    redirect(`/${locale}/admin/settings?error=update-failed`);
  }

  redirect(`/${locale}/admin/settings?status=updated`);
}
