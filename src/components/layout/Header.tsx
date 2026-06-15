import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ locale, ownerName, primaryCta }: { 
  locale: string, 
  ownerName: { en: string, ar: string },
  primaryCta?: { en?: string, ar?: string }
}) {
  const t = useTranslations('Navigation');
  const isEn = locale === 'en';

  const navLinks = [
    { href: `/${locale}`,          label: isEn ? 'Home' : 'الرئيسية' },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/skills`,   label: t('skills') },
    { href: `/${locale}/about`,    label: t('about') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0 group outline-none">
          <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/brand/logo-icon.png"
              alt="Logo"
              fill
              className="object-contain"
              sizes="32px"
              priority
            />
          </div>
          <span className="font-bold text-base md:text-lg gold-gradient tracking-tight truncate max-w-[140px] md:max-w-none">
            {isEn ? ownerName.en : ownerName.ar}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/60 hover:text-foreground transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/contact`}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-primary/10 border border-primary/30 text-primary hover:bg-primary/15 hover:border-primary/50 transition-all duration-200"
          >
            {isEn ? (primaryCta?.en || 'Hire Me') : (primaryCta?.ar || 'وظفني')}
          </Link>
        </div>
      </div>
    </header>
  );
}
