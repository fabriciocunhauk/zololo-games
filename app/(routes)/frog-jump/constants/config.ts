import type { Difficulty } from "@/app/constants/difficulty";

export type NumberRange = { min: number; max: number };

export type FrogJumpSettings = {
  /** The lily pads, one per number. */
  line: NumberRange;
  /** Whether jumps can go back (taking away) as well as forward. */
  backwards: boolean;
  /** Jump sizes for each level; later levels allow bigger jumps. */
  levels: ReadonlyArray<NumberRange>;
};

export const FROG_JUMP_DIFFICULTY: Readonly<
  Record<Difficulty, FrogJumpSettings>
> = Object.freeze({
  easy: {
    line: { min: 0, max: 10 },
    backwards: false,
    levels: [
      { min: 1, max: 2 },
      { min: 1, max: 3 },
    ],
  },
  medium: {
    line: { min: 0, max: 20 },
    backwards: true,
    levels: [
      { min: 1, max: 3 },
      { min: 1, max: 4 },
      { min: 1, max: 5 },
    ],
  },
  hard: {
    line: { min: 0, max: 30 },
    backwards: true,
    levels: [
      { min: 2, max: 5 },
      { min: 2, max: 8 },
      { min: 2, max: 10 },
    ],
  },
});

export const FROG_JUMP_CONFIG = Object.freeze({
  roundsPerLevel: 5,
  optionCount: 4,
  optionSpread: 3,
  /** One hop from the start pad to the landing pad. */
  hopMs: 700,
  nextRoundDelayMs: 2200,
  /** Longer pause after a wrong answer so the hop and the answer sink in. */
  wrongHoldMs: 3600,
});
