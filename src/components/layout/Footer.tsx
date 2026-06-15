import Link from 'next/link';
import Image from 'next/image';
import { getSiteSettings } from '@/lib/data/site-settings';

export async function Footer({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const settings = await getSiteSettings();
  const ownerName = isEn ? (settings.ownerName?.en || 'Hani Alshami') : (settings.ownerName?.ar || 'هاني الشامي');

  return (
    <footer className="border-t border-white/[0.05] bg-white/[0.01]">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 outline-none">
              <div className="relative w-7 h-7 opacity-80">
                <Image src="/brand/logo-icon.png" alt="Logo" fill className="object-contain" sizes="28px" />
              </div>
              <span className="font-bold text-sm gold-gradient-subtle tracking-tight">{ownerName}</span>
            </Link>
            <p className="text-xs text-muted-foreground/60 max-w-xs text-center md:text-start leading-relaxed">
              {isEn
                ? 'Full Stack Web Developer specialising in secure, scalable business systems.'
                : 'مطور ويب متكامل متخصص في بناء أنظمة أعمال آمنة وقابلة للتطوير.'}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-7 gap-y-2">
            {[
              { href: `/${locale}`,          label: isEn ? 'Home'     : 'الرئيسية' },
              { href: `/${locale}/projects`, label: isEn ? 'Projects' : 'المشاريع' },
              { href: `/${locale}/services`, label: isEn ? 'Services' : 'الخدمات'  },
              { href: `/${locale}/skills`,   label: isEn ? 'Skills'   : 'المهارات' },
              { href: `/${locale}/about`,    label: isEn ? 'About'    : 'عني'       },
              { href: `/${locale}/contact`,  label: isEn ? 'Contact'  : 'تواصل'    },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground/50 hover:text-primary transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 h-px section-divider" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/40">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <Link href={`/${locale}/admin/dashboard`} className="hover:text-primary/70 transition-colors">
              {ownerName}
            </Link>
            {isEn ? '. All rights reserved.' : '. جميع الحقوق محفوظة.'}
          </p>
          <p className="text-muted-foreground/25 tracking-wide">{isEn ? 'Built with precision.' : 'مبني بدقة.'}</p>
        </div>
      </div>
    </footer>
  );
}
