export const LOCALES = ["en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** The `lang` attribute for each locale. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en-GB",
  pt: "pt-BR",
};

/** The language's own name, for the switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  pt: "Português",
};

export function isLocale(value: unknown): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

/**
 * The public URL of a page in a locale. English has no prefix, so "/" and
 * "/frog-jump" become "/pt" and "/pt/frog-jump" in Portuguese.
 */
export function localeHref(locale: Locale, href: string) {
  if (locale === DEFAULT_LOCALE) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/**
 * The page's path without its locale prefix: "/pt/frog-jump" → "/frog-jump".
 * Also strips "/en": on prerendered pages `usePathname()` can return the
 * internal path the middleware rewrote to, not the address bar's.
 */
export function stripLocale(pathname: string) {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname;
}
