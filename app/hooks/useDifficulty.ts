"use client";
import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_DIFFICULTY,
  isDifficulty,
  type Difficulty,
} from "@/app/constants/difficulty";

const storageKey = (gameSlug: string) => `zololo:difficulty:${gameSlug}`;

/** The difficulty picked for a game, remembered in this browser. */
export function useDifficulty(gameSlug: string) {
  // Start from the default so the server and first client render match.
  const [difficulty, setDifficultyState] =
    useState<Difficulty>(DEFAULT_DIFFICULTY);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey(gameSlug));
      if (isDifficulty(saved)) setDifficultyState(saved);
    } catch {
      // Storage can be blocked (private mode); the default still works.
    }
  }, [gameSlug]);

  const setDifficulty = useCallback(
    (next: Difficulty) => {
      setDifficultyState(next);
      try {
        window.localStorage.setItem(storageKey(gameSlug), next);
      } catch {
        // Not remembered, but the game still uses it.
      }
    },
    [gameSlug]
  );

  return [difficulty, setDifficulty] as const;
}
