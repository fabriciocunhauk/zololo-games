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

/** Read out by the live region; `nonce` changes so a repeat is read again. */
export type Announcement = { text: string; nonce: number };

const MATCH = "It's a match!";
const MISMATCH = "Not a match. They flip back.";

export function useMemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [level, setLevel] = useState(1);
  const [deck, setDeck] = useState<MemoryCardData<Monster>[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
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
      setAnnouncement(null);
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

  const announce = useCallback((text: string) => {
    setAnnouncement((prev) => ({ text, nonce: (prev?.nonce ?? 0) + 1 }));
  }, []);

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
        announce(MATCH);
        schedule(() => {
          setMatched((prev) => [...prev, firstIdx, idx]);
          setFlipped([]);
          setIsBusy(false);
        }, MEMORY_CONFIG.matchDelayMs);
      } else {
        announce(MISMATCH);
        schedule(() => {
          setFlipped([]);
          setIsBusy(false);
        }, settings.mismatchDelayMs);
      }
    },
    [isBusy, flipped, matched, deck, settings, schedule, announce]
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

  // Not during the level-up celebration: the next level is already on its way.
  const restartLevel = useCallback(() => {
    if (difficulty && !gameWon) dealBoard(difficulty, level);
  }, [dealBoard, difficulty, level, gameWon]);

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
    announcement,
    cardState,
    flipCard,
    start,
    quit,
    restartLevel,
  };
}
