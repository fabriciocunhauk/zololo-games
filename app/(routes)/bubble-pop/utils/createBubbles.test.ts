import { describe, expect, it } from "vitest";
import { BUBBLE_FILLS } from "../constants/config";
import { createBubbles } from "./createBubbles";

describe("createBubbles", () => {
  const input = {
    values: [3, 7, 9, 12],
    answer: 9,
    riseSeconds: { min: 6, max: 9 },
    staggerSeconds: 0.2,
  };

  it("creates one bubble per value and marks only the answer correct", () => {
    const bubbles = createBubbles(input);
    expect(bubbles.map((b) => b.value)).toEqual(input.values);
    expect(bubbles.filter((b) => b.isCorrect).map((b) => b.value)).toEqual([9]);
    expect(bubbles.map((b) => b.fill)).toEqual(BUBBLE_FILLS.slice(0, 4));
  });

  it("staggers entrances and keeps offsets in range", () => {
    const bubbles = createBubbles(input);
    bubbles.forEach((b, i) => {
      expect(b.nudge).toBeGreaterThanOrEqual(-1);
      expect(b.nudge).toBeLessThanOrEqual(1);
      expect(b.startY).toBeGreaterThanOrEqual(0);
      expect(b.startY).toBeLessThanOrEqual(30);
      expect(b.delay).toBeCloseTo(i * 0.2);
      expect(b.duration).toBeGreaterThanOrEqual(6);
      expect(b.duration).toBeLessThanOrEqual(9);
    });
  });

  it("gives every bubble its own column, so columns never overlap", () => {
    for (let i = 0; i < 200; i++) {
      const columns = createBubbles({
        ...input,
        values: [1, 2, 3, 4, 5],
        answer: 3,
      }).map((b) => b.column);
      expect([...columns].sort()).toEqual([0, 1, 2, 3, 4]);
    }
  });
});
