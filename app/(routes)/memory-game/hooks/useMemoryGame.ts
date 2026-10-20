"use client";
import { useCallback, useEffect, useState } from "react";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { CARD_FACES, type CardFace } from "../constants/cardImages";
import { MEMORY_CONFIG } from "../constants/config";
import {
  createShuffledDeck,
  type MemoryCardData,
} from "../utils/createShuffledDeck";

export function useMemoryGame() {
  const [level, setLevel] = useState<number>(MEMORY_CONFIG.startLevel);
  const [deck, setDeck] = useState<MemoryCardData<CardFace>[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const { schedule, clearAll } = useSafeTimeout();

  const dealBoard = useCallback(
    (forLevel: number) => {
      clearAll();
      setDeck(createShuffledDeck(forLevel, CARD_FACES));
      setFlipped([]);
      setMatched([]);
      setScore(0);
      setMoves(0);
      setGameWon(false);
      setIsBusy(false);
    },
    [clearAll]
  );

  // Deal on the client only: shuffling during render would mismatch hydration.
  useEffect(() => {
    dealBoard(level);
  }, [level, dealBoard]);

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
          setScore((s) => s + MEMORY_CONFIG.points);
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

  const reset = useCallback(() => dealBoard(level), [dealBoard, level]);

  const isFaceUp = useCallback(
    (idx: number) => flipped.includes(idx) || matched.includes(idx),
    [flipped, matched]
  );

  return { level, deck, score, moves, gameWon, isFaceUp, flipCard, reset };
}
