import { describe, expect, it } from "vitest";
import { getNumberLinePosition } from "./getNumberLinePosition";

const percent = (value: string) => {
  expect(value).toMatch(/%$/);
  return parseFloat(value);
};

describe("getNumberLinePosition", () => {
  it("centres the used width inside the line", () => {
    expect(percent(getNumberLinePosition(0, 20, 0.9))).toBeCloseTo(5);
    expect(percent(getNumberLinePosition(10, 20, 0.9))).toBeCloseTo(50);
    expect(percent(getNumberLinePosition(20, 20, 0.9))).toBeCloseTo(95);
  });

  it("spans the full line at ratio 1", () => {
    expect(percent(getNumberLinePosition(0, 10, 1))).toBeCloseTo(0);
    expect(percent(getNumberLinePosition(10, 10, 1))).toBeCloseTo(100);
  });
});
