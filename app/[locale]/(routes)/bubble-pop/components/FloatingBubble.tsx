"use client";
import type { CSSProperties } from "react";
import {
  motion,
  useIsPresent,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import { useLocale } from "@/app/i18n/LocaleProvider";
import { classNames } from "@/app/utils/appearance";
import { BUBBLE_POP_TEXT } from "../constants/text";
import type { Bubble } from "../utils/createBubbles";
import BubbleArt from "./BubbleArt";

type FloatingBubbleProps = {
  bubble: Bubble;
  /** Centre from the area's left edge, in px. */
  x: number;
  size: number;
  disabled: boolean;
  onPop: (bubble: Bubble) => void;
};

/** How far above the area a bubble floats before its trip starts again, in px. */
const OVERSHOOT = 30;

const burst: TargetAndTransition = {
  scale: [1, 1.35, 1.6],
  opacity: [1, 1, 0],
  transition: { duration: 0.25, ease: "easeOut" },
};
const fadeAway: TargetAndTransition = {
  opacity: 0,
  scale: 0.8,
  transition: { duration: 0.3 },
};
const vanish: TargetAndTransition = {
  opacity: 0,
  transition: { duration: 0 },
};

/**
 * One number bubble. It rides a track as tall as the area plus its own size,
 * moved up by 100% of that height, so the trip still fits after a resize.
 * Reduced motion: it waits in its column halfway up.
 */
export default function FloatingBubble({
  bubble,
  x,
  size,
  disabled,
  onPop,
}: FloatingBubbleProps) {
  const reduceMotion = useReducedMotion();
  const text = BUBBLE_POP_TEXT[useLocale()];
  // Fading or bursting after the round ended: never tappable again.
  const isLeaving = !useIsPresent();
  const isLocked = disabled || isLeaving;

  const button = (
    // aria-disabled, not disabled: the button keeps keyboard focus.
    <motion.button
      type="button"
      aria-label={text.bubble(bubble.value)}
      aria-disabled={isLocked}
      onClick={() => {
        if (!isLocked) onPop(bubble);
      }}
      style={
        reduceMotion
          ? {
              width: size,
              height: size,
              left: x - size / 2,
              top: "50%",
              marginTop: -size / 2,
            }
          : { width: size, height: size, left: 0, top: bubble.startY }
      }
      variants={{
        // `popped` comes from AnimatePresence, so it is fresh on exit.
        exit: (popped: number | null) =>
          reduceMotion ? vanish : popped === bubble.id ? burst : fadeAway,
      }}
      exit="exit"
      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
      whileTap={reduceMotion ? undefined : { scale: 0.92 }}
      className={classNames(
        "pointer-events-auto absolute cursor-pointer select-none rounded-full text-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink focus-visible:ring-offset-2 sm:text-3xl",
        isLocked && "cursor-default",
        isLeaving && "pointer-events-none"
      )}
    >
      <BubbleArt fill={bubble.fill} className="h-full w-full">
        {bubble.value}
      </BubbleArt>
    </motion.button>
  );

  if (reduceMotion) return button;

  const track: CSSProperties = {
    left: x - size / 2,
    top: "100%",
    width: size,
    height: `calc(100% + ${size + OVERSHOOT}px)`,
  };

  return (
    <motion.div
      style={track}
      initial={{ y: "0%" }}
      animate={{
        y: "-100%",
        transition: {
          duration: bubble.duration,
          ease: "linear",
          repeat: Infinity,
          delay: bubble.delay,
        },
      }}
      className="pointer-events-none absolute"
    >
      {button}
    </motion.div>
  );
}
