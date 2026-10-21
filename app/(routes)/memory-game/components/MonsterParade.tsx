"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MONSTERS } from "@/app/components/monsters/monsters";
import MonsterArt from "@/app/components/monsters/MonsterArt";

const PARADE = [
  MONSTERS[3],
  MONSTERS[0],
  MONSTERS[2],
  MONSTERS[9],
  MONSTERS[5],
];

/** A row of monsters bobbing out of step, to set the scene on the intro. */
export default function MonsterParade() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="flex items-end justify-center gap-1 sm:gap-3">
      {PARADE.map((monster, idx) => (
        <motion.div
          key={monster.name}
          className={idx === 2 ? "w-20 sm:w-28" : "w-14 sm:w-20"}
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
