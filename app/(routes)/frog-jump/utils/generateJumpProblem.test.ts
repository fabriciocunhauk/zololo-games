import { describe, expect, it } from "vitest";
import { generateJumpProblem } from "./generateJumpProblem";
import { FROG_JUMP_CONFIG } from "../constants/config";

describe("generateJumpProblem", () => {
  it("lands on the number line with a correct answer among the options", () => {
    for (let i = 0; i < 500; i++) {
      const { start, operation, jump, answer, options } = generateJumpProblem();
      expect(answer).toBe(operation === "+" ? start + jump : start - jump);
      expect(answer).toBeGreaterThanOrEqual(FROG_JUMP_CONFIG.min);
      expect(answer).toBeLessThanOrEqual(FROG_JUMP_CONFIG.max);
      expect(start).toBeGreaterThanOrEqual(1);
      expect(start).toBeLessThanOrEqual(FROG_JUMP_CONFIG.maxStart);
      expect(jump).toBeGreaterThanOrEqual(1);
      expect(jump).toBeLessThanOrEqual(FROG_JUMP_CONFIG.maxJump);
      expect(options).toHaveLength(FROG_JUMP_CONFIG.optionCount);
      expect(options).toContain(answer);
    }
  });
});
