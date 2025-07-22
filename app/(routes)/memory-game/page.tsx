"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Container from "@/app/components/Container";
import Image, { StaticImageData } from "next/image";
import bandit from "@/public/images/memory-game/bandit.png";
import bingoInSpace from "@/public/images/memory-game/bingo-in-space.png";
import bingo from "@/public/images/memory-game/bingo.png";
import blueyBingoFamily from "@/public/images/memory-game/bluey-bingo-family.avif";
import blueyBingoWrestling from "@/public/images/memory-game/bluey-bingo-wrestling.png";
import blueyFamulyHousePorch from "@/public/images/memory-game/bluey-family-house-porch.jpeg";
import bluey from "@/public/images/memory-game/bluey.jpg";
import chloe from "@/public/images/memory-game/chloe.webp";
import coco from "@/public/images/memory-game/coco.webp";
import dougie from "@/public/images/memory-game/dougie.jpg";
import indy from "@/public/images/memory-game/indy.webp";
import mackenzie from "@/public/images/memory-game/mackenzie.webp";
import missy from "@/public/images/memory-game/missy.webp";
import muffin from "@/public/images/memory-game/muffin.webp";
import playnNailPolish from "@/public/images/memory-game/playng-nail-polish.png";
import queenMumy from "@/public/images/memory-game/queen-mummy.png";
import rusty from "@/public/images/memory-game/rusty.webp";
import snickers from "@/public/images/memory-game/snickers.webp";
import socks from "@/public/images/memory-game/socks.webp";
import winton from "@/public/images/memory-game/winton.webp";
import { classNames } from "@/app/utils/appearance";

interface CardType {
  id: number;
  image: StaticImageData;
  matched: boolean;
}

const cardImages: StaticImageData[] = [
  bandit,
  bingoInSpace,
  bingo,
  blueyBingoFamily,
  blueyBingoWrestling,
  blueyFamulyHousePorch,
  bluey,
  chloe,
  coco,
  dougie,
  indy,
  mackenzie,
  missy,
  muffin,
  playnNailPolish,
  queenMumy,
  rusty,
  snickers,
  socks,
  winton,
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
  const numUnique = 2 + (level - 1) * 2;
  const numUniqueSafe = Math.min(numUnique, cardImages.length);
  const uniqueImages = shuffle(cardImages).slice(0, numUniqueSafe);
  const deck = uniqueImages
    .concat(uniqueImages)
    .map((img, idx) => ({ id: idx, image: img, matched: false }));
  return shuffle(deck);
}

const GameStatsPanel: React.FC<{
  level: number;
  score: number;
  moves: number;
  onReset: () => void;
}> = ({ level, score, moves, onReset }) => (
  <div className="flex flex-row lg:flex-col gap-4 sm:gap-8 items-center justify-center order-2 lg:order-1">
    <div className="text-base sm:text-2xl font-bold flex flex-col items-center">
      Level
      <span className="text-4xl sm:text-5xl xl:text-6xl text-green-400">
        {level}
      </span>
    </div>
    <div className="text-base sm:text-2xl font-bold flex flex-col items-center">
      Score
      <span className="text-4xl sm:text-5xl xl:text-6xl text-pink-400 -rotate-12">
        {score}
      </span>
    </div>
    <div className="text-base sm:text-2xl font-bold flex flex-col items-center">
      Moves
      <span className="text-4xl sm:text-5xl xl:text-6xl text-yellow-400 rotate-12">
        {moves}
      </span>
    </div>
    <button
      className="bg-pink-primary text-white px-4 py-2 rounded-lg shadow hover:bg-pink-400 transition text-sm sm:text-base"
      onClick={onReset}
    >
      Reset Game
    </button>
  </div>
);

