import { describe, expect, it } from "vitest";
import { countLabel } from "./countLabel";

describe("countLabel", () => {
  it("uses the singular for one and the plural otherwise", () => {
    const duck = { name: "duck", plural: "ducks" };
    expect(countLabel(1, duck)).toBe("1 duck");
    expect(countLabel(4, duck)).toBe("4 ducks");
  });

  it("handles plurals that match the singular", () => {
    expect(countLabel(2, { name: "fish", plural: "fish" })).toBe("2 fish");
  });
});
