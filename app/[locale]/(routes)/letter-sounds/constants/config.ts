import type { Difficulty } from "@/app/constants/difficulty";

export type LetterCase = "upper" | "lower";

/** Pick the first letter from a row of tiles. */
export type ChooseSettings = {
  mode: "choose";
  letterCase: LetterCase;
  /** Show the word with its first letter blanked ("_pple"), or the picture only. */
  showWord: boolean;
  optionCount: number;
  /** Shown beside the level in the star meter. */
  caption: string;
};

/** Spell a CVC word from a bank of its letters plus distractors. */
export type SpellSettings = {
  mode: "spell";
  distractorCount: number;
  caption: string;
};

export type LetterSettings = ChooseSettings | SpellSettings;

export const LETTER_DIFFICULTY: Readonly<Record<Difficulty, LetterSettings>> =
  Object.freeze({
    easy: {
      mode: "choose",
      letterCase: "upper",
      showWord: true,
      optionCount: 3,
      caption: "first letter",
    },
    medium: {
      mode: "choose",
      letterCase: "lower",
      showWord: false,
      optionCount: 4,
      caption: "name & pick",
    },
    hard: {
      mode: "spell",
      distractorCount: 3,
      caption: "spell it",
    },
  });

export const LETTER_CONFIG = Object.freeze({
  roundsPerLevel: 5,
  levelCount: 5,
  nextRoundDelayMs: 2400,
  /** After a wrong letter: "Say the word slowly…", then show the answer, then move on. */
  revealLeadMs: 1500,
  revealHoldMs: 2400,
});
