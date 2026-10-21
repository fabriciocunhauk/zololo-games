import { MEMORY_CONFIG, type MemorySettings } from "../constants/config";

type PairRange = Pick<MemorySettings, "startPairs" | "maxPairs">;

/** Pairs dealt on a (1-based) level, capped at the difficulty's maximum. */
export function pairsForLevel(
  { startPairs, maxPairs }: PairRange,
  level: number
): number {
  return Math.min(
    startPairs + (level - 1) * MEMORY_CONFIG.pairsPerLevel,
    maxPairs
  );
}

/** The first level that deals the maximum number of pairs. */
export function lastLevel(range: PairRange): number {
  return (
    Math.ceil(
      (range.maxPairs - range.startPairs) / MEMORY_CONFIG.pairsPerLevel
    ) + 1
  );
}
