import { describe, expect, it } from "vitest";
import { generateMathProblem } from "./generateMathProblem";
import { BUBBLE_POP_CONFIG } from "../constants/config";

describe("generateMathProblem", () => {
  it("writes a problem whose answer matches and is in range", () => {
    for (let i = 0; i < 500; i++) {
      const { text, answer, options } = generateMathProblem();
      const match = text.match(/^(\d+) ([+-]) (\d+) = \?$/);
      expect(match).not.toBeNull();
      const [, a, op, b] = match!;
      expect(answer).toBe(op === "+" ? +a + +b : +a - +b);
      expect(answer).toBeGreaterThanOrEqual(BUBBLE_POP_CONFIG.minResult);
      expect(answer).toBeLessThanOrEqual(BUBBLE_POP_CONFIG.maxResult);
      expect(options).toHaveLength(BUBBLE_POP_CONFIG.bubbleCount);
      expect(options).toContain(answer);
    }
  });
});
