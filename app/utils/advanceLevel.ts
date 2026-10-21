export type LevelProgress = {
  /** Zero-based. */
  level: number;
  stars: number;
};

export type LevelRules = {
  levelCount: number;
  roundsPerLevel: number;
};

/**
 * One more right answer. A full row of stars moves up a level and starts the
 * row again; on the last level the row restarts without moving up.
 */
export function advanceLevel(
  { level, stars }: LevelProgress,
  { levelCount, roundsPerLevel }: LevelRules
): LevelProgress & { levelUp: boolean } {
  const earned = stars + 1;
  if (earned < roundsPerLevel) return { level, stars: earned, levelUp: false };
  const levelUp = level < levelCount - 1;
  return { level: levelUp ? level + 1 : level, stars: 0, levelUp };
}
