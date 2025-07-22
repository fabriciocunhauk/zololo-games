"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "@/app/utils/appearance";
import Container from "@/app/components/Container";

import critterCat from "@/public/images/critters/cat.png";
import critterDog from "@/public/images/critters/dog.png";
import critterBird from "@/public/images/critters/bird.png";
import critterFish from "@/public/images/critters/fish.png";
import critterRabbit from "@/public/images/critters/rabbit.png";
import critterBear from "@/public/images/critters/bear.png";
import critterDuck from "@/public/images/critters/duck.png";
import critterOwl from "@/public/images/critters/owl.png";

const critterImages = [
  critterCat,
  critterDog,
  critterBird,
  critterFish,
  critterRabbit,
  critterBear,
  critterDuck,
  critterOwl,
];

function shuffle<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomCritterImages(count: number): typeof critterImages {
  const arr: typeof critterImages = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * critterImages.length);
    arr.push(critterImages[idx]);
  }
  return arr;
}

export default function CountTheCrittersGame() {
  const [critterImagesForRound, setCritterImagesForRound] = useState<
    typeof critterImages
  >([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState(0);

  const generateNewRound = useCallback(() => {
    setIsAnimating(true);

    const count = Math.floor(Math.random() * 6) + 3;
    setCorrectAnswer(count);

    const critters = getRandomCritterImages(count);
    setCritterImagesForRound(critters);

    const newOptions = new Set<number>();
    newOptions.add(count);

    while (newOptions.size < 4) {
      let incorrectOption;
      do {
        incorrectOption = Math.floor(Math.random() * 10) + 1;
      } while (newOptions.has(incorrectOption) || incorrectOption === count);
      newOptions.add(incorrectOption);
    }

    setOptions(shuffle(Array.from(newOptions)));
    setFeedbackMessage(null);

    setTimeout(() => setIsAnimating(false), 500);
  }, []);

  useEffect(() => {
    generateNewRound();
  }, [generateNewRound]);

  const handleOptionClick = useCallback(
    (selectedNumber: number) => {
      if (isAnimating || feedbackMessage) return;

      setIsAnimating(true);

      if (selectedNumber === correctAnswer) {
        setFeedbackMessage("🎉 Great job!");
        setScore((prevScore) => prevScore + 10);
      } else {
        setFeedbackMessage("Oops! Try again.");
      }

      setTimeout(() => {
        generateNewRound();
      }, 1500);
    },
    [isAnimating, correctAnswer, feedbackMessage, generateNewRound]
  );

  const crittersToDisplay = useMemo(() => {
    return critterImagesForRound.map((img, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.5, rotate: Math.random() * 6 - 3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.5, rotate: Math.random() * 6 - 3 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="relative flex items-center justify-center p-0.5 sm:p-1 w-full aspect-square"
        style={{
          maxWidth: "56px",
          maxHeight: "56px",
        }}
      >
        <Image
          src={img}
          alt={`Critter ${index + 1}`}
          fill
          sizes="(max-width: 400px) 44px, (max-width: 640px) 56px, (max-width: 768px) 70px, (max-width: 1024px) 90px, 110px"
          className="object-contain drop-shadow-md"
          priority
        />
      </motion.div>
    ));
  }, [critterImagesForRound]);

  const critterGridCols = useMemo(() => {
    if (correctAnswer <= 4) return "grid-cols-2";
    if (correctAnswer <= 6) return "grid-cols-3";
    return "grid-cols-3 sm:grid-cols-4";
  }, [correctAnswer]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 bg-blue-200 text-gray-700">
      {/* Critters Display Area */}
      <Container
        classes={{
          container: classNames(
            "grid place-items-center p-1 sm:p-3 gap-1 sm:gap-2 md:gap-3 w-full min-h-40 sm:h-60",
            critterGridCols,
            "bg-blue-50/70 rounded-2xl shadow-inner"
          ),
        }}
        size="sm"
      >
        <AnimatePresence mode="wait">{crittersToDisplay}</AnimatePresence>
      </Container>

      <div className="flex flex-col sm:flex-row items-center gap-8 py-4">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">
          How many critters do you see?
        </p>
        <div className="text-xl sm:text-2xl font-bold flex items-center gap-4">
          Score:{" "}
          <span className="text-4xl sm:text-5xl md:text-6xl text-pink-400 -rotate-2">
            {score}
          </span>
        </div>
      </div>

      {/* Answer Options */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-xs sm:max-w-xl">
        {options.map((option, idx) => (
          <motion.button
            key={option}
            onClick={() => handleOptionClick(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50, rotate: idx % 2 === 0 ? 1 : -1 }}
            animate={{ opacity: 1, y: 0, rotate: idx % 2 === 0 ? 1 : -1 }}
            disabled={isAnimating}
            className={classNames(
              "relative bg-white text-gray-800 font-extrabold text-lg xs:text-xl sm:text-2xl",
              "w-14 h-16 xl:w-28 xl:h-32 rounded-xl shadow-xl border-4 border-pink-primary",
              "flex items-center justify-center cursor-pointer transition-transform duration-200",
              "hover:scale-105 hover:ring-4 hover:ring-pink-primary/40",
              isAnimating ? "opacity-50 cursor-not-allowed" : "",
              idx % 2 === 0 ? "rotate-1" : "-rotate-1"
            )}
            style={{
              minWidth: "56px",
              minHeight: "64px",
              fontSize: "1.25rem",
              padding: "0.25rem",
            }}
          >
            {option}
          </motion.button>
        ))}
      </div>
      {/* Feedback Message */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={classNames(
              "mt-4 sm:mt-8 p-2 sm:p-3 rounded-xl text-base sm:text-xl md:text-2xl font-bold shadow-lg text-center",
              feedbackMessage && feedbackMessage.includes("Great")
                ? "bg-green-200 text-green-800 border-4 border-green-400"
                : "bg-red-200 text-red-800 border-4 border-red-400"
            )}
          >
            {feedbackMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
