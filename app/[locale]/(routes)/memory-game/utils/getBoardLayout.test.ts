import { describe, expect, it } from "vitest";
import { getBoardAspect, getBoardLayout } from "./getBoardLayout";

describe("getBoardLayout", () => {
  it("lays the first level out in one row on wider screens", () => {
    expect(getBoardLayout(4)).toBe("grid-cols-2 sm:grid-cols-4");
  });

  it("uses 4 columns for mid-size decks", () => {
    expect(getBoardLayout(8)).toBe("grid-cols-3 sm:grid-cols-4");
    expect(getBoardLayout(16)).toBe("grid-cols-3 sm:grid-cols-4");
  });

  it("uses up to 6 columns for large decks", () => {
    expect(getBoardLayout(40)).toBe(
      "grid-cols-4 sm:grid-cols-5 md:grid-cols-6"
    );
  });
});

describe("getBoardAspect", () => {
  it("is wide for one row and squarer as rows are added", () => {
    expect(getBoardAspect(4)).toBe(4);
    expect(getBoardAspect(12)).toBe(4 / 3);
    expect(getBoardAspect(28)).toBe(6 / 5);
  });
});
