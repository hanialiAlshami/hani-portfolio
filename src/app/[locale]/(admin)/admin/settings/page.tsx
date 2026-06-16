import { requireAdmin } from "@/lib/auth/admin";
import { getAdminSiteSettings } from "@/lib/admin/site-settings";
import { updateSiteSettingsAction } from "./actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { AdminNotice } from "@/components/admin/AdminNotice";
import Image from "next/image";

export default async function AdminSettingsPage({ params: { locale }, searchParams }: { params: { locale: string }, searchParams: { status?: string, error?: string } }) {
  const isEn = locale === 'en';
  await requireAdmin(locale);
  const settings = await getAdminSiteSettings();

  const updateAction = updateSiteSettingsAction.bind(null, locale);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{isEn ? 'Site Settings' : 'إعدادات الموقع'}</h1>
          <p className="text-muted-foreground mt-2">
            {isEn ? 'Manage global website content and configurations.' : 'إدارة محتوى وتكوينات الموقع العامة.'}
          </p>
        </div>
      </div>

      {searchParams.status === 'updated' && (
        <AdminNotice tone="success">
          {isEn ? 'Settings updated successfully.' : 'تم تحديث الإعدادات بنجاح.'}
        </AdminNotice>
      )}

      {searchParams.error && (
        <AdminNotice tone="error">
          {searchParams.error === 'avatar-too-large' && (isEn ? 'Avatar image must be under 2MB.' : 'يجب أن تكون صورة الأفاتار أقل من 2 ميغابايت.')}
          {searchParams.error === 'invalid-avatar' && (isEn ? 'Invalid avatar format. Use JPG, PNG, WEBP, or SVG.' : 'تنسيق الأفاتار غير صالح. استخدم JPG أو PNG أو WEBP أو SVG.')}
          {searchParams.error === 'cv-too-large' && (isEn ? 'CV PDF must be under 5MB.' : 'يجب أن يكون ملف السيرة الذاتية أقل من 5 ميغابايت.')}
          {searchParams.error === 'invalid-cv' && (isEn ? 'CV must be a PDF file.' : 'يجب أن تكون السيرة الذاتية ملف PDF.')}
          {searchParams.error === 'update-failed' && (isEn ? 'Settings could not be updated. Please check the inputs.' : 'تعذر تحديث الإعدادات. يرجى التحقق من المدخلات.')}
          {!['avatar-too-large', 'invalid-avatar', 'cv-too-large', 'invalid-cv', 'update-failed'].includes(searchParams.error) && (isEn ? 'Settings could not be updated. Please try again.' : 'تعذر تحديث الإعدادات. حاول مرة أخرى.')}
        </AdminNotice>
      )}

      <form action={updateAction} className="space-y-8 max-w-4xl">
        <div className="glass p-4 sm:p-6 md:p-8 rounded-xl border border-primary/10">
          <h2 className="text-xl font-bold mb-6 gold-gradient">{isEn ? 'Identity' : 'الهوية'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">{isEn ? 'Owner Name (EN)' : 'اسم المالك (بالإنجليزية)'}</label>
              <Input name="owner_name_en" defaultValue={settings?.owner_name_en || ''} placeholder={isEn ? "Example: Hani Alshami" : "مثال: Hani Alshami"} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isEn ? 'Owner Name (AR)' : 'اسم المالك (بالعربية)'}</label>
              <Input name="owner_name_ar" defaultValue={settings?.owner_name_ar || ''} dir="rtl" placeholder={isEn ? "Example: هاني الشامي" : "مثال: هاني الشامي"} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isEn ? 'Job Title (EN)' : 'المسمى الوظيفي (بالإنجليزية)'}</label>
              <Input name="job_title_en" defaultValue={settings?.job_title_en || ''} placeholder={isEn ? "Example: Full Stack Web Developer" : "مثال: Full Stack Web Developer"} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isEn ? 'Job Title (AR)' : 'المسمى الوظيفي (بالعربية)'}</label>
              <Input name="job_title_ar" defaultValue={settings?.job_title_ar || ''} dir="rtl" placeholder={isEn ? "Example: مطور ويب متكامل" : "مثال: مطور ويب متكامل"} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'Short Bio (EN)' : 'نبذة قصيرة (بالإنجليزية)'}</label>
              <p className="text-xs text-muted-foreground">{isEn ? 'A short professional bio used across the site.' : 'نبذة قصيرة مهنية تستخدم عبر الموقع.'}</p>
              <Textarea name="short_bio_en" defaultValue={settings?.short_bio_en || ''} rows={3} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'Short Bio (AR)' : 'نبذة قصيرة (بالعربية)'}</label>
              <p className="text-xs text-muted-foreground">{isEn ? 'A short professional bio in Arabic used across the site.' : 'نبذة قصيرة تظهر في صفحات الموقع.'}</p>
              <Textarea name="short_bio_ar" defaultValue={settings?.short_bio_ar || ''} rows={3} dir="rtl" />
            </div>
          </div>
        </div>

        <div className="glass p-4 sm:p-6 md:p-8 rounded-xl border border-primary/10">
          <h2 className="text-xl font-bold mb-6 gold-gradient">{isEn ? 'Hero Content' : 'محتوى البداية'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'Hero Headline (EN/AR)' : 'عنوان البداية'}</label>
              <p className="text-xs text-muted-foreground">{isEn ? 'Main large headline on the homepage hero.' : 'العنوان الرئيسي الكبير في بداية الصفحة الرئيسية.'}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="hero_headline_en" defaultValue={settings?.hero_headline_en || ''} placeholder="EN" />
                <Input name="hero_headline_ar" defaultValue={settings?.hero_headline_ar || ''} dir="rtl" placeholder="AR" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'Hero Subtitle (EN/AR)' : 'العنوان الفرعي'}</label>
              <p className="text-xs text-muted-foreground">{isEn ? 'Short description under the hero headline.' : 'وصف قصير تحت العنوان الرئيسي.'}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="hero_subtitle_en" defaultValue={settings?.hero_subtitle_en || ''} placeholder="EN" />
                <Input name="hero_subtitle_ar" defaultValue={settings?.hero_subtitle_ar || ''} dir="rtl" placeholder="AR" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'Primary CTA (EN/AR)' : 'الزر الأساسي'}</label>
              <p className="text-xs text-muted-foreground">{isEn ? 'Main button text, e.g. Hire Me.' : 'نص الزر الأساسي، مثلا وظفني.'}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="primary_cta_en" defaultValue={settings?.primary_cta_en || ''} placeholder="EN" />
                <Input name="primary_cta_ar" defaultValue={settings?.primary_cta_ar || ''} dir="rtl" placeholder="AR" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'Secondary CTA (EN/AR)' : 'الزر الثانوي'}</label>
              <p className="text-xs text-muted-foreground">{isEn ? 'Second button text, e.g. View Work.' : 'نص الزر الثانوي، مثلا شاهد أعمالي.'}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="secondary_cta_en" defaultValue={settings?.secondary_cta_en || ''} placeholder="EN" />
                <Input name="secondary_cta_ar" defaultValue={settings?.secondary_cta_ar || ''} dir="rtl" placeholder="AR" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-4 sm:p-6 md:p-8 rounded-xl border border-primary/10">
          <h2 className="text-xl font-bold mb-6 gold-gradient">{isEn ? 'Contact Information' : 'معلومات التواصل'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">{isEn ? 'Email' : 'البريد الإلكتروني'}</label>
              <Input name="email" type="email" defaultValue={settings?.email || ''} dir="ltr" placeholder="contact@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isEn ? 'WhatsApp Number' : 'رقم واتساب'}</label>
              <p className="text-xs text-muted-foreground">{isEn ? 'Use international format without + if the code expects wa.me, e.g. 9677xxxxxxx.' : 'استخدم الصيغة الدولية بدون + لكي يعمل رابط wa.me.'}</p>
              <Input name="whatsapp" defaultValue={settings?.whatsapp || ''} dir="ltr" placeholder="967700000000" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isEn ? 'Phone Number' : 'رقم الهاتف'}</label>
              <Input name="phone" defaultValue={settings?.phone || ''} dir="ltr" placeholder="+967 700 000 000" />
            </div>
            <div className="col-span-1 hidden md:block"></div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isEn ? 'Location (EN)' : 'الموقع (بالإنجليزية)'}</label>
              <Input name="location_en" defaultValue={settings?.location_en || ''} placeholder={isEn ? "Example: Yemen" : "مثال: Yemen"} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{isEn ? 'Location (AR)' : 'الموقع (بالعربية)'}</label>
              <Input name="location_ar" defaultValue={settings?.location_ar || ''} dir="rtl" placeholder={isEn ? "Example: اليمن" : "مثال: اليمن"} />
            </div>
          </div>
        </div>

        <div className="glass p-4 sm:p-6 md:p-8 rounded-xl border border-primary/10">
          <h2 className="text-xl font-bold mb-6 gold-gradient">{isEn ? 'About Page Content' : 'محتوى صفحة نبذة عني'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'About Eyebrow (EN/AR)' : 'النص فوق العنوان'}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="about_eyebrow_en" defaultValue={settings?.about_eyebrow_en || ''} placeholder="EN" />
                <Input name="about_eyebrow_ar" defaultValue={settings?.about_eyebrow_ar || ''} dir="rtl" placeholder="AR" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'About Title (EN/AR)' : 'العنوان الرئيسي'}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="about_title_en" defaultValue={settings?.about_title_en || ''} placeholder="EN" />
                <Input name="about_title_ar" defaultValue={settings?.about_title_ar || ''} dir="rtl" placeholder="AR" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'About Subtitle (EN/AR)' : 'العنوان الفرعي'}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="about_subtitle_en" defaultValue={settings?.about_subtitle_en || ''} placeholder="EN" />
                <Input name="about_subtitle_ar" defaultValue={settings?.about_subtitle_ar || ''} dir="rtl" placeholder="AR" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'Professional Story (EN)' : 'القصة المهنية (بالإنجليزية)'}</label>
              <Textarea name="about_story_en" defaultValue={settings?.about_story_en || ''} rows={4} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'Professional Story (AR)' : 'القصة المهنية (بالعربية)'}</label>
              <Textarea name="about_story_ar" defaultValue={settings?.about_story_ar || ''} rows={4} dir="rtl" />
            </div>

            {/* Values / Core Approach */}
            <div className="space-y-2 md:col-span-2 mt-4 pt-4 border-t border-primary/10">
              <h3 className="text-lg font-bold mb-2">{isEn ? 'Core Values & Approach' : 'القيم الأساسية ومنهجية العمل'}</h3>
              <p className="text-xs text-muted-foreground mb-4">{isEn ? 'Optional values displayed as checkmarks.' : 'قيم اختيارية تعرض كعلامات اختيار.'}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input name="about_value_1_title_en" defaultValue={settings?.about_value_1_title_en || ''} placeholder="Value 1 (EN)" />
                <Input name="about_value_1_title_ar" defaultValue={settings?.about_value_1_title_ar || ''} dir="rtl" placeholder="Value 1 (AR)" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input name="about_value_2_title_en" defaultValue={settings?.about_value_2_title_en || ''} placeholder="Value 2 (EN)" />
                <Input name="about_value_2_title_ar" defaultValue={settings?.about_value_2_title_ar || ''} dir="rtl" placeholder="Value 2 (AR)" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input name="about_value_3_title_en" defaultValue={settings?.about_value_3_title_en || ''} placeholder="Value 3 (EN)" />
                <Input name="about_value_3_title_ar" defaultValue={settings?.about_value_3_title_ar || ''} dir="rtl" placeholder="Value 3 (AR)" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="about_value_4_title_en" defaultValue={settings?.about_value_4_title_en || ''} placeholder="Value 4 (EN)" />
                <Input name="about_value_4_title_ar" defaultValue={settings?.about_value_4_title_ar || ''} dir="rtl" placeholder="Value 4 (AR)" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-4 sm:p-6 md:p-8 rounded-xl border border-primary/10">
          <h2 className="text-xl font-bold mb-6 gold-gradient">{isEn ? 'Achievement Records' : 'سجل الإنجازات'}</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((num) => {
              const iconKey = `about_achievement_${num}_icon` as keyof typeof settings;
              const textEnKey = `about_achievement_${num}_text_en` as keyof typeof settings;
              const textArKey = `about_achievement_${num}_text_ar` as keyof typeof settings;
              return (
                <div key={num} className="p-4 rounded-lg border border-primary/5 space-y-4 bg-background/30">
                  <h3 className="font-semibold text-sm">{isEn ? `Achievement ${num}` : `إنجاز ${num}`}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium">{isEn ? 'Icon Name' : 'اسم الأيقونة'}</label>
                      <Input name={`about_achievement_${num}_icon`} defaultValue={(settings as any)?.[iconKey] || ''} placeholder={isEn ? "e.g., Shield" : "مثال: Shield"} dir="ltr" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">{isEn ? 'Text (EN)' : 'النص (بالإنجليزية)'}</label>
                      <Input name={`about_achievement_${num}_text_en`} defaultValue={(settings as any)?.[textEnKey] || ''} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">{isEn ? 'Text (AR)' : 'النص (بالعربية)'}</label>
                      <Input name={`about_achievement_${num}_text_ar`} defaultValue={(settings as any)?.[textArKey] || ''} dir="rtl" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass p-4 sm:p-6 md:p-8 rounded-xl border border-primary/10">
          <h2 className="text-xl font-bold mb-6 gold-gradient">{isEn ? 'Social Links' : 'روابط التواصل الاجتماعي'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub URL</label>
              <Input name="github_url" type="url" defaultValue={settings?.github_url || ''} dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input name="linkedin_url" type="url" defaultValue={settings?.linkedin_url || ''} dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">X (Twitter) URL</label>
              <Input name="x_url" type="url" defaultValue={settings?.x_url || ''} dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Instagram URL</label>
              <Input name="instagram_url" type="url" defaultValue={settings?.instagram_url || ''} dir="ltr" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Facebook URL</label>
              <Input name="facebook_url" type="url" defaultValue={settings?.facebook_url || ''} dir="ltr" />
            </div>
          </div>
        </div>

        <div className="glass p-4 sm:p-6 md:p-8 rounded-xl border border-primary/10">
          <h2 className="text-xl font-bold mb-6 gold-gradient">{isEn ? 'Files / Assets' : 'الملفات والأصول'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'Avatar Image (Max 2MB)' : 'صورة شخصية (الحد الأقصى 2 ميغابايت)'}</label>
              <p className="text-xs text-muted-foreground">{isEn ? 'Optional regular profile image used on public pages when available.' : 'صورة شخصية عادية اختيارية تظهر في الصفحات العامة عند توفرها.'}</p>
              <Input name="avatar_image" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" />
              {settings?.avatar_image_url && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">{isEn ? 'Current avatar is uploaded:' : 'الصورة الحالية مرفوعة:'}</p>
                  <Image src={settings.avatar_image_url} alt="Current avatar" width={64} height={64} className="w-16 h-16 rounded-full object-cover border border-primary/20" />
                  <a href={settings.avatar_image_url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-xs text-primary hover:underline">
                    {isEn ? 'Open current avatar' : 'فتح الصورة الحالية'}
                  </a>
                </div>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">{isEn ? 'CV / Resume PDF (Max 5MB)' : 'السيرة الذاتية PDF (الحد الأقصى 5 ميغابايت)'}</label>
              <p className="text-xs text-muted-foreground">{isEn ? 'Upload your latest CV as PDF.' : 'ارفع أحدث سيرة ذاتية بصيغة PDF.'}</p>
              <Input name="cv_pdf" type="file" accept="application/pdf" />
              {settings?.cv_url && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">{isEn ? 'Current CV is uploaded:' : 'السيرة الذاتية الحالية مرفوعة:'}</p>
                  <a href={settings.cv_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    {isEn ? 'View Current CV' : 'عرض السيرة الذاتية الحالية'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border/30">
          <SubmitButton
            idleText={isEn ? "Save Settings" : "حفظ الإعدادات"}
            pendingText={isEn ? "Saving..." : "جاري الحفظ..."}
          />
        </div>
      </form>
    </div>
  );
}
