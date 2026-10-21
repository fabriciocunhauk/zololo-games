"use client";
import { motion, useReducedMotion } from "framer-motion";
import { FROG_JUMP_CONFIG, type NumberRange } from "../constants/config";
import { getNumberLinePosition } from "../utils/getNumberLinePosition";
import FrogArt from "./FrogArt";

type HoppingFrogProps = {
  line: NumberRange;
  from: number;
  to: number;
};

/** Px above the pads at the top of a hop; longer jumps arc higher. */
const arcHeight = (distance: number) => Math.min(40, 18 + distance * 4);

/**
 * The frog on the number line. When `to` differs from `from` it hops along an
 * arc to the landing pad; with reduced motion it simply appears there.
 */
export default function HoppingFrog({ line, from, to }: HoppingFrogProps) {
  const reduceMotion = useReducedMotion();
  const fromLeft = getNumberLinePosition(from, line);
  const toLeft = getNumberLinePosition(to, line);
  const isHop = from !== to;
  const seconds = FROG_JUMP_CONFIG.hopMs / 1000;

  const initial = reduceMotion
    ? false
    : isHop
      ? { left: fromLeft, y: 0, rotate: 0 }
      : { left: toLeft, opacity: 0, scale: 0.6 };

  const animate = isHop
    ? {
        left: toLeft,
        y: reduceMotion ? 0 : [0, -arcHeight(Math.abs(to - from)), 0],
        rotate: reduceMotion ? 0 : [0, to > from ? 12 : -12, 0],
      }
    : { left: toLeft, opacity: 1, scale: 1 };

  return (
    <motion.div
      // A new key per hop replays the arc from the start pad.
      key={`${from}-${to}`}
      className="pointer-events-none absolute bottom-[calc(100%-0.5rem)] z-10 w-11 sm:w-12"
      style={{ x: "-50%" }}
      initial={initial}
      animate={animate}
      transition={{ duration: isHop ? seconds : 0.3, ease: "easeInOut" }}
    >
      <FrogArt className="w-full drop-shadow-sm" />
    </motion.div>
  );
}
