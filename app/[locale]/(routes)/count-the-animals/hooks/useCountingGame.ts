"use client";
import { useCallback, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { useLocale } from "@/app/i18n/LocaleProvider";
import { playSound } from "@/app/utils/soundPlayer";
import { resultSound } from "@/app/utils/sounds";
import { ANIMALS, type Animal } from "../constants/animals";
import { COUNTING_CONFIG, COUNTING_DIFFICULTY } from "../constants/config";
import { COUNTING_TEXT } from "../constants/text";
import { countLabel } from "../utils/countLabel";
import {
  generateCountingRound,
  type CountingRound,
} from "../utils/generateCountingRound";

export function useCountingGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [round, setRound] = useState<CountingRound<Animal> | null>(null);
  /** Animal positions in the order they were counted. */
  const [counted, setCounted] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { schedule, clearAll } = useSafeTimeout();
  const locale = useLocale();
  const text = COUNTING_TEXT[locale];

  const settings = COUNTING_DIFFICULTY[difficulty ?? "easy"];
  const progress = useLevelProgress({
    levelCount: settings.levels.length,
    roundsPerLevel: COUNTING_CONFIG.roundsPerLevel,
  });

  const startRound = useCallback(
    (forDifficulty: Difficulty, forLevel: number, previous?: Animal) => {
      const { levels, maxOption } = COUNTING_DIFFICULTY[forDifficulty];
      setRound(
        generateCountingRound(ANIMALS, levels[forLevel], maxOption, previous)
      );
      setCounted([]);
      setSelected(null);
      setFeedback(null);
    },
    []
  );

  const start = useCallback(
    (chosen: Difficulty) => {
      clearAll();
      progress.reset();
      setDifficulty(chosen);
      startRound(chosen, 0);
    },
    [clearAll, progress, startRound]
  );

  const quit = useCallback(() => {
    clearAll();
    setDifficulty(null);
    setRound(null);
  }, [clearAll]);

  const countAnimal = useCallback(
    (position: number) => {
      if (selected !== null || counted.includes(position)) return;
      playSound("tap");
      setCounted([...counted, position]);
    },
    [selected, counted]
  );

  const countAgain = useCallback(() => {
    if (selected === null) setCounted([]);
  }, [selected]);

  const answer = useCallback(
    (choice: number) => {
      if (!round || !difficulty || selected !== null) return;
      setSelected(choice);
      const label = countLabel(round.answer, round.animal.names[locale]);

      if (choice === round.answer) {
        const next = progress.recordCorrect();
        playSound(resultSound(next));
        // On the last level the star row just refills.
        setFeedback({
          tone: "success",
          text: text.right(label, next, settings.levels[next.level].max),
        });
        schedule(
          () => startRound(difficulty, next.level, round.animal),
          COUNTING_CONFIG.nextRoundDelayMs
        );
        return;
      }

      // Wrong: count along together, then say the answer.
      const { revealLeadMs, revealStepMs, revealHoldMs } = COUNTING_CONFIG;
      playSound("wrong");
      setCounted([]);
      setFeedback({ tone: "error", text: text.countTogether });
      for (let i = 1; i <= round.answer; i++) {
        schedule(
          () => {
            playSound("tap");
            setCounted(Array.from({ length: i }, (_, idx) => idx));
          },
          revealLeadMs + revealStepMs * i
        );
      }
      const doneAt = revealLeadMs + revealStepMs * (round.answer + 1);
      schedule(() => {
        setFeedback({ tone: "info", text: text.reveal(label) });
      }, doneAt);
      schedule(
        () => startRound(difficulty, progress.level, round.animal),
        doneAt + revealHoldMs
      );
    },
    [
      round,
      difficulty,
      selected,
      progress,
      settings,
      locale,
      text,
      schedule,
      startRound,
    ]
  );

  return {
    difficulty,
    level: progress.level + 1,
    levelMax: settings.levels[progress.level].max,
    stars: progress.stars,
    roundsPerLevel: progress.roundsPerLevel,
    round,
    counted,
    selected,
    feedback,
    start,
    quit,
    countAnimal,
    countAgain,
    answer,
  };
}
