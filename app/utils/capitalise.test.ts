import { describe, expect, it } from "vitest";
import { capitalise } from "./capitalise";

describe("capitalise", () => {
  it("upper-cases the first letter only", () => {
    expect(capitalise("cat")).toBe("Cat");
    expect(capitalise("ábaco azul")).toBe("Ábaco azul");
    expect(capitalise("")).toBe("");
  });
});
