import { describe, expect, it } from "vitest";
import { ALPHABET } from "../utils/letters";
import { PICTURE_WORDS } from "./words";

const MIN_SPELLABLE_WORDS = 12;

/** Newer emoji draw as empty boxes on older tablets. */
const MAX_EMOJI_VERSION = 12;

/**
 * The Emoji version that introduced each picture. To add a word, look its
 * emoji up on emojipedia.org and list it here; anything newer than
 * MAX_EMOJI_VERSION fails (e.g. 🪺 nest is 15.0, 🪵 wood is 13.0).
 */
const EMOJI_VERSION: Readonly<Record<string, number>> = {
  "🍎": 1, "🐜": 1, "🦇": 3, "🛏️": 1, "🗑️": 1, "🚌": 1, "🐱": 1, "🐶": 1,
  "🦆": 3, "🥚": 3, "🐘": 1, "🐟": 1, "🦊": 3, "🐸": 1, "🐐": 1, "🎩": 1,
  "🦔": 5, "🪁": 12, "🦘": 11, "🦵": 11, "🦁": 1, "🌙": 1, "🗺️": 1, "👃": 1,
  "🐙": 1, "🐷": 1, "🖊️": 1, "🌈": 1, "🤖": 1, "☀️": 1, "⛺": 1, "☂️": 1,
  "🌋": 1, "🧙": 5, "🪀": 12, "🦓": 5,
  // Portuguese pictures not used in English.
  "🐝": 1, "✈️": 1, "🍌": 1, "⚽": 1, "👢": 1, "🐴": 1, "🐍": 1, "🐰": 1,
  "🎲": 1, "🦷": 11, "🌷": 1, "🚀": 1, "🐔": 1, "⛪": 1, "🏝️": 1, "🐊": 1,
  "🐞": 1, "✏️": 1, "🧤": 5, "🐒": 1, "🍯": 1, "🌽": 1, "🚢": 1, "☁️": 1,
  "👁️": 1, "🍐": 1, "🐭": 1, "🌹": 1, "🍦": 1, "🐢": 1, "🍅": 1, "🐻": 1,
  "🍇": 1, "🐮": 1, "🕯️": 1, "☕": 1,
};

/** Lowercase words; Portuguese may carry accents after the first letter. */
const SPELLING = {
  en: { word: /^[a-z]+(-[a-z]+)*$/, name: /^[a-z]+( [a-z]+)*$/ },
  pt: { word: /^[a-z][a-zà-ú]*$/, name: /^[a-zà-ú]+( [a-zà-ú]+)*$/ },
};

/** Starts whose first letter doesn't make its usual sound. */
const TRICKY_START = {
  en: /^(sh|ch|th|wh|ph|kn|wr|gn|[cg][eiy])/,
  pt: /^(h|ch|lh|nh|qu|[cg][eií])/,
};

describe.each(Object.entries(PICTURE_WORDS))("PICTURE_WORDS.%s", (lang, list) => {
  const locale = lang as keyof typeof PICTURE_WORDS;

  it("has about three dozen words, each listed once", () => {
    expect(list.length).toBeGreaterThanOrEqual(30);
    const words = list.map((w) => w.word);
    expect(new Set(words).size).toBe(words.length);
  });

  it("gives every word a picture, lowercase spelling and a first letter from the alphabet", () => {
    for (const { word, emoji } of list) {
      expect(emoji).toMatch(/^\p{Extended_Pictographic}/u);
      expect(word).toMatch(SPELLING[locale].word);
      expect(ALPHABET[locale]).toContain(word.charAt(0));
    }
  });

  it("avoids digraphs, silent letters and soft c or g at the start", () => {
    for (const { word } of list) {
      expect(word).not.toMatch(TRICKY_START[locale]);
    }
  });

  it("only uses emoji that older tablets can draw", () => {
    for (const { word, emoji } of list) {
      const version = EMOJI_VERSION[emoji];
      expect(version, `${word}: list ${emoji} in EMOJI_VERSION`).toBeDefined();
      expect(version, `${word}: ${emoji} is too new`).toBeLessThanOrEqual(
        MAX_EMOJI_VERSION
      );
    }
  });

  it("gives other names in lowercase, never the word itself", () => {
    for (const { word, alsoCalled = [] } of list) {
      for (const name of alsoCalled) {
        expect(name).toMatch(SPELLING[locale].name);
        expect(name).not.toBe(word);
      }
    }
  });

  it("covers most of the alphabet", () => {
    const letters = new Set(list.map((w) => w.word.charAt(0)));
    expect(letters.size).toBeGreaterThanOrEqual(20);
  });

  it("has enough short, plain words to spell on Hard, each letter once", () => {
    const spellable = list.filter((w) => w.spellable);
    expect(spellable.length).toBeGreaterThanOrEqual(MIN_SPELLABLE_WORDS);
    for (const { word } of spellable) {
      expect(word).toMatch(/^[a-z]+$/);
      expect(new Set(word).size).toBe(word.length);
    }
  });
});

describe("PICTURE_WORDS.en", () => {
  it("spells only consonant–vowel–consonant words on Hard", () => {
    for (const { word } of PICTURE_WORDS.en.filter((w) => w.spellable)) {
      expect(word).toMatch(/^[^aeiou][aeiou][^aeiou]$/);
    }
  });

  it("marks every three-letter CVC word as spellable", () => {
    for (const { word, spellable } of PICTURE_WORDS.en) {
      if (/^[^aeiou][aeiou][^aeiouy]$/.test(word)) expect(spellable).toBe(true);
    }
  });
});

describe("PICTURE_WORDS.pt", () => {
  it("spells three- or four-letter words without digraphs on Hard", () => {
    for (const { word } of PICTURE_WORDS.pt.filter((w) => w.spellable)) {
      expect(word).toMatch(/^[a-z]{3,4}$/);
      expect(word).not.toMatch(/ch|lh|nh|rr|ss|qu|gu/);
    }
  });
});
