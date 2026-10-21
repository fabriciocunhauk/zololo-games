import type { Monster } from "@/app/components/monsters/monsters";
import type { PatternSettings } from "../constants/config";
import { colourName } from "./monsterFaces";

/** Praise for the right monster, with news of a level up or a fresh star row. */
export function rightText({
  levelUp,
  stars,
}: {
  levelUp: boolean;
  stars: number;
}): string {
  if (levelUp) return "🎉 Choo choo! That's right! Level up: longer trains!";
  if (stars === 0) return "🎉 Choo choo! That's right! Another row of stars!";
  return "🎉 Choo choo! That's right!";
}

/**
 * After a second miss. Monster names never appear on screen, so only the
 * colour trains (easy) say who it was; the others point at the gap.
 */
export function revealText(
  answer: Monster,
  faces: PatternSettings["faces"]
): string {
  const who =
    faces === "colours"
      ? `It was the ${colourName(answer).toLowerCase()} one!`
      : "Here's who rides in the empty carriage!";
  return `${who} Here comes the next train.`;
}
