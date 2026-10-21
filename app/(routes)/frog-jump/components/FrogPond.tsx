"use client";
import { motion, useReducedMotion } from "framer-motion";
import FrogArt from "./FrogArt";

const FROGS = [
  { size: "w-20 sm:w-28", lift: -8, delay: 0 },
  { size: "w-28 sm:w-40", lift: -20, delay: 0.35 },
  { size: "w-20 sm:w-28", lift: -8, delay: 0.7 },
];

/** Intro art: three frogs on lily pads, bobbing out of step; the middle one hops. */
export default function FrogPond() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="flex items-end justify-center gap-2 sm:gap-5">
      {FROGS.map(({ size, lift, delay }, idx) => (
        <motion.div
          key={idx}
          className={size}
          animate={reduceMotion ? undefined : { y: [0, lift, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <FrogArt pad className="w-full" />
        </motion.div>
      ))}
    </div>
  );
}
