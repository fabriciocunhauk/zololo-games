import { describe, expect, it } from "vitest";
import { MONSTERS } from "@/app/components/monsters/monsters";
import type { Difficulty } from "@/app/constants/difficulty";
import { PATTERN_DIFFICULTY } from "../constants/config";
import {
  gapCandidates,
  generatePattern,
  type PatternRound,
  type PatternRoundSettings,
} from "./generatePattern";
import { colourVariants, monsterResemblance } from "./monsterFaces";

const RUNS = 300;
const LETTER_FACES = ["a", "b", "c", "d", "e", "f", "g"] as const;

function settingsFor(
  difficulty: Difficulty,
  level: number
): PatternRoundSettings {
  const { rules, levels, gap, optionCount, distractors } =
    PATTERN_DIFFICULTY[difficulty];
  return { rules, gap, optionCount, distractors, length: levels[level] };
}

const allLevels = (Object.keys(PATTERN_DIFFICULTY) as Difficulty[]).flatMap(
  (difficulty) =>
    PATTERN_DIFFICULTY[difficulty].levels.map((length, level) => ({
      difficulty,
      level,
      length,
    }))
);

/** Checks every promise a round makes, for any face type. */
function expectFairRound<T>(
  round: PatternRound<T>,
  settings: PatternRoundSettings
) {
  const { carriages, gapIndex, answer, options, rule } = round;

  expect(settings.rules).toContain(rule);
  expect(carriages).toHaveLength(settings.length);

  // Exactly one gap, where the round says it is.
  expect(carriages.filter((c) => c === null)).toHaveLength(1);
  expect(carriages[gapIndex]).toBeNull();
  if (settings.gap === "last") expect(gapIndex).toBe(settings.length - 1);

  // Filling the gap gives a train that follows the rule.
  const full = carriages.map((c) => (c === null ? answer : c));
  const faceFor = new Map<string, T>();
  full.forEach((face, idx) => {
    const letter = rule[idx % rule.length];
    if (!faceFor.has(letter)) faceFor.set(letter, face);
    expect(face).toBe(faceFor.get(letter));
  });
  // Different letters are different faces.
  expect(new Set(faceFor.values()).size).toBe(new Set(rule).size);

  // The answer can be worked out from a visible carriage in the same spot of the repeat.
  const twins = full.filter(
    (_, idx) =>
      idx !== gapIndex &&
      idx % rule.length === gapIndex % rule.length
  );
  expect(twins.length).toBeGreaterThan(0);
  twins.forEach((twin) => expect(twin).toBe(answer));

  // Options: the right count, unique, and the answer is one of them.
  expect(options).toHaveLength(settings.optionCount);
  expect(new Set(options).size).toBe(options.length);
  expect(options).toContain(answer);
}

describe("PATTERN_DIFFICULTY", () => {
  it("matches the brief for each difficulty", () => {
    const { easy, medium, hard } = PATTERN_DIFFICULTY;
    expect(easy.rules).toEqual(["AB"]);
    expect(Math.min(...easy.levels)).toBe(4);
    expect(Math.max(...easy.levels)).toBe(6);
    expect(easy.gap).toBe("last");
    expect(easy.optionCount).toBe(3);
    expect(easy.faces).toBe("colours");

    expect([...medium.rules].sort()).toEqual(["AAB", "ABB", "ABC"]);
    expect(Math.min(...medium.levels)).toBe(6);
    expect(Math.max(...medium.levels)).toBe(7);
    expect(medium.gap).toBe("last");
    expect(medium.optionCount).toBe(4);

    expect([...hard.rules].sort()).toEqual(["AABB", "ABBC", "ABCD"]);
    expect(Math.min(...hard.levels)).toBe(7);
    expect(Math.max(...hard.levels)).toBe(8);
    expect(hard.gap).toBe("anywhere");
    expect(hard.optionCount).toBe(4);
    expect(hard.distractors).toBe("nearMiss");
  });

  it("never makes a train shorter in a later level", () => {
    for (const { levels } of Object.values(PATTERN_DIFFICULTY)) {
      expect(levels).toEqual([...levels].sort((a, b) => a - b));
    }
  });

  it("has a fair gap for every rule at every level", () => {
    for (const { difficulty, length } of allLevels) {
      const { rules, gap } = PATTERN_DIFFICULTY[difficulty];
      for (const rule of rules) {
        expect(gapCandidates(length, rule.length, gap).length).toBeGreaterThan(
          0
        );
      }
    }
  });
});

