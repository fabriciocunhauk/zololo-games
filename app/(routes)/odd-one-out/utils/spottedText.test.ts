import { describe, expect, it } from "vitest";
import { spottedText } from "./spottedText";

const DESCRIPTION = "It's the only blue one.";

describe("spottedText", () => {
  it("praises the spot and says why", () => {
    expect(spottedText(DESCRIPTION, { levelUp: false, stars: 3 }, 4)).toBe(
      "🎉 You spotted it! It's the only blue one."
    );
  });

  it("announces a level up with the new grid size", () => {
    expect(spottedText(DESCRIPTION, { levelUp: true, stars: 0 }, 6)).toBe(
      "🎉 You spotted it! It's the only blue one. Level up! Now there are 6 monsters."
    );
  });

  it("starts another row of stars on the last level", () => {
    expect(spottedText(DESCRIPTION, { levelUp: false, stars: 0 }, 6)).toBe(
      "🎉 You spotted it! It's the only blue one. Another row of stars!"
    );
  });
});
