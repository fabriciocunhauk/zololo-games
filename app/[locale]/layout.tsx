import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Atkinson_Hyperlegible, Bagel_Fat_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import MotionProvider from "@/app/components/MotionProvider";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import LocaleProvider from "@/app/i18n/LocaleProvider";
import { HTML_LANG, LOCALES, isLocale } from "@/app/i18n/locales";
import { MESSAGES } from "@/app/i18n/messages";

const displayFont = Bagel_Fat_One({
  variable: "--font-bagel",
  weight: "400",
  subsets: ["latin"],
});

const bodyFont = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  weight: ["400", "700"],
  subsets: ["latin"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Only the listed languages exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { site } = MESSAGES[locale];
  return {
    title: { default: site.name, template: `%s · ${site.name}` },
    description: site.description,
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    // Browser extensions (e.g. LanguageTool) add attributes to <html> before
    // React loads; only this element's attributes are exempt from the check.
    <html
      lang={HTML_LANG[locale]}
      className={`${displayFont.variable} ${bodyFont.variable}`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <LocaleProvider locale={locale}>
          <Navbar locale={locale} />
          <MotionProvider>{children}</MotionProvider>
          <Footer locale={locale} />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
