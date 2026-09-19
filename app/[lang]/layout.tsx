import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LayoutGuide } from "layout-guide";

import "../globals.css";

import { Dock, Header, MobileMenu } from "@/components";
import { getNavItems } from "@/config/navigation";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { QueryProvider } from "@/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang: locale } = await params;
  const { meta } = await getDictionary(locale);

  return { title: meta.title, description: meta.description };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const navItems = getNavItems(locale, dictionary);

  return (
    <html lang={locale} className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-black antialiased">
        <QueryProvider>
          <Header actions={dictionary.actions} />
          <main className="flex-1">{children}</main>
          <Dock items={navItems} label={dictionary.actions.navigation} />
          <MobileMenu items={navItems} label={dictionary.actions.navigation} />
        </QueryProvider>
        <LayoutGuide />
      </body>
    </html>
  );
}
