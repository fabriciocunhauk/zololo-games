import { describe, expect, it } from "vitest";
import { resultSound, SOUND_RECIPES } from "./sounds";

describe("SOUND_RECIPES", () => {
  it.each(Object.entries(SOUND_RECIPES))("%s is short and gentle", (_, notes) => {
    expect(notes.length).toBeGreaterThan(0);
    for (const n of notes) {
      expect(n.freq).toBeGreaterThan(0);
      expect(n.start).toBeGreaterThanOrEqual(0);
      expect(n.duration).toBeGreaterThan(0);
      expect(n.gain).toBeGreaterThan(0);
      expect(n.gain).toBeLessThanOrEqual(0.3);
      expect(n.start + n.duration).toBeLessThanOrEqual(1);
    }
  });
});

describe("resultSound", () => {
  it("cheers louder on a level up", () => {
    expect(resultSound({ levelUp: true })).toBe("levelUp");
    expect(resultSound({ levelUp: false })).toBe("correct");
  });
});
