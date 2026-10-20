import { describe, expect, it } from "vitest";
import { randomInt } from "./randomInt";

describe("randomInt", () => {
  it("covers the inclusive range and nothing outside it", () => {
    const seen = new Set(Array.from({ length: 1000 }, () => randomInt(-2, 2)));
    expect([...seen].sort((a, b) => a - b)).toEqual([-2, -1, 0, 1, 2]);
  });
});
