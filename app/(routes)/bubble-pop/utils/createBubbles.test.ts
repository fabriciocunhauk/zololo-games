import { describe, expect, it } from "vitest";
import { createBubbles } from "./createBubbles";

describe("createBubbles", () => {
  const input = {
    values: [3, 7, 9, 12],
    answer: 9,
    areaWidth: 800,
    areaHeight: 500,
    bubbleSize: 80,
  };

  it("creates one bubble per value and marks only the answer correct", () => {
    const bubbles = createBubbles(input);
    expect(bubbles.map((b) => b.value)).toEqual(input.values);
    expect(bubbles.filter((b) => b.isCorrect).map((b) => b.value)).toEqual([9]);
  });

  it("keeps bubbles inside the area with staggered entrances", () => {
    const bubbles = createBubbles(input);
    bubbles.forEach((b, i) => {
      expect(b.x).toBeGreaterThanOrEqual(48);
      expect(b.x).toBeLessThanOrEqual(800 - 48);
      expect(b.y).toBeGreaterThanOrEqual(500);
      expect(b.y).toBeLessThanOrEqual(550);
      expect(b.riseTo).toBe(-550);
      expect(b.delay).toBeCloseTo(i * 0.2);
      expect(b.duration).toBeGreaterThanOrEqual(5);
      expect(b.duration).toBeLessThanOrEqual(10);
    });
  });
});
