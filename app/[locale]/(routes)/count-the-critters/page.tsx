import { permanentRedirect } from "next/navigation";
import { localeHref, type Locale } from "@/app/i18n/locales";

// The game was renamed; keep old links working.
export default async function CountTheCrittersRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(localeHref(locale as Locale, "/count-the-animals"));
}
