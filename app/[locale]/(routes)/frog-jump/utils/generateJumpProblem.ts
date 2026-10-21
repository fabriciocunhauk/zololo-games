import { buildAnswerOptions } from "@/app/utils/buildAnswerOptions";
import { randomInt } from "@/app/utils/randomInt";
import {
  FROG_JUMP_CONFIG,
  type FrogJumpSettings,
  type NumberRange,
} from "../constants/config";

export type JumpProblem = {
  start: number;
  operation: "+" | "-";
  jump: number;
  answer: number;
  /** Ascending, so children can find their number in order. */
  options: number[];
};

const isSame = (a: JumpProblem, b?: JumpProblem) =>
  !!b &&
  a.start === b.start &&
  a.operation === b.operation &&
  a.jump === b.jump;

function rollJump(
  { line, backwards }: Pick<FrogJumpSettings, "line" | "backwards">,
  jumps: NumberRange,
): Omit<JumpProblem, "options"> {
  const jump = randomInt(jumps.min, jumps.max);
  const operation = backwards && Math.random() < 0.5 ? "-" : "+";
  // Pick the start so the frog always lands on the line.
  const start =
    operation === "+"
      ? randomInt(line.min, line.max - jump)
      : randomInt(line.min + jump, line.max);
  const answer = operation === "+" ? start + jump : start - jump;
  return { start, operation, jump, answer };
}

/** A jump that lands on the line, never the same as `previous`. */
export function generateJumpProblem(
  settings: Pick<FrogJumpSettings, "line" | "backwards">,
  jumps: NumberRange,
  previous?: JumpProblem,
): JumpProblem {
  const { line } = settings;
  let problem: JumpProblem;
  let attempts = 0;
  do {
    const rolled = rollJump(settings, jumps);
    const options = buildAnswerOptions({
      answer: rolled.answer,
      count: FROG_JUMP_CONFIG.optionCount,
      min: line.min,
      max: line.max,
      spread: FROG_JUMP_CONFIG.optionSpread,
    }).sort((a, b) => a - b);
    problem = { ...rolled, options };
    attempts++;
  } while (isSame(problem, previous) && attempts < 20);
  return problem;
}
