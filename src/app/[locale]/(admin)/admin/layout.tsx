import { requireAdmin } from "@/lib/auth/admin";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminLayout({ children, params: { locale } }: { children: ReactNode, params: { locale: string } }) {
  const isEn = locale === "en";
  
  // Protect the entire admin layout
  const { isConfigured, admin } = await requireAdmin(locale);

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass p-8 text-center rounded-xl border border-destructive/50 max-w-md">
          <h2 className="text-xl font-bold text-destructive mb-2">Supabase Not Configured</h2>
          <p className="text-muted-foreground mb-4">Please configure environment variables to access the admin dashboard.</p>
          <Link href={`/${locale}`}><Button>Return Home</Button></Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    "use server";
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    redirect(`/${locale}/admin/login`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row items-start">
      {/* Sidebar / Top Navigation */}
      <aside className="w-full md:w-64 shrink-0 glass md:border-r border-b md:border-b-0 border-border/30 flex flex-col h-auto md:h-screen sticky top-0 z-50">
        <div className="p-4 md:p-6 border-b border-border/30 flex items-center justify-between md:flex-col md:items-start md:justify-start">
          <Link href={`/${locale}`} className="flex items-center gap-2 md:gap-3 outline-none">
            <div className="relative w-6 h-6 md:w-8 md:h-8 shrink-0">
              <Image src="/brand/logo-icon.jpeg" alt="Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-base md:text-xl font-bold gold-gradient tracking-tight leading-tight">Admin Shell</h2>
              <p className="text-[10px] md:text-xs text-muted-foreground truncate uppercase tracking-wider font-medium hidden md:block">
                {admin?.user?.email}
              </p>
            </div>
          </Link>

          {/* Mobile Logout (Header) */}
          <form action={handleLogout} className="md:hidden">
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 px-2">
              <LogOut className="w-4 h-4" />
            </Button>
          </form>
        </div>
        
        <div className="flex-1 md:overflow-y-auto">
          <AdminNav locale={locale} />
        </div>

        {/* Desktop Logout (Footer) */}
        <div className="hidden md:block p-4 border-t border-border/30 mt-auto shrink-0">
          <form action={handleLogout}>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" />
              {isEn ? 'Sign Out' : 'تسجيل الخروج'}
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full p-4 sm:p-6 md:p-10 lg:p-12 min-w-0">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
