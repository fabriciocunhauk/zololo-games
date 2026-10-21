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
function pickDistractors(avoid: ReadonlyArray<string>, count: number) {
  const blocked = new Set(avoid.flatMap(soundAlikes));
  return shuffle(ALPHABET.filter((l) => !blocked.has(l))).slice(0, count);
}

/** Any word but the previous one (unless it's the only one). */
function pickWord(words: ReadonlyArray<PictureWord>, previous?: string) {
  const fresh = words.filter((w) => w.word !== previous);
  const choices = fresh.length > 0 ? fresh : words;
  return choices[randomInt(0, choices.length - 1)];
}

function chooseRound(
  words: ReadonlyArray<PictureWord>,
  settings: ChooseSettings,
  previous?: string
): ChooseRound {
  const word = pickWord(words, previous);
  const letter = firstLetter(word.word);
  const options = shuffle([
    letter,
    ...pickDistractors([letter], settings.optionCount - 1),
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
  settings: SpellSettings,
  previous?: string
): SpellRound {
  const word = pickWord(
    words.filter((w) => w.cvc),
    previous
  );
  const letters = word.word.split("");
  const bank = shuffle([
    ...letters,
    ...pickDistractors(letters, settings.distractorCount),
  ]);
  return { kind: "spell", word, bank };
}

/** One picture word per round, never the same word twice in a row. */
export function generateLetterRound(
  words: ReadonlyArray<PictureWord>,
  settings: LetterSettings,
  previous?: string
): LetterRound {
  return settings.mode === "spell"
    ? spellRound(words, settings, previous)
    : chooseRound(words, settings, previous);
}
