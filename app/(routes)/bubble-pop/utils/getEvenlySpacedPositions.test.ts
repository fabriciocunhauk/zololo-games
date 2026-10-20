import { describe, expect, it } from "vitest";
import { getEvenlySpacedPositions } from "./getEvenlySpacedPositions";

describe("getEvenlySpacedPositions", () => {
  it("centres a single point", () => {
    expect(getEvenlySpacedPositions(1, 0, 100)).toEqual([50]);
  });

  it("spaces points evenly from min to max without jitter", () => {
    expect(getEvenlySpacedPositions(5, 0, 100)).toEqual([0, 25, 50, 75, 100]);
  });

  it("keeps jittered points within bounds and near their slot", () => {
    for (let i = 0; i < 100; i++) {
      const points = getEvenlySpacedPositions(4, 10, 310, 20);
      points.forEach((p, idx) => {
        expect(p).toBeGreaterThanOrEqual(10);
        expect(p).toBeLessThanOrEqual(310);
        expect(Math.abs(p - (10 + idx * 100))).toBeLessThanOrEqual(10);
      });
    }
  });
});
