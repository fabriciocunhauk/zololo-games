import type { Difficulty } from "@/app/constants/difficulty";

export type MemorySettings = {
  /** Pairs on level 1; each level adds `pairsPerLevel` up to `maxPairs`. */
  startPairs: number;
  maxPairs: number;
  /** How long a mismatched pair stays face up. */
  mismatchDelayMs: number;
};

export const MEMORY_DIFFICULTY: Readonly<Record<Difficulty, MemorySettings>> =
  Object.freeze({
    easy: { startPairs: 2, maxPairs: 6, mismatchDelayMs: 1400 },
    medium: { startPairs: 4, maxPairs: 10, mismatchDelayMs: 1200 },
    hard: { startPairs: 6, maxPairs: 14, mismatchDelayMs: 900 },
  });

export const MEMORY_CONFIG = Object.freeze({
  pairsPerLevel: 2,
  matchDelayMs: 800,
  levelUpDelayMs: 2200,
});
