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
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass border-r border-border/30 flex flex-col min-h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-border/30">
          <Link href={`/${locale}`} className="flex items-center gap-3 mb-6 outline-none">
            <div className="relative w-8 h-8">
              <Image src="/brand/logo-icon.png" alt="Logo" fill className="object-contain" />
            </div>
            <h2 className="text-xl font-bold gold-gradient tracking-tight">Admin Shell</h2>
          </Link>
          <p className="text-xs text-muted-foreground truncate uppercase tracking-wider font-medium">
            {admin?.user?.email}
          </p>
        </div>
        
        <AdminNav locale={locale} />

        <div className="p-4 border-t border-border/30">
          <form action={handleLogout}>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0" />
              {isEn ? 'Sign Out' : 'تسجيل الخروج'}
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
