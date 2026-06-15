import { requireAdmin } from "@/lib/auth/admin";
import { getContactMessages } from "@/lib/admin/contact-messages";
import Link from "next/link";
import { Mail, MailOpen } from "lucide-react";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { ContactMessage, ContactMessageStatus } from "@/types";

const statusLabels: Record<ContactMessageStatus, { en: string; ar: string }> = {
  new: { en: "New", ar: "جديدة" },
  read: { en: "Read", ar: "مقروءة" },
  replied: { en: "Replied", ar: "تم الرد" },
  archived: { en: "Archived", ar: "مؤرشفة" },
  spam: { en: "Spam", ar: "مزعجة" },
};

export default async function AdminMessagesPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { status?: string; error?: string };
}) {
  const isEn = locale === 'en';
  await requireAdmin(locale);
  let messages: ContactMessage[] = [];
  let loadFailed = false;

  try {
    messages = await getContactMessages();
  } catch (error) {
    console.error("Admin messages load failed:", error);
    loadFailed = true;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{isEn ? 'Messages' : 'الرسائل'}</h1>
          <p className="text-muted-foreground mt-2">
            {isEn ? 'Manage contact messages from visitors.' : 'إدارة رسائل التواصل من الزوار.'}
          </p>
        </div>
      </div>

      {searchParams?.status === "archived" && (
        <AdminNotice tone="success">
          {isEn ? "Message archived successfully." : "تمت أرشفة الرسالة بنجاح."}
        </AdminNotice>
      )}
      {searchParams?.error === "archive-failed" && (
        <AdminNotice tone="error">
          {isEn ? "Could not archive the message. Please try again." : "تعذرت أرشفة الرسالة. حاول مرة أخرى."}
        </AdminNotice>
      )}
      {loadFailed && (
        <AdminNotice tone="error">
          {isEn ? "Messages could not be loaded right now." : "تعذر تحميل الرسائل حالياً."}
        </AdminNotice>
      )}

      <div className="glass rounded-xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-secondary/20 border-b border-border/50">
              <tr>
                <th className="px-6 py-4">{isEn ? 'Status' : 'الحالة'}</th>
                <th className="px-6 py-4">{isEn ? 'Date' : 'التاريخ'}</th>
                <th className="px-6 py-4">{isEn ? 'Sender' : 'المرسل'}</th>
                <th className="px-6 py-4">{isEn ? 'Subject' : 'الموضوع'}</th>
                <th className="px-6 py-4 text-right rtl:text-left">{isEn ? 'Actions' : 'الإجراءات'}</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    {isEn ? 'No messages found.' : 'لم يتم العثور على رسائل.'}
                  </td>
                </tr>
              ) : (
                messages.map((message) => (
                  <tr key={message.id} className="border-b border-border/50 hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {!message.isRead ? (
                          <Mail className="w-4 h-4 text-primary" />
                        ) : (
                          <MailOpen className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${message.status === 'new' ? 'bg-blue-500/10 text-blue-500' : ''}
                          ${message.status === 'read' ? 'bg-gray-500/10 text-gray-500' : ''}
                          ${message.status === 'replied' ? 'bg-green-500/10 text-green-500' : ''}
                          ${message.status === 'archived' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                          ${message.status === 'spam' ? 'bg-red-500/10 text-red-500' : ''}
                        `}>
                          {statusLabels[message.status]?.[isEn ? "en" : "ar"] ?? message.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(message.createdAt))}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{message.name}</div>
                      <div className="text-xs text-muted-foreground">{message.email}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {message.subject || (isEn ? 'No Subject' : 'بدون موضوع')}
                    </td>
                    <td className="px-6 py-4 text-right rtl:text-left">
                      <Link 
                        href={`/${locale}/admin/messages/${message.id}`}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        {isEn ? 'View Details' : 'عرض التفاصيل'}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
