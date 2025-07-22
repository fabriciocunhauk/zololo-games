"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "@/app/utils/appearance";
import Button from "@/app/components/Button";

interface Bubble {
  id: number;
  value: number;
  isCorrect: boolean;
  x: number;
  y: number;
  delay: number;
}

const shuffle = <T,>(array: T[]): T[] => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function getEvenlySpacedPositions(
  count: number,
  min: number,
  max: number,
  jitter: number = 0
): number[] {
  if (count === 1) return [min + (max - min) / 2];
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => {
    let base = min + i * step;
    if (jitter > 0) {
      base += (Math.random() - 0.5) * jitter;
      base = Math.max(min, Math.min(max, base));
    }
    return base;
  });
}

const FloatingBackground = memo(function FloatingBackground() {
  const bubbles = React.useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        y: Math.random() * 100 - 50,
        x: Math.random() * 50 - 25,
        rotate: Math.random() * 360,
        duration: Math.random() * 10 + 10,
      })),
    []
  );
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-pink-200/30"
          style={{
            width: b.width,
            height: b.height,
            left: `${b.left}%`,
            top: `${b.top}%`,
          }}
          animate={{
            y: [0, b.y],
            x: [0, b.x],
            rotate: [0, b.rotate],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});

const ScoreDisplay = memo(function ScoreDisplay({ score }: { score: number }) {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-pink-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-2xl font-bold text-center">
        Score: <span className="text-pink-500">{score}</span>
      </div>
    </motion.div>
  );
});

const GameControls = memo(function GameControls({
  gameState,
  score,
  onStart,
  onReset,
}: {
  gameState: string;
  score: number;
  onStart: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="flex items-center gap-5">
        <ScoreDisplay score={score} />

        {gameState === "idle" ? (
          <Button
            onClick={onStart}
            classes={{
              button:
                "bg-gradient-to-r from-pink-400 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold rounded-full shadow-lg text-xl transition-all hover:scale-105 hover:shadow-xl",
            }}
          >
            Start Game
          </Button>
        ) : (
          <Button
            onClick={onReset}
            classes={{
              button:
                "bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold rounded-full shadow-lg text-xl transition-all hover:scale-105 hover:shadow-xl",
            }}
          >
            Reset Game
          </Button>
        )}
      </div>
    </div>
  );
});

