import { randomInt } from "@/app/utils/randomInt";
import { shuffle } from "@/app/utils/shuffle";
import type { PatternRule, PatternSettings } from "../constants/config";

export type PatternRoundSettings = Pick<
  PatternSettings,
  "rules" | "gap" | "optionCount" | "distractors"
> & {
  /** Number of carriages, including the gap. */
  length: number;
};

export type PatternRound<T> = {
  rule: PatternRule;
  /** The train, front to back. `null` is the missing carriage. */
  carriages: (T | null)[];
  gapIndex: number;
  answer: T;
  /** Unique, shuffled, always including the answer. */
  options: T[];
};

/** How alike two faces look: higher is more alike. Used for near-miss options. */
export type Resemblance<T> = (a: T, b: T) => number;

/**
 * Positions that can be hidden while the pattern still gives the answer away:
 * another carriage in the same place of the repeat must stay visible.
 */
export function gapCandidates(
  length: number,
  period: number,
  gap: PatternSettings["gap"]
): number[] {
  const positions =
    gap === "last"
      ? [length - 1]
      : Array.from({ length }, (_, idx) => idx);
  return positions.filter(
    (idx) => idx - period >= 0 || idx + period < length
  );
}

function distinctLetters(rule: PatternRule): string[] {
  return [...new Set(rule)];
}

/** Builds one train: a repeating pattern of faces with one carriage missing. */
export function generatePattern<T>(
  settings: PatternRoundSettings,
  faces: ReadonlyArray<T>,
  resemblance?: Resemblance<T>
): PatternRound<T> {
  const { rules, length, gap, optionCount, distractors } = settings;
  const rule = rules[randomInt(0, rules.length - 1)];
  const letters = distinctLetters(rule);
  if (faces.length < Math.max(letters.length, optionCount)) {
    throw new Error(
      `Pattern "${rule}" with ${optionCount} options needs more than ${faces.length} faces`
    );
  }

  const pool = shuffle(faces);
  const faceFor = new Map(letters.map((letter, idx) => [letter, pool[idx]]));
  const full = Array.from(
    { length },
    (_, idx) => faceFor.get(rule[idx % rule.length])!
  );

  const candidates = gapCandidates(length, rule.length, gap);
  if (candidates.length === 0) {
    throw new Error(`A ${length}-carriage "${rule}" train has no fair gap`);
  }
  const gapIndex = candidates[randomInt(0, candidates.length - 1)];
  const answer = full[gapIndex];

  // Faces already on the train are the most tempting wrong answers.
  const onTrain = shuffle(letters.map((l) => faceFor.get(l)!)).filter(
    (face) => face !== answer
  );
  const spare = pool.slice(letters.length);
  const extras =
    distractors === "nearMiss" && resemblance
      ? spare.sort((a, b) => resemblance(answer, b) - resemblance(answer, a))
      : spare;
  const options = shuffle([
    answer,
    ...[...onTrain, ...extras].slice(0, optionCount - 1),
  ]);

  const carriages: (T | null)[] = full.map((face, idx) =>
    idx === gapIndex ? null : face
  );
  return { rule, carriages, gapIndex, answer, options };
}
