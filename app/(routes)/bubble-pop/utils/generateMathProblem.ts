import { buildAnswerOptions } from "@/app/utils/buildAnswerOptions";
import { randomInt } from "@/app/utils/randomInt";
import type { BubblePopSettings, Operation } from "../constants/config";

export type MathProblem = {
  text: string;
  answer: number;
  /** One per bubble; always includes the answer. */
  options: number[];
};

/** A sum within the difficulty's ranges, never negative, plus answer options. */
export function generateMathProblem(settings: BubblePopSettings): MathProblem {
  const { operations, operands, results, bubbleCount, optionSpread } =
    settings;
  let a: number, b: number, op: Operation, answer: number;

  do {
    a = randomInt(operands.min, operands.max);
    b = randomInt(operands.min, operands.max);
    op = operations[randomInt(0, operations.length - 1)];
    if (op === "-" && a < b) [a, b] = [b, a];
    answer = op === "+" ? a + b : a - b;
  } while (answer < results.min || answer > results.max);

  const options = buildAnswerOptions({
    answer,
    count: bubbleCount,
    min: Math.max(0, results.min),
    max: results.max,
    spread: optionSpread,
  });

  return { text: `${a} ${op} ${b} = ?`, answer, options };
}
