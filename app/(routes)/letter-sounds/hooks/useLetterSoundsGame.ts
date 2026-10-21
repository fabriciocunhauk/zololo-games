"use client";
import { useCallback, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { useSpeak } from "@/app/hooks/useSpeak";
import { LETTER_CONFIG, LETTER_DIFFICULTY } from "../constants/config";
import { PICTURE_WORDS } from "../constants/words";
import { checkSpellingTap } from "../utils/checkSpelling";
import {
  generateLetterRound,
  type LetterRound,
} from "../utils/generateLetterRound";
import { capitalise, firstLetter } from "../utils/letters";

/** A wrong bank tile to wiggle; `nonce` changes so the same tile can wiggle again. */
export type Shake = { tile: number; nonce: number };

const LISTEN_AGAIN = "Not quite! Listen again…";

function cheer(levelUp: boolean, fullRow: boolean) {
  if (levelUp) return " Level up!";
  if (fullRow) return " Another row of stars!";
  return "";
}

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
  const { canSpeak, speak } = useSpeak();

  const progress = useLevelProgress({
    levelCount: LETTER_CONFIG.levelCount,
    roundsPerLevel: LETTER_CONFIG.roundsPerLevel,
  });

  const startRound = useCallback(
    (forDifficulty: Difficulty, previous?: string) => {
      const next = generateLetterRound(
        PICTURE_WORDS,
        LETTER_DIFFICULTY[forDifficulty],
        previous
      );
      setRound(next);
      setLocked(false);
      setSelected(null);
      setPlaced([]);
      setUsedTiles([]);
      setMistakes(0);
      setShake(null);
      setFeedback(null);
      speak(next.word.word);
    },
    [speak]
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

  const hear = useCallback(() => {
    if (round) speak(round.word.word);
  }, [round, speak]);

  const answer = useCallback(
    (choice: string) => {
      if (!round || round.kind !== "choose" || !difficulty || locked) return;
      setLocked(true);
      setSelected(choice);
      const word = round.word.word;
      const sentence = `${capitalise(word)} starts with ${firstLetter(word).toUpperCase()}`;
      const { nextRoundDelayMs, revealLeadMs, revealHoldMs } = LETTER_CONFIG;

      if (choice === round.answer) {
        const next = progress.recordCorrect();
        const extra = cheer(next.levelUp, next.stars === 0);
        setFeedback({ tone: "success", text: `🎉 Yes! ${sentence}!${extra}` });
        speak(`Yes! ${sentence}!`);
        schedule(() => startRound(difficulty, word), nextRoundDelayMs);
        return;
      }

      setFeedback({ tone: "error", text: LISTEN_AGAIN });
      speak(word);
      schedule(() => {
        setFeedback({ tone: "info", text: `${sentence}.` });
        speak(sentence);
      }, revealLeadMs);
      schedule(
        () => startRound(difficulty, word),
        revealLeadMs + revealHoldMs
      );
    },
    [round, difficulty, locked, progress, speak, schedule, startRound]
  );

  const pickTile = useCallback(
    (tile: number) => {
      if (!round || round.kind !== "spell" || !difficulty || locked) return;
      if (usedTiles.includes(tile)) return;
      const word = round.word.word;
      const letter = round.bank[tile];
      const result = checkSpellingTap(word, placed, letter);

      if (result === "wrong") {
        setMistakes((count) => count + 1);
        setShake((prev) => ({ tile, nonce: (prev?.nonce ?? 0) + 1 }));
        setFeedback({ tone: "error", text: LISTEN_AGAIN });
        speak(word);
        return;
      }

      setPlaced([...placed, letter]);
      setUsedTiles([...usedTiles, tile]);
      if (result === "placed") {
        setFeedback(null);
        return;
      }

      setLocked(true);
      if (mistakes === 0) {
        const next = progress.recordCorrect();
        const extra = cheer(next.levelUp, next.stars === 0);
        setFeedback({
          tone: "success",
          text: `🎉 Yes! You spelled ${word}!${extra}`,
        });
        speak(`Yes! You spelled ${word}!`);
      } else {
        setFeedback({
          tone: "info",
          text: `You spelled ${word}! No slips next time for a star.`,
        });
        speak(`You spelled ${word}!`);
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
      speak,
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
    canSpeak,
    start,
    quit,
    hear,
    answer,
    pickTile,
  };
}
