import { describe, expect, it } from "vitest";
import { FROG_JUMP_DIFFICULTY } from "../constants/config";
import { getNumberLinePosition } from "./getNumberLinePosition";

const percent = (value: string) => {
  expect(value).toMatch(/%$/);
  return parseFloat(value);
};

describe("getNumberLinePosition", () => {
  it("puts each number at the centre of its own pad", () => {
    const line = { min: 0, max: 10 };
    expect(percent(getNumberLinePosition(0, line))).toBeCloseTo(50 / 11);
    expect(percent(getNumberLinePosition(5, line))).toBeCloseTo(50);
    expect(percent(getNumberLinePosition(10, line))).toBeCloseTo(100 - 50 / 11);
  });

  it("is symmetric and increasing on every difficulty's line", () => {
    for (const { line } of Object.values(FROG_JUMP_DIFFICULTY)) {
      let previous = -Infinity;
      for (let value = line.min; value <= line.max; value++) {
        const left = percent(getNumberLinePosition(value, line));
        const mirror = percent(
          getNumberLinePosition(line.max - (value - line.min), line),
        );
        expect(left).toBeGreaterThan(previous);
        expect(left + mirror).toBeCloseTo(100);
        previous = left;
      }
    }
  });

  it("clamps numbers off the line to the end pads", () => {
    const line = { min: 0, max: 20 };
    expect(getNumberLinePosition(-3, line)).toBe(
      getNumberLinePosition(0, line),
    );
    expect(getNumberLinePosition(25, line)).toBe(
      getNumberLinePosition(20, line),
    );
  });
});
