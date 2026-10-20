"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { BUBBLE_POP_CONFIG } from "../constants/config";
import { createBubbles, type Bubble } from "../utils/createBubbles";
import { generateMathProblem } from "../utils/generateMathProblem";
import { getBubbleSize } from "../utils/getBubbleSize";

export type GameState = "idle" | "countdown" | "playing";

export function useBubblePopGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [countdown, setCountdown] = useState<number>(
    BUBBLE_POP_CONFIG.countdownFrom
  );
  const [problem, setProblem] = useState("");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState(0);
  const [isProcessingClick, setIsProcessingClick] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const { schedule, clearAll } = useSafeTimeout();

  const startRound = useCallback(() => {
    const { fallbackAreaSize, bubbleStaggerMs, roundSettleMs } =
      BUBBLE_POP_CONFIG;
    setIsProcessingClick(true);
    setFeedback(null);

    const { text, answer, options } = generateMathProblem();
    const area = gameAreaRef.current;
    setProblem(text);
    setBubbles(
      createBubbles({
        values: options,
        answer,
        areaWidth: area?.clientWidth || fallbackAreaSize,
        areaHeight: area?.clientHeight || fallbackAreaSize,
        bubbleSize: getBubbleSize(window.innerWidth),
      })
    );
    schedule(
      () => setIsProcessingClick(false),
      options.length * bubbleStaggerMs + roundSettleMs
    );
  }, [schedule]);

  useEffect(() => {
    if (gameState !== "countdown") return;
    if (countdown === 0) {
      setGameState("playing");
      return;
    }
    const id = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(id);
  }, [gameState, countdown]);

  // Runs after the play area has mounted, so the first round measures it.
  useEffect(() => {
    if (gameState === "playing") startRound();
  }, [gameState, startRound]);

  const reset = useCallback(
    (nextState: GameState) => {
      clearAll();
      setGameState(nextState);
      setCountdown(BUBBLE_POP_CONFIG.countdownFrom);
      setScore(0);
      setProblem("");
      setBubbles([]);
      setFeedback(null);
      setIsProcessingClick(false);
    },
    [clearAll]
  );

  const startGame = useCallback(() => reset("countdown"), [reset]);
  const resetGame = useCallback(() => reset("idle"), [reset]);

  const popBubble = useCallback(
    (bubble: Bubble) => {
      if (isProcessingClick || gameState !== "playing") return;

      setIsProcessingClick(true);
      if (bubble.isCorrect) {
        setFeedback({ tone: "success", text: "🎉 Correct!" });
        setScore((prev) => prev + BUBBLE_POP_CONFIG.points);
      } else {
        setFeedback({ tone: "error", text: "Oops! Try again." });
      }
      setBubbles([]);
      schedule(startRound, BUBBLE_POP_CONFIG.nextRoundDelayMs);
    },
    [isProcessingClick, gameState, schedule, startRound]
  );

  return {
    gameState,
    countdown,
    problem,
    bubbles,
    feedback,
    score,
    isProcessingClick,
    gameAreaRef,
    startGame,
    resetGame,
    popBubble,
  };
}
