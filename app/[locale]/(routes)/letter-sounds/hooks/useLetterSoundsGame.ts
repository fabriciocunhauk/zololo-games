"use client";
import { useCallback, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { useLocale } from "@/app/i18n/LocaleProvider";
import { capitalise } from "@/app/utils/capitalise";
import { playSound } from "@/app/utils/soundPlayer";
import { resultSound } from "@/app/utils/sounds";
import { LETTER_CONFIG, LETTER_DIFFICULTY } from "../constants/config";
import { LETTER_TEXT } from "../constants/text";
import { PICTURE_WORDS } from "../constants/words";
import { checkSpellingTap } from "../utils/checkSpelling";
import {
  generateLetterRound,
  type LetterRound,
} from "../utils/generateLetterRound";
import { ALPHABET, firstLetter } from "../utils/letters";

/** A wrong bank tile to wiggle; `nonce` changes so the same tile can wiggle again. */
export type Shake = { tile: number; nonce: number };

export function useLetterSoundsGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [round, setRound] = useState<LetterRound | null>(null);
  /** No more answers until the next round. */
  const [locked, setLocked] = useState(false);
  /** Choose mode: the letter tapped. */
  const [selected, setSelected] = useState<string | null>(null);
  /** Spell mode: letters placed so far, and which bank tiles they came from. */
  const [placed, setPlaced] = useState<string[]>([]);
  const [usedTiles, setUsedTiles] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState<Shake | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { schedule, clearAll } = useSafeTimeout();
  const locale = useLocale();
  const text = LETTER_TEXT[locale];

  const progress = useLevelProgress({
    levelCount: LETTER_CONFIG.levelCount,
    roundsPerLevel: LETTER_CONFIG.roundsPerLevel,
  });

  const startRound = useCallback(
    (forDifficulty: Difficulty, previous?: string) => {
      const next = generateLetterRound(
        PICTURE_WORDS[locale],
        LETTER_DIFFICULTY[forDifficulty],
        previous,
        ALPHABET[locale]
      );
      setRound(next);
      setLocked(false);
      setSelected(null);
      setPlaced([]);
      setUsedTiles([]);
      setMistakes(0);
      setShake(null);
      setFeedback(null);
    },
    [locale]
  );

  const start = useCallback(
    (chosen: Difficulty) => {
      clearAll();
      progress.reset();
      setDifficulty(chosen);
      startRound(chosen);
    },
    [clearAll, progress, startRound]
  );

  const quit = useCallback(() => {
    clearAll();
    setDifficulty(null);
    setRound(null);
  }, [clearAll]);

  const answer = useCallback(
    (choice: string) => {
      if (!round || round.kind !== "choose" || !difficulty || locked) return;
      setLocked(true);
      setSelected(choice);
      const word = round.word.word;
      const sentence = text.startsWith(
        capitalise(word),
        firstLetter(word).toUpperCase()
      );
      const { nextRoundDelayMs, revealLeadMs, revealHoldMs } = LETTER_CONFIG;

      if (choice === round.answer) {
        const next = progress.recordCorrect();
        playSound(resultSound(next));
        setFeedback({ tone: "success", text: text.right(sentence, next) });
        schedule(() => startRound(difficulty, word), nextRoundDelayMs);
        return;
      }

      playSound("wrong");
      setFeedback({ tone: "error", text: text.tryAgain });
      schedule(() => {
        setFeedback({ tone: "info", text: text.reveal(sentence) });
      }, revealLeadMs);
      schedule(
        () => startRound(difficulty, word),
        revealLeadMs + revealHoldMs
      );
    },
    [round, difficulty, locked, progress, text, schedule, startRound]
  );

  const pickTile = useCallback(
    (tile: number) => {
      if (!round || round.kind !== "spell" || !difficulty || locked) return;
      if (usedTiles.includes(tile)) return;
      const word = round.word.word;
      const letter = round.bank[tile];
      const result = checkSpellingTap(word, placed, letter);

      if (result === "wrong") {
        playSound("wrong");
        setMistakes((count) => count + 1);
        setShake((prev) => ({ tile, nonce: (prev?.nonce ?? 0) + 1 }));
        setFeedback({ tone: "error", text: text.tryAgain });
        return;
      }

      setPlaced([...placed, letter]);
      setUsedTiles([...usedTiles, tile]);
      if (result === "placed") {
        playSound("tap");
        setFeedback(null);
        return;
      }

      setLocked(true);
      if (mistakes === 0) {
        const next = progress.recordCorrect();
        playSound(resultSound(next));
        setFeedback({ tone: "success", text: text.spelled(word, next) });
      } else {
        playSound("correct");
        setFeedback({ tone: "info", text: text.spelledWithSlips(word) });
      }
      schedule(
        () => startRound(difficulty, word),
        LETTER_CONFIG.nextRoundDelayMs
      );
    },
    [
      round,
      difficulty,
      locked,
      usedTiles,
      placed,
      mistakes,
      progress,
      text,
      schedule,
      startRound,
    ]
  );

  return {
    difficulty,
    level: progress.level + 1,
    stars: progress.stars,
    roundsPerLevel: progress.roundsPerLevel,
    round,
    locked,
    selected,
    placed,
    usedTiles,
    shake,
    feedback,
    start,
    quit,
    answer,
    pickTile,
  };
}
