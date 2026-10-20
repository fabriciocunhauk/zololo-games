import { shuffle } from "./shuffle";
import { randomInt } from "./randomInt";

type AnswerOptionsInput = {
  answer: number;
  count: number;
  min: number;
  max: number;
  /** Distractors are picked within answer ± spread, then clamped to [min, max]. */
  spread: number;
};

/** Shuffled list of `count` unique options that always includes `answer`. */
export function buildAnswerOptions({
  answer,
  count,
  min,
  max,
  spread,
}: AnswerOptionsInput): number[] {
  const options = new Set<number>([answer]);
  while (options.size < count) {
    const candidate = answer + randomInt(-spread, spread);
    options.add(Math.max(min, Math.min(max, candidate)));
  }
  return shuffle(Array.from(options));
}