const CountdownOverlay = memo(function CountdownOverlay({
  countdown,
}: {
  countdown: number;
}) {
  return (
    <AnimatePresence>
      {countdown >= 0 && (
        <motion.div
          key="countdown-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-pink-300/70 flex items-center justify-center z-50"
        >
          <motion.div
            key={countdown}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-white text-9xl font-extrabold drop-shadow-lg
              xl:text-[7rem] sm:text-7xl"
          >
            {countdown > 0 ? countdown : "GO!"}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const MathProblem = memo(function MathProblem({
  problem,
}: {
  problem: string;
}) {
  return (
    <motion.div
      key={problem}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg text-center backdrop-blur-sm p-4"
    >
      <p className="text-4xl font-bold text-pink-700 xl:text-3xl">{problem}</p>
    </motion.div>
  );
});

const BubblesContainer = memo(function BubblesContainer({
  bubbles,
  problem,
  isProcessingClick,
  handleBubbleClick,
  gameAreaRef,
}: {
  bubbles: Bubble[];
  problem: any;
  isProcessingClick: boolean;
  handleBubbleClick: (bubble: Bubble) => void;
  gameAreaRef: React.RefObject<HTMLDivElement>;
}) {
  const bubbleDurations = React.useMemo(
    () => bubbles.map(() => Math.random() * 5 + 5),
    [bubbles.map((b) => b.id).join(",")]
  );

  const getBubbleSize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 64;
      if (window.innerWidth < 1024) return 72;
    }
    return 80;
  };

  const [bubbleSize, setBubbleSize] = React.useState(80);
  React.useEffect(() => {
    const handleResize = () => setBubbleSize(getBubbleSize());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={gameAreaRef}
      className="relative w-full h-[500px] bg-pink-100/50 rounded-2xl shadow-inner border-4 border-pink-300 overflow-hidden
        xl:h-[400px] sm:h-[320px]"
    >
      <AnimatePresence>
        {bubbles.map((bubble, idx) => (
          <motion.div
            key={bubble.id}
            className={classNames(
              "absolute rounded-full flex items-center justify-center cursor-pointer select-none",
              "bg-gradient-to-br from-pink-400 to-pink-400 border-2 border-pink-200 text-white font-extrabold",
              "text-3xl shadow-xl hover:shadow-2xl",
              "transition-all duration-200",
              isProcessingClick ? "opacity-50 cursor-not-allowed" : "",
              bubble.isCorrect ? "ring-2 ring-yellow-300" : "",
              "xl:text-2xl sm:text-xl"
            )}
            style={{
              width: `${bubbleSize}px`,
              height: `${bubbleSize}px`,
              left: bubble.x,
              bottom: -50,
            }}
            initial={{ y: bubble.y, opacity: 0, scale: 0.5 }}
            animate={{
              y: -(gameAreaRef.current?.clientHeight || 400) - 50,
              opacity: 1,
              scale: 1,
              transition: {
                duration: bubbleDurations[idx],
                ease: "linear",
                repeat: Infinity,
                delay: bubble.delay,
              },
            }}
            exit={{
              opacity: 0,
              scale: 1.5,
              transition: { duration: 0.3 },
            }}
            onClick={() => handleBubbleClick(bubble)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {bubble.value}
          </motion.div>
        ))}
      </AnimatePresence>

      <MathProblem problem={problem} />
    </div>
  );
});

const FeedbackMessage = memo(function FeedbackMessage({
  feedbackMessage,
}: {
  feedbackMessage: string | null;
}) {
  return (
    <AnimatePresence>
      {feedbackMessage && (
        <motion.div
          key="feedback"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className={classNames(
            "mt-6 p-4 rounded-xl text-2xl font-bold shadow-lg",
            "xl:text-xl sm:text-lg",
            feedbackMessage.includes("Correct")
              ? "bg-green-100 text-green-800 border-2 border-green-400"
              : "bg-red-100 text-red-800 border-2 border-red-400"
          )}
        >
          {feedbackMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const StartScreen = memo(function StartScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-xl border-2 border-pink-300 max-w-md text-center mt-8
        xl:p-6 xl:mt-6 sm:p-4 sm:mt-4"
    >
      <h2 className="text-2xl font-bold text-pink-600 mb-4 xl:text-xl sm:text-lg">
        How to Play
      </h2>
      <ul className="text-left space-y-2 text-gray-700 mb-6 xl:text-base sm:text-sm">
        <li>• Solve the math problem that appears</li>
        <li>• Pop the bubble with the correct answer</li>
        <li>• Earn 10 points for each correct answer</li>
        <li>• Be quick before the bubbles float away!</li>
      </ul>
      <div className="text-sm text-gray-500 xl:text-xs">
        Perfect for ages 5-8 to practice basic math skills
      </div>
    </motion.div>
  );
});

export default function BubblePopMathGame() {
  const [problem, setProblem] = useState<string>("");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isProcessingClick, setIsProcessingClick] = useState(false);
  const [gameState, setGameState] = useState<
    "idle" | "countdown" | "playing" | "game_over"
  >("idle");
  const [countdown, setCountdown] = useState(3);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const generateNewRoundRef = useRef<() => void>(() => {});

  const BUBBLE_COUNT = 4;
  const MIN_NUMBER = 1;
  const MAX_NUMBER = 10;
  const MAX_RESULT = 20;

  const generateNewRound = useCallback(() => {
    setIsProcessingClick(true);
    setFeedbackMessage(null);

    let num1: number, num2: number, op: string, result: number;

    do {
      num1 = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
      num2 = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
      op = Math.random() < 0.5 ? "+" : "-";

      if (op === "+") {
        result = num1 + num2;
      } else {
        if (num1 < num2) [num1, num2] = [num2, num1];
        result = num1 - num2;
      }
    } while (result < 1 || result > MAX_RESULT);

    setProblem(`${num1} ${op} ${num2} = ?`);
    const correctAnswer = result;

    const optionsSet = new Set<number>([correctAnswer]);
    while (optionsSet.size < BUBBLE_COUNT) {
      let incorrectOption = correctAnswer + Math.floor(Math.random() * 7) - 3;
      incorrectOption = Math.max(1, Math.min(MAX_RESULT, incorrectOption));
      optionsSet.add(incorrectOption);
    }

    const shuffledOptions = shuffle(Array.from(optionsSet));
    const containerWidth = gameAreaRef.current?.clientWidth || 400;
    const containerHeight = gameAreaRef.current?.clientHeight || 400;

    const bubbleSize = (() => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) return 64;
        if (window.innerWidth < 1024) return 72;
      }
      return 80;
    })();

    const margin = bubbleSize / 2 + 8;

    const rightShift = containerWidth * 0.1;
    const xPositions = getEvenlySpacedPositions(
      BUBBLE_COUNT,
      margin + rightShift,
      containerWidth - margin,
      bubbleSize * 0.2
    );

    const shuffledXPositions = shuffle(xPositions);

    const newBubbles = shuffledOptions.map((value, i) => ({
      id: i,
      value,
      isCorrect: value === correctAnswer,
      x: shuffledXPositions[i],
      y: containerHeight + Math.random() * 50,
      delay: i * 0.2,
    }));

    setBubbles(newBubbles);
    setTimeout(() => setIsProcessingClick(false), BUBBLE_COUNT * 200 + 500);
  }, [BUBBLE_COUNT, MAX_NUMBER, MIN_NUMBER, MAX_RESULT]);

  useEffect(() => {
    generateNewRoundRef.current = generateNewRound;
  }, [generateNewRound]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (gameState === "countdown" && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (gameState === "countdown" && countdown === 0) {
      setGameState("playing");
      generateNewRoundRef.current();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, countdown]);

  useEffect(() => {
    if (gameState === "playing" && bubbles.length === 0) {
      generateNewRound();
    }
  }, [gameState, generateNewRound, bubbles.length]);

  const startGame = useCallback(() => {
    setGameState("countdown");
    setCountdown(3);
    setScore(0);
    setFeedbackMessage(null);
    setBubbles([]);
  }, []);

  const handleBubbleClick = useCallback(
    (bubble: Bubble) => {
      if (isProcessingClick || gameState !== "playing") return;

      setIsProcessingClick(true);
      setFeedbackMessage(bubble.isCorrect ? "🎉 Correct!" : "Oops! Try again.");
      if (bubble.isCorrect) setScore((prev) => prev + 10);

      setBubbles([]);
      setTimeout(() => {
        if (gameState === "playing") generateNewRound();
      }, 1500);
    },
    [isProcessingClick, gameState, generateNewRound]
  );

  const handleResetGame = useCallback(() => {
    setGameState("idle");
    setScore(0);
    setProblem("");
    setBubbles([]);
    setFeedbackMessage(null);
    setIsProcessingClick(false);
    setCountdown(3);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-50 to-pink-50 p-4 sm:p-8 xl:p-10 overflow-hidden">
      <FloatingBackground />

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center xl:max-w-3xl sm:max-w-full">
        {gameState === "countdown" && (
          <CountdownOverlay countdown={countdown} />
        )}

        {gameState === "playing" && (
          <div className="w-full flex flex-col items-center">
            <BubblesContainer
              bubbles={bubbles}
              problem={problem}
              isProcessingClick={isProcessingClick}
              handleBubbleClick={handleBubbleClick}
              gameAreaRef={gameAreaRef as React.RefObject<HTMLDivElement>}
            />
            <FeedbackMessage feedbackMessage={feedbackMessage} />
          </div>
        )}

        <GameControls
          gameState={gameState}
          score={score}
          onStart={startGame}
          onReset={handleResetGame}
        />

        {gameState === "idle" && <StartScreen />}
      </div>
    </main>
  );
}
