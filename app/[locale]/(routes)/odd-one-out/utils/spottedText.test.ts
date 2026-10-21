import { describe, expect, it } from "vitest";
import { spottedText } from "./spottedText";

const DESCRIPTION = "It's the only blue one.";

describe("spottedText", () => {
  it("praises the spot and says why", () => {
    expect(
      spottedText("en", DESCRIPTION, { levelUp: false, stars: 3 }, 4)
    ).toBe("🎉 You spotted it! It's the only blue one.");
  });

  it("announces a level up with the new grid size", () => {
    expect(spottedText("en", DESCRIPTION, { levelUp: true, stars: 0 }, 6)).toBe(
      "🎉 You spotted it! It's the only blue one. Level up! Now there are 6 monsters."
    );
  });

  it("starts another row of stars on the last level", () => {
    expect(
      spottedText("en", DESCRIPTION, { levelUp: false, stars: 0 }, 6)
    ).toBe("🎉 You spotted it! It's the only blue one. Another row of stars!");
  });

  describe("in Portuguese", () => {
    const PT = "Este é azul.";

    it("praises the spot and says why", () => {
      expect(spottedText("pt", PT, { levelUp: false, stars: 3 }, 4)).toBe(
        "🎉 Você achou! Este é azul."
      );
    });

    it("announces a level up with the new grid size", () => {
      expect(spottedText("pt", PT, { levelUp: true, stars: 0 }, 6)).toBe(
        "🎉 Você achou! Este é azul. Subiu de nível! Agora são 6 monstrinhos."
      );
    });

    it("starts another row of stars on the last level", () => {
      expect(spottedText("pt", PT, { levelUp: false, stars: 0 }, 6)).toBe(
        "🎉 Você achou! Este é azul. Mais uma fileira de estrelas!"
      );
    });
  });
});
