import { describe, expect, it } from "vitest";
import { describeShape } from "./describeShape";

describe("describeShape", () => {
  it("says size, colour and shape", () => {
    expect(
      describeShape({
        kind: "triangle",
        colour: "sky",
        size: "big",
        rotation: 0,
      })
    ).toBe("a big blue triangle");
  });

  it("leaves out medium and uses 'an' before a vowel", () => {
    expect(
      describeShape({
        kind: "circle",
        colour: "tangerine",
        size: "medium",
        rotation: 30,
      })
    ).toBe("an orange circle");
  });

  it("mentions a tilt, but not a quarter turn", () => {
    const square = { kind: "square", colour: "leaf", size: "small" } as const;
    expect(describeShape({ ...square, rotation: 45 })).toBe(
      "a small tilted green square"
    );
    expect(describeShape({ ...square, rotation: 90 })).toBe(
      "a small green square"
    );
  });
});
