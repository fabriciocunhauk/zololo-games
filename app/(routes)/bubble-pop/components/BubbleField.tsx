"use client";
import type { CSSProperties, RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "framer-motion";
import { useBubbleSize } from "../hooks/useBubbleSize";
import type { Bubble } from "../utils/createBubbles";
import BubbleArt from "./BubbleArt";

type BubbleFieldProps = {
  bubbles: ReadonlyArray<Bubble>;
  roundId: number;
  /** The bubble just tapped: it bursts while the rest fade away. */
  poppedId: number | null;
  disabled: boolean;
  onPop: (bubble: Bubble) => void;
  areaRef: RefObject<HTMLDivElement | null>;
};

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

export default function BubbleField({
  bubbles,
  roundId,
  poppedId,
  disabled,
  onPop,
  areaRef,
}: BubbleFieldProps) {
  const size = useBubbleSize();
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={areaRef}
      className="relative h-80 w-full overflow-hidden rounded-3xl border-[3px] border-ink bg-sky/25 shadow-[0_8px_0_var(--color-ink)] sm:h-96 lg:h-[28rem] landscape:h-[clamp(16rem,calc(100svh-25rem),28rem)]"
    >
      <AnimatePresence custom={poppedId}>
        {bubbles.map((bubble, idx) => {
          // Reduced motion: bubbles wait in an evenly spaced row.
          const style: CSSProperties = reduceMotion
            ? {
                width: size,
                height: size,
                left: `${((idx + 0.5) / bubbles.length) * 100}%`,
                top: "50%",
                marginLeft: -size / 2,
                marginTop: -size / 2,
              }
            : {
                width: size,
                height: size,
                left: bubble.x,
                top: "100%",
                marginLeft: -size / 2,
              };

          return (
            <motion.button
              key={`${roundId}-${bubble.id}`}
              type="button"
              aria-label={`Answer ${bubble.value}`}
              disabled={disabled}
              onClick={() => onPop(bubble)}
              style={style}
              custom={poppedId}
              variants={{
                exit: (popped: number | null) =>
                  reduceMotion
                    ? vanish
                    : popped === bubble.id
                      ? burst
                      : fadeAway,
              }}
              initial={reduceMotion ? false : { y: bubble.startY }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: bubble.riseTo,
                      transition: {
                        duration: bubble.duration,
                        ease: "linear",
                        repeat: Infinity,
                        delay: bubble.delay,
                      },
                    }
              }
              exit="exit"
              whileHover={reduceMotion ? undefined : { scale: 1.08 }}
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              className="absolute cursor-pointer select-none rounded-full text-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:cursor-default sm:text-3xl"
            >
              <BubbleArt fill={bubble.fill} className="h-full w-full">
                {bubble.value}
              </BubbleArt>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
