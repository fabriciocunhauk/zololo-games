"use client";
import { useCallback, useRef, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { playSound } from "@/app/utils/soundPlayer";
import { resultSound } from "@/app/utils/sounds";
import { BUBBLE_POP_CONFIG, BUBBLE_POP_DIFFICULTY } from "../constants/config";
import { createBubbles, type Bubble } from "../utils/createBubbles";
import {
  generateMathProblem,
  solveText,
  type MathProblem,
} from "../utils/generateMathProblem";

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
  // Read by taps: leaving bubbles keep a stale `isLocked` while they fade.
  const lockedRef = useRef(true);
  const { schedule, clearAll } = useSafeTimeout();

  const lock = useCallback((locked: boolean) => {
    lockedRef.current = locked;
    setIsLocked(locked);
  }, []);

  const progress = useLevelProgress({
    levelCount: levelRiseScale.length,
    roundsPerLevel: BUBBLE_POP_CONFIG.roundsPerLevel,
  });

  const startRound = useCallback(
    (forDifficulty: Difficulty, forLevel: number) => {
      const { bubbleStaggerMs, roundSettleMs } = BUBBLE_POP_CONFIG;
      const settings = BUBBLE_POP_DIFFICULTY[forDifficulty];
      const scale = levelRiseScale[forLevel];
      const next = generateMathProblem(settings);

      setRoundId((id) => id + 1);
      setProblem(next);
      setFeedback(null);
      setPoppedId(null);
      lock(true);
      setBubbles(
        createBubbles({
          values: next.options,
          answer: next.answer,
          riseSeconds: {
            min: settings.riseSeconds.min * scale,
            max: settings.riseSeconds.max * scale,
          },
          staggerSeconds: bubbleStaggerMs / 1000,
        })
      );
      schedule(
        () => lock(false),
        next.options.length * bubbleStaggerMs + roundSettleMs
      );
    },
    [lock, schedule]
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
      lock(true);
      setCountdown(countdownFrom);
      playSound("tick");
      for (let n = countdownFrom - 1; n >= 0; n--) {
        schedule(() => {
          setCountdown(n);
          playSound(n === 0 ? "go" : "tick");
        }, (countdownFrom - n) * countdownStepMs);
      }
      schedule(() => {
        setCountdown(null);
        startRound(forDifficulty, 0);
      }, countdownFrom * countdownStepMs + goHoldMs);
    },
    [clearAll, lock, progress, schedule, startRound]
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
    lock(true);
    setDifficulty(null);
    setCountdown(null);
    setProblem(null);
    setBubbles([]);
    setFeedback(null);
  }, [clearAll, lock]);

  const popBubble = useCallback(
    (bubble: Bubble) => {
      if (lockedRef.current || !difficulty || !problem) return;
      lock(true);
      setPoppedId(bubble.id);
      setBubbles([]);

      if (bubble.isCorrect) {
        const next = progress.recordCorrect();
        playSound("pop");
        playSound(resultSound(next));
        setScore((prev) => prev + BUBBLE_POP_CONFIG.points);
        setFeedback({
          tone: "success",
          text: next.levelUp
            ? "🎉 Correct! Level up: the bubbles float faster now!"
            : next.stars === 0
              ? "🎉 Correct! Another row of stars!"
              : "🎉 Correct!",
        });
        schedule(
          () => startRound(difficulty, next.level),
          BUBBLE_POP_CONFIG.nextRoundDelayMs
        );
        return;
      }

      // Wrong: say the answer before the next sum floats in.
      playSound("wrong");
      setFeedback({
        tone: "error",
        text: `Not quite! ${solveText(problem)}.`,
      });
      schedule(
        () => startRound(difficulty, progress.level),
        BUBBLE_POP_CONFIG.wrongHoldMs
      );
    },
    [difficulty, problem, lock, progress, schedule, startRound]
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
    bubbleCount: difficulty ? BUBBLE_POP_DIFFICULTY[difficulty].bubbleCount : 0,
    bubbles,
    poppedId,
    feedback,
    isLocked,
    start,
    restart,
    quit,
    popBubble,
  };
}
