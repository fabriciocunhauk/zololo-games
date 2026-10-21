import { describe, expect, it } from "vitest";
import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";
import {
  ATTRIBUTE_DESCRIPTIONS,
  ATTRIBUTE_VALUES,
  type OddAttribute,
} from "../constants/attributes";
import { ODD_DIFFICULTY } from "../constants/config";
import { LOCALES } from "@/app/i18n/locales";
import { describeOdd, makeOddOneOut, monsterLook } from "./makeOddOneOut";

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
        const { tiles, oddIndex, attribute } = round;

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

        for (const locale of LOCALES) {
          const words = ATTRIBUTE_DESCRIPTIONS[locale][attribute] as Record<
            string,
            string
          >;
          expect(describeOdd(round, locale)).toBe(
            words[String(odd[attribute])]
          );
        }
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

  it.each(LOCALES)("gives every value its own %s description", (locale) => {
    for (const feature of FEATURES) {
      const words = ATTRIBUTE_DESCRIPTIONS[locale][feature] as Record<
        string,
        string
      >;
      const values = ATTRIBUTE_VALUES[feature].map(String);
      expect(Object.keys(words).sort()).toEqual([...values].sort());
      expect(new Set(Object.values(words)).size).toBe(values.length);
    }
  });

  it.each(LOCALES)("describes eye counts with the number in %s", (locale) => {
    for (let i = 0; i < 50; i++) {
      const round = makeOddOneOut(MONSTERS, ["eyes"], 6);
      expect(describeOdd(round, locale)).toContain(
        String(round.tiles[round.oddIndex].eyes)
      );
    }
  });

  it("describes in Portuguese with masculine agreement", () => {
    const round = {
      tiles: [MONSTERS[0], { ...MONSTERS[0], color: "grape" as const }],
      oddIndex: 1,
      attribute: "color" as const,
    };
    expect(describeOdd(round, "en")).toBe("It is purple.");
    expect(describeOdd(round, "pt")).toBe("Este é roxo.");
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
