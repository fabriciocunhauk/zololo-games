"use client";
import { useCallback, useRef, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { BUBBLE_POP_CONFIG, BUBBLE_POP_DIFFICULTY } from "../constants/config";
import { createBubbles, type Bubble } from "../utils/createBubbles";
import {
  generateMathProblem,
  type MathProblem,
} from "../utils/generateMathProblem";
import { getBubbleSize } from "../utils/getBubbleSize";

const { levelRiseScale } = BUBBLE_POP_CONFIG;

export function useBubblePopGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  /** 3, 2, 1, then 0 for "GO!"; null once play starts. */
  const [countdown, setCountdown] = useState<number | null>(null);
  const [roundId, setRoundId] = useState(0);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedId, setPoppedId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState(0);
  /** Taps are ignored while bubbles set off, during feedback and the countdown. */
  const [isLocked, setIsLocked] = useState(true);
  const areaRef = useRef<HTMLDivElement>(null);
  const { schedule, clearAll } = useSafeTimeout();

  const progress = useLevelProgress({
    levelCount: levelRiseScale.length,
    roundsPerLevel: BUBBLE_POP_CONFIG.roundsPerLevel,
  });

  const startRound = useCallback(
    (forDifficulty: Difficulty, forLevel: number) => {
      const { fallbackAreaSize, bubbleStaggerMs, roundSettleMs } =
        BUBBLE_POP_CONFIG;
      const settings = BUBBLE_POP_DIFFICULTY[forDifficulty];
      const scale = levelRiseScale[forLevel];
      const next = generateMathProblem(settings);
      const area = areaRef.current;

      setRoundId((id) => id + 1);
      setProblem(next);
      setFeedback(null);
      setPoppedId(null);
      setIsLocked(true);
      setBubbles(
        createBubbles({
          values: next.options,
          answer: next.answer,
          areaWidth: area?.clientWidth || fallbackAreaSize,
          areaHeight: area?.clientHeight || fallbackAreaSize,
          bubbleSize: getBubbleSize(window.innerWidth),
          riseSeconds: {
            min: settings.riseSeconds.min * scale,
            max: settings.riseSeconds.max * scale,
          },
          staggerSeconds: bubbleStaggerMs / 1000,
        })
      );
      schedule(
        () => setIsLocked(false),
        next.options.length * bubbleStaggerMs + roundSettleMs
      );
    },
    [schedule]
  );

  /** Clears the board and counts 3-2-1-GO, then starts at level 1. */
  const countIn = useCallback(
    (forDifficulty: Difficulty) => {
      const { countdownFrom, countdownStepMs, goHoldMs } = BUBBLE_POP_CONFIG;
      clearAll();
      progress.reset();
      setScore(0);
      setProblem(null);
      setBubbles([]);
      setFeedback(null);
      setIsLocked(true);
      setCountdown(countdownFrom);
      for (let n = countdownFrom - 1; n >= 0; n--) {
        schedule(() => setCountdown(n), (countdownFrom - n) * countdownStepMs);
      }
      schedule(() => {
        setCountdown(null);
        startRound(forDifficulty, 0);
      }, countdownFrom * countdownStepMs + goHoldMs);
    },
    [clearAll, progress, schedule, startRound]
  );

  const start = useCallback(
    (chosen: Difficulty) => {
      setDifficulty(chosen);
      countIn(chosen);
    },
    [countIn]
  );

  const restart = useCallback(() => {
    if (difficulty) countIn(difficulty);
  }, [difficulty, countIn]);

  const quit = useCallback(() => {
    clearAll();
    setDifficulty(null);
    setCountdown(null);
    setProblem(null);
    setBubbles([]);
    setFeedback(null);
  }, [clearAll]);

  const popBubble = useCallback(
    (bubble: Bubble) => {
      if (isLocked || !difficulty) return;
      setIsLocked(true);
      setPoppedId(bubble.id);
      setBubbles([]);

      if (bubble.isCorrect) {
        const next = progress.recordCorrect();
        setScore((prev) => prev + BUBBLE_POP_CONFIG.points);
        setFeedback({
          tone: "success",
          text: next.levelUp
            ? "🎉 Correct! Level up: the bubbles float faster now!"
            : "🎉 Correct!",
        });
        schedule(
          () => startRound(difficulty, next.level),
          BUBBLE_POP_CONFIG.nextRoundDelayMs
        );
        return;
      }

      setFeedback({ tone: "error", text: "Oops! Try again." });
      schedule(
        () => startRound(difficulty, progress.level),
        BUBBLE_POP_CONFIG.nextRoundDelayMs
      );
    },
    [isLocked, difficulty, progress, schedule, startRound]
  );

  return {
    difficulty,
    countdown,
    level: progress.level + 1,
    stars: progress.stars,
    roundsPerLevel: progress.roundsPerLevel,
    score,
    roundId,
    problem: problem?.text ?? null,
    bubbles,
    poppedId,
    feedback,
    isLocked,
    areaRef,
    start,
    restart,
    quit,
    popBubble,
  };
}
