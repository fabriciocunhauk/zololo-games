import { BUBBLE_POP_CONFIG } from "../constants/config";
import { buildAnswerOptions } from "@/app/utils/buildAnswerOptions";
import { randomInt } from "@/app/utils/randomInt";

type MathProblem = {
  text: string;
  answer: number;
  options: number[];
};

/** A + or − problem with operands and result in range, plus answer options. */
export function generateMathProblem(): MathProblem {
  const { minOperand, maxOperand, minResult, maxResult } = BUBBLE_POP_CONFIG;
  let a: number, b: number, op: "+" | "-", answer: number;

  do {
    a = randomInt(minOperand, maxOperand);
    b = randomInt(minOperand, maxOperand);
    op = Math.random() < 0.5 ? "+" : "-";
    if (op === "-" && a < b) [a, b] = [b, a];
    answer = op === "+" ? a + b : a - b;
  } while (answer < minResult || answer > maxResult);

  const options = buildAnswerOptions({
    answer,
    count: BUBBLE_POP_CONFIG.bubbleCount,
    min: minResult,
    max: maxResult,
    spread: BUBBLE_POP_CONFIG.optionSpread,
  });

  return { text: `${a} ${op} ${b} = ?`, answer, options };
}
