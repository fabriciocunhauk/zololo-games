import { describe, expect, it } from "vitest";
import { buildAnswerOptions } from "./buildAnswerOptions";

describe("buildAnswerOptions", () => {
  it("returns unique options including the answer, within spread and bounds", () => {
    for (let i = 0; i < 500; i++) {
      const options = buildAnswerOptions({
        answer: 10,
        count: 4,
        min: 0,
        max: 20,
        spread: 3,
      });
      expect(options).toHaveLength(4);
      expect(new Set(options).size).toBe(4);
      expect(options).toContain(10);
      options.forEach((o) => expect(Math.abs(o - 10)).toBeLessThanOrEqual(3));
    }
  });

  it("clamps distractors to the range near its edges", () => {
    for (let i = 0; i < 200; i++) {
      const options = buildAnswerOptions({
        answer: 1,
        count: 4,
        min: 1,
        max: 20,
        spread: 3,
      });
      expect(options).toContain(1);
      options.forEach((o) => {
        expect(o).toBeGreaterThanOrEqual(1);
        expect(o).toBeLessThanOrEqual(4);
      });
    }
  });
});
