"use client";
import { useCallback, useState } from "react";
import {
  advanceLevel,
  clampLevel,
  type LevelProgress,
  type LevelRules,
} from "@/app/utils/advanceLevel";

const START: LevelProgress = { level: 0, stars: 0 };

/** Stars towards the next level. `level` is zero-based. */
export function useLevelProgress(rules: LevelRules) {
  const [progress, setProgress] = useState<LevelProgress>(START);
  const { levelCount, roundsPerLevel } = rules;

  const level = clampLevel(progress.level, levelCount);

  /** Returns the new progress so callers can word their feedback. */
  const recordCorrect = useCallback(() => {
    const next = advanceLevel(
      { level, stars: progress.stars },
      { levelCount, roundsPerLevel }
    );
    setProgress({ level: next.level, stars: next.stars });
    return next;
  }, [level, progress.stars, levelCount, roundsPerLevel]);

  const reset = useCallback(() => setProgress(START), []);

  return {
    level,
    stars: progress.stars,
    roundsPerLevel,
    recordCorrect,
    reset,
  };
}
