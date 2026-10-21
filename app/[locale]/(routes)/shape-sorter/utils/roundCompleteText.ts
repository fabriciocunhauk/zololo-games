import type { Locale } from "@/app/i18n/locales";
import type { LevelStep } from "@/app/utils/advanceLevel";
import { SHAPE_TEXT } from "../constants/text";

/** Praise for a sorted tray. On the last level a full row starts another one. */
export function roundCompleteText(
  { levelUp, stars }: Pick<LevelStep, "levelUp" | "stars">,
  locale: Locale
): string {
  const text = SHAPE_TEXT[locale].roundComplete;
  if (levelUp) return text.levelUp;
  if (stars === 0) return text.newRow;
  return text.star;
}
