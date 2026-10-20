import { describe, expect, it } from "vitest";
import { getBoardLayout } from "./getBoardLayout";

describe("getBoardLayout", () => {
  it("uses square cards in a 2/4 column grid for the first level", () => {
    expect(getBoardLayout(4)).toEqual({
      columns: "grid-cols-2 sm:grid-cols-4",
      aspect: "aspect-square",
    });
  });

  it("uses wide cards for mid-size decks", () => {
    expect(getBoardLayout(8).aspect).toBe("aspect-[6/4]");
    expect(getBoardLayout(16).columns).toBe("grid-cols-3 sm:grid-cols-4");
  });

  it("uses up to 6 columns for large decks", () => {
    expect(getBoardLayout(40)).toEqual({
      columns: "grid-cols-4 sm:grid-cols-5 md:grid-cols-6",
      aspect: "aspect-square",
    });
  });
});
