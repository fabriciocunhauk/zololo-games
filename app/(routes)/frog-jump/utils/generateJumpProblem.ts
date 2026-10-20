import { FROG_JUMP_CONFIG } from "../constants/config";
import { buildAnswerOptions } from "@/app/utils/buildAnswerOptions";
import { randomInt } from "@/app/utils/randomInt";

export type JumpProblem = {
  start: number;
  operation: "+" | "-";
  jump: number;
  answer: number;
  options: number[];
};

export function generateJumpProblem(): JumpProblem {
  const { min, max, maxStart, maxJump, optionCount, optionSpread } =
    FROG_JUMP_CONFIG;
  let start: number, operation: JumpProblem["operation"], jump: number;
  let answer: number;

  do {
    start = randomInt(1, maxStart);
    operation = Math.random() < 0.5 ? "+" : "-";
    jump = randomInt(1, maxJump);
    answer = operation === "+" ? start + jump : start - jump;
  } while (answer < min || answer > max);

  const options = buildAnswerOptions({
    answer,
    count: optionCount,
    min,
    max,
    spread: optionSpread,
  });

  return { start, operation, jump, answer, options };
}
