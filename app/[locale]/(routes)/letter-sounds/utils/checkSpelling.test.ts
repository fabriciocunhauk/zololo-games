import { describe, expect, it } from "vitest";
import { checkSpellingTap } from "./checkSpelling";

describe("checkSpellingTap", () => {
  it("places the next letter in order", () => {
    expect(checkSpellingTap("cat", [], "c")).toBe("placed");
    expect(checkSpellingTap("cat", ["c"], "a")).toBe("placed");
  });

  it("completes the word with the last letter", () => {
    expect(checkSpellingTap("cat", ["c", "a"], "t")).toBe("complete");
  });

  it("rejects a letter out of order or not in the word", () => {
    expect(checkSpellingTap("cat", [], "a")).toBe("wrong");
    expect(checkSpellingTap("cat", ["c"], "t")).toBe("wrong");
    expect(checkSpellingTap("cat", ["c"], "z")).toBe("wrong");
  });

  it("rejects taps once the word is finished", () => {
    expect(checkSpellingTap("cat", ["c", "a", "t"], "t")).toBe("wrong");
  });
});
