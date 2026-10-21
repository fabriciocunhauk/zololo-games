import { buildAnswerOptions } from "@/app/utils/buildAnswerOptions";
import { randomInt } from "@/app/utils/randomInt";
import { COUNTING_CONFIG, type CountRange } from "../constants/config";

export type CountingRound<T> = {
  animal: T;
  answer: number;
  /** Ascending, so children can find their number in order. */
  options: number[];
};

/** One kind of animal per round, never the same animal twice in a row. */
export function generateCountingRound<T>(
  animals: ReadonlyArray<T>,
  range: CountRange,
  maxOption: number,
  previous?: T
): CountingRound<T> {
  const choices =
    animals.length > 1 ? animals.filter((a) => a !== previous) : animals;
  const animal = choices[randomInt(0, choices.length - 1)];
  const answer = randomInt(range.min, range.max);
  const options = buildAnswerOptions({
    answer,
    count: COUNTING_CONFIG.optionCount,
    min: COUNTING_CONFIG.minOption,
    max: maxOption,
    spread: COUNTING_CONFIG.optionSpread,
  }).sort((a, b) => a - b);

  return { animal, answer, options };
}
