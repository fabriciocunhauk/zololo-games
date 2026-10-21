/** Praise for a sorted tray. On the last level a full row starts another one. */
export function roundCompleteText({
  levelUp,
  stars,
}: {
  levelUp: boolean;
  stars: number;
}): string {
  if (levelUp) {
    return "🎉 Round complete! You earned a star and went up a level!";
  }
  if (stars === 0) return "🎉 Round complete! Another row of stars!";
  return "🎉 Round complete! You earned a star.";
}
