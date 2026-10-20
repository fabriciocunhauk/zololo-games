import { describe, expect, it } from "vitest";
import { getBoardLayout } from "./getBoardLayout";

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
