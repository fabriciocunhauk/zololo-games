import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  localeHref,
  type Locale,
} from "./locales";
import { MESSAGES, type GameSlug } from "./messages";

/**
 * Description, canonical URL and links to the page in every language, so
 * search engines show each reader their own language.
 */
export function pageMetadata(
  locale: Locale,
  href: string,
  { title, description }: { title?: string; description: string }
): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: {
      canonical: localeHref(locale, href),
      languages: {
        ...Object.fromEntries(
          LOCALES.map((other) => [HTML_LANG[other], localeHref(other, href)])
        ),
        "x-default": localeHref(DEFAULT_LOCALE, href),
      },
    },
  };
}

/** `generateMetadata` for a game page: its name and description. */
export function gameMetadata(slug: GameSlug) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const game = MESSAGES[locale as Locale].games[slug];
    return pageMetadata(locale as Locale, `/${slug}`, {
      title: game.name,
      description: game.description,
    });
  };
}
