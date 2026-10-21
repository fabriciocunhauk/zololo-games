import { describe, expect, it } from "vitest";
import { MONSTERS } from "@/app/components/monsters/monsters";
import { MEMORY_DIFFICULTY } from "../constants/config";
import { lastLevel, pairsForLevel } from "./pairsForLevel";

describe("pairsForLevel", () => {
  it("adds two pairs per level from the starting size", () => {
    const easy = MEMORY_DIFFICULTY.easy;
    expect(pairsForLevel(easy, 1)).toBe(2);
    expect(pairsForLevel(easy, 2)).toBe(4);
  });

  it("caps at the difficulty's maximum", () => {
    expect(pairsForLevel(MEMORY_DIFFICULTY.hard, 50)).toBe(14);
  });

  it("reaches the maximum on the last level", () => {
    for (const settings of Object.values(MEMORY_DIFFICULTY)) {
      const last = lastLevel(settings);
      expect(pairsForLevel(settings, last)).toBe(settings.maxPairs);
      expect(pairsForLevel(settings, last - 1)).toBeLessThan(settings.maxPairs);
    }
  });

  it("never needs more monsters than there are", () => {
    for (const { maxPairs } of Object.values(MEMORY_DIFFICULTY)) {
      expect(maxPairs).toBeLessThanOrEqual(MONSTERS.length);
    }
  });
});
