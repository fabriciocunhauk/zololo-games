import { describe, expect, it } from "vitest";
import { BUBBLE_POP_DIFFICULTY } from "../constants/config";
import { generateMathProblem } from "./generateMathProblem";

const difficulties = Object.entries(BUBBLE_POP_DIFFICULTY);

describe("generateMathProblem", () => {
  it.each(difficulties)(
    "%s: keeps operands, answer and bubbles in range",
    (_, settings) => {
      for (let i = 0; i < 500; i++) {
        const { text, answer, options } = generateMathProblem(settings);
        const match = text.match(/^(\d+) ([+-]) (\d+) = \?$/);
        expect(match).not.toBeNull();
        const [, a, op, b] = match!;
        expect(settings.operations).toContain(op);
        for (const operand of [+a, +b]) {
          expect(operand).toBeGreaterThanOrEqual(settings.operands.min);
          expect(operand).toBeLessThanOrEqual(settings.operands.max);
        }
        expect(answer).toBe(op === "+" ? +a + +b : +a - +b);
        expect(answer).toBeGreaterThanOrEqual(Math.max(0, settings.results.min));
        expect(answer).toBeLessThanOrEqual(settings.results.max);
        expect(options).toHaveLength(settings.bubbleCount);
        expect(options).toContain(answer);
        expect(new Set(options).size).toBe(options.length);
        expect(Math.min(...options)).toBeGreaterThanOrEqual(0);
        expect(Math.max(...options)).toBeLessThanOrEqual(settings.results.max);
      }
    }
  );

  it("only adds on easy", () => {
    for (let i = 0; i < 200; i++) {
      expect(generateMathProblem(BUBBLE_POP_DIFFICULTY.easy).text).toMatch(
        /^\d+ \+ \d+ = \?$/
      );
    }
  });

  it.each(difficulties)(
    "%s: has a wide enough spread to fill every bubble",
    (_, { bubbleCount, optionSpread }) => {
      expect(optionSpread).toBeGreaterThanOrEqual(bubbleCount - 1);
    }
  );
});
