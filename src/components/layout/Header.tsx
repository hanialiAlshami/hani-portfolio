'use client';

import { useState, useEffect } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: `/${locale}`,          label: isEn ? 'Home' : 'الرئيسية' },
    { href: `/${locale}/projects`, label: t('projects') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/skills`,   label: t('skills') },
    { href: `/${locale}/about`,    label: t('about') },
    { href: `/${locale}/contact`,  label: t('contact') },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0 group outline-none z-50 relative" onClick={closeMenu}>
          <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/brand/logo-icon.jpeg"
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
          {navLinks.filter(link => !link.href.endsWith('/contact')).map(link => (
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
        <div className="flex items-center gap-2 md:gap-3 z-50 relative">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link
            href={`/${locale}/contact`}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold bg-primary/10 border border-primary/30 text-primary hover:bg-primary/15 hover:border-primary/50 transition-all duration-200"
          >
            {isEn ? (primaryCta?.en || 'Hire Me') : (primaryCta?.ar || 'وظفني')}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? (isEn ? 'Close menu' : 'إغلاق القائمة') : (isEn ? 'Open menu' : 'فتح القائمة')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-4 h-3.5">
              <span className={`absolute left-0 w-full h-[1.5px] bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-[1.5px] bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-[64px] z-40 bg-black/95 backdrop-blur-2xl border-t border-white/[0.05] transition-all duration-300 ease-in-out flex flex-col ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
        style={{ height: 'calc(100vh - 64px)' }}
      >
        <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors border-b border-white/[0.05] pb-4 flex items-center justify-between group"
                onClick={closeMenu}
              >
                <span>{link.label}</span>
                <svg className={`w-5 h-5 text-foreground/40 group-hover:text-primary transition-transform ${isEn ? 'rotate-0' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/[0.05] flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/60">{isEn ? 'Language' : 'اللغة'}</span>
              <div onClick={closeMenu}>
                <LanguageSwitcher />
              </div>
            </div>
            
            <Link
              href={`/${locale}/contact`}
              onClick={closeMenu}
              className="flex items-center justify-center w-full px-6 py-3.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 cta-glow"
            >
              {isEn ? (primaryCta?.en || 'Hire Me') : (primaryCta?.ar || 'وظفني')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
