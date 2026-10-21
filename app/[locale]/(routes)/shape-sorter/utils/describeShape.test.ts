import { describe, expect, it } from "vitest";
import { describeShape } from "./describeShape";

describe("describeShape", () => {
  it("says size, colour and shape", () => {
    expect(
      describeShape(
        { kind: "triangle", colour: "sky", size: "big", rotation: 0 },
        "en"
      )
    ).toBe("a big blue triangle");
  });

  it("leaves out medium and uses 'an' before a vowel", () => {
    expect(
      describeShape(
        { kind: "circle", colour: "tangerine", size: "medium", rotation: 30 },
        "en"
      )
    ).toBe("an orange circle");
  });

  it("mentions a tilt, but not a quarter turn", () => {
    const square = { kind: "square", colour: "leaf", size: "small" } as const;
    expect(describeShape({ ...square, rotation: 45 }, "en")).toBe(
      "a small tilted green square"
    );
    expect(describeShape({ ...square, rotation: 90 }, "en")).toBe(
      "a small green square"
    );
  });
});

describe("describeShape in Portuguese", () => {
  it("puts colour and size after the noun", () => {
    expect(
      describeShape(
        { kind: "triangle", colour: "sky", size: "big", rotation: 0 },
        "pt"
      )
    ).toBe("um triângulo azul grande");
  });

  it("makes the colour agree with the noun", () => {
    expect(
      describeShape(
        { kind: "circle", colour: "sun", size: "medium", rotation: 0 },
        "pt"
      )
    ).toBe("um círculo amarelo");
    expect(
      describeShape(
        { kind: "hexagon", colour: "grape", size: "medium", rotation: 0 },
        "pt"
      )
    ).toBe("um hexágono roxo");
  });

  it("joins size and tilt with 'e', and skips a quarter turn", () => {
    const square = { kind: "square", colour: "leaf", size: "small" } as const;
    expect(describeShape({ ...square, rotation: 45 }, "pt")).toBe(
      "um quadrado verde pequeno e inclinado"
    );
    expect(describeShape({ ...square, rotation: 90 }, "pt")).toBe(
      "um quadrado verde pequeno"
    );
  });

  it("describes the special triangles", () => {
    expect(
      describeShape(
        {
          kind: "right-triangle",
          colour: "pink-primary",
          size: "medium",
          rotation: 0,
        },
        "pt"
      )
    ).toBe("um triângulo retângulo rosa");
  });
});
