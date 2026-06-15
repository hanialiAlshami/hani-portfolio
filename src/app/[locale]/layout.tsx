import { Tajawal, Inter } from "next/font/google";
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from '@/lib/data/site-settings';

import { Metadata } from 'next';
import { getGlobalMetadata } from '@/lib/seo';
const inter = Inter({ subsets: ["latin"] });
const tajawal = Tajawal({ weight: ["300", "400", "500", "700"], subsets: ["arabic"] });

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
  const fontClass = locale === 'ar' ? tajawal.className : inter.className;
  const messages = await getMessages();
  const settings = await getSiteSettings();

  return (
    <html lang={locale} dir={dir}>
      <head />
      <body className={`${fontClass} min-h-screen flex flex-col bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          <Header 
            locale={locale} 
            ownerName={{
              en: settings.ownerName?.en || 'Hani Alshami',
              ar: settings.ownerName?.ar || 'هاني الشامي'
            }}
            primaryCta={settings.primaryCta}
          />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
