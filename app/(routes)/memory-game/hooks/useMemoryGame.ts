"use client";
import { useCallback, useEffect, useState } from "react";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { MEMORY_CONFIG } from "../constants/config";
import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";
import {
  createShuffledDeck,
  type MemoryCardData,
} from "../utils/createShuffledDeck";

export type CardState = "down" | "up" | "matched";

export function useMemoryGame() {
  const [hasStarted, setHasStarted] = useState(false);
  const [level, setLevel] = useState<number>(MEMORY_CONFIG.startLevel);
  const [deck, setDeck] = useState<MemoryCardData<Monster>[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const { schedule, clearAll } = useSafeTimeout();

  const dealBoard = useCallback(
    (forLevel: number) => {
      clearAll();
      setDeck(createShuffledDeck(forLevel, MONSTERS));
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
    if (hasStarted) dealBoard(level);
  }, [hasStarted, level, dealBoard]);

  useEffect(() => {
    if (gameWon || deck.length === 0 || matched.length !== deck.length) return;
    setGameWon(true);
    schedule(() => {
      if (level >= MEMORY_CONFIG.maxLevel) dealBoard(level);
      else setLevel(level + 1);
    }, MEMORY_CONFIG.levelUpDelayMs);
  }, [matched, deck, level, gameWon, schedule, dealBoard]);

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
        }, MEMORY_CONFIG.mismatchDelayMs);
      }
    },
    [isBusy, flipped, matched, deck, schedule]
  );

  const start = useCallback(() => setHasStarted(true), []);
  const restartLevel = useCallback(() => dealBoard(level), [dealBoard, level]);

  const cardState = useCallback(
    (idx: number): CardState => {
      if (matched.includes(idx)) return "matched";
      return flipped.includes(idx) ? "up" : "down";
    },
    [flipped, matched]
  );

  return {
    hasStarted,
    level,
    isLastLevel: level >= MEMORY_CONFIG.maxLevel,
    deck,
    moves,
    pairsFound: matched.length / 2,
    totalPairs: deck.length / 2,
    gameWon,
    cardState,
    flipCard,
    start,
    restartLevel,
  };
}
