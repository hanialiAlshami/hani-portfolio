import { requireAdmin } from "@/lib/auth/admin";
import { listSkillCategories } from "@/lib/admin/skills";
import { createSkillAction } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import Link from "next/link";

export default async function NewSkillPage({ params: { locale }, searchParams }: { params: { locale: string }, searchParams?: { error?: string } }) {
  await requireAdmin(locale);
  const isEn = locale === "en";
  const categories = await listSkillCategories();

  let errorMessage = '';
  if (searchParams?.error === 'file-too-large') {
    errorMessage = isEn ? 'Icon file is too large. Maximum size is 2MB.' : 'حجم صورة الأيقونة كبير جدًا. الحد الأقصى 2MB.';
  } else if (searchParams?.error === 'invalid-file-type') {
    errorMessage = isEn ? 'Invalid icon file type. Please upload SVG, PNG, JPG, or WebP.' : 'نوع ملف الأيقونة غير مدعوم. ارفع SVG أو PNG أو JPG أو WebP.';
  } else if (searchParams?.error === 'upload-failed') {
    errorMessage = isEn ? 'Upload failed. Please try again or check permissions.' : 'فشل الرفع. يرجى المحاولة مرة أخرى أو التحقق من الصلاحيات.';
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/${locale}/admin/skills`} className="text-muted-foreground hover:text-primary transition-colors">
          &larr; {isEn ? 'Back to Skills' : 'العودة للمهارات'}
        </Link>
        <h1 className="text-3xl font-bold gold-gradient">{isEn ? 'Add New Skill' : 'إضافة مهارة جديدة'}</h1>
      </div>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      <div className="glass p-8 rounded-xl border border-primary/20">
        <form action={createSkillAction.bind(null, locale)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Name' : 'الاسم'}</label>
              <input name="name" type="text" required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Category' : 'الفئة'}</label>
              <select name="category_id" required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors">
                <option value="">{isEn ? 'Select a category' : 'اختر فئة'}</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {isEn ? cat.name_en : cat.name_ar}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Business Value (English)' : 'قيمة الأعمال (إنجليزية)'}</label>
                <textarea name="business_value_en" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Business Value (Arabic)' : 'قيمة الأعمال (عربية)'}</label>
                <textarea name="business_value_ar" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Icon image' : 'صورة الأيقونة'}</label>
                <input name="icon_file" type="file" accept=".svg,.png,.jpg,.jpeg,.webp" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                <p className="text-xs text-muted-foreground mt-1">{isEn ? 'Upload SVG, PNG, JPG, or WebP. Recommended: square icon, 128x128.' : 'ارفع أيقونة SVG أو PNG أو JPG أو WebP. يفضل أن تكون مربعة 128x128.'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Sort Order' : 'الترتيب'}</label>
                <input name="sort_order" type="number" defaultValue="0" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" name="is_published" id="is_published" defaultChecked className="w-4 h-4 accent-primary" />
              <label htmlFor="is_published" className="text-sm font-medium">{isEn ? 'Published (Active)' : 'منشور (نشط)'}</label>
            </div>
          </div>

          <div className="pt-4 border-t border-primary/10">
            <SubmitButton 
              idleText={isEn ? 'Create Skill' : 'إنشاء مهارة'} 
              pendingText={isEn ? 'Saving...' : 'جاري الحفظ...'}
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
