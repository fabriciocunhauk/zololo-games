import { describe, expect, it } from "vitest";
import { isLocale, localeHref, stripLocale } from "./locales";

describe("localeHref", () => {
  it("leaves English unprefixed", () => {
    expect(localeHref("en", "/")).toBe("/");
    expect(localeHref("en", "/frog-jump")).toBe("/frog-jump");
  });

  it("prefixes Portuguese", () => {
    expect(localeHref("pt", "/")).toBe("/pt");
    expect(localeHref("pt", "/frog-jump")).toBe("/pt/frog-jump");
  });
});

describe("stripLocale", () => {
  it("removes the Portuguese prefix", () => {
    expect(stripLocale("/pt")).toBe("/");
    expect(stripLocale("/pt/frog-jump")).toBe("/frog-jump");
  });

  it("removes the internal English prefix", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/frog-jump")).toBe("/frog-jump");
  });

  it("leaves English paths and look-alikes alone", () => {
    expect(stripLocale("/")).toBe("/");
    expect(stripLocale("/frog-jump")).toBe("/frog-jump");
    expect(stripLocale("/pattern-train")).toBe("/pattern-train");
  });

  it("round-trips with localeHref", () => {
    for (const href of ["/", "/memory-game"]) {
      expect(stripLocale(localeHref("pt", href))).toBe(href);
    }
  });
});

describe("isLocale", () => {
  it("knows the supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
  });
});
