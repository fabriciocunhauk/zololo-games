"use client";
import { useCallback, useEffect, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { FROG_JUMP_CONFIG } from "../constants/config";
import {
  generateJumpProblem,
  type JumpProblem,
} from "../utils/generateJumpProblem";

export function useFrogJumpGame() {
  const [problem, setProblem] = useState<JumpProblem | null>(null);
  const [selection, setSelection] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState(0);
  const { schedule } = useSafeTimeout();

  const startRound = useCallback(() => {
    setIsAnimating(true);
    setFeedback(null);
    setSelection(null);
    setProblem(generateJumpProblem());
    schedule(() => setIsAnimating(false), FROG_JUMP_CONFIG.roundIntroMs);
  }, [schedule]);

  useEffect(() => {
    startRound();
  }, [startRound]);

  const selectOption = useCallback(
    (selected: number) => {
      if (isAnimating || selection !== null || !problem) return;

      setSelection(selected);
      setIsAnimating(true);
      if (selected === problem.answer) {
        setFeedback({ tone: "success", text: "🎉 Excellent!" });
        setScore((prev) => prev + FROG_JUMP_CONFIG.points);
      } else {
        setFeedback({
          tone: "error",
          text: `Not quite! The answer is ${problem.answer}.`,
        });
      }
      schedule(startRound, FROG_JUMP_CONFIG.nextRoundDelayMs);
    },
    [isAnimating, selection, problem, schedule, startRound]
  );

  return {
    problem,
    selection,
    feedback,
    isAnimating,
    score,
    selectOption,
  };
}
