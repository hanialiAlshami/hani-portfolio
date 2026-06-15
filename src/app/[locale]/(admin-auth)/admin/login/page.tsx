"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/browser";
import { getSupabaseConfig } from "@/lib/supabase/config";
import Link from "next/link";
import { Lock } from "lucide-react";

export default function AdminLoginPage({ params: { locale } }: { params: { locale: string } }) {
  const isEn = locale === "en";
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = getSupabaseConfig();
  if (!config.isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="glass p-8 rounded-2xl max-w-md w-full text-center border border-destructive/50">
          <h2 className="text-2xl font-bold mb-4 text-destructive">{isEn ? 'Setup Required' : 'مطلوب إعداد'}</h2>
          <p className="text-muted-foreground mb-6">
            {isEn 
              ? 'Supabase environment variables are missing. Please configure .env.local to access the admin area.' 
              : 'متغيرات بيئة Supabase مفقودة. يرجى تكوين .env.local للوصول إلى منطقة الإدارة.'}
          </p>
          <Link href={`/${locale}`}>
            <Button variant="outline">{isEn ? 'Return Home' : 'العودة للصفحة الرئيسية'}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) return;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(isEn ? "Invalid email or password." : "البريد الإلكتروني أو كلمة المرور غير صالحة.");
      setLoading(false);
    } else {
      router.push(`/${locale}/admin/dashboard`);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="glass p-8 md:p-10 rounded-2xl max-w-md w-full relative z-10 border border-border/50 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 gold-gradient">
          {isEn ? 'Admin Secure Login' : 'تسجيل الدخول الآمن'}
        </h1>
        <p className="text-center text-muted-foreground mb-8 text-sm">
          {isEn ? 'Authorized personnel only.' : 'للموظفين المصرح لهم فقط.'}
        </p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">{isEn ? 'Email Address' : 'البريد الإلكتروني'}</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="bg-secondary/30 border-border/50 focus:border-primary"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">{isEn ? 'Password' : 'كلمة المرور'}</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="bg-secondary/30 border-border/50 focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full text-lg py-6 rounded-full" disabled={loading}>
            {loading ? (isEn ? 'Authenticating...' : 'جاري التحقق...') : (isEn ? 'Sign In' : 'تسجيل الدخول')}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-border/30 pt-6">
          <Link href={`/${locale}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {isEn ? '← Back to Website' : '← العودة للموقع'}
          </Link>
        </div>
      </div>
    </div>
  );
}
