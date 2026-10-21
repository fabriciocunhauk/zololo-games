"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";
import MonsterArt from "@/app/components/monsters/MonsterArt";

const twin = MONSTERS[0];
const PARADE: ReadonlyArray<Monster> = [
  twin,
  twin,
  { ...twin, color: "sky" },
  twin,
];

/** Intro art: four look-alike monsters bobbing, one in a different colour. */
export default function OddParade() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="flex items-end justify-center gap-2 sm:gap-4">
      {PARADE.map((monster, idx) => (
        <motion.div
          key={idx}
          className="w-16 sm:w-24"
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.2,
          }}
        >
          <MonsterArt monster={monster} className="w-full" />
        </motion.div>
      ))}
    </div>
  );
}
