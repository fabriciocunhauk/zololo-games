"use client";
import { useCallback, useEffect, useState } from "react";
import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";
import type { Difficulty } from "@/app/constants/difficulty";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { MEMORY_CONFIG, MEMORY_DIFFICULTY } from "../constants/config";
import {
  createShuffledDeck,
  type MemoryCardData,
} from "../utils/createShuffledDeck";
import { lastLevel, pairsForLevel } from "../utils/pairsForLevel";

export type CardState = "down" | "up" | "matched";

export function useMemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [level, setLevel] = useState(1);
  const [deck, setDeck] = useState<MemoryCardData<Monster>[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const { schedule, clearAll } = useSafeTimeout();

  const settings = MEMORY_DIFFICULTY[difficulty ?? "easy"];
  const maxLevel = lastLevel(settings);

  const dealBoard = useCallback(
    (forDifficulty: Difficulty, forLevel: number) => {
      clearAll();
      const pairs = pairsForLevel(MEMORY_DIFFICULTY[forDifficulty], forLevel);
      setDeck(createShuffledDeck(pairs, MONSTERS));
      setFlipped([]);
      setMatched([]);
      setMoves(0);
      setGameWon(false);
      setIsBusy(false);
    },
    [clearAll]
  );

  // Deal on the client only: shuffling during render would mismatch hydration.
  useEffect(() => {
    if (difficulty) dealBoard(difficulty, level);
  }, [difficulty, level, dealBoard]);

  useEffect(() => {
    if (gameWon || deck.length === 0 || matched.length !== deck.length) return;
    if (!difficulty) return;
    setGameWon(true);
    schedule(() => {
      if (level >= maxLevel) dealBoard(difficulty, level);
      else setLevel(level + 1);
    }, MEMORY_CONFIG.levelUpDelayMs);
  }, [matched, deck, difficulty, level, maxLevel, gameWon, schedule, dealBoard]);

  const flipCard = useCallback(
    (idx: number) => {
      if (isBusy || flipped.includes(idx) || matched.includes(idx)) return;
      if (flipped.length === 0) {
        setFlipped([idx]);
        return;
      }

      const firstIdx = flipped[0];
      setFlipped([firstIdx, idx]);
      setIsBusy(true);
      setMoves((m) => m + 1);

      if (deck[firstIdx].pairId === deck[idx].pairId) {
        schedule(() => {
          setMatched((prev) => [...prev, firstIdx, idx]);
          setFlipped([]);
          setIsBusy(false);
        }, MEMORY_CONFIG.matchDelayMs);
      } else {
        schedule(() => {
          setFlipped([]);
          setIsBusy(false);
        }, settings.mismatchDelayMs);
      }
    },
    [isBusy, flipped, matched, deck, settings, schedule]
  );

  const start = useCallback((chosen: Difficulty) => {
    setLevel(1);
    setDifficulty(chosen);
  }, []);

  const quit = useCallback(() => {
    clearAll();
    setDifficulty(null);
    setDeck([]);
  }, [clearAll]);

  const restartLevel = useCallback(() => {
    if (difficulty) dealBoard(difficulty, level);
  }, [dealBoard, difficulty, level]);

  const cardState = useCallback(
    (idx: number): CardState => {
      if (matched.includes(idx)) return "matched";
      return flipped.includes(idx) ? "up" : "down";
    },
    [flipped, matched]
  );

  return {
    difficulty,
    level,
    isLastLevel: level >= maxLevel,
    deck,
    moves,
    pairsFound: matched.length / 2,
    totalPairs: deck.length / 2,
    gameWon,
    cardState,
    flipCard,
    start,
    quit,
    restartLevel,
  };
}
