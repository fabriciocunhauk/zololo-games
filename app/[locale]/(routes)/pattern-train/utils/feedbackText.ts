import type { Monster } from "@/app/components/monsters/monsters";
import type { Locale } from "@/app/i18n/locales";
import type { PatternSettings } from "../constants/config";
import { PATTERN_TEXT } from "../constants/text";
import { colourName } from "./monsterFaces";

/** Praise for the right monster, with news of a level up or a fresh star row. */
export function rightText(
  {
    levelUp,
    stars,
  }: {
    levelUp: boolean;
    stars: number;
  },
  locale: Locale
): string {
  const { right } = PATTERN_TEXT[locale];
  if (levelUp) return right.base + right.levelUp;
  if (stars === 0) return right.base + right.fullRow;
  return right.base;
}

/**
 * After a second miss. Monster names never appear on screen, so only the
 * colour trains (easy) say who it was; the others point at the gap.
 */
export function revealText(
  answer: Monster,
  faces: PatternSettings["faces"],
  locale: Locale
): string {
  const text = PATTERN_TEXT[locale];
  const who =
    faces === "colours"
      ? text.revealColour(colourName(answer, locale))
      : text.revealGap;
  return `${who} ${text.nextTrain}`;
}
