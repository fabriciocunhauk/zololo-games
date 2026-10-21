"use client";
import { usePathname } from "next/navigation";
import { useLocale, useMessages } from "@/app/i18n/LocaleProvider";
import {
  HTML_LANG,
  LOCALES,
  LOCALE_NAMES,
  localeHref,
  stripLocale,
} from "@/app/i18n/locales";
import { classNames } from "@/app/utils/appearance";

/** EN | PT: the same page in the other language. */
export default function LanguageSwitcher() {
  const current = useLocale();
  const { nav } = useMessages();
  const page = stripLocale(usePathname());

  return (
    <div
      role="group"
      aria-label={nav.language}
      className="flex rounded-full border-[3px] border-ink bg-white p-0.5 shadow-[0_3px_0_var(--color-ink)]"
    >
      {LOCALES.map((locale) => (
        // A plain link: each language has its own root layout, so the
        // switch is a full page load either way.
        <a
          key={locale}
          href={localeHref(locale, page)}
          hrefLang={HTML_LANG[locale]}
          lang={HTML_LANG[locale]}
          aria-label={LOCALE_NAMES[locale]}
          aria-current={locale === current ? "true" : undefined}
          className={classNames(
            "flex min-h-9 min-w-11 items-center justify-center rounded-full px-2 text-sm font-bold uppercase focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink",
            locale === current ? "bg-ink text-paper" : "hover:bg-ink/10"
          )}
        >
          {locale}
        </a>
      ))}
    </div>
  );
}
