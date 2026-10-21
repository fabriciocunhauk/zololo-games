import type { Difficulty } from "@/app/constants/difficulty";

/** A repeating unit written as letters, e.g. "AAB". Each letter is one monster. */
export type PatternRule = string;

export type PatternSettings = {
  /** One is picked at random for each train. */
  rules: ReadonlyArray<PatternRule>;
  /** Carriages per train, one entry per level: later levels get longer trains. */
  levels: ReadonlyArray<number>;
  /** "last": the missing carriage is always at the end; "anywhere": it can be mid-train. */
  gap: "last" | "anywhere";
  optionCount: number;
  /** "colours": one monster in different colours; "monsters": different monsters. */
  faces: "colours" | "monsters";
  /** "nearMiss": spare options look as much like the answer as possible. */
  distractors: "random" | "nearMiss";
};

export const PATTERN_DIFFICULTY: Readonly<Record<Difficulty, PatternSettings>> =
  Object.freeze({
    easy: {
      rules: ["AB"],
      levels: [4, 5, 6],
      gap: "last",
      optionCount: 3,
      faces: "colours",
      distractors: "random",
    },
    medium: {
      rules: ["ABC", "AAB", "ABB"],
      levels: [6, 7],
      gap: "last",
      optionCount: 4,
      faces: "monsters",
      distractors: "random",
    },
    hard: {
      rules: ["AABB", "ABBC", "ABCD"],
      levels: [7, 8],
      gap: "anywhere",
      optionCount: 4,
      faces: "monsters",
      distractors: "nearMiss",
    },
  });

export const PATTERN_CONFIG = Object.freeze({
  roundsPerLevel: 5,
  /** After a right answer: admire the full train, then it chuffs away. */
  nextRoundDelayMs: 1800,
  /** After the answer is revealed. */
  revealHoldMs: 2600,
});
