import { randomInt } from "@/app/utils/randomInt";
import { shuffle } from "@/app/utils/shuffle";
import type {
  ChooseSettings,
  LetterSettings,
  SpellSettings,
} from "../constants/config";
import type { PictureWord } from "../constants/words";
import { ALPHABET, firstLetter, soundAlikes, withCase } from "./letters";

export type ChooseRound = {
  kind: "choose";
  word: PictureWord;
  /** The first letter, in the round's case. */
  answer: string;
  options: string[];
};

export type SpellRound = {
  kind: "spell";
  word: PictureWord;
  /** The word's letters plus distractors, shuffled, lowercase. */
  bank: string[];
};

export type LetterRound = ChooseRound | SpellRound;

/** Random letters that are not in `avoid` and don't sound like anything in it. */
function pickDistractors(
  alphabet: ReadonlyArray<string>,
  avoid: ReadonlyArray<string>,
  count: number
) {
  const blocked = new Set(avoid.flatMap(soundAlikes));
  return shuffle(alphabet.filter((l) => !blocked.has(l))).slice(0, count);
}

/** First letters of the picture's other names, so a fair guess is never marked wrong. */
function otherNameLetters(word: PictureWord) {
  return (word.alsoCalled ?? []).map(firstLetter);
}

/** Any word but the previous one (unless it's the only one). */
function pickWord(words: ReadonlyArray<PictureWord>, previous?: string) {
  const fresh = words.filter((w) => w.word !== previous);
  const choices = fresh.length > 0 ? fresh : words;
  return choices[randomInt(0, choices.length - 1)];
}

function chooseRound(
  words: ReadonlyArray<PictureWord>,
  alphabet: ReadonlyArray<string>,
  settings: ChooseSettings,
  previous?: string
): ChooseRound {
  const word = pickWord(words, previous);
  const letter = firstLetter(word.word);
  const options = shuffle([
    letter,
    ...pickDistractors(
      alphabet,
      [letter, ...otherNameLetters(word)],
      settings.optionCount - 1
    ),
  ]).map((l) => withCase(l, settings.letterCase));
  return {
    kind: "choose",
    word,
    answer: withCase(letter, settings.letterCase),
    options,
  };
}

function spellRound(
  words: ReadonlyArray<PictureWord>,
  alphabet: ReadonlyArray<string>,
  settings: SpellSettings,
  previous?: string
): SpellRound {
  const word = pickWord(
    words.filter((w) => w.spellable),
    previous
  );
  const letters = word.word.split("");
  const bank = shuffle([
    ...letters,
    ...pickDistractors(
      alphabet,
      [...letters, ...otherNameLetters(word)],
      Math.max(0, settings.bankSize - letters.length)
    ),
  ]);
  return { kind: "spell", word, bank };
}

/**
 * One picture word per round, never the same word twice in a row.
 * Distractors come from `alphabet`, the letters of the words' language.
 */
export function generateLetterRound(
  words: ReadonlyArray<PictureWord>,
  settings: LetterSettings,
  previous?: string,
  alphabet: ReadonlyArray<string> = ALPHABET.en
): LetterRound {
  return settings.mode === "spell"
    ? spellRound(words, alphabet, settings, previous)
    : chooseRound(words, alphabet, settings, previous);
}
