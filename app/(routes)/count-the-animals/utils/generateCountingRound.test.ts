import { describe, expect, it } from "vitest";
import { COUNTING_CONFIG } from "../constants/config";
import { generateCountingRound } from "./generateCountingRound";

const animals = ["duck", "cat", "owl"] as const;

describe("generateCountingRound", () => {
  it("keeps the answer in the level's range with sorted options around it", () => {
    for (const range of COUNTING_CONFIG.levels) {
      for (let i = 0; i < 200; i++) {
        const { answer, options } = generateCountingRound(animals, range);
        expect(answer).toBeGreaterThanOrEqual(range.min);
        expect(answer).toBeLessThanOrEqual(range.max);
        expect(options).toHaveLength(COUNTING_CONFIG.optionCount);
        expect(options).toContain(answer);
        expect(options).toEqual([...options].sort((a, b) => a - b));
        expect(new Set(options).size).toBe(options.length);
        expect(Math.min(...options)).toBeGreaterThanOrEqual(1);
        expect(Math.max(...options)).toBeLessThanOrEqual(10);
      }
    }
  });

  it("never repeats the previous animal", () => {
    for (let i = 0; i < 200; i++) {
      const round = generateCountingRound(animals, { min: 1, max: 5 }, "duck");
      expect(round.animal).not.toBe("duck");
    }
  });

  it("still works with a single animal", () => {
    const round = generateCountingRound(["duck"], { min: 1, max: 5 }, "duck");
    expect(round.animal).toBe("duck");
  });
});
