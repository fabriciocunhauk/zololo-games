import { COLOUR_NAMES, SHAPE_KINDS, type Shape } from "../constants/shapes";

const SIZE_WORDS = { small: "small", medium: "", big: "big" } as const;

/** Spoken description, e.g. "a big blue triangle" or "an orange circle". */
export function describeShape({ kind, colour, size, rotation }: Shape): string {
  const tilted = kind !== "circle" && rotation % 90 !== 0 ? "tilted" : "";
  const words = [
    SIZE_WORDS[size],
    tilted,
    COLOUR_NAMES[colour],
    SHAPE_KINDS[kind].name,
  ].filter(Boolean);
  const article = /^[aeiou]/.test(words[0]) ? "an" : "a";
  return [article, ...words].join(" ");
}
