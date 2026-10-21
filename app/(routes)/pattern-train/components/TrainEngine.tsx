"use client";
import { motion, useReducedMotion } from "framer-motion";
import { classNames } from "@/app/utils/appearance";
import { Coupling, Rail, TRAIN_HEIGHT, Wheel } from "./TrainParts";

const WIDTH = 130;
const INK = "stroke-ink";
const PUFFS = [0, 1, 2];

/** Little puffs of steam rising from the chimney. Still when motion is reduced. */
function Steam() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <g className={classNames(INK, "fill-white")} strokeWidth={2.5}>
        <circle cx={40} cy={10} r={6} />
        <circle cx={52} cy={4} r={4.5} />
      </g>
    );
  }

  return (
    <g className={classNames(INK, "fill-white")} strokeWidth={2.5}>
      {PUFFS.map((idx) => (
        <motion.circle
          key={idx}
          cx={36}
          cy={14}
          r={6}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ opacity: 0 }}
          animate={{
            x: [0, 10, 18],
            y: [0, -10, -18],
            scale: [0.5, 1, 1.3],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeOut",
            delay: idx * 0.6,
          }}
        />
      ))}
    </g>
  );
}

/** Steam engine facing left, with its coupling on the right. Decorative. */
export default function TrainEngine({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${TRAIN_HEIGHT}`}
      aria-hidden
      className={classNames("block w-full overflow-visible", className)}
    >
      <Rail width={WIDTH} />
      <Coupling x={WIDTH - 12} />
      <Steam />

      <g className={INK} strokeWidth={3.5} strokeLinejoin="round">
        {/* Chimney */}
        <path d="M27 52 L29 32 H43 L45 52 Z" className="fill-pink-primary" />
        <rect x={23} y={23} width={26} height={11} rx={4} className="fill-pink-primary" />
        {/* Boiler */}
        <rect x={14} y={50} width={74} height={40} rx={18} className="fill-grape" />
        {/* Dome */}
        <path d="M54 51 A10 10 0 0 1 74 51 Z" className="fill-sun" />
        {/* Cowcatcher */}
        <path d="M2 106 L16 84 H26 V106 Z" className="fill-sun" />
        {/* Cab */}
        <rect x={80} y={28} width={40} height={64} rx={8} className="fill-pink-primary" />
        <rect x={74} y={18} width={52} height={13} rx={6} className="fill-grape" />
        <rect x={89} y={40} width={22} height={20} rx={5} className="fill-sky" strokeWidth={3} />
        {/* Lamp */}
        <circle cx={14} cy={66} r={7} className="fill-sun" strokeWidth={3} />
      </g>

      {/* Boiler bands and shine */}
      <path
        d="M40 53 V87 M62 53 V87"
        className={INK}
        strokeWidth={2.5}
        opacity={0.3}
      />
      <g fill="none" stroke="white" strokeWidth={3} strokeLinecap="round">
        <path d="M24 60 Q34 55 48 55" />
        <path d="M92 44 L96 40" />
      </g>

      {/* Chassis and wheels */}
      <rect x={10} y={88} width={112} height={8} rx={4} className="fill-ink" />
      <Wheel cx={32} />
      <Wheel cx={56} />
      <Wheel cx={98} r={13} />
    </svg>
  );
}
