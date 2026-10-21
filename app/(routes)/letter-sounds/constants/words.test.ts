import { describe, expect, it } from "vitest";
import { PICTURE_WORDS } from "./words";

const MIN_CVC_WORDS = 12;

describe("PICTURE_WORDS", () => {
  it("has about three dozen words, each listed once", () => {
    expect(PICTURE_WORDS.length).toBeGreaterThanOrEqual(30);
    const words = PICTURE_WORDS.map((w) => w.word);
    expect(new Set(words).size).toBe(words.length);
  });

  it("gives every word a picture, lowercase spelling and a–z first letter", () => {
    for (const { word, emoji } of PICTURE_WORDS) {
      expect(emoji).toMatch(/^\p{Extended_Pictographic}/u);
      expect(word).toMatch(/^[a-z]+(-[a-z]+)*$/);
      expect(word.charAt(0)).toMatch(/^[a-z]$/);
    }
  });

  it("avoids digraphs and soft c or g at the start", () => {
    for (const { word } of PICTURE_WORDS) {
      expect(word).not.toMatch(/^(sh|ch|th|wh|ph|kn|wr|gn)/);
      expect(word).not.toMatch(/^[cg][eiy]/);
    }
  });

  it("covers most of the alphabet", () => {
    const letters = new Set(PICTURE_WORDS.map((w) => w.word.charAt(0)));
    expect(letters.size).toBeGreaterThanOrEqual(20);
  });

  it("has enough consonant–vowel–consonant words to spell on Hard", () => {
    const cvc = PICTURE_WORDS.filter((w) => w.cvc);
    expect(cvc.length).toBeGreaterThanOrEqual(MIN_CVC_WORDS);
    for (const { word } of cvc) {
      expect(word).toMatch(/^[^aeiou][aeiou][^aeiou]$/);
      expect(new Set(word).size).toBe(3);
    }
  });

  it("marks every three-letter CVC word as CVC", () => {
    for (const { word, cvc } of PICTURE_WORDS) {
      if (/^[^aeiou][aeiou][^aeiouy]$/.test(word)) expect(cvc).toBe(true);
    }
  });
});
