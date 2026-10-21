import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/app/i18n/locales";

/**
 * English lives at unprefixed URLs ("/frog-jump") and other languages under
 * their prefix ("/pt/frog-jump"). Unprefixed requests are served from the
 * "/en" pages without changing the URL.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = pathname.split("/")[1];

  // "/en/..." would duplicate every English page: send it to the real URL.
  if (prefix === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (LOCALES.some((locale) => locale === prefix)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: skip Next's own files and anything with a file extension
  // (icons, social images, brand images).
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
