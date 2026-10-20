"use client";
import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { classNames } from "@/app/utils/appearance";
import { useBubbleSize } from "../hooks/useBubbleSize";
import type { Bubble } from "../utils/createBubbles";
import MathProblem from "./MathProblem";

type BubbleFieldProps = {
  bubbles: ReadonlyArray<Bubble>;
  problem: string;
  isProcessingClick: boolean;
  onPop: (bubble: Bubble) => void;
  areaRef: RefObject<HTMLDivElement | null>;
};

export default function BubbleField({
  bubbles,
  problem,
  isProcessingClick,
  onPop,
  areaRef,
}: BubbleFieldProps) {
  const bubbleSize = useBubbleSize();

  return (
    <div
      ref={areaRef}
      className="relative w-full h-80 lg:h-[400px] xl:h-[500px] bg-pink-100/50 rounded-2xl shadow-inner border-4 border-pink-300 overflow-hidden"
    >
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.button
            key={bubble.id}
            type="button"
            aria-label={`Answer ${bubble.value}`}
            disabled={isProcessingClick}
            className={classNames(
              "absolute rounded-full flex items-center justify-center cursor-pointer select-none",
              "bg-pink-400 border-2 border-pink-200 text-white font-display",
              "text-xl sm:text-2xl xl:text-3xl shadow-xl hover:shadow-2xl transition-shadow duration-200",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink",
              isProcessingClick && "opacity-50 cursor-not-allowed"
            )}
            style={{
              width: bubbleSize,
              height: bubbleSize,
              left: bubble.x,
              bottom: -50,
            }}
            initial={{ y: bubble.y, opacity: 0, scale: 0.5 }}
            animate={{
              y: bubble.riseTo,
              opacity: 1,
              scale: 1,
              transition: {
                duration: bubble.duration,
                ease: "linear",
                repeat: Infinity,
                delay: bubble.delay,
              },
            }}
            exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.3 } }}
            onClick={() => onPop(bubble)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {bubble.value}
          </motion.button>
        ))}
      </AnimatePresence>

      <MathProblem problem={problem} />
    </div>
  );
}
