import type { Difficulty } from "@/app/constants/difficulty";
import type { OddAttribute } from "./attributes";

export type OddSettings = {
  /** How many monsters are on the grid at each level. */
  levels: ReadonlyArray<number>;
  /** The features the odd monster may differ by. */
  attributes: ReadonlyArray<OddAttribute>;
};

export const ODD_DIFFICULTY: Readonly<Record<Difficulty, OddSettings>> =
  Object.freeze({
    easy: { levels: [4, 6], attributes: ["color", "body"] },
    medium: { levels: [6, 9], attributes: ["eyes", "top"] },
    hard: { levels: [9, 12], attributes: ["mouth", "pattern"] },
  });

export const ODD_CONFIG = Object.freeze({
  roundsPerLevel: 5,
  /** Wrong taps before the odd one is shown. */
  maxWrongTaps: 2,
  nextRoundDelayMs: 2400,
  revealHoldMs: 3200,
});
