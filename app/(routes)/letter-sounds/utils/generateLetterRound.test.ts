import { describe, expect, it } from "vitest";
import { LETTER_DIFFICULTY } from "../constants/config";
import { PICTURE_WORDS } from "../constants/words";
import { generateLetterRound } from "./generateLetterRound";
import { soundAlikes } from "./letters";

const RUNS = 300;

describe("generateLetterRound: choose the first letter", () => {
  const cases = [
    { name: "easy", settings: LETTER_DIFFICULTY.easy, pattern: /^[A-Z]$/ },
    { name: "medium", settings: LETTER_DIFFICULTY.medium, pattern: /^[a-z]$/ },
  ];

  for (const { name, settings, pattern } of cases) {
    it(`${name}: unique options in the right case, including the answer`, () => {
      if (settings.mode !== "choose") throw new Error("expected choose");
      for (let i = 0; i < RUNS; i++) {
        const round = generateLetterRound(PICTURE_WORDS, settings);
        if (round.kind !== "choose") throw new Error("expected choose");
        expect(round.options).toHaveLength(settings.optionCount);
        expect(new Set(round.options).size).toBe(round.options.length);
        expect(round.options).toContain(round.answer);
        for (const option of round.options) expect(option).toMatch(pattern);
        expect(round.answer.toLowerCase()).toBe(round.word.word.charAt(0));
      }
    });
  }

  it("never offers a letter that sounds like the answer", () => {
    for (let i = 0; i < RUNS; i++) {
      const round = generateLetterRound(PICTURE_WORDS, LETTER_DIFFICULTY.medium);
      if (round.kind !== "choose") throw new Error("expected choose");
      const alikes = soundAlikes(round.answer).filter((l) => l !== round.answer);
      for (const l of alikes) expect(round.options).not.toContain(l);
    }
  });
});

describe("generateLetterRound: spell a CVC word", () => {
  const settings = LETTER_DIFFICULTY.hard;

  it("only uses CVC words, with a bank holding the word's letters", () => {
    if (settings.mode !== "spell") throw new Error("expected spell");
    for (let i = 0; i < RUNS; i++) {
      const round = generateLetterRound(PICTURE_WORDS, settings);
      if (round.kind !== "spell") throw new Error("expected spell");
      expect(round.word.cvc).toBe(true);
      expect(round.word.word).toHaveLength(3);
      expect(round.bank).toHaveLength(3 + settings.distractorCount);
      expect(new Set(round.bank).size).toBe(round.bank.length);
      for (const letter of round.word.word) expect(round.bank).toContain(letter);
      for (const letter of round.bank) expect(letter).toMatch(/^[a-z]$/);
    }
  });
});

describe("generateLetterRound: variety", () => {
  for (const [name, settings] of Object.entries(LETTER_DIFFICULTY)) {
    it(`${name}: never repeats the previous word`, () => {
      let previous: string | undefined;
      for (let i = 0; i < RUNS; i++) {
        const round = generateLetterRound(PICTURE_WORDS, settings, previous);
        expect(round.word.word).not.toBe(previous);
        previous = round.word.word;
      }
    });
  }

  it("still works with a single word", () => {
    const only = [{ word: "cat", emoji: "🐱", cvc: true }];
    const round = generateLetterRound(only, LETTER_DIFFICULTY.hard, "cat");
    expect(round.word.word).toBe("cat");
  });
});
