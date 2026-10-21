import { describe, expect, it } from "vitest";
import { COLOUR_BINS, SHAPE_BINS, SIDE_BINS } from "./bins";
import { SHAPE_TEXT } from "./text";

const { en, pt } = SHAPE_TEXT;

describe("bin labels and praise", () => {
  it("keeps the English wording", () => {
    expect(en.binLabel(COLOUR_BINS.sky.name)).toBe("Blue");
    expect(en.binPraise(COLOUR_BINS.sky.name)).toBe("It's blue!");
    expect(SHAPE_BINS.map((bin) => en.binLabel(bin.name))).toEqual([
      "Circles",
      "Squares",
      "Triangles",
    ]);
    expect(en.binPraise(SHAPE_BINS[2].name)).toBe("It's a triangle!");
    expect(en.binLabel(SIDE_BINS[0].name)).toBe("3 sides");
    expect(en.binPraise(SIDE_BINS[0].name)).toBe("It has 3 sides!");
    expect(en.binAria("Blue", 1)).toBe("Blue bin, 1 sorted");
  });

  it("speaks Portuguese", () => {
    expect(pt.binLabel(COLOUR_BINS.sun.name)).toBe("Amarelo");
    expect(pt.binPraise(COLOUR_BINS.grape.name)).toBe("É roxo!");
    expect(SHAPE_BINS.map((bin) => pt.binLabel(bin.name))).toEqual([
      "Círculos",
      "Quadrados",
      "Triângulos",
    ]);
    expect(pt.binPraise(SHAPE_BINS[0].name)).toBe("É um círculo!");
    expect(pt.binLabel(SIDE_BINS[1].name)).toBe("4 lados");
    expect(pt.binPraise(SIDE_BINS[1].name)).toBe("Tem 4 lados!");
    expect(pt.binAria("Azul", 1)).toBe("Caixa: Azul, 1 forma");
    expect(pt.binAria("Azul", 2)).toBe("Caixa: Azul, 2 formas");
  });

  it("has a step for every how-to-play picture", () => {
    expect(pt.howToPlay.steps).toHaveLength(en.howToPlay.steps.length);
  });
});
