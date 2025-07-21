"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/app/components/Container";
import Image, { StaticImageData } from "next/image";
import blueyBingo from "@/public/images/bluey-bingo.jpg";
import bluey from "@/public/images/bluey.jpg";
import bingo from "@/public/images/bingo.png";
import bingoInSpace from "@/public/images/bingo-in-space.png";
import dougie from "@/public/images/dougie.jpg";
import queenMumy from "@/public/images/queen-mummy.webp";
import blueyFamily from "@/public/images/bluey-bingo-family.avif";
import blueyColage from "@/public/images/bluey-colage.png";
import blueyDancing from "@/public/images/bluey-dancing.png";
import blueyBingoWrestling from "@/public/images/bluey-bingo-wrestling.png";
import blueyFamulyHousePorch from "@/public/images/bluey-family-house-porch.jpeg";
import blueyBingoFamily from "@/public/images/bluey-bingo-family.avif";
import { classNames } from "@/app/utils/appearance";

interface CardType {
  id: number;
  image: StaticImageData;
  matched: boolean;
}

// Add more placeholder images to support up to 22 unique images for level 10
const cardImages: StaticImageData[] = [
  blueyBingoFamily,
  bluey,
  blueyBingo,
  bingo,
  bingoInSpace,
  dougie,
  queenMumy,
  blueyFamily,
  blueyColage,
  blueyDancing,
  blueyBingoWrestling,
  blueyFamulyHousePorch,
];

function shuffle<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createShuffledDeck(level: number): CardType[] {
  // Level 1: 2 unique images (4 cards), Level 2: 4 unique (8 cards), Level 3: 6 unique (12 cards), Level 4: 7 unique (14 cards), etc.
  const maxUnique = cardImages.length;
  let numUnique;
  if (level <= 3) {
    numUnique = 2 + (level - 1) * 2;
  } else {
    numUnique = 6 + (level - 3); // Level 4: 7, Level 5: 8, ...
  }
  numUnique = Math.min(numUnique, maxUnique); // Cap at available images
  const uniqueImages = shuffle(cardImages).slice(0, numUnique);
  const deck = uniqueImages
    .concat(uniqueImages)
    .map((img, idx) => ({ id: idx, image: img, matched: false }));
  return shuffle(deck);
}

export default function MemoryCardsGame() {
  const [level, setLevel] = useState<number | null>(null);
  const [deck, setDeck] = useState<CardType[]>([]); // Start with empty deck
  const [flipped, setFlipped] = useState<number[]>([]); // array of card idx
  const [matched, setMatched] = useState<number[]>([]); // array of card idx
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Set initial level on client only
  useEffect(() => {
    if (level === null) {
      setLevel(1);
    }
  }, [level]);

  // Only shuffle deck and reset game state on client when level is set or changes
  useEffect(() => {
    if (level !== null) {
      setDeck(createShuffledDeck(level));
      setFlipped([]);
      setMatched([]);
      setScore(0);
      setMoves(0);
      setGameWon(false);
      setIsBusy(false);
    }
  }, [level]);

  useEffect(() => {
    if (!gameWon && matched.length === deck.length && deck.length > 0) {
      setGameWon(true);
      setTimeout(() => {
        if (level !== null) {
          setLevel((prev) => {
            if (prev === null) return 1;
            return Math.min(prev + 1, 10); // Max level 10
          });
        }
      }, 1000);
    }
  }, [matched, deck, level, gameWon]);

  function handleCardClick(idx: number) {
    if (isBusy || flipped.includes(idx) || matched.includes(idx)) return;
    if (flipped.length === 2) return; // Only allow 2 cards open at a time
    if (flipped.length === 0) {
      setFlipped([idx]);
    } else if (flipped.length === 1) {
      setFlipped([flipped[0], idx]);
      setIsBusy(true);
      setMoves((m) => m + 1);
      const firstIdx = flipped[0];
      const secondIdx = idx;
      if (deck[firstIdx].image.src === deck[secondIdx].image.src) {
        // Match!
        setTimeout(() => {
          setMatched((prev) => [...prev, firstIdx, secondIdx]);
          setScore((s) => s + 10);
          setFlipped([]);
          setIsBusy(false);
        }, 800);
      } else {
        // Not a match
        setTimeout(() => {
          setFlipped([]);
          setIsBusy(false);
        }, 1200);
      }
    }
  }

  function handleReset() {
    if (level !== null) {
      setDeck(createShuffledDeck(level));
    }
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setMoves(0);
    setGameWon(false);
    setIsBusy(false);
  }

  if (level === null || deck.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-primary mb-4 drop-shadow-lg text-center">
          Memory Cards
        </h1>
        <div className="text-lg font-bold text-gray-700">Loading...</div>
      </main>
    );
  }
  console.log(level);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-pink-primary mb-4 drop-shadow-lg text-center">
        Memory Cards
      </h1>
      <div className="flex gap-8 mb-6 items-center">
        <span className="text-lg font-bold text-gray-700">Score: {score}</span>
        <span className="text-lg font-bold text-gray-700">Moves: {moves}</span>
        <span className="text-lg font-bold text-blue-700">Level: {level}</span>
        <button
          className="bg-pink-primary text-white px-4 py-2 rounded-lg shadow hover:bg-pink-400 transition"
          onClick={handleReset}
        >
          Reset Game
        </button>
      </div>
      {gameWon && (
        <div className="mb-6 text-2xl font-bold text-green-600 animate-bounce">
          You won! 🎉 Leveling up...
        </div>
      )}
      <Container
        classes={{
          container: classNames(
            "grid grid-cols-2 gap-6 z-20",
            level >= 4 ? "grid-cols-6" : "sm:grid-cols-4"
          ),
        }}
      >
        {deck.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <motion.div
              key={card.id + "-" + idx}
              className={
                "w-32 h-40 p-1 flex items-center justify-center cursor-pointer bg-white border-4 border-pink-primary relative transition-transform duration-200 shadow-xl " +
                (isFlipped
                  ? ""
                  : " hover:scale-105 hover:ring-4 hover:ring-pink-primary/40")
              }
              onClick={() => handleCardClick(idx)}
              tabIndex={0}
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.1 }}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            >
              <div
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front (image) */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    className="object-cover h-full w-full rounded"
                    src={card.image.src}
                    width={card.image.width}
                    height={card.image.height}
                    alt="Card"
                  />
                </div>
                {/* Back (question mark) */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-pink-primary rounded text-white text-3xl font-bold select-none"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(0deg)",
                  }}
                >
                  ?
                </div>
              </div>
            </motion.div>
          );
        })}
      </Container>
    </main>
  );
}
