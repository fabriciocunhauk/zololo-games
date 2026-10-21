import { describe, expect, it } from "vitest";
import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";
import {
  ATTRIBUTE_DESCRIPTIONS,
  ATTRIBUTE_VALUES,
  type OddAttribute,
} from "../constants/attributes";
import { ODD_DIFFICULTY } from "../constants/config";
import { makeOddOneOut, monsterLook } from "./makeOddOneOut";

const FEATURES = Object.keys(ATTRIBUTE_VALUES) as OddAttribute[];

const differingFeatures = (a: Monster, b: Monster) =>
  FEATURES.filter((feature) => a[feature] !== b[feature]);

describe("makeOddOneOut", () => {
  const cases = Object.entries(ODD_DIFFICULTY).flatMap(
    ([difficulty, { levels, attributes }]) =>
      levels.map((count) => ({ difficulty, count, attributes }))
  );

  it.each(cases)(
    "$difficulty with $count monsters: exactly one tile differs, in one allowed feature",
    ({ count, attributes }) => {
      for (let i = 0; i < 200; i++) {
        const round = makeOddOneOut(MONSTERS, attributes, count);
        const { tiles, oddIndex, attribute, description } = round;

        expect(tiles).toHaveLength(count);
        expect(oddIndex).toBeGreaterThanOrEqual(0);
        expect(oddIndex).toBeLessThan(count);
        expect(attributes).toContain(attribute);

        const odd = tiles[oddIndex];
        const others = tiles.filter((_, idx) => idx !== oddIndex);
        const looks = new Set(others.map(monsterLook));
        expect(looks.size).toBe(1);
        expect(monsterLook(odd)).not.toBe(monsterLook(others[0]));

        expect(differingFeatures(odd, others[0])).toEqual([attribute]);
        expect(ATTRIBUTE_VALUES[attribute]).toContain(odd[attribute]);

        const words = ATTRIBUTE_DESCRIPTIONS[attribute] as Record<
          string,
          string
        >;
        expect(description).toBe(words[String(odd[attribute])]);
      }
    }
  );

  it("only uses monster values that the art knows how to draw", () => {
    for (const monster of MONSTERS) {
      for (const feature of FEATURES) {
        expect(ATTRIBUTE_VALUES[feature]).toContain(monster[feature]);
      }
    }
  });

  it("gives every value its own description", () => {
    for (const feature of FEATURES) {
      const words = ATTRIBUTE_DESCRIPTIONS[feature] as Record<string, string>;
      const values = ATTRIBUTE_VALUES[feature].map(String);
      expect(Object.keys(words).sort()).toEqual([...values].sort());
      expect(new Set(Object.values(words)).size).toBe(values.length);
    }
  });

  it("describes eye counts with the number", () => {
    for (let i = 0; i < 50; i++) {
      const { tiles, oddIndex, description } = makeOddOneOut(
        MONSTERS,
        ["eyes"],
        6
      );
      expect(description).toContain(String(tiles[oddIndex].eyes));
    }
  });

  it("skips the monster to avoid", () => {
    const avoid = MONSTERS[0].name;
    for (let i = 0; i < 100; i++) {
      const { tiles, oddIndex } = makeOddOneOut(
        MONSTERS,
        ["color"],
        4,
        avoid
      );
      const base = tiles[(oddIndex + 1) % tiles.length];
      expect(base.name).not.toBe(avoid);
    }
  });
});
