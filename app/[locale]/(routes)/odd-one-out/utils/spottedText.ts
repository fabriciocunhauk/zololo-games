import type { Locale } from "@/app/i18n/locales";
import { ODD_TEXT } from "../constants/text";

/**
 * Praise for spotting the odd one. `count` is how many monsters the next
 * level deals; a full row on the last level starts another row of stars.
 */
export function spottedText(
  locale: Locale,
  description: string,
  { levelUp, stars }: { levelUp: boolean; stars: number },
  count: number
): string {
  const { lead, levelUp: nextLevel, fullRow } = ODD_TEXT[locale].spotted;
  const extra = levelUp ? nextLevel(count) : stars === 0 ? fullRow : "";
  return `${lead} ${description}${extra}`;
}
