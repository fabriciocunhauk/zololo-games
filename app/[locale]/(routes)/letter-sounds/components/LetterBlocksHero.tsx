"use client";
import { motion, useReducedMotion } from "framer-motion";
import LetterBlock from "./LetterBlock";

const PIECES = [
  { kind: "emoji", value: "🍎" },
  { kind: "block", value: "A", tile: "var(--color-tangerine)" },
  { kind: "block", value: "b", tile: "var(--color-sky)" },
  { kind: "block", value: "c", tile: "var(--color-leaf)" },
  { kind: "emoji", value: "🐱" },
] as const;

/** Intro art: letter blocks and pictures bobbing out of step. */
export default function LetterBlocksHero() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="flex items-end justify-center gap-2 sm:gap-4">
      {PIECES.map((piece, idx) => (
        <motion.div
          key={piece.value}
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.2,
          }}
        >
          {piece.kind === "block" ? (
            <LetterBlock
              letter={piece.value}
              tile={piece.tile}
              depth="8px"
              className="h-16 w-16 text-4xl sm:h-24 sm:w-24 sm:text-6xl"
            />
          ) : (
            <span className="block text-4xl sm:text-6xl">{piece.value}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
