import { requireAdmin } from "@/lib/auth/admin";
import { getAdminProjects } from "@/lib/admin/projects";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { deleteProjectAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { AdminNotice } from "@/components/admin/AdminNotice";

export default async function ProjectsAdminPage({ params: { locale }, searchParams }: { params: { locale: string }, searchParams?: { status?: string, error?: string } }) {
  await requireAdmin(locale);
  const isEn = locale === "en";
  const projects = await getAdminProjects();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gold-gradient">{isEn ? 'Projects' : 'المشاريع'}</h1>
        <Link href={`/${locale}/admin/projects/new`}>
          <Button>{isEn ? 'Add Project' : 'إضافة مشروع'}</Button>
        </Link>
      </div>

      {searchParams?.status === 'created' && (
        <AdminNotice tone="success">
          {isEn ? 'Project created successfully.' : 'تم إنشاء المشروع بنجاح.'}
        </AdminNotice>
      )}
      {searchParams?.error === 'rls-blocked' && (
        <AdminNotice tone="error">
          {isEn ? 'You do not have permission to delete projects. Please check admin permissions.' : 'لا تملك صلاحية حذف المشاريع. تحقق من صلاحيات الأدمن.'}
        </AdminNotice>
      )}
      {searchParams?.error === 'delete-failed' && (
        <AdminNotice tone="error">
          {isEn ? 'Project deletion failed. Please try again.' : 'فشل حذف المشروع. حاول مرة أخرى.'}
        </AdminNotice>
      )}
      {searchParams?.status === 'updated' && (
        <AdminNotice tone="success">
          {isEn ? 'Project updated successfully.' : 'تم تحديث المشروع بنجاح.'}
        </AdminNotice>
      )}
      {searchParams?.status === 'deleted' && (
        <AdminNotice tone="success">
          {isEn ? 'Project deleted successfully.' : 'تم حذف المشروع بنجاح.'}
        </AdminNotice>
      )}

      <div className="glass rounded-xl border border-primary/20 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-primary/5 text-primary uppercase border-b border-primary/20 whitespace-nowrap">
            <tr>
              <th className="px-6 py-4">{isEn ? 'Title' : 'العنوان'}</th>
              <th className="px-6 py-4">{isEn ? 'Slug' : 'الرابط'}</th>
              <th className="px-6 py-4">{isEn ? 'Featured' : 'مميز'}</th>
              <th className="px-6 py-4">{isEn ? 'Status' : 'الحالة'}</th>
              <th className="px-6 py-4">{isEn ? 'Actions' : 'الإجراءات'}</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any) => (
              <tr key={project.id} className="border-b border-primary/10 hover:bg-primary/5">
                <td className="px-6 py-4 font-medium">{isEn ? project.title_en : project.title_ar}</td>
                <td className="px-6 py-4 text-muted-foreground">{project.slug}</td>
                <td className="px-6 py-4 text-muted-foreground">{project.is_featured ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${project.is_published ? 'bg-green-500/20 text-green-500' : 'bg-destructive/20 text-destructive'}`}>
                    {project.is_published ? (isEn ? 'Active' : 'نشط') : (isEn ? 'Inactive' : 'غير نشط')}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Link href={`/${locale}/admin/projects/${project.id}/edit`}>
                    <Button variant="outline" size="sm">{isEn ? 'Edit' : 'تعديل'}</Button>
                  </Link>
                  <DeleteButton 
                    id={project.id} 
                    onDelete={async (id) => {
                      "use server";
                      await deleteProjectAction(id, locale);
                    }} 
                    confirmText={isEn ? 'Are you sure you want to delete this project?' : 'هل أنت متأكد من حذف هذا المشروع؟'} 
                    buttonText={isEn ? 'Delete' : 'حذف'} 
                  />
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  {isEn ? 'No projects found.' : 'لم يتم العثور على مشاريع.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
