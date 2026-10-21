import type { LetterCase } from "../constants/config";

export const ALPHABET: ReadonlyArray<string> = Object.freeze(
  "abcdefghijklmnopqrstuvwxyz".split("")
);

/** Letters that make the same first sound, so one never distracts from another. */
const SOUND_ALIKES: ReadonlyArray<ReadonlyArray<string>> = [["c", "k", "q"]];

/** The letter itself plus any letter that sounds the same at the start of a word. */
export function soundAlikes(letter: string): string[] {
  const group = SOUND_ALIKES.find((letters) => letters.includes(letter));
  return group ? [...group] : [letter];
}

export function firstLetter(word: string): string {
  return word.charAt(0);
}

export function withCase(letter: string, letterCase: LetterCase): string {
  return letterCase === "upper" ? letter.toUpperCase() : letter.toLowerCase();
}

export function capitalise(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
