import { Metadata } from 'next';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Mail, MessageSquare, MapPin, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { getSiteSettings } from '@/lib/data/site-settings';
import { sendContactMessageAction } from './actions';
import { SubmitButton } from '@/components/admin/SubmitButton';

import { constructMetadata } from '@/lib/seo';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    title: locale === 'en' ? 'Contact' : 'تواصل معي',
    description: locale === 'en'
      ? 'Get in touch for freelance projects or full-time opportunities.'
      : 'تواصل معي لمشاريع العمل الحر أو فرص العمل بدوام كامل.',
    locale,
    path: '/contact',
  });
}

export default async function ContactPage({
  params: { locale },
  searchParams
}: {
  params: { locale: string };
  searchParams: { status?: string; error?: string };
}) {
  const isEn = locale === 'en';
  const settings = await getSiteSettings();
  const formAction = sendContactMessageAction.bind(null, locale);

  return (
    <div>
      {/* Hero */}
      <div className="relative py-20 md:py-28 border-b border-white/[0.05] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(212,168,54,0.1),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-5 bg-primary/50" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary/70">
              {isEn ? "Let's Talk" : 'دعنا نتحدث'}
            </span>
            <span className="h-px w-5 bg-primary/50" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold gold-gradient pb-4 mb-5 leading-tight tracking-tight">
            {isEn ? "Let's Work Together" : 'دعنا نعمل معاً'}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {isEn
              ? "I'm currently available for freelance projects and full-time opportunities. I typically respond within 24 hours."
              : 'أنا متاح حالياً لمشاريع العمل الحر وفرص العمل بدوام كامل. أرد عادةً خلال 24 ساعة.'}
          </p>
        </div>
      </div>

      <div className="container px-6 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-5 bg-primary/50" />
                <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary/70">
                  {isEn ? 'Contact Details' : 'تفاصيل التواصل'}
                </span>
              </div>
              <div className="space-y-3">
                <a
                  href={settings.email ? `mailto:${settings.email}` : '#'}
                  className="flex items-center gap-4 p-4 rounded-xl glass border border-white/[0.06] hover:border-primary/25 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">
                      {isEn ? 'Email' : 'البريد الإلكتروني'}
                    </span>
                    <span className="text-sm font-medium dir-ltr">{settings.email || 'contact@example.com'}</span>
                  </div>
                </a>

                {(settings.whatsapp || settings.phone) && (
                  <a
                    href={settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl glass border border-white/[0.06] hover:border-primary/25 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shrink-0 group-hover:bg-green-500/15 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">
                        {isEn ? 'WhatsApp' : 'واتساب'}
                      </span>
                      <span className="text-sm font-medium dir-ltr">{settings.whatsapp || settings.phone}</span>
                    </div>
                  </a>
                )}

                {(settings.location?.en || settings.location?.ar) && (
                  <div className="flex items-center gap-4 p-4 rounded-xl glass border border-white/[0.06]">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5">
                        {isEn ? 'Location' : 'الموقع'}
                      </span>
                      <span className="text-sm font-medium">{isEn ? settings.location.en : settings.location.ar}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust note */}
            <div className="glass p-5 rounded-xl border border-white/[0.06] flex items-start gap-3">
              <Shield className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isEn
                  ? 'Your message is private and will never be shared. I respond to every serious inquiry within 24 hours.'
                  : 'رسالتك خاصة ولن تُشارك أبداً. أرد على كل استفسار جاد خلال 24 ساعة.'}
              </p>
            </div>

            {/* Status alerts */}
            {searchParams.status === 'sent' && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">
                  {isEn
                    ? 'Thank you! Your message has been sent. I will get back to you soon.'
                    : 'شكراً لك! تم إرسال رسالتك بنجاح. سأرد عليك قريباً.'}
                </p>
              </div>
            )}
            {(searchParams.error === 'invalid' || searchParams.error === 'send-failed') && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">
                  {searchParams.error === 'invalid'
                    ? (isEn ? 'Please fill out all required fields correctly.' : 'يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.')
                    : (isEn ? 'Failed to send. Please try again later.' : 'فشل الإرسال. حاول مجدداً لاحقاً.')}
                </p>
              </div>
            )}
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <div className="glass p-8 md:p-10 rounded-2xl border border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              <h2 className="text-xl font-bold mb-8">
                {isEn ? 'Send a Message' : 'أرسل رسالة'}
              </h2>

              <form action={formAction} className="space-y-5">
                {/* Honeypot — must stay */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isEn ? 'Name *' : 'الاسم *'}
                    </label>
                    <Input
                      name="name"
                      placeholder={isEn ? 'Your full name' : 'اسمك الكامل'}
                      required
                      className="bg-white/[0.03] border-white/[0.08] focus:border-primary/40 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isEn ? 'Email *' : 'البريد الإلكتروني *'}
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      dir="ltr"
                      className="bg-white/[0.03] border-white/[0.08] focus:border-primary/40 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isEn ? 'Phone (Optional)' : 'الهاتف (اختياري)'}
                    </label>
                    <Input
                      name="phone"
                      placeholder="+1 234 567 890"
                      dir="ltr"
                      className="bg-white/[0.03] border-white/[0.08] focus:border-primary/40 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {isEn ? 'Subject (Optional)' : 'الموضوع (اختياري)'}
                    </label>
                    <Input
                      name="subject"
                      placeholder={isEn ? 'Project brief...' : 'موضوع الرسالة...'}
                      className="bg-white/[0.03] border-white/[0.08] focus:border-primary/40 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {isEn ? 'Message *' : 'الرسالة *'}
                  </label>
                  <Textarea
                    name="message"
                    placeholder={isEn
                      ? 'Tell me about your project, goals, and timeline...'
                      : 'أخبرني عن مشروعك وأهدافك والجدول الزمني...'}
                    required
                    className="min-h-[140px] bg-white/[0.03] border-white/[0.08] focus:border-primary/40 rounded-xl resize-none"
                  />
                </div>

                <SubmitButton
                  idleText={isEn ? 'Send Message' : 'إرسال الرسالة'}
                  pendingText={isEn ? 'Sending...' : 'جاري الإرسال...'}
                  className="w-full rounded-full py-3.5 font-bold text-sm cta-glow"
                />
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
