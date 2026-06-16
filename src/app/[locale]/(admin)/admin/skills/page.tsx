import { requireAdmin } from "@/lib/auth/admin";
import { listSkills } from "@/lib/admin/skills";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { deleteSkillAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function SkillsAdminPage({ params: { locale }, searchParams }: { params: { locale: string }, searchParams: { status?: string } }) {
  await requireAdmin(locale);
  const isEn = locale === "en";
  const skills = await listSkills();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gold-gradient">{isEn ? 'Skills' : 'المهارات'}</h1>
        <Link href={`/${locale}/admin/skills/new`}>
          <Button>{isEn ? 'Add Skill' : 'إضافة مهارة'}</Button>
        </Link>
      </div>

      {searchParams.status === 'created' && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500">
          {isEn ? 'Skill created successfully.' : 'تم إنشاء المهارة بنجاح.'}
        </div>
      )}
      {searchParams.status === 'updated' && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500">
          {isEn ? 'Skill updated successfully.' : 'تم تحديث المهارة بنجاح.'}
        </div>
      )}
      {searchParams.status === 'deleted' && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500">
          {isEn ? 'Skill deleted successfully.' : 'تم حذف المهارة بنجاح.'}
        </div>
      )}

      <div className="glass rounded-xl border border-primary/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-primary/5 text-primary uppercase border-b border-primary/20 whitespace-nowrap">
              <tr>
                <th className="px-6 py-4">{isEn ? 'Name' : 'الاسم'}</th>
                <th className="px-6 py-4">{isEn ? 'Category' : 'الفئة'}</th>
                <th className="px-6 py-4">{isEn ? 'Order' : 'الترتيب'}</th>
                <th className="px-6 py-4">{isEn ? 'Status' : 'الحالة'}</th>
                <th className="px-6 py-4">{isEn ? 'Actions' : 'الإجراءات'}</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill: any) => (
                <tr key={skill.id} className="border-b border-primary/10 hover:bg-primary/5">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{skill.name}</td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{isEn ? skill.skill_categories?.name_en : skill.skill_categories?.name_ar}</td>
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">{skill.sort_order}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${skill.is_published ? 'bg-green-500/20 text-green-500' : 'bg-destructive/20 text-destructive'}`}>
                      {skill.is_published ? (isEn ? 'Active' : 'نشط') : (isEn ? 'Inactive' : 'غير نشط')}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2 whitespace-nowrap">
                    <Link href={`/${locale}/admin/skills/${skill.id}/edit`}>
                      <Button variant="outline" size="sm">{isEn ? 'Edit' : 'تعديل'}</Button>
                    </Link>
                    <DeleteButton 
                      id={skill.id} 
                      onDelete={async (id) => {
                        "use server";
                        await deleteSkillAction(id, locale);
                      }} 
                      confirmText={isEn ? 'Are you sure you want to delete this skill?' : 'هل أنت متأكد من حذف هذه المهارة؟'} 
                      buttonText={isEn ? 'Delete' : 'حذف'} 
                    />
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    {isEn ? 'No skills found.' : 'لم يتم العثور على مهارات.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
