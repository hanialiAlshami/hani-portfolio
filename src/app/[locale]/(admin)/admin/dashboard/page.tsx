import { requireAdmin } from "@/lib/auth/admin";
import { GlassCard } from "@/components/shared/GlassCard";
import { FolderGit2, Mail, Layers, LayoutPanelLeft, Plus, Settings } from "lucide-react";
import { getAdminProjects } from "@/lib/admin/projects";
import { listServices } from "@/lib/admin/services";
import { listSkills } from "@/lib/admin/skills";
import { getContactMessages } from "@/lib/admin/contact-messages";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ContactMessage, ContactMessageStatus } from "@/types";

const statusLabels: Record<ContactMessageStatus, { en: string; ar: string }> = {
  new: { en: "New", ar: "جديدة" },
  read: { en: "Read", ar: "مقروءة" },
  replied: { en: "Replied", ar: "تم الرد" },
  archived: { en: "Archived", ar: "مؤرشفة" },
  spam: { en: "Spam", ar: "مزعجة" },
};

export default async function AdminDashboardPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === "en";
  await requireAdmin(locale);

  let totalProjects = 0;
  let totalServices = 0;
  let totalSkills = 0;
  let newMessages = 0;
  let unreadMessages = 0;
  let recentMessages: ContactMessage[] = [];

  try {
    const [projects, services, skills, messages] = await Promise.all([
      getAdminProjects().catch(() => []),
      listServices().catch(() => []),
      listSkills().catch(() => []),
      getContactMessages().catch(() => [])
    ]);

    totalProjects = projects?.length || 0;
    totalServices = services?.length || 0;
    totalSkills = skills?.length || 0;
    
    if (messages && messages.length > 0) {
      newMessages = messages.filter(m => m.status === 'new').length;
      unreadMessages = messages.filter(m => !m.isRead).length;
      recentMessages = messages.slice(0, 5);
    }
  } catch (error) {
    console.error("Dashboard stats error:", error);
  }

  const stats = [
    { label: isEn ? 'Projects' : 'المشاريع', value: totalProjects.toString(), icon: FolderGit2, color: 'text-blue-500', bg: 'bg-blue-500/10', link: 'projects' },
    { label: isEn ? 'Services' : 'الخدمات', value: totalServices.toString(), icon: Layers, color: 'text-purple-500', bg: 'bg-purple-500/10', link: 'services' },
    { label: isEn ? 'Skills' : 'المهارات', value: totalSkills.toString(), icon: LayoutPanelLeft, color: 'text-green-500', bg: 'bg-green-500/10', link: 'skills' },
    { 
      label: isEn ? 'Unread Messages' : 'رسائل غير مقروءة', 
      value: unreadMessages.toString(), 
      icon: Mail, 
      color: unreadMessages > 0 ? 'text-orange-500' : 'text-muted-foreground', 
      bg: unreadMessages > 0 ? 'bg-orange-500/10' : 'bg-secondary/20', 
      link: 'messages' 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{isEn ? 'Dashboard Overview' : 'نظرة عامة على لوحة التحكم'}</h1>
        <p className="text-muted-foreground">
          {isEn ? 'Welcome back. Here is a summary of your portfolio.' : 'مرحباً بعودتك. إليك ملخص لمحفظتك.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const content = (
            <GlassCard hover={!!stat.link} className={`p-6 ${stat.link ? 'cursor-pointer' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground font-medium">{stat.label}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </GlassCard>
          );
          
          return stat.link ? (
            <Link href={`/${locale}/admin/${stat.link}`} key={i} className="block outline-none">
              {content}
            </Link>
          ) : (
            <div key={i}>{content}</div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold mb-4">{isEn ? 'Quick Actions' : 'إجراءات سريعة'}</h2>
          <div className="flex flex-col gap-3">
            <Link href={`/${locale}/admin/projects/new`}>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isEn ? 'Add Project' : 'إضافة مشروع'}
              </Button>
            </Link>
            <Link href={`/${locale}/admin/skills/new`}>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isEn ? 'Add Skill' : 'إضافة مهارة'}
              </Button>
            </Link>
            <Link href={`/${locale}/admin/services/new`}>
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isEn ? 'Add Service' : 'إضافة خدمة'}
              </Button>
            </Link>
            <Link href={`/${locale}/admin/messages`}>
              <Button className="w-full justify-start" variant="outline">
                <Mail className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isEn ? 'View Messages' : 'عرض الرسائل'}
                {newMessages > 0 && (
                  <span className="ml-auto rtl:mr-auto rtl:ml-0 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {newMessages}
                  </span>
                )}
              </Button>
            </Link>
            <Link href={`/${locale}/admin/settings`}>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {isEn ? 'Edit Settings' : 'تعديل الإعدادات'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{isEn ? 'Recent Messages' : 'الرسائل الأخيرة'}</h2>
            <Link href={`/${locale}/admin/messages`} className="text-sm text-primary hover:underline">
              {isEn ? 'View All' : 'عرض الكل'}
            </Link>
          </div>
          
          <div className="glass rounded-xl border border-border/50 overflow-hidden">
            {recentMessages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                {isEn ? 'No recent messages.' : 'لا توجد رسائل حديثة.'}
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {recentMessages.map((msg) => (
                  <Link 
                    key={msg.id} 
                    href={`/${locale}/admin/messages/${msg.id}`}
                    className="flex items-start justify-between p-4 hover:bg-secondary/10 transition-colors"
                  >
                    <div className="space-y-1 overflow-hidden pr-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${msg.isRead ? 'bg-transparent' : 'bg-primary'}`}></span>
                        <span className="font-medium truncate">{msg.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'ar-SA', { month: 'short', day: 'numeric' }).format(new Date(msg.createdAt))}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate pl-4 rtl:pr-4 rtl:pl-0">
                        {msg.subject || msg.message.substring(0, 50)}...
                      </p>
                    </div>
                    <span className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-medium uppercase
                      ${msg.status === 'new' ? 'bg-blue-500/10 text-blue-500' : ''}
                      ${msg.status === 'read' ? 'bg-gray-500/10 text-gray-500' : ''}
                      ${msg.status === 'replied' ? 'bg-green-500/10 text-green-500' : ''}
                      ${msg.status === 'archived' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                      ${msg.status === 'spam' ? 'bg-red-500/10 text-red-500' : ''}
                    `}>
                      {statusLabels[msg.status]?.[isEn ? "en" : "ar"] ?? msg.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
