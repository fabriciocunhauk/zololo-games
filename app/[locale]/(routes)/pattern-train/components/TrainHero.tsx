"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MONSTERS } from "@/app/components/monsters/monsters";
import TrainCarriage from "./TrainCarriage";
import TrainEngine from "./TrainEngine";

const [pip, bop] = MONSTERS;
const RIDERS = [pip, bop, pip, null];

/** Intro art: a little train with an AB pattern and a "?" at the back, bobbing along. */
export default function TrainHero() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="flex items-end justify-center"
      animate={reduceMotion ? undefined : { y: [0, -5, 0], rotate: [0, -1, 0, 1, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-[5.2rem] sm:w-[6.5rem]">
        <TrainEngine />
      </div>
      {RIDERS.map((monster, idx) => (
        <TrainCarriage
          key={idx}
          monster={monster}
          gap={monster === null}
          className="w-16 sm:w-20"
        />
      ))}
    </motion.div>
  );
}
