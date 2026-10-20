import { describe, expect, it } from "vitest";
import { shuffle } from "./shuffle";

describe("shuffle", () => {
  it("returns the same members without mutating the input", () => {
    const input = Object.freeze([1, 2, 3, 4, 5, 6]);
    const result = shuffle(input);
    expect(result).not.toBe(input);
    expect([...result].sort()).toEqual([...input]);
  });

  it("eventually produces a different order", () => {
    const input = Array.from({ length: 10 }, (_, i) => i);
    const changed = Array.from({ length: 20 }, () => shuffle(input)).some(
      (r) => r.join() !== input.join()
    );
    expect(changed).toBe(true);
  });
});
