import { IBM_Plex_Sans_Arabic, Sora } from "next/font/google";
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from '@/lib/data/site-settings';

import { HideOnAdmin } from "@/components/layout/HideOnAdmin";

import { Metadata } from 'next';
import { getGlobalMetadata } from '@/lib/seo';
const sora = Sora({ subsets: ["latin"], variable: "--font-latin" });
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ weight: ["300", "400", "500", "600", "700"], subsets: ["arabic"], variable: "--font-arabic" });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return getGlobalMetadata(locale);
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? ibmPlexSansArabic.className : sora.className;
  const variableClass = locale === 'ar' ? ibmPlexSansArabic.variable : sora.variable;
  const messages = await getMessages();
  const settings = await getSiteSettings();

  return (
    <html lang={locale} dir={dir}>
      <head />
      <body className={`${fontClass} ${variableClass} min-h-screen flex flex-col bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          <HideOnAdmin>
            <Header 
              locale={locale} 
              ownerName={{
                en: settings.ownerName?.en || 'Hani Alshami',
                ar: settings.ownerName?.ar || 'هاني الشامي'
              }}
              primaryCta={settings.primaryCta}
            />
          </HideOnAdmin>
          
          <main className="flex-1">
            {children}
          </main>

          <HideOnAdmin>
            <Footer locale={locale} />
          </HideOnAdmin>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
