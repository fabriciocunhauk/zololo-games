import { describe, expect, it } from "vitest";
import { fitBubbleSize, getBubbleX } from "./bubbleLayout";

describe("fitBubbleSize", () => {
  it("keeps the size when the bubbles already fit", () => {
    expect(fitBubbleSize(80, 800, 5)).toBe(80);
  });

  it("shrinks bubbles so five fit on a narrow phone", () => {
    const size = fitBubbleSize(64, 322, 5);
    expect(size).toBeLessThan(64);
    expect(size * 5).toBeLessThanOrEqual(322);
  });

  it("never goes below zero", () => {
    expect(fitBubbleSize(64, 0, 5)).toBe(0);
  });
});

describe("getBubbleX", () => {
  const xsFor = (areaWidth: number, size: number, count: number) => {
    const bubbleSize = fitBubbleSize(size, areaWidth, count);
    const xs = Array.from({ length: count }, (_, column) =>
      getBubbleX({
        column,
        nudge: Math.random() * 2 - 1,
        count,
        areaWidth,
        bubbleSize,
      })
    );
    return { xs, bubbleSize };
  };

  it.each([
    [280, 64, 5],
    [322, 64, 5],
    [337, 64, 5],
    [700, 80, 3],
    [900, 80, 5],
  ])(
    "columns never overlap or leave a %ipx area (size %i, %i bubbles)",
    (areaWidth, size, count) => {
      for (let i = 0; i < 200; i++) {
        const { xs, bubbleSize } = xsFor(areaWidth, size, count);
        xs.slice(1).forEach((x, idx) => {
          expect(x - xs[idx]).toBeGreaterThanOrEqual(bubbleSize);
        });
        expect(xs[0] - bubbleSize / 2).toBeGreaterThanOrEqual(0);
        expect(xs[count - 1] + bubbleSize / 2).toBeLessThanOrEqual(areaWidth);
      }
    }
  );

  it("centres an un-nudged bubble in its column", () => {
    expect(
      getBubbleX({ column: 1, nudge: 0, count: 4, areaWidth: 400, bubbleSize: 64 })
    ).toBe(150);
  });
});
