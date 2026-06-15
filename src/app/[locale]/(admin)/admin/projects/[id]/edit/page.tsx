import { requireAdmin } from "@/lib/auth/admin";
import { getAdminProjectById, getProjectImages } from "@/lib/admin/projects";
import { updateProjectAction, uploadProjectGalleryImageAction, deleteProjectGalleryImageAction, updateProjectGalleryImageAction } from "../../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { AdminNotice } from "@/components/admin/AdminNotice";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params: { locale, id }, searchParams }: { params: { locale: string, id: string }, searchParams: { error?: string, status?: string, editImage?: string } }) {
  await requireAdmin(locale);
  const isEn = locale === "en";

  let project;
  let galleryImages = [];
  try {
    project = await getAdminProjectById(id);
    galleryImages = await getProjectImages(id);
  } catch (err) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/${locale}/admin/projects`} className="text-muted-foreground hover:text-primary transition-colors">
          &larr; {isEn ? 'Back to Projects' : 'العودة للمشاريع'}
        </Link>
        <h1 className="text-3xl font-bold gold-gradient">{isEn ? 'Edit Project' : 'تعديل المشروع'}</h1>
      </div>

      <div className="glass p-8 rounded-xl border border-primary/20">
        {searchParams.error && (
          <AdminNotice tone="error" className="mb-6">
            {searchParams.error === 'rls-blocked' && (isEn ? 'You do not have permission to update projects. Please check admin permissions.' : 'لا تملك صلاحية تعديل المشاريع. تحقق من صلاحيات الأدمن.')}
            {searchParams.error === 'update-failed' && (isEn ? 'Project update failed. Please try again.' : 'فشل تعديل المشروع. حاول مرة أخرى.')}
            {searchParams.error === 'slug-exists' && (isEn ? 'A project with this slug already exists.' : 'يوجد مشروع بهذا الرابط مسبقاً.')}
            {searchParams.error === 'validation-failed' && (isEn ? 'Validation failed. Please check the inputs.' : 'فشل التحقق. يرجى التحقق من المدخلات.')}
            {searchParams.error === 'invalid-file-type' && (isEn ? 'Invalid file type.' : 'نوع الملف غير صالح.')}
            {searchParams.error === 'file-too-large' && (isEn ? 'File too large.' : 'الملف كبير جداً.')}
            {searchParams.error === 'upload-failed' && (isEn ? 'Cover image upload failed.' : 'فشل رفع صورة الغلاف.')}
            {searchParams.error === 'gallery-file-too-large' && (isEn ? 'Gallery image is too large. Maximum size is 5MB.' : 'حجم صورة المعرض كبير جدًا. الحد الأقصى 5MB.')}
            {searchParams.error === 'gallery-invalid-file' && (isEn ? 'Invalid gallery image type. Please upload PNG, JPG, or WebP.' : 'نوع صورة المعرض غير مدعوم. ارفع PNG أو JPG أو WebP.')}
            {searchParams.error === 'gallery-upload-failed' && (isEn ? 'Gallery upload failed. Please check permissions and try again.' : 'فشل رفع صورة المعرض. تحقق من الصلاحيات وحاول مرة أخرى.')}
            {searchParams.error === 'gallery-save-failed' && (isEn ? 'Gallery image uploaded but database save failed.' : 'تم رفع الصورة ولكن فشل حفظ البيانات.')}
            {searchParams.error === 'gallery-delete-failed' && (isEn ? 'Gallery image deletion failed.' : 'فشل حذف صورة المعرض.')}
            {searchParams.error === 'gallery-update-failed' && (isEn ? 'Gallery image update failed.' : 'فشل تحديث صورة المعرض.')}
            {!['rls-blocked', 'update-failed', 'slug-exists', 'validation-failed', 'invalid-file-type', 'file-too-large', 'upload-failed', 'gallery-file-too-large', 'gallery-invalid-file', 'gallery-upload-failed', 'gallery-save-failed', 'gallery-delete-failed', 'gallery-update-failed'].includes(searchParams.error) && (isEn ? 'Something went wrong. Please try again.' : 'حدث خطأ ما. حاول مرة أخرى.')}
          </AdminNotice>
        )}
        {searchParams.status && (
          <AdminNotice tone="success" className="mb-6">
            {searchParams.status === 'gallery-uploaded' && (isEn ? 'Gallery image uploaded successfully.' : 'تم رفع صورة المعرض بنجاح.')}
            {searchParams.status === 'gallery-updated' && (isEn ? 'Gallery image updated successfully.' : 'تم تحديث صورة المعرض بنجاح.')}
            {searchParams.status === 'gallery-deleted' && (isEn ? 'Gallery image deleted successfully.' : 'تم حذف صورة المعرض بنجاح.')}
          </AdminNotice>
        )}
        <form action={updateProjectAction.bind(null, id, locale)} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Title (English)' : 'العنوان (إنجليزية)'}</label>
              <input name="title_en" type="text" defaultValue={project.title_en} required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Title (Arabic)' : 'العنوان (عربية)'}</label>
              <input name="title_ar" type="text" defaultValue={project.title_ar} required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Slug' : 'الرابط (Slug)'}</label>
              <input name="slug" type="text" defaultValue={project.slug} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Project Status' : 'حالة المشروع'}</label>
              <select name="project_status" defaultValue={project.project_status || 'private'} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors">
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
              <textarea name="summary_en" defaultValue={project.summary_en} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Summary (Arabic)' : 'ملخص (عربية)'}</label>
              <textarea name="summary_ar" defaultValue={project.summary_ar} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Problem (English)' : 'المشكلة (إنجليزية)'}</label>
              <textarea name="problem_en" defaultValue={project.problem_en} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Problem (Arabic)' : 'المشكلة (عربية)'}</label>
              <textarea name="problem_ar" defaultValue={project.problem_ar} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Goal (English)' : 'الهدف (إنجليزية)'}</label>
              <textarea name="goal_en" defaultValue={project.goal_en} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Goal (Arabic)' : 'الهدف (عربية)'}</label>
              <textarea name="goal_ar" defaultValue={project.goal_ar} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Solution (English)' : 'الحل (إنجليزية)'}</label>
              <textarea name="solution_en" defaultValue={project.solution_en} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Solution (Arabic)' : 'الحل (عربية)'}</label>
              <textarea name="solution_ar" defaultValue={project.solution_ar} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Role (English)' : 'الدور (إنجليزية)'}</label>
              <input name="role_en" type="text" defaultValue={project.role_en} required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Role (Arabic)' : 'الدور (عربية)'}</label>
              <input name="role_ar" type="text" defaultValue={project.role_ar} required className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Challenges (English)' : 'التحديات (إنجليزية)'}</label>
              <textarea name="challenges_en" defaultValue={project.challenges_en} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Challenges (Arabic)' : 'التحديات (عربية)'}</label>
              <textarea name="challenges_ar" defaultValue={project.challenges_ar} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Results (English)' : 'النتائج (إنجليزية)'}</label>
              <textarea name="results_en" defaultValue={project.results_en} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Results (Arabic)' : 'النتائج (عربية)'}</label>
              <textarea name="results_ar" defaultValue={project.results_ar} required rows={3} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-primary/10">
            <h2 className="text-xl font-bold mb-4 gold-gradient">{isEn ? 'Links & Media' : 'الروابط والوسائط'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Live URL' : 'رابط المشروع الحي'}</label>
                <input name="live_url" type="url" defaultValue={project.live_url || ''} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'GitHub URL' : 'رابط GitHub'}</label>
                <input name="github_url" type="url" defaultValue={project.github_url || ''} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Demo Video URL' : 'رابط فيديو العرض'}</label>
                <input name="demo_video_url" type="url" defaultValue={project.demo_video_url || ''} placeholder="YouTube, Vimeo, etc." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
                <p className="text-xs text-muted-foreground mt-1">{isEn ? 'Recommended for local/private projects' : 'موصى به للمشاريع المحلية/الخاصة'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Cover Image' : 'صورة الغلاف'}</label>
                {project.image_url && (
                  <div className="mb-2">
                    <Image src={project.image_url} alt="Current Cover" width={128} height={64} className="h-16 w-32 object-cover rounded border border-primary/20" />
                  </div>
                )}
                <input name="cover_image" type="file" accept="image/png, image/jpeg, image/webp, image/svg+xml" className="w-full bg-background border border-primary/20 rounded-md px-4 py-1.5 focus:outline-none focus:border-primary transition-colors" />
                <p className="text-xs text-muted-foreground mt-1">{isEn ? 'Upload new file to replace. Max 5MB. PNG, JPG, WebP.' : 'حمل ملفاً جديداً للاستبدال. الحد الأقصى 5 ميغابايت.'}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-primary/10">
            <h2 className="text-xl font-bold mb-4 gold-gradient">{isEn ? 'Technologies & Depth' : 'التقنيات والعمق'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Languages' : 'لغات البرمجة'}</label>
                <input name="project_languages" type="text" defaultValue={project.project_languages?.join(', ') || ''} placeholder="TypeScript, Python..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
                <p className="text-xs text-muted-foreground mt-1">{isEn ? 'Comma separated' : 'مفصول بفاصلة'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Frameworks' : 'أطر العمل'}</label>
                <input name="project_frameworks" type="text" defaultValue={project.project_frameworks?.join(', ') || ''} placeholder="Next.js, Laravel..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Tools & Services' : 'الأدوات والخدمات'}</label>
                <input name="project_tools" type="text" defaultValue={project.project_tools?.join(', ') || ''} placeholder="Supabase, Docker..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Platforms' : 'المنصات'}</label>
                <input name="project_platforms" type="text" defaultValue={project.project_platforms?.join(', ') || ''} placeholder="Web, iOS..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Legacy Tech Stack (Card summary)' : 'ملخص التقنيات (للبطاقة)'}</label>
                <input name="tech_stack" type="text" defaultValue={project.tech_stack ? project.tech_stack.join(', ') : ''} placeholder="React, Node.js, ..." className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Sort Order' : 'الترتيب'}</label>
            <input name="sort_order" type="number" defaultValue={project.sort_order} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_published" id="is_published" defaultChecked={project.is_published} className="w-4 h-4 accent-primary" />
              <label htmlFor="is_published" className="text-sm font-medium">{isEn ? 'Published' : 'منشور'}</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="is_featured" id="is_featured" defaultChecked={project.is_featured} className="w-4 h-4 accent-primary" />
              <label htmlFor="is_featured" className="text-sm font-medium">{isEn ? 'Featured' : 'مميز'}</label>
            </div>
          </div>

          <div className="pt-6 border-t border-primary/10">
            <SubmitButton 
              idleText={isEn ? 'Save Changes' : 'حفظ التغييرات'} 
              pendingText={isEn ? 'Saving...' : 'جاري الحفظ...'}
              className="w-full md:w-auto"
            />
          </div>
        </form>
      </div>

      <div className="glass p-8 rounded-xl border border-primary/20 mt-8">
        <h2 className="text-2xl font-bold mb-6 gold-gradient">{isEn ? 'Project Gallery / Screenshots' : 'معرض صور المشروع / لقطات الشاشة'}</h2>
        
        {galleryImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {galleryImages.map((image: any) => {
              const isEditing = searchParams.editImage === image.id;
              
              if (isEditing) {
                return (
                  <div key={image.id} className="border border-primary/40 bg-primary/5 rounded-lg p-4 md:col-span-2 lg:col-span-3">
                    <h3 className="text-lg font-bold text-primary mb-4">{isEn ? 'Edit Image Metadata' : 'تعديل بيانات الصورة'}</h3>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <div className="w-full h-40 relative mb-4">
                          <Image src={image.image_url} alt={image.alt_en || 'Gallery Image'} fill sizes="33vw" className="object-cover rounded-md" />
                        </div>
                      </div>
                      <div className="w-full md:w-2/3">
                        <form action={updateProjectGalleryImageAction.bind(null, image.id, id, locale)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Alt Text (English)' : 'نص بديل (إنجليزية)'}</label>
                              <input name="alt_en" type="text" defaultValue={image.alt_en || ''} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Alt Text (Arabic)' : 'نص بديل (عربية)'}</label>
                              <input name="alt_ar" type="text" defaultValue={image.alt_ar || ''} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Caption (English)' : 'تعليق (إنجليزية)'}</label>
                              <input name="caption_en" type="text" defaultValue={image.caption_en || ''} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Caption (Arabic)' : 'تعليق (عربية)'}</label>
                              <input name="caption_ar" type="text" defaultValue={image.caption_ar || ''} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Sort Order' : 'الترتيب'}</label>
                              <input name="sort_order" type="number" defaultValue={image.sort_order || 0} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                          </div>
                          <div className="flex gap-4 pt-2">
                            <SubmitButton 
                              idleText={isEn ? 'Save Changes' : 'حفظ التغييرات'} 
                              pendingText={isEn ? 'Saving...' : 'جاري الحفظ...'}
                            />
                            <Link href={`/${locale}/admin/projects/${id}/edit`} className="inline-flex items-center justify-center px-4 py-2 border border-primary/20 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors">
                              {isEn ? 'Cancel' : 'إلغاء'}
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={image.id} className="border border-primary/20 rounded-lg p-4 relative group">
                  <div className="w-full h-40 relative mb-4">
                    <Image src={image.image_url} alt={image.alt_en || 'Gallery Image'} fill sizes="33vw" className="object-cover rounded-md" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p>{isEn ? 'Sort Order' : 'الترتيب'}: {image.sort_order}</p>
                    {image.alt_en && <p className="truncate" title={image.alt_en}>Alt: {image.alt_en}</p>}
                    {image.caption_en && <p className="truncate" title={image.caption_en}>Cap: {image.caption_en}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/${locale}/admin/projects/${id}/edit?editImage=${image.id}`} className="inline-flex items-center justify-center w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-md px-4 py-2 text-sm font-medium transition-colors">
                      {isEn ? 'Edit' : 'تعديل'}
                    </Link>
                    <DeleteButton 
                      id={image.id} 
                      onDelete={async (imageId) => {
                        "use server";
                        await deleteProjectGalleryImageAction(id, imageId, locale);
                      }} 
                      confirmText={isEn ? 'Delete this image?' : 'حذف هذه الصورة؟'} 
                      buttonText={isEn ? 'Delete Image' : 'حذف الصورة'}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <form action={uploadProjectGalleryImageAction.bind(null, id, locale)} className="space-y-6 pt-6 border-t border-primary/10">
          <h3 className="text-lg font-bold text-primary">{isEn ? 'Upload New Image' : 'رفع صورة جديدة'}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Image File' : 'ملف الصورة'}</label>
              <input name="image" type="file" accept="image/png, image/jpeg, image/webp" required className="w-full bg-background border border-primary/20 rounded-md px-4 py-1.5 focus:outline-none focus:border-primary transition-colors" />
              <p className="text-xs text-muted-foreground mt-1">{isEn ? 'Max 5MB. PNG, JPG, WebP.' : 'الحد الأقصى 5 ميغابايت. PNG, JPG, WebP.'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Alt Text (English)' : 'نص بديل (إنجليزية)'}</label>
              <input name="alt_en" type="text" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Alt Text (Arabic)' : 'نص بديل (عربية)'}</label>
              <input name="alt_ar" type="text" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Caption (English)' : 'تعليق (إنجليزية)'}</label>
              <input name="caption_en" type="text" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Caption (Arabic)' : 'تعليق (عربية)'}</label>
              <input name="caption_ar" type="text" className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-primary">{isEn ? 'Sort Order' : 'الترتيب'}</label>
              <input name="sort_order" type="number" placeholder={isEn ? 'Auto (last + 1)' : 'تلقائي (الأخير + 1)'} className="w-full bg-background border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <SubmitButton 
            idleText={isEn ? 'Upload Image' : 'رفع الصورة'} 
            pendingText={isEn ? 'Uploading...' : 'جاري الرفع...'}
          />
        </form>
      </div>
    </div>
  );
}
