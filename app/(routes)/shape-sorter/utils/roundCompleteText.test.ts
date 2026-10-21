import { describe, expect, it } from "vitest";
import { roundCompleteText } from "./roundCompleteText";

describe("roundCompleteText", () => {
  it("awards a star", () => {
    expect(roundCompleteText({ levelUp: false, stars: 2 })).toBe(
      "🎉 Round complete! You earned a star."
    );
  });

  it("announces a level up", () => {
    expect(roundCompleteText({ levelUp: true, stars: 0 })).toBe(
      "🎉 Round complete! You earned a star and went up a level!"
    );
  });

  it("starts another row of stars on the last level", () => {
    expect(roundCompleteText({ levelUp: false, stars: 0 })).toBe(
      "🎉 Round complete! Another row of stars!"
    );
  });
});
