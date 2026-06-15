import { requireAdmin } from "@/lib/auth/admin";
import { getContactMessageById } from "@/lib/admin/contact-messages";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Mail, Reply } from "lucide-react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { markMessageReadAction, updateMessageStatusAction, updateMessageNoteAction, archiveMessageAction } from "../actions";
import { Textarea } from "@/components/ui/Textarea";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { ContactMessageStatus } from "@/types";

const statusLabels: Record<ContactMessageStatus, { en: string; ar: string }> = {
  new: { en: "New", ar: "جديدة" },
  read: { en: "Read", ar: "مقروءة" },
  replied: { en: "Replied", ar: "تم الرد" },
  archived: { en: "Archived", ar: "مؤرشفة" },
  spam: { en: "Spam", ar: "مزعجة" },
};

export default async function AdminMessageDetailPage({ 
  params: { locale, id },
  searchParams,
}: { 
  params: { locale: string, id: string };
  searchParams?: { status?: string; error?: string };
}) {
  const isEn = locale === 'en';
  await requireAdmin(locale);
  const message = await getContactMessageById(id);

  if (!message) {
    notFound();
  }

  const markReadAction = markMessageReadAction.bind(null, locale, id);
  const markSpamAction = updateMessageStatusAction.bind(null, locale, id, 'spam');
  const saveNoteAction = updateMessageNoteAction.bind(null, locale, id);
  const archiveAction = archiveMessageAction.bind(null, locale, id);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/admin/messages`}>
          <Button variant="outline" size="sm" className="rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {isEn ? 'Back to Messages' : 'العودة للرسائل'}
          </Button>
        </Link>
      </div>

      {searchParams?.status === "message-read" && (
        <AdminNotice tone="success">
          {isEn ? "Message marked as read." : "تم تحديد الرسالة كمقروءة."}
        </AdminNotice>
      )}
      {searchParams?.status === "message-updated" && (
        <AdminNotice tone="success">
          {isEn ? "Message status updated successfully." : "تم تحديث حالة الرسالة بنجاح."}
        </AdminNotice>
      )}
      {searchParams?.status === "note-saved" && (
        <AdminNotice tone="success">
          {isEn ? "Admin note saved successfully." : "تم حفظ ملاحظة الإدارة بنجاح."}
        </AdminNotice>
      )}
      {searchParams?.error === "message-update-failed" && (
        <AdminNotice tone="error">
          {isEn ? "Could not update the message. Please try again." : "تعذر تحديث الرسالة. حاول مرة أخرى."}
        </AdminNotice>
      )}
      {searchParams?.error === "note-save-failed" && (
        <AdminNotice tone="error">
          {isEn ? "Could not save the admin note. Please try again." : "تعذر حفظ ملاحظة الإدارة. حاول مرة أخرى."}
        </AdminNotice>
      )}

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-secondary/10 p-6 rounded-xl border border-border/50">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {message.subject || (isEn ? 'No Subject' : 'بدون موضوع')}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {message.email}</span>
            <span>•</span>
            <span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(message.createdAt))}</span>
            <span>•</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase
              ${message.status === 'new' ? 'bg-blue-500/10 text-blue-500' : ''}
              ${message.status === 'read' ? 'bg-gray-500/10 text-gray-500' : ''}
              ${message.status === 'replied' ? 'bg-green-500/10 text-green-500' : ''}
              ${message.status === 'archived' ? 'bg-yellow-500/10 text-yellow-500' : ''}
              ${message.status === 'spam' ? 'bg-red-500/10 text-red-500' : ''}
            `}>
              {statusLabels[message.status]?.[isEn ? "en" : "ar"] ?? message.status}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(!message.isRead || message.status === 'new') && (
            <form action={markReadAction}>
              <SubmitButton
                idleText={isEn ? "Mark Read" : "تحديد كمقروءة"}
                pendingText={isEn ? "Saving..." : "جاري الحفظ..."}
                className="bg-green-600 hover:bg-green-700 text-white"
              />
            </form>
          )}
          {message.status !== 'spam' && (
            <form action={markSpamAction}>
              <SubmitButton idleText={isEn ? "Mark Spam" : "تحديد كمزعجة"} pendingText={isEn ? "Saving..." : "جاري الحفظ..."} className="text-red-500 border border-red-500/50 hover:bg-red-500/10 bg-transparent" />
            </form>
          )}
          {message.status !== 'archived' && (
            <form action={archiveAction}>
              <SubmitButton idleText={isEn ? "Archive" : "أرشفة"} pendingText={isEn ? "Archiving..." : "جاري الأرشفة..."} className="border border-border hover:bg-secondary bg-transparent" />
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="glass p-8 rounded-xl border border-primary/10">
            <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">{isEn ? 'Message Content' : 'محتوى الرسالة'}</h2>
            <div className="whitespace-pre-wrap text-lg leading-relaxed">
              {message.message}
            </div>
          </div>
          
          <div className="glass p-8 rounded-xl border border-primary/10">
            <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">{isEn ? 'Admin Notes' : 'ملاحظات الإدارة'}</h2>
            <form action={saveNoteAction} className="space-y-4">
              <Textarea 
                name="admin_note" 
                defaultValue={message.adminNote || ''} 
                placeholder={isEn ? 'Add private notes about this sender or message here...' : 'أضف ملاحظات خاصة حول هذا المرسل أو الرسالة هنا...'}
                className="min-h-[120px]"
              />
              <div className="flex justify-end">
                <SubmitButton idleText={isEn ? "Save Note" : "حفظ الملاحظة"} pendingText={isEn ? "Saving..." : "جاري الحفظ..."} />
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-xl border border-primary/10">
            <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">{isEn ? 'Sender Details' : 'تفاصيل المرسل'}</h2>
            <div className="space-y-4">
              <div>
                <span className="block text-xs text-muted-foreground">{isEn ? 'Name' : 'الاسم'}</span>
                <span className="font-medium">{message.name}</span>
              </div>
              <div>
                <span className="block text-xs text-muted-foreground">{isEn ? 'Email' : 'البريد الإلكتروني'}</span>
                <a href={`mailto:${message.email}`} className="font-medium text-primary hover:underline">{message.email}</a>
              </div>
              {message.phone && (
                <div>
                  <span className="block text-xs text-muted-foreground">{isEn ? 'Phone' : 'الهاتف'}</span>
                  <a href={`tel:${message.phone}`} className="font-medium text-primary hover:underline dir-ltr">{message.phone}</a>
                </div>
              )}
              {message.locale && (
                <div>
                  <span className="block text-xs text-muted-foreground">{isEn ? 'Locale' : 'اللغة'}</span>
                  <span className="font-medium uppercase">{message.locale}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
            <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">{isEn ? 'Quick Actions' : 'إجراءات سريعة'}</h2>
            <a href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your Message'}`}>
              <Button className="w-full mb-3">
                <Reply className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isEn ? 'Open Email Reply' : 'فتح الرد بالبريد'}
              </Button>
            </a>
            <p className="text-xs text-muted-foreground">
              {isEn ? 'Opens your email client; no email is sent from the admin.' : 'يفتح برنامج البريد لديك؛ لا يتم إرسال بريد من لوحة الإدارة.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
