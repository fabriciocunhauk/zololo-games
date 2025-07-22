"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "@/app/utils/appearance";
import Container from "@/app/components/Container";
import frogCharacter from "@/public/images/frog-jump/frog.png";

// --- Constants ---
const MIN_NUMBER = 0;
const MAX_NUMBER = 20;
const NUM_OPTIONS = 4;

// --- Utils ---
const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// --- Components ---
const ScoreDisplay: React.FC<{ score: number }> = ({ score }) => (
  <div className="flex flex-col sm:flex-row items-center gap-8 py-4">
    <p className="text-lg sm:text-xl md:text-2xl font-bold">
      Click on the number where the frog lands!
    </p>
    <div className="text-xl sm:text-2xl font-bold flex items-center gap-4">
      Score:{" "}
      <span className="text-4xl sm:text-5xl md:text-6xl text-pink-400 -rotate-2">
        {score}
      </span>
    </div>
  </div>
);

const ProblemDisplay: React.FC<{
  startNumber: number;
  operation: "+" | "-";
  jumpAmount: number;
}> = ({ startNumber, operation, jumpAmount }) => (
  <motion.div
    key={`${startNumber}-${operation}-${jumpAmount}`}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 text-center border-4 border-blue-400"
  >
    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700">
      Start at <span className="text-purple-600">{startNumber}</span>, jump{" "}
      <span
        className={classNames(
          "font-extrabold",
          operation === "+" ? "text-green-600" : "text-red-600"
        )}
      >
        {operation}
      </span>{" "}
      <span className="text-orange-600">{jumpAmount}</span>.
    </p>
    <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-2 text-gray-600">
      Where do you land?
    </p>
  </motion.div>
);

const NumberLineMarkers: React.FC<{
  getFrogPosition: (num: number) => string;
}> = ({ getFrogPosition }) => (
  <>
    {Array.from({ length: MAX_NUMBER + 1 }).map((_, i) => (
      <div
        key={`marker-${i}`}
        className="flex flex-col items-center absolute top-13"
        style={{
          left: getFrogPosition(i),
          bottom: 0,
          transform: "translateX(-50%)",
        }}
      >
        <div className="w-1 h-2 sm:h-3 bg-gray-700"></div>
        <span className="text-xs sm:text-sm font-bold text-gray-800 -mt-1 sm:mt-0">
          {i}
        </span>
      </div>
    ))}
  </>
);

