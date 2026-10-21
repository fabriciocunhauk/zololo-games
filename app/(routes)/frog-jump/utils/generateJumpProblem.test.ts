import { describe, expect, it } from "vitest";
import { FROG_JUMP_CONFIG, FROG_JUMP_DIFFICULTY } from "../constants/config";
import { generateJumpProblem } from "./generateJumpProblem";

const cases = Object.entries(FROG_JUMP_DIFFICULTY).flatMap(
  ([difficulty, settings]) =>
    settings.levels.map((jumps, level) => ({
      name: `${difficulty} level ${level + 1}`,
      settings,
      jumps,
    })),
);

describe("generateJumpProblem", () => {
  it.each(cases)(
    "$name: lands on the line with sorted options around the answer",
    ({ settings, jumps }) => {
      const { line, backwards } = settings;
      for (let i = 0; i < 300; i++) {
        const { start, operation, jump, answer, options } = generateJumpProblem(
          settings,
          jumps,
        );
        expect(answer).toBe(operation === "+" ? start + jump : start - jump);
        expect(start).toBeGreaterThanOrEqual(line.min);
        expect(start).toBeLessThanOrEqual(line.max);
        expect(answer).toBeGreaterThanOrEqual(line.min);
        expect(answer).toBeLessThanOrEqual(line.max);
        expect(jump).toBeGreaterThanOrEqual(jumps.min);
        expect(jump).toBeLessThanOrEqual(jumps.max);
        if (!backwards) expect(operation).toBe("+");
        expect(options).toHaveLength(FROG_JUMP_CONFIG.optionCount);
        expect(options).toContain(answer);
        expect(new Set(options).size).toBe(options.length);
        expect(options).toEqual([...options].sort((a, b) => a - b));
        expect(Math.min(...options)).toBeGreaterThanOrEqual(line.min);
        expect(Math.max(...options)).toBeLessThanOrEqual(line.max);
      }
    },
  );

  it("matches the age levels: easy 0–10 forward, medium 0–20, hard 0–30", () => {
    const { easy, medium, hard } = FROG_JUMP_DIFFICULTY;
    expect(easy.line).toEqual({ min: 0, max: 10 });
    expect(easy.backwards).toBe(false);
    expect(easy.levels.at(-1)).toEqual({ min: 1, max: 3 });
    expect(medium.line).toEqual({ min: 0, max: 20 });
    expect(medium.levels.at(-1)).toEqual({ min: 1, max: 5 });
    expect(hard.line).toEqual({ min: 0, max: 30 });
    expect(hard.levels.at(-1)).toEqual({ min: 2, max: 10 });
  });

  it("uses both directions when going back is allowed", () => {
    const { hard } = FROG_JUMP_DIFFICULTY;
    const operations = new Set(
      Array.from(
        { length: 200 },
        () => generateJumpProblem(hard, hard.levels[0]).operation,
      ),
    );
    expect(operations).toEqual(new Set(["+", "-"]));
  });

  it("never repeats the previous problem", () => {
    const settings = { line: { min: 0, max: 3 }, backwards: false };
    const jumps = { min: 1, max: 2 };
    let previous = generateJumpProblem(settings, jumps);
    for (let i = 0; i < 200; i++) {
      const next = generateJumpProblem(settings, jumps, previous);
      expect([next.start, next.operation, next.jump]).not.toEqual([
        previous.start,
        previous.operation,
        previous.jump,
      ]);
      previous = next;
    }
  });
});