describe("gapCandidates", () => {
  it("only offers the last carriage when the gap is last", () => {
    expect(gapCandidates(5, 2, "last")).toEqual([4]);
  });

  it("skips a carriage whose place in the repeat shows up only once", () => {
    // ABCDABC: the only D is at 3, so hiding it would leave no clue.
    expect(gapCandidates(7, 4, "anywhere")).toEqual([0, 1, 2, 4, 5, 6]);
    expect(gapCandidates(8, 4, "anywhere")).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("returns nothing when the train is too short to show the repeat", () => {
    expect(gapCandidates(3, 3, "last")).toEqual([]);
  });
});

describe("generatePattern", () => {
  it.each(allLevels)(
    "$difficulty level $level makes fair $length-carriage trains",
    ({ difficulty, level }) => {
      const settings = settingsFor(difficulty, level);
      for (let i = 0; i < RUNS; i++) {
        expectFairRound(generatePattern(settings, LETTER_FACES), settings);
      }
    }
  );

  it.each(allLevels)(
    "$difficulty level $level works with the game's monsters",
    ({ difficulty, level }) => {
      const settings = settingsFor(difficulty, level);
      const { faces } = PATTERN_DIFFICULTY[difficulty];
      for (let i = 0; i < RUNS; i++) {
        const pool =
          faces === "colours"
            ? colourVariants(MONSTERS[i % MONSTERS.length])
            : MONSTERS;
        const round = generatePattern(settings, pool, monsterResemblance);
        expectFairRound(round, settings);
        // Names are option keys, so they must be unique too.
        const names = round.options.map((m) => m.name);
        expect(new Set(names).size).toBe(names.length);
      }
    }
  );

  it("uses every rule and, on hard, puts gaps mid-train", () => {
    const settings = settingsFor("hard", 1);
    const rules = new Set<string>();
    const gaps = new Set<number>();
    for (let i = 0; i < RUNS; i++) {
      const round = generatePattern(settings, LETTER_FACES);
      rules.add(round.rule);
      gaps.add(round.gapIndex);
    }
    expect([...rules].sort()).toEqual(["AABB", "ABBC", "ABCD"]);
    expect([...gaps].some((idx) => idx > 0 && idx < settings.length - 1)).toBe(
      true
    );
  });

  it("offers the other faces on the train before outsiders", () => {
    const settings = settingsFor("medium", 0);
    for (let i = 0; i < RUNS; i++) {
      const round = generatePattern(settings, LETTER_FACES);
      const onTrain = new Set(round.carriages.filter((c) => c !== null));
      onTrain.forEach((face) => expect(round.options).toContain(face));
    }
  });

  it("fills spare hard options with the closest look-alikes", () => {
    const settings: PatternRoundSettings = {
      ...settingsFor("hard", 1),
      rules: ["AABB"],
    };
    for (let i = 0; i < RUNS; i++) {
      const round = generatePattern(settings, MONSTERS, monsterResemblance);
      const onTrain = new Set(round.carriages.filter((c) => c !== null));
      const outsiders = round.options.filter((o) => !onTrain.has(o));
      const others = MONSTERS.filter(
        (m) => !onTrain.has(m) && !round.options.includes(m)
      );
      const weakestPicked = Math.min(
        ...outsiders.map((o) => monsterResemblance(round.answer, o))
      );
      const bestLeftOut = Math.max(
        ...others.map((o) => monsterResemblance(round.answer, o))
      );
      expect(weakestPicked).toBeGreaterThanOrEqual(bestLeftOut);
    }
  });

  it("refuses when there are too few faces", () => {
    expect(() =>
      generatePattern(settingsFor("hard", 0), ["a", "b", "c"])
    ).toThrow();
  });
});

describe("monster faces", () => {
  it("makes one uniquely named variant per colour that differs only by colour", () => {
    const [base] = MONSTERS;
    const variants = colourVariants(base);
    expect(new Set(variants.map((v) => v.color)).size).toBe(variants.length);
    expect(new Set(variants.map((v) => v.name)).size).toBe(variants.length);
    for (const { name, color, ...looks } of variants) {
      expect(name).toMatch(new RegExp(`^\\w+ ${base.name}$`));
      expect(color).toBeTruthy();
      expect(looks).toEqual({
        body: base.body,
        eyes: base.eyes,
        top: base.top,
        mouth: base.mouth,
        pattern: base.pattern,
      });
    }
  });

  it("scores resemblance by shared looks", () => {
    const [pip] = MONSTERS;
    expect(monsterResemblance(pip, pip)).toBe(6);
    expect(monsterResemblance(pip, { ...pip, color: "grape" })).toBe(5);
  });
});
