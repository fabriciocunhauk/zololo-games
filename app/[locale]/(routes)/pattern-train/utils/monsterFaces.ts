import type { Monster, MonsterColor } from "@/app/components/monsters/monsters";
import type { Locale } from "@/app/i18n/locales";
import { PATTERN_TEXT } from "../constants/text";

/** The colour word for a monster, e.g. "Blue". */
export function colourName(monster: Monster, locale: Locale): string {
  return PATTERN_TEXT[locale].colours[monster.color];
}

/** The same monster in every colour, named by colour (e.g. "Blue Pip"). */
export function colourVariants(base: Monster, locale: Locale): Monster[] {
  const text = PATTERN_TEXT[locale];
  return (Object.keys(text.colours) as MonsterColor[]).map((color) => ({
    ...base,
    color,
    name: text.colourVariant(text.colours[color], base.name),
  }));
}

const TRAITS = ["body", "color", "eyes", "top", "mouth", "pattern"] as const;

/** Number of looks two monsters share, for near-miss answer options. */
export function monsterResemblance(a: Monster, b: Monster): number {
  return TRAITS.filter((trait) => a[trait] === b[trait]).length;
}
