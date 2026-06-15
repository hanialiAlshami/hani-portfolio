import { requireAdmin } from "@/lib/auth/admin";
import { createProjectAction } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { AdminNotice } from "@/components/admin/AdminNotice";
import Link from "next/link";

export default async function NewProjectPage({ params: { locale }, searchParams }: { params: { locale: string }, searchParams: { error?: string } }) {
  await requireAdmin(locale);
  const isEn = locale === "en";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/${locale}/admin/projects`} className="text-muted-foreground hover:text-primary transition-colors">
          &larr; {isEn ? 'Back to Projects' : 'العودة للمشاريع'}
        </Link>
        <h1 className="text-3xl font-bold gold-gradient">{isEn ? 'Add New Project' : 'إضافة مشروع جديد'}</h1>
      </div>

      <div className="glass p-8 rounded-xl border border-primary/20">
        {searchParams.error && (
          <AdminNotice tone="error" className="mb-6">
            {searchParams.error === 'rls-blocked' && (isEn ? 'You do not have permission to create projects. Please check admin permissions.' : 'لا تملك صلاحية إضافة المشاريع. تحقق من صلاحيات الأدمن.')}
            {searchParams.error === 'create-failed' && (isEn ? 'Project creation failed. Please try again.' : 'فشل إنشاء المشروع. حاول مرة أخرى.')}
            {searchParams.error === 'slug-exists' && (isEn ? 'A project with this slug already exists.' : 'يوجد مشروع بهذا الرابط مسبقاً.')}
            {searchParams.error === 'validation-failed' && (isEn ? 'Validation failed. Please check the inputs.' : 'فشل التحقق. يرجى التحقق من المدخلات.')}
            {searchParams.error === 'invalid-file-type' && (isEn ? 'Invalid file type.' : 'نوع الملف غير صالح.')}
            {searchParams.error === 'file-too-large' && (isEn ? 'File too large.' : 'الملف كبير جداً.')}
            {searchParams.error === 'upload-failed' && (isEn ? 'Cover image upload failed.' : 'فشل رفع صورة الغلاف.')}
            {!['rls-blocked', 'create-failed', 'slug-exists', 'validation-failed', 'invalid-file-type', 'file-too-large', 'upload-failed'].includes(searchParams.error) && (isEn ? 'Something went wrong. Please try again.' : 'حدث خطأ ما. حاول مرة أخرى.')}
          </AdminNotice>
        )}
        <form action={createProjectAction.bind(null, locale)} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Title (English)' : 'العنوان (إنجليزية)'}</label>
              <input name="title_en" type="text" required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Title (Arabic)' : 'العنوان (عربية)'}</label>
              <input name="title_ar" type="text" required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Slug' : 'الرابط (Slug)'}</label>
              <input name="slug" type="text" placeholder={isEn ? 'Leave empty to auto-generate from Title' : 'اتركه فارغاً ليتم توليده تلقائياً من العنوان'} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Project Status' : 'حالة المشروع'}</label>
              <select name="project_status" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors">
                <option value="private">{isEn ? 'Private / Confidential' : 'خاص / سري'}</option>
                <option value="live">{isEn ? 'Live Public Project' : 'مشروع حي عام'}</option>
                <option value="local_demo">{isEn ? 'Local / Internal Demo' : 'عرض محلي / داخلي'}</option>
                <option value="in_progress">{isEn ? 'In Progress' : 'قيد التطوير'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Summary (English)' : 'ملخص (إنجليزية)'}</label>
              <textarea name="summary_en" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Summary (Arabic)' : 'ملخص (عربية)'}</label>
              <textarea name="summary_ar" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Problem (English)' : 'المشكلة (إنجليزية)'}</label>
              <textarea name="problem_en" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Problem (Arabic)' : 'المشكلة (عربية)'}</label>
              <textarea name="problem_ar" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Goal (English)' : 'الهدف (إنجليزية)'}</label>
              <textarea name="goal_en" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Goal (Arabic)' : 'الهدف (عربية)'}</label>
              <textarea name="goal_ar" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Solution (English)' : 'الحل (إنجليزية)'}</label>
              <textarea name="solution_en" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Solution (Arabic)' : 'الحل (عربية)'}</label>
              <textarea name="solution_ar" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Role (English)' : 'الدور (إنجليزية)'}</label>
              <input name="role_en" type="text" required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Role (Arabic)' : 'الدور (عربية)'}</label>
              <input name="role_ar" type="text" required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Challenges (English)' : 'التحديات (إنجليزية)'}</label>
              <textarea name="challenges_en" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Challenges (Arabic)' : 'التحديات (عربية)'}</label>
              <textarea name="challenges_ar" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Results (English)' : 'النتائج (إنجليزية)'}</label>
              <textarea name="results_en" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Results (Arabic)' : 'النتائج (عربية)'}</label>
              <textarea name="results_ar" required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-primary/10">
            <h2 className="text-xl font-bold mb-4 gold-gradient">{isEn ? 'Links & Media' : 'الروابط والوسائط'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Live URL' : 'رابط المشروع الحي'}</label>
                <input name="live_url" type="url" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'GitHub URL' : 'رابط GitHub'}</label>
                <input name="github_url" type="url" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Demo Video URL' : 'رابط فيديو العرض'}</label>
                <input name="demo_video_url" type="url" placeholder="YouTube, Vimeo, etc." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
                <p className="text-xs text-muted-foreground mt-1">{isEn ? 'Recommended for local/private projects' : 'موصى به للمشاريع المحلية/الخاصة'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Cover Image' : 'صورة الغلاف'}</label>
                <input name="cover_image" type="file" accept="image/png, image/jpeg, image/webp, image/svg+xml" className="w-full bg-background border border-primary/20 rounded-md px-4 py-1.5 focus:outline-none focus:border-primary transition-colors" />
                <p className="text-xs text-muted-foreground mt-1">{isEn ? 'Max 5MB. PNG, JPG, WebP.' : 'الحد الأقصى 5 ميغابايت. PNG, JPG, WebP.'}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-primary/10">
            <h2 className="text-xl font-bold mb-4 gold-gradient">{isEn ? 'Technologies & Depth' : 'التقنيات والعمق'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Languages' : 'لغات البرمجة'}</label>
                <input name="project_languages" type="text" placeholder="TypeScript, Python..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
                <p className="text-xs text-muted-foreground mt-1">{isEn ? 'Comma separated' : 'مفصول بفاصلة'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Frameworks' : 'أطر العمل'}</label>
                <input name="project_frameworks" type="text" placeholder="Next.js, Laravel..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Tools & Services' : 'الأدوات والخدمات'}</label>
                <input name="project_tools" type="text" placeholder="Supabase, Docker..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Platforms' : 'المنصات'}</label>
                <input name="project_platforms" type="text" placeholder="Web, iOS..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Legacy Tech Stack (Card summary)' : 'ملخص التقنيات (للبطاقة)'}</label>
                <input name="tech_stack" type="text" placeholder="React, Node.js, ..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Sort Order' : 'الترتيب'}</label>
            <input name="sort_order" type="number" defaultValue="0" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_published" id="is_published" defaultChecked className="w-4 h-4 accent-primary" />
              <label htmlFor="is_published" className="text-sm font-medium">{isEn ? 'Published' : 'منشور'}</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_featured" id="is_featured" className="w-4 h-4 accent-primary" />
              <label htmlFor="is_featured" className="text-sm font-medium">{isEn ? 'Featured' : 'مميز'}</label>
            </div>
          </div>

          <div className="pt-6 border-t border-primary/10">
            <SubmitButton 
              idleText={isEn ? 'Create Project' : 'إنشاء مشروع'} 
              pendingText={isEn ? 'Saving...' : 'جاري الحفظ...'}
              className="w-full md:w-auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
