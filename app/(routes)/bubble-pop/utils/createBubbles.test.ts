import { describe, expect, it } from "vitest";
import { BUBBLE_FILLS } from "../constants/config";
import { createBubbles } from "./createBubbles";

describe("createBubbles", () => {
  const input = {
    values: [3, 7, 9, 12],
    answer: 9,
    areaWidth: 800,
    areaHeight: 500,
    bubbleSize: 80,
    riseSeconds: { min: 6, max: 9 },
    staggerSeconds: 0.2,
  };

  it("creates one bubble per value and marks only the answer correct", () => {
    const bubbles = createBubbles(input);
    expect(bubbles.map((b) => b.value)).toEqual(input.values);
    expect(bubbles.filter((b) => b.isCorrect).map((b) => b.value)).toEqual([9]);
    expect(bubbles.map((b) => b.fill)).toEqual(BUBBLE_FILLS.slice(0, 4));
  });

  it("keeps bubbles inside the area with staggered entrances", () => {
    const bubbles = createBubbles(input);
    bubbles.forEach((b, i) => {
      expect(b.x).toBeGreaterThanOrEqual(48);
      expect(b.x).toBeLessThanOrEqual(800 - 48);
      expect(b.startY).toBeGreaterThanOrEqual(0);
      expect(b.startY).toBeLessThanOrEqual(30);
      expect(b.riseTo).toBe(-610);
      expect(b.delay).toBeCloseTo(i * 0.2);
      expect(b.duration).toBeGreaterThanOrEqual(6);
      expect(b.duration).toBeLessThanOrEqual(9);
    });
  });

  it("never lets bubbles overlap, even five on a phone", () => {
    for (let i = 0; i < 200; i++) {
      const xs = createBubbles({
        ...input,
        values: [1, 2, 3, 4, 5],
        answer: 3,
        areaWidth: 337,
        bubbleSize: 64,
      })
        .map((b) => b.x)
        .sort((a, b) => a - b);
      xs.slice(1).forEach((x, idx) => {
        expect(x - xs[idx]).toBeGreaterThanOrEqual(64);
      });
      expect(xs[0]).toBeGreaterThanOrEqual(32);
      expect(xs[4]).toBeLessThanOrEqual(337 - 32);
    }
  });
});
