import { describe, expect, it } from "vitest";
import { advanceLevel, clampLevel } from "./advanceLevel";

const rules = { levelCount: 3, roundsPerLevel: 5 };

describe("advanceLevel", () => {
  it("adds a star", () => {
    expect(advanceLevel({ level: 0, stars: 2 }, rules)).toEqual({
      level: 0,
      stars: 3,
      levelUp: false,
    });
  });

  it("moves up a level and resets the stars on a full row", () => {
    expect(advanceLevel({ level: 1, stars: 4 }, rules)).toEqual({
      level: 2,
      stars: 0,
      levelUp: true,
    });
  });

  it("stays on the last level", () => {
    expect(advanceLevel({ level: 2, stars: 4 }, rules)).toEqual({
      level: 2,
      stars: 0,
      levelUp: false,
    });
  });
});

describe("clampLevel", () => {
  it("keeps a level inside a shorter difficulty", () => {
    expect(clampLevel(2, 2)).toBe(1);
    expect(clampLevel(1, 3)).toBe(1);
    expect(clampLevel(0, 1)).toBe(0);
  });
});
