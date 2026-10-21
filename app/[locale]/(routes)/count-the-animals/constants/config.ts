import type { Difficulty } from "@/app/constants/difficulty";

export type CountRange = { min: number; max: number };

export type CountingSettings = {
  /** Each level widens the range of animals to count. */
  levels: ReadonlyArray<CountRange>;
  /** Highest number offered as an answer. */
  maxOption: number;
};

export const COUNTING_DIFFICULTY: Readonly<
  Record<Difficulty, CountingSettings>
> = Object.freeze({
  easy: {
    levels: [
      { min: 1, max: 3 },
      { min: 1, max: 5 },
    ],
    maxOption: 6,
  },
  medium: {
    levels: [
      { min: 1, max: 5 },
      { min: 3, max: 8 },
      { min: 5, max: 10 },
    ],
    maxOption: 10,
  },
  hard: {
    levels: [
      { min: 5, max: 10 },
      { min: 8, max: 15 },
      { min: 10, max: 20 },
    ],
    maxOption: 20,
  },
});

export const COUNTING_CONFIG = Object.freeze({
  roundsPerLevel: 5,
  optionCount: 4,
  optionSpread: 3,
  minOption: 1,
  nextRoundDelayMs: 2200,
  /** Count-along after a wrong answer: pause, then one animal per step. */
  revealLeadMs: 1200,
  revealStepMs: 700,
  revealHoldMs: 2600,
});