const MemoryCard: React.FC<{
  card: CardType;
  idx: number;
  isFlipped: boolean;
  onClick: (idx: number) => void;
  aspectRatio: string;
}> = ({ card, idx, isFlipped, onClick, aspectRatio }) => (
  <motion.div
    key={card.id + "-" + idx}
    className={classNames(
      "w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] p-1 flex items-center justify-center cursor-pointer bg-white border-2 sm:border-4 border-pink-primary relative transition-transform duration-200 shadow-md sm:shadow-xl",
      isFlipped &&
        "hover:scale-105 hover:ring-2 sm:hover:ring-4 hover:ring-pink-primary/40",
      aspectRatio
    )}
    onClick={() => onClick(idx)}
    tabIndex={0}
    initial={false}
    animate={{ rotateY: isFlipped ? 180 : 0 }}
    transition={{ duration: 0.1 }}
    style={{ perspective: 1000, transformStyle: "preserve-3d" }}
  >
    <div className=" w-full h-full" style={{ transformStyle: "preserve-3d" }}>
      {/* Front (image) */}

      <Image
        className="object-cover h-full w-full absolute inset-0"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
        src={card.image}
        alt="Card"
      />

      {/* Back (question mark) */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center bg-pink-primary rounded text-white text-2xl sm:text-3xl font-bold select-none"
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

export default function MemoryCardsGame() {
  const [level, setLevel] = useState<number | null>(null);
  const [deck, setDeck] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Set initial level
  useEffect(() => {
    if (level === null) setLevel(1);
  }, [level]);

  // Reset deck and state on level change
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

  // Check for win condition
  useEffect(() => {
    if (!gameWon && matched.length === deck.length && deck.length > 0) {
      setGameWon(true);
      setTimeout(() => {
        if (level !== null) {
          setLevel((prev) => (prev === null ? 1 : Math.min(prev + 1, 10)));
        }
      }, 1000);
    }
  }, [matched, deck, level, gameWon]);

  const handleCardClick = useCallback(
    (idx: number) => {
      if (isBusy || flipped.includes(idx) || matched.includes(idx)) return;
      if (flipped.length === 2) return;
      if (flipped.length === 0) {
        setFlipped([idx]);
      } else if (flipped.length === 1) {
        setFlipped([flipped[0], idx]);
        setIsBusy(true);
        setMoves((m) => m + 1);
        const firstIdx = flipped[0];
        const secondIdx = idx;
        if (deck[firstIdx].image.src === deck[secondIdx].image.src) {
          setTimeout(() => {
            setMatched((prev) => [...prev, firstIdx, secondIdx]);
            setScore((s) => s + 10);
            setFlipped([]);
            setIsBusy(false);
          }, 800);
        } else {
          setTimeout(() => {
            setFlipped([]);
            setIsBusy(false);
          }, 1200);
        }
      }
    },
    [isBusy, flipped, matched, deck]
  );

  const handleReset = useCallback(() => {
    if (level !== null) {
      setDeck(createShuffledDeck(level));
    }
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setMoves(0);
    setGameWon(false);
    setIsBusy(false);
  }, [level]);

  // Memoized grid columns and aspect ratio
  const gridColumns = useMemo(() => {
    const cardsPerRow = Math.ceil(Math.sqrt(deck.length));
    if (cardsPerRow <= 2) {
      return "grid-cols-2 sm:grid-cols-4";
    } else if (cardsPerRow <= 4) {
      return "grid-cols-3 sm:grid-cols-4";
    } else {
      return "grid-cols-4 sm:grid-cols-5 md:grid-cols-6";
    }
  }, [deck.length]);

  const aspectRatio = useMemo(() => {
    const cardsPerRow = Math.ceil(Math.sqrt(deck.length));
    if (cardsPerRow <= 2) {
      return "aspect-[4/4]";
    } else if (cardsPerRow <= 4) {
      return "aspect-[6/4]";
    } else {
      return "aspect-[4/4]";
    }
  }, [deck.length]);

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

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 gap-4 sm:gap-8">
      {/* Game stats panel */}
      <GameStatsPanel
        level={level}
        score={score}
        moves={moves}
        onReset={handleReset}
      />

      {/* Game board */}
      <div className="order-1 lg:order-2 w-full max-w-6xl">
        <Container
          classes={{
            container: classNames("grid gap-3 sm:gap-4 md:gap-6", gridColumns),
          }}
        >
          {gameWon ? (
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 animate-bounce col-span-full text-center py-8">
              You won! 🎉 Leveling up...
            </div>
          ) : (
            deck.map((card, idx) => {
              const isFlipped = flipped.includes(idx) || matched.includes(idx);
              return (
                <MemoryCard
                  key={card.id + "-" + idx}
                  card={card}
                  idx={idx}
                  isFlipped={isFlipped}
                  onClick={handleCardClick}
                  aspectRatio={aspectRatio}
                />
              );
            })
          )}
        </Container>
      </div>
    </main>
  );
}
