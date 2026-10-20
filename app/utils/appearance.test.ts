import { describe, expect, it } from "vitest";
import { classNames } from "./appearance";

describe("classNames", () => {
  it("drops falsy values and lets later Tailwind classes win", () => {
    expect(classNames("p-2 text-sm", false, null, undefined, "p-4")).toBe(
      "text-sm p-4"
    );
  });
});
