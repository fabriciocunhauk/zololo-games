"use client";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/app/i18n/LocaleProvider";
import { BUBBLE_POP_TEXT } from "../constants/text";

const TILES = [
  "var(--color-sun)",
  "var(--color-leaf)",
  "var(--color-grape)",
  "var(--color-sky)",
];

function tileStyle(countdown: number) {
  const style: CSSProperties & { "--tile": string; "--depth": string } = {
    "--tile": TILES[countdown % TILES.length],
    "--depth": "14px",
  };
  return style;
}

/** 3-2-1-GO on a big toy block over a paper scrim. */
export default function CountdownOverlay({
  countdown,
}: {
  countdown: number | null;
}) {
  const reduceMotion = useReducedMotion();
  const { go } = BUBBLE_POP_TEXT[useLocale()];
  const label = countdown === null ? "" : countdown > 0 ? countdown : go;

  return (
    <>
      {/* One live region that stays mounted, so each number is announced. */}
      <p aria-live="assertive" className="sr-only">
        {label}
      </p>
      <AnimatePresence>
        {countdown !== null && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-paper/85"
          >
            <motion.p
              key={countdown}
              aria-hidden
              initial={reduceMotion ? false : { scale: 0.4, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 16 }}
              style={tileStyle(countdown)}
              className="toy-block flex h-40 min-w-40 items-center justify-center px-8 font-display text-8xl leading-none sm:h-56 sm:min-w-56 sm:text-9xl"
            >
              {label}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
