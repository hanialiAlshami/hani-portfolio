import { requireAdmin } from "@/lib/auth/admin";
import { listServices } from "@/lib/admin/services";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { deleteServiceAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function ServicesAdminPage({ params: { locale }, searchParams }: { params: { locale: string }, searchParams: { status?: string } }) {
  await requireAdmin(locale);
  const isEn = locale === "en";
  const services = await listServices();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gold-gradient">{isEn ? 'Services' : 'الخدمات'}</h1>
        <Link href={`/${locale}/admin/services/new`}>
          <Button>{isEn ? 'Add Service' : 'إضافة خدمة'}</Button>
        </Link>
      </div>

      {searchParams.status === 'created' && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500">
          {isEn ? 'Service created successfully.' : 'تم إنشاء الخدمة بنجاح.'}
        </div>
      )}
      {searchParams.status === 'updated' && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500">
          {isEn ? 'Service updated successfully.' : 'تم تحديث الخدمة بنجاح.'}
        </div>
      )}
      {searchParams.status === 'deleted' && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500">
          {isEn ? 'Service deleted successfully.' : 'تم حذف الخدمة بنجاح.'}
        </div>
      )}

      <div className="glass rounded-xl border border-primary/20 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-primary/5 text-primary uppercase border-b border-primary/20">
            <tr>
              <th className="px-6 py-4">{isEn ? 'Title' : 'العنوان'}</th>
              <th className="px-6 py-4">{isEn ? 'Order' : 'الترتيب'}</th>
              <th className="px-6 py-4">{isEn ? 'Status' : 'الحالة'}</th>
              <th className="px-6 py-4">{isEn ? 'Actions' : 'الإجراءات'}</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service: any) => (
              <tr key={service.id} className="border-b border-primary/10 hover:bg-primary/5">
                <td className="px-6 py-4 font-medium">{isEn ? service.title_en : service.title_ar}</td>
                <td className="px-6 py-4 text-muted-foreground">{service.sort_order}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${service.is_published ? 'bg-green-500/20 text-green-500' : 'bg-destructive/20 text-destructive'}`}>
                    {service.is_published ? (isEn ? 'Active' : 'نشط') : (isEn ? 'Inactive' : 'غير نشط')}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Link href={`/${locale}/admin/services/${service.id}/edit`}>
                    <Button variant="outline" size="sm">{isEn ? 'Edit' : 'تعديل'}</Button>
                  </Link>
                  <DeleteButton 
                    id={service.id} 
                    onDelete={async (id) => {
                      "use server";
                      await deleteServiceAction(id, locale);
                    }} 
                    confirmText={isEn ? 'Are you sure you want to delete this service?' : 'هل أنت متأكد من حذف هذه الخدمة؟'} 
                    buttonText={isEn ? 'Delete' : 'حذف'} 
                  />
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                  {isEn ? 'No services found.' : 'لم يتم العثور على خدمات.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
