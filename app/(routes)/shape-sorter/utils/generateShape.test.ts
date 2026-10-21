import { describe, expect, it } from "vitest";
import type { Difficulty } from "@/app/constants/difficulty";
import { SHAPE_CONFIG, SHAPE_DIFFICULTY } from "../constants/config";
import { binFor } from "./binFor";
import { generateShape, generateTray } from "./generateShape";
import { pickBins } from "./pickBins";

const DIFFICULTIES = Object.keys(SHAPE_DIFFICULTY) as Difficulty[];

describe.each(DIFFICULTIES)("%s shapes", (difficulty) => {
  const settings = SHAPE_DIFFICULTY[difficulty];

  it("has the right number of distinct bins", () => {
    for (let i = 0; i < 50; i++) {
      const ids = pickBins(settings).map((bin) => bin.id);
      expect(ids).toHaveLength(settings.binCount);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it.each(settings.levels.map((level, idx) => [idx + 1, level] as const))(
    "level %i: every shape belongs in exactly one bin",
    (_, level) => {
      for (let i = 0; i < 300; i++) {
        const binIds = pickBins(settings).map((bin) => bin.id);
        const shape = generateShape(level, settings.sortBy, binIds);
        const home = binFor(shape, settings.sortBy);
        expect(binIds.filter((id) => id === home)).toHaveLength(1);
        expect(level.kinds).toContain(shape.kind);
        expect(level.sizes).toContain(shape.size);
        expect(Math.abs(shape.rotation)).toBeLessThanOrEqual(level.maxRotation);
        expect(Math.abs(shape.rotation) % SHAPE_CONFIG.rotationStep).toBe(0);
      }
    }
  );

  it.each(settings.levels.map((level, idx) => [idx + 1, level] as const))(
    "level %i: can fill every bin",
    (_, level) => {
      const binIds = pickBins(settings).map((bin) => bin.id);
      for (const target of binIds) {
        const shape = generateShape(level, settings.sortBy, binIds, target);
        expect(binFor(shape, settings.sortBy)).toBe(target);
      }
    }
  );

  it("shares a round's shapes evenly between the bins", () => {
    const binIds = pickBins(settings).map((bin) => bin.id);
    for (const level of settings.levels) {
      const tray = generateTray(
        level,
        settings.sortBy,
        binIds,
        SHAPE_CONFIG.shapesPerRound
      );
      expect(tray).toHaveLength(SHAPE_CONFIG.shapesPerRound);
      const counts = binIds.map(
        (id) => tray.filter((s) => binFor(s, settings.sortBy) === id).length
      );
      expect(counts.reduce((a, b) => a + b, 0)).toBe(tray.length);
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
    }
  });
});

describe("difficulty rules", () => {
  it("easy uses circles and squares at one size", () => {
    for (const level of SHAPE_DIFFICULTY.easy.levels) {
      expect(new Set(level.kinds)).toEqual(new Set(["circle", "square"]));
      expect(level.sizes).toHaveLength(1);
    }
  });

  it("hard never asks for a circle's sides", () => {
    for (const level of SHAPE_DIFFICULTY.hard.levels) {
      expect(level.kinds).not.toContain("circle");
    }
  });

  it("throws when a level can't fill the bin", () => {
    expect(() =>
      generateShape(
        { kinds: ["circle"], sizes: ["big"], maxRotation: 0 },
        "shape",
        ["triangle"]
      )
    ).toThrow();
  });
});
