import type { Difficulty } from "@/app/constants/difficulty";

export type Operation = "+" | "-";

export type NumberRange = { min: number; max: number };

export type BubblePopSettings = {
  operations: ReadonlyArray<Operation>;
  operands: NumberRange;
  /** Answers (and the numbers on the bubbles) stay in this range. */
  results: NumberRange;
  bubbleCount: number;
  /** Wrong answers sit within answer ± spread. Must be ≥ bubbleCount − 1. */
  optionSpread: number;
  /** Seconds for one bubble to float from bottom to top. */
  riseSeconds: NumberRange;
};

export const BUBBLE_POP_DIFFICULTY: Readonly<
  Record<Difficulty, BubblePopSettings>
> = Object.freeze({
  easy: {
    operations: ["+"],
    operands: { min: 1, max: 5 },
    results: { min: 1, max: 10 },
    bubbleCount: 3,
    optionSpread: 3,
    riseSeconds: { min: 10, max: 13 },
  },
  medium: {
    operations: ["+", "-"],
    operands: { min: 1, max: 10 },
    results: { min: 1, max: 20 },
    bubbleCount: 4,
    optionSpread: 3,
    riseSeconds: { min: 6, max: 9 },
  },
  hard: {
    operations: ["+", "-"],
    operands: { min: 1, max: 20 },
    results: { min: 0, max: 40 },
    bubbleCount: 5,
    optionSpread: 4,
    riseSeconds: { min: 4, max: 6 },
  },
});

/** Bubble colours, as Tailwind fill classes. */
export const BUBBLE_FILLS = Object.freeze([
  "fill-sky",
  "fill-grape",
  "fill-leaf",
  "fill-sun",
  "fill-pink-primary",
] as const);

export type BubbleFill = (typeof BUBBLE_FILLS)[number];

export const BUBBLE_POP_CONFIG = Object.freeze({
  roundsPerLevel: 5,
  /** Rise time multiplier per level: each level floats a little faster. */
  levelRiseScale: [1, 0.85, 0.7],
  points: 10,
  countdownFrom: 3,
  countdownStepMs: 700,
  goHoldMs: 500,
  /** Gap between bubbles setting off. */
  bubbleStaggerMs: 200,
  /** Extra pause after the last bubble sets off before taps count. */
  roundSettleMs: 500,
  nextRoundDelayMs: 1500,
  fallbackAreaSize: 400,
});
