import type { Locale } from "@/app/i18n/locales";
import type { Shape } from "../constants/shapes";
import { SHAPE_TEXT } from "../constants/text";

/**
 * Spoken description. English: "a big blue triangle", "an orange circle".
 * Portuguese puts the words after the noun and makes them agree with it:
 * "um triângulo azul grande", "um quadrado verde pequeno e inclinado".
 */
export function describeShape(
  { kind, colour, size, rotation }: Shape,
  locale: Locale
): string {
  const words = SHAPE_TEXT[locale].words;
  const { name, gender } = words.kinds[kind];
  const colourWord = words.colours[colour][gender];
  const sizeWord = size === "medium" ? "" : words[size][gender];
  const tilted =
    kind !== "circle" && rotation % 90 !== 0 ? words.tilted[gender] : "";

  if (locale === "pt") {
    const extras = [sizeWord, tilted].filter(Boolean).join(" e ");
    const article = gender === "m" ? "um" : "uma";
    return [article, name, colourWord, extras].filter(Boolean).join(" ");
  }

  const parts = [sizeWord, tilted, colourWord, name].filter(Boolean);
  const article = /^[aeiou]/.test(parts[0]) ? "an" : "a";
  return [article, ...parts].join(" ");
}
