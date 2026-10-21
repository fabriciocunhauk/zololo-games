import { describe, expect, it } from "vitest";
import { MONSTERS } from "@/app/components/monsters/monsters";
import { revealText, rightText } from "./feedbackText";
import { colourVariants } from "./monsterFaces";

describe("rightText", () => {
  it("cheers a right answer", () => {
    expect(rightText({ levelUp: false, stars: 2 })).toBe(
      "🎉 Choo choo! That's right!"
    );
  });

  it("announces a level up", () => {
    expect(rightText({ levelUp: true, stars: 0 })).toBe(
      "🎉 Choo choo! That's right! Level up: longer trains!"
    );
  });

  it("starts another row of stars on the last level", () => {
    expect(rightText({ levelUp: false, stars: 0 })).toBe(
      "🎉 Choo choo! That's right! Another row of stars!"
    );
  });
});

describe("revealText", () => {
  it("names the colour on colour trains", () => {
    const blue = colourVariants(MONSTERS[0]).find((m) => m.color === "sky")!;
    expect(revealText(blue, "colours")).toBe(
      "It was the blue one! Here comes the next train."
    );
  });

  it("never names a monster the child can't see", () => {
    const monster = MONSTERS[0];
    const text = revealText(monster, "monsters");
    expect(text).toBe(
      "Here's who rides in the empty carriage! Here comes the next train."
    );
    expect(text).not.toContain(monster.name);
  });
});
