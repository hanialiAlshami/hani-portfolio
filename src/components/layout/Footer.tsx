import Link from 'next/link';
import Image from 'next/image';
import { getSiteSettings } from '@/lib/data/site-settings';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );
}

export async function Footer({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const settings = await getSiteSettings();
  const ownerName = isEn ? (settings.ownerName?.en || 'Hani Alshami') : (settings.ownerName?.ar || 'هاني الشامي');

  const githubUrl = settings.social?.github;
  const linkedinUrl = settings.social?.linkedin;
  const whatsappUrl = settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\+/g, '')}` : undefined;

  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          
          {/* Brand & Socials */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex flex-col items-center md:items-start gap-3">
              <Link href={`/${locale}`} className="flex items-center gap-2.5 outline-none group">
                <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-105">
                  <Image src="/brand/logo-icon.jpeg" alt="Logo" fill className="object-contain" sizes="32px" />
                </div>
                <span className="font-bold text-base gold-gradient tracking-tight">{ownerName}</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm text-center md:text-start leading-relaxed font-medium">
                {isEn
                  ? 'Full Stack Web Developer specialising in secure, scalable business systems.'
                  : 'مطور ويب متكامل متخصص في بناء أنظمة أعمال آمنة وقابلة للتطوير.'}
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {whatsappUrl && (
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:-translate-y-1 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <WhatsappIcon />
                </a>
              )}
              {githubUrl && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:-translate-y-1 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <GithubIcon />
                </a>
              )}
              {linkedinUrl && (
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:-translate-y-1 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              )}
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 max-w-md">
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
                className="text-sm font-medium text-muted-foreground hover:text-[#d4af37] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground/80">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <Link href={`/${locale}/admin/dashboard`} className="hover:text-[#d4af37] transition-colors font-medium">
              {ownerName}
            </Link>
            {isEn ? '. All rights reserved.' : '. جميع الحقوق محفوظة.'}
          </p>
          <p className="tracking-wide text-xs text-muted-foreground/60">{isEn ? 'Built with precision.' : 'مبني بدقة.'}</p>
        </div>
      </div>
    </footer>
  );
}
