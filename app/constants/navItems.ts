import { localeHref, type Locale } from "@/app/i18n/locales";
import { MESSAGES } from "@/app/i18n/messages";
import { GAMES } from "./games";

export type NavItem = { label: string; href: string };

/** Home and every game, labelled and linked in the given language. */
export function navItems(locale: Locale): ReadonlyArray<NavItem> {
  const text = MESSAGES[locale];
  return [
    { label: text.nav.home, href: localeHref(locale, "/") },
    ...GAMES.map(({ slug, href }) => ({
      label: text.games[slug].name,
      href: localeHref(locale, href),
    })),
  ];
}
