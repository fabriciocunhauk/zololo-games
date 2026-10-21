import { describe, expect, it } from "vitest";
import { COUNTING_CONFIG, COUNTING_DIFFICULTY } from "../constants/config";
import { generateCountingRound } from "./generateCountingRound";

const animals = ["duck", "cat", "owl"] as const;

describe("generateCountingRound", () => {
  it("keeps the answer in the level's range with sorted options around it", () => {
    const difficulties = Object.values(COUNTING_DIFFICULTY);
    const cases = difficulties.flatMap(({ levels, maxOption }) =>
      levels.map((range) => ({ range, maxOption }))
    );
    for (const { range, maxOption } of cases) {
      for (let i = 0; i < 200; i++) {
        const { answer, options } = generateCountingRound(
          animals,
          range,
          maxOption
        );
        expect(answer).toBeGreaterThanOrEqual(range.min);
        expect(answer).toBeLessThanOrEqual(range.max);
        expect(options).toHaveLength(COUNTING_CONFIG.optionCount);
        expect(options).toContain(answer);
        expect(options).toEqual([...options].sort((a, b) => a - b));
        expect(new Set(options).size).toBe(options.length);
        expect(Math.min(...options)).toBeGreaterThanOrEqual(1);
        expect(Math.max(...options)).toBeLessThanOrEqual(maxOption);
      }
    }
  });

  it("never repeats the previous animal", () => {
    for (let i = 0; i < 200; i++) {
      const round = generateCountingRound(
        animals,
        { min: 1, max: 5 },
        10,
        "duck"
      );
      expect(round.animal).not.toBe("duck");
    }
  });

  it("still works with a single animal", () => {
    const round = generateCountingRound(["duck"], { min: 1, max: 5 }, 10, "duck");
    expect(round.animal).toBe("duck");
  });
});
