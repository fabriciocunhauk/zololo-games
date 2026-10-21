export type SpellingTap = "placed" | "complete" | "wrong";

/** Is `letter` the next letter of `word`, given the letters already placed? */
export function checkSpellingTap(
  word: string,
  placed: ReadonlyArray<string>,
  letter: string
): SpellingTap {
  if (placed.length >= word.length) return "wrong";
  if (word.charAt(placed.length) !== letter) return "wrong";
  return placed.length + 1 === word.length ? "complete" : "placed";
}
