"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { BubbleFill } from "../constants/config";
import BubbleArt from "./BubbleArt";

const CLUSTER: ReadonlyArray<{
  fill: BubbleFill;
  size: string;
  label?: string;
  lift: string;
}> = [
  { fill: "fill-leaf", size: "w-10 sm:w-14", lift: "mb-10" },
  { fill: "fill-grape", size: "w-16 sm:w-20 text-2xl sm:text-3xl", label: "3", lift: "mb-2" },
  { fill: "fill-sky", size: "w-24 sm:w-32 text-4xl sm:text-5xl", label: "7", lift: "mb-6" },
  { fill: "fill-pink-primary", size: "w-14 sm:w-20 text-2xl sm:text-3xl", label: "5", lift: "mb-0" },
  { fill: "fill-sun", size: "w-9 sm:w-12", lift: "mb-12" },
];

/** Intro art: a cluster of bubbles bobbing out of step. */
export default function BubbleCluster() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="flex items-end justify-center gap-1 sm:gap-2">
      {CLUSTER.map(({ fill, size, label, lift }, idx) => (
        <motion.div
          key={fill}
          className={lift}
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={{
            duration: 2 + idx * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.3,
          }}
        >
          <BubbleArt fill={fill} className={size}>
            {label}
          </BubbleArt>
        </motion.div>
      ))}
    </div>
  );
}
