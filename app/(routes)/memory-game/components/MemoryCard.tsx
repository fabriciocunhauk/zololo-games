"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { Monster } from "../constants/monsters";
import type { CardState } from "../hooks/useMemoryGame";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

type MemoryCardProps = {
  monster: Monster;
  position: number;
  state: CardState;
  onFlip: () => void;
};

const faceClasses =
  "absolute inset-0 rounded-2xl shadow-[0_5px_0_var(--color-ink)] [backface-visibility:hidden]";

export default function MemoryCard({
  monster,
  position,
  state,
  onFlip,
}: MemoryCardProps) {
  const reduceMotion = useReducedMotion();
  const isFaceUp = state !== "down";

  return (
    <motion.button
      type="button"
      data-state={state}
      aria-label={isFaceUp ? monster.name : `Card ${position}, face down`}
      onClick={onFlip}
      className="relative aspect-square w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] cursor-pointer rounded-2xl [transform-style:preserve-3d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      style={{ transformPerspective: 800 }}
      initial={false}
      animate={{ rotateY: isFaceUp ? 180 : 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 260, damping: 22 }
      }
      whileHover={!isFaceUp && !reduceMotion ? { y: -4 } : undefined}
      whileTap={!isFaceUp && !reduceMotion ? { scale: 0.95 } : undefined}
    >
      <span className={faceClasses}>
        <CardBack />
      </span>
      <span className={`${faceClasses} [transform:rotateY(180deg)]`}>
        <CardFront monster={monster} isMatched={state === "matched"} />
      </span>
    </motion.button>
  );
}
