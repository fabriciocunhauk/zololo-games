"use client";
import { useCallback, useState } from "react";
import {
  advanceLevel,
  type LevelProgress,
  type LevelRules,
} from "@/app/utils/advanceLevel";

const START: LevelProgress = { level: 0, stars: 0 };

/** Stars towards the next level. `level` is zero-based. */
export function useLevelProgress(rules: LevelRules) {
  const [progress, setProgress] = useState<LevelProgress>(START);
  const { levelCount, roundsPerLevel } = rules;

  /** Returns the new progress so callers can word their feedback. */
  const recordCorrect = useCallback(() => {
    const next = advanceLevel(progress, { levelCount, roundsPerLevel });
    setProgress({ level: next.level, stars: next.stars });
    return next;
  }, [progress, levelCount, roundsPerLevel]);

  const reset = useCallback(() => setProgress(START), []);

  return {
    level: progress.level,
    stars: progress.stars,
    roundsPerLevel,
    recordCorrect,
    reset,
  };
}