const FrogCharacter: React.FC<{
  getFrogPosition: (num: number) => string;
  startNumber: number;
  correctAnswer: number;
  isAnimating: boolean;
  feedbackMessage: string | null;
}> = ({
  getFrogPosition,
  startNumber,
  correctAnswer,
  isAnimating,
  feedbackMessage,
}) => (
  <motion.div
    key="frog"
    className="absolute top-5 z-20 flex items-end justify-center"
    initial={{
      left: getFrogPosition(startNumber),
      bottom: "8px",
      opacity: 0,
      x: "-50%",
    }}
    animate={{
      left:
        isAnimating && feedbackMessage
          ? getFrogPosition(correctAnswer)
          : getFrogPosition(startNumber),
      bottom: "8px",
      opacity: 1,
      x: "-50%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    }}
    transition={{ duration: 0.8 }}
    style={{
      transform: "translateX(-50%)",
      width: "3rem",
      height: "3rem",
    }}
  >
    <Image
      src={frogCharacter}
      alt="Frog character"
      fill
      style={{ objectFit: "contain" }}
      className="drop-shadow-md"
    />
  </motion.div>
);

const AnswerOptions: React.FC<{
  options: number[];
  handleClick: (option: number) => void;
  buttonVariants: any;
  isAnimating: boolean;
  userSelection: number | null;
  correctAnswer: number;
}> = ({
  options,
  handleClick,
  buttonVariants,
  isAnimating,
  userSelection,
  correctAnswer,
}) => (
  <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-xl">
    {options.map((option) => (
      <motion.button
        key={option}
        onClick={() => handleClick(option)}
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        disabled={isAnimating || userSelection !== null}
        className={classNames(
          "relative bg-white text-gray-800 font-extrabold text-2xl sm:text-3xl w-20 sm:w-28 h-20 xl:h-32 rounded-xl shadow-xl border-4 border-pink-primary",
          "flex items-center justify-center cursor-pointer transition-transform duration-200",
          "hover:scale-105 hover:ring-4 hover:ring-pink-primary/40",
          isAnimating || userSelection !== null
            ? "opacity-50 cursor-not-allowed"
            : "",
          userSelection === option &&
            userSelection === correctAnswer &&
            "ring-4 ring-green-500",
          userSelection === option &&
            userSelection !== correctAnswer &&
            "ring-4 ring-red-500"
        )}
      >
        {option}
      </motion.button>
    ))}
  </div>
);

const FeedbackMessage: React.FC<{ feedbackMessage: string | null }> = ({
  feedbackMessage,
}) => (
  <AnimatePresence>
    {feedbackMessage && (
      <motion.div
        key="feedback"
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={classNames(
          "mt-8 p-3 rounded-xl text-lg sm:text-xl md:text-2xl font-bold shadow-lg text-center",
          feedbackMessage.includes("Excellent")
            ? "bg-green-200 text-green-800 border-4 border-green-400"
            : "bg-red-200 text-red-800 border-4 border-red-400"
        )}
      >
        {feedbackMessage}
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main Game Component ---
export default function NumberLineJumpGame() {
  const [startNumber, setStartNumber] = useState(0);
  const [operation, setOperation] = useState<"+" | "-">("+");
  const [jumpAmount, setJumpAmount] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userSelection, setUserSelection] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<number[]>([]);

  const generateNewRound = useCallback(() => {
    setIsAnimating(true);
    setFeedbackMessage(null);
    setUserSelection(null);

    let newStartNumber = Math.floor(Math.random() * 15) + 1;
    let newOperation: "+" | "-";
    newOperation = Math.random() < 0.5 ? "+" : "-";
    let newJumpAmount = Math.floor(Math.random() * 5) + 1;

    let calculatedAnswer: number = 0;

    for (let tries = 0; tries < 10; tries++) {
      calculatedAnswer =
        newOperation === "+"
          ? newStartNumber + newJumpAmount
          : newStartNumber - newJumpAmount;
      if (calculatedAnswer >= MIN_NUMBER && calculatedAnswer <= MAX_NUMBER) {
        break;
      }
      newStartNumber = Math.floor(Math.random() * 15) + 1;
      newOperation = Math.random() < 0.5 ? "+" : "-";
      newJumpAmount = Math.floor(Math.random() * 5) + 1;
    }

    setStartNumber(newStartNumber);
    setOperation(newOperation);
    setJumpAmount(newJumpAmount);
    setCorrectAnswer(calculatedAnswer);

    const optionsSet = new Set<number>([calculatedAnswer]);
    while (optionsSet.size < NUM_OPTIONS) {
      let incorrectOption =
        calculatedAnswer + Math.floor(Math.random() * 7) - 3;
      incorrectOption = Math.max(
        MIN_NUMBER,
        Math.min(MAX_NUMBER, incorrectOption)
      );
      optionsSet.add(incorrectOption);
    }
    setOptions(shuffle(Array.from(optionsSet)));

    setTimeout(() => setIsAnimating(false), 800);
  }, []);

  useEffect(() => {
    generateNewRound();
  }, [generateNewRound]);

  const handleNumberLineClick = useCallback(
    (selectedNum: number) => {
      if (isAnimating || userSelection !== null) return;

      setUserSelection(selectedNum);
      setIsAnimating(true);

      if (selectedNum === correctAnswer) {
        setFeedbackMessage("🎉 Excellent!");
        setScore((prev) => prev + 10);
      } else {
        setFeedbackMessage(`Not quite! The answer is ${correctAnswer}.`);
      }

      setTimeout(() => {
        generateNewRound();
      }, 2000);
    },
    [isAnimating, userSelection, correctAnswer, generateNewRound]
  );

  // Markers packed into a smaller portion of the container (90% width)
  const getFrogPosition = useCallback((num: number) => {
    const packedWidth = 0.9;
    const positionPercentage =
      (num / MAX_NUMBER) * 100 * packedWidth + (100 * (1 - packedWidth)) / 2;
    return `calc(${positionPercentage}% )`;
  }, []);

  const buttonVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
    }),
    []
  );

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-green-200 text-gray-700 overflow-hidden px-4">
      <ProblemDisplay
        startNumber={startNumber}
        operation={operation}
        jumpAmount={jumpAmount}
      />

      <Container
        classes={{
          container:
            "relative w-full bg-gradient-to-r from-blue-300 to-green-300 h-24 sm:h-32 rounded-full border-4 border-orange-400",
        }}
      >
        <NumberLineMarkers getFrogPosition={getFrogPosition} />
        <FrogCharacter
          getFrogPosition={getFrogPosition}
          startNumber={startNumber}
          correctAnswer={correctAnswer}
          isAnimating={isAnimating}
          feedbackMessage={feedbackMessage}
        />
      </Container>

      <ScoreDisplay score={score} />

      <AnswerOptions
        options={options}
        handleClick={handleNumberLineClick}
        buttonVariants={buttonVariants}
        isAnimating={isAnimating}
        userSelection={userSelection}
        correctAnswer={correctAnswer}
      />

      <FeedbackMessage feedbackMessage={feedbackMessage} />
    </main>
  );
}
