import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ShieldAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AccessDeniedPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === "en";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-destructive/10 via-background to-background pointer-events-none" />
      
      <div className="glass p-8 md:p-10 rounded-2xl max-w-md w-full relative z-10 border border-destructive/50 shadow-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center border border-destructive/20">
            <ShieldAlert className="w-10 h-10 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-destructive">
          {isEn ? 'Access Denied' : 'مرفوض الوصول'}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          {isEn 
            ? "Your account is not authorized to access the admin dashboard. You must be added to the admin_users table." 
            : "حسابك غير مصرح له بالوصول إلى لوحة الإدارة. يجب إضافتك إلى جدول admin_users."}
        </p>

        <form action={async () => {
          "use server";
          const supabase = createClient();
          if (supabase) await supabase.auth.signOut();
          redirect(`/${locale}/admin/login`);
        }}>
          <Button type="submit" variant="destructive" className="w-full text-lg py-6 mb-4 rounded-full">
            {isEn ? 'Sign Out & Try Again' : 'تسجيل الخروج والمحاولة مرة أخرى'}
          </Button>
        </form>

        <Link href={`/${locale}`}>
          <Button variant="outline" className="w-full text-lg py-6 border-border/50 rounded-full">
            {isEn ? 'Return Home' : 'العودة للصفحة الرئيسية'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
