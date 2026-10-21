import { describe, expect, it } from "vitest";
import { MONSTERS } from "./monsters";

describe("MONSTERS", () => {
  it("has enough monsters for the biggest boards", () => {
    expect(MONSTERS.length).toBeGreaterThanOrEqual(20);
  });

  it("gives every monster a unique name and a unique body + colour", () => {
    expect(new Set(MONSTERS.map((m) => m.name)).size).toBe(MONSTERS.length);
    expect(new Set(MONSTERS.map((m) => `${m.body}-${m.color}`)).size).toBe(
      MONSTERS.length
    );
  });
});
