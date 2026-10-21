"use client";
import { useCallback, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { useLocale } from "@/app/i18n/LocaleProvider";
import { playSound } from "@/app/utils/soundPlayer";
import { resultSound } from "@/app/utils/sounds";
import { FROG_JUMP_CONFIG, FROG_JUMP_DIFFICULTY } from "../constants/config";
import { FROG_JUMP_TEXT } from "../constants/text";
import {
  generateJumpProblem,
  type JumpProblem,
} from "../utils/generateJumpProblem";

export function useFrogJumpGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [problem, setProblem] = useState<JumpProblem | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { schedule, clearAll } = useSafeTimeout();
  const text = FROG_JUMP_TEXT[useLocale()];

  const settings = FROG_JUMP_DIFFICULTY[difficulty ?? "easy"];
  const progress = useLevelProgress({
    levelCount: settings.levels.length,
    roundsPerLevel: FROG_JUMP_CONFIG.roundsPerLevel,
  });

  const startRound = useCallback(
    (forDifficulty: Difficulty, forLevel: number, previous?: JumpProblem) => {
      const chosen = FROG_JUMP_DIFFICULTY[forDifficulty];
      setProblem(
        generateJumpProblem(chosen, chosen.levels[forLevel], previous),
      );
      setSelected(null);
      setFeedback(null);
    },
    [],
  );

  const start = useCallback(
    (chosen: Difficulty) => {
      clearAll();
      progress.reset();
      setDifficulty(chosen);
      startRound(chosen, 0);
    },
    [clearAll, progress, startRound],
  );

  const quit = useCallback(() => {
    clearAll();
    setDifficulty(null);
    setProblem(null);
  }, [clearAll]);

  const answer = useCallback(
    (choice: number) => {
      if (!problem || !difficulty || selected !== null) return;
      setSelected(choice);

      if (choice === problem.answer) {
        const next = progress.recordCorrect();
        playSound(resultSound(next));
        setFeedback({
          tone: "success",
          text: text.right(next, settings.levels[next.level].max),
        });
        schedule(
          () => startRound(difficulty, next.level, problem),
          FROG_JUMP_CONFIG.nextRoundDelayMs,
        );
        return;
      }

      // Wrong: the frog still hops, to the right pad, and we say where.
      playSound("wrong");
      setFeedback({ tone: "error", text: text.wrong(problem) });
      schedule(
        () => startRound(difficulty, progress.level, problem),
        FROG_JUMP_CONFIG.wrongHoldMs,
      );
    },
    [problem, difficulty, selected, progress, settings, text, schedule, startRound],
  );

  return {
    difficulty,
    settings,
    level: progress.level + 1,
    maxJump: settings.levels[progress.level].max,
    stars: progress.stars,
    roundsPerLevel: progress.roundsPerLevel,
    problem,
    selected,
    feedback,
    start,
    quit,
    answer,
  };
}
