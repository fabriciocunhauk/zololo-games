import { describe, expect, it } from "vitest";
import { getBubbleSize } from "./getBubbleSize";

describe("getBubbleSize", () => {
  it("shrinks bubbles on smaller viewports", () => {
    expect(getBubbleSize(375)).toBe(64);
    expect(getBubbleSize(768)).toBe(72);
    expect(getBubbleSize(1440)).toBe(80);
  });
});
