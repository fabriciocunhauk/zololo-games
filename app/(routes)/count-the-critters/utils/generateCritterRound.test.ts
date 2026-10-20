import { describe, expect, it } from "vitest";
import { generateCritterRound } from "./generateCritterRound";
import { CRITTERS_CONFIG } from "../constants/config";

const images = ["cat", "dog", "owl"] as const;

describe("generateCritterRound", () => {
  it("shows as many critters as the answer, drawn from the given images", () => {
    for (let i = 0; i < 200; i++) {
      const round = generateCritterRound(images);
      expect(round.critters).toHaveLength(round.answer);
      expect(round.answer).toBeGreaterThanOrEqual(CRITTERS_CONFIG.minCount);
      expect(round.answer).toBeLessThanOrEqual(CRITTERS_CONFIG.maxCount);
      for (const critter of round.critters) {
        expect(images).toContain(critter.image);
        expect(Math.abs(critter.tilt)).toBeLessThanOrEqual(3);
      }
    }
  });

  it("offers unique in-range options that include the answer", () => {
    for (let i = 0; i < 200; i++) {
      const { answer, options } = generateCritterRound(images);
      expect(options).toHaveLength(CRITTERS_CONFIG.optionCount);
      expect(new Set(options).size).toBe(options.length);
      expect(options).toContain(answer);
      for (const option of options) {
        expect(option).toBeGreaterThanOrEqual(CRITTERS_CONFIG.minOption);
        expect(option).toBeLessThanOrEqual(CRITTERS_CONFIG.maxOption);
      }
    }
  });
});
