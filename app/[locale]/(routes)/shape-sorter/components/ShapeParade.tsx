"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ShapeColour, ShapeKind } from "../constants/shapes";
import ShapeArt from "./ShapeArt";

const PARADE: ReadonlyArray<{
  kind: ShapeKind;
  colour: ShapeColour;
  rotation: number;
}> = [
  { kind: "circle", colour: "sun", rotation: 0 },
  { kind: "triangle", colour: "pink-primary", rotation: -15 },
  { kind: "hexagon", colour: "grape", rotation: 0 },
  { kind: "square", colour: "sky", rotation: 15 },
  { kind: "pentagon", colour: "leaf", rotation: 0 },
];

/** A row of shapes bobbing out of step, to set the scene on the intro. */
export default function ShapeParade() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="flex items-end justify-center gap-2 sm:gap-4">
      {PARADE.map((shape, idx) => (
        <motion.div
          key={shape.kind}
          className={idx === 2 ? "w-20 sm:w-28" : "w-14 sm:w-20"}
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.2,
          }}
        >
          <ShapeArt {...shape} />
        </motion.div>
      ))}
    </div>
  );
}
