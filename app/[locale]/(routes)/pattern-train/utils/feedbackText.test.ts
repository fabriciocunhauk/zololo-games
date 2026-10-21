import { describe, expect, it } from "vitest";
import { MONSTERS } from "@/app/components/monsters/monsters";
import { revealText, rightText } from "./feedbackText";
import { colourVariants } from "./monsterFaces";

describe("rightText", () => {
  it("cheers a right answer", () => {
    expect(rightText({ levelUp: false, stars: 2 }, "en")).toBe(
      "🎉 Choo choo! That's right!"
    );
  });

  it("announces a level up", () => {
    expect(rightText({ levelUp: true, stars: 0 }, "en")).toBe(
      "🎉 Choo choo! That's right! Level up: longer trains!"
    );
  });

  it("starts another row of stars on the last level", () => {
    expect(rightText({ levelUp: false, stars: 0 }, "en")).toBe(
      "🎉 Choo choo! That's right! Another row of stars!"
    );
  });

  it("cheers in Portuguese", () => {
    expect(rightText({ levelUp: false, stars: 2 }, "pt")).toBe(
      "🎉 Piuí! Acertou!"
    );
    expect(rightText({ levelUp: true, stars: 0 }, "pt")).toBe(
      "🎉 Piuí! Acertou! Subiu de nível: trens mais compridos!"
    );
  });
});

describe("revealText", () => {
  it("names the colour on colour trains", () => {
    const blue = colourVariants(MONSTERS[0], "en").find(
      (m) => m.color === "sky"
    )!;
    expect(revealText(blue, "colours", "en")).toBe(
      "It was the blue one! Here comes the next train."
    );
  });

  it("names the colour in Portuguese", () => {
    const blue = colourVariants(MONSTERS[0], "pt").find(
      (m) => m.color === "sky"
    )!;
    expect(revealText(blue, "colours", "pt")).toBe(
      "Era o monstrinho azul! Lá vem o próximo trem."
    );
  });

  it("never names a monster the child can't see", () => {
    const monster = MONSTERS[0];
    const text = revealText(monster, "monsters", "en");
    expect(text).toBe(
      "Here's who rides in the empty carriage! Here comes the next train."
    );
    expect(text).not.toContain(monster.name);
  });
});

describe("colourVariants", () => {
  it("puts the colour where each language does", () => {
    const [pip] = MONSTERS;
    const blue = (locale: "en" | "pt") =>
      colourVariants(pip, locale).find((m) => m.color === "sky")!.name;
    expect(blue("en")).toBe(`Blue ${pip.name}`);
    expect(blue("pt")).toBe(`${pip.name} Azul`);
  });

  it("gives every colour a different name", () => {
    for (const locale of ["en", "pt"] as const) {
      const names = colourVariants(MONSTERS[0], locale).map((m) => m.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });
});
