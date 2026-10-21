"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { Monster } from "@/app/components/monsters/monsters";
import MonsterArt from "@/app/components/monsters/MonsterArt";
import { classNames } from "@/app/utils/appearance";
import { Coupling, Rail, TRAIN_HEIGHT, Wheel } from "./TrainParts";

const WIDTH = 100;

type TrainCarriageProps = {
  /** Who is riding. `null` leaves the seat empty. */
  monster: Monster | null;
  /** The missing carriage: a "?" until its monster pops in. */
  gap?: boolean;
  className?: string;
};

/** The open wagon, drawn in front of its rider so the monster sits inside. */
function Wagon({ highlight }: { highlight: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${TRAIN_HEIGHT}`}
      aria-hidden
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      <Rail width={WIDTH} />
      <Coupling x={0} />
      <Wheel cx={28} />
      <Wheel cx={76} />
      <rect
        x={10}
        y={62}
        width={84}
        height={34}
        rx={9}
        strokeWidth={3.5}
        className="fill-paper stroke-ink"
      />
      <path
        d="M14 79 H90"
        className="stroke-ink"
        strokeWidth={2}
        opacity={0.2}
      />
      <rect
        x={6}
        y={56}
        width={92}
        height={11}
        rx={5.5}
        strokeWidth={3.5}
        className={classNames(
          "stroke-ink",
          highlight ? "fill-sun" : "fill-grape"
        )}
      />
      <path
        d="M13 60 H38"
        stroke="white"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** One carriage with a monster riding in it, or the "?" gap. Decorative. */
export default function TrainCarriage({
  monster,
  gap = false,
  className,
}: TrainCarriageProps) {
  const reduceMotion = useReducedMotion();
  const rider = monster && (
    <MonsterArt monster={monster} className="w-full" />
  );

  return (
    <div
      aria-hidden
      className={classNames("relative aspect-[5/6]", className)}
    >
      <div className="absolute top-[-6%] left-[10%] w-[80%]">
        {gap && monster ? (
          <motion.div
            key={monster.name}
            initial={reduceMotion ? false : { scale: 0, y: -24 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 14 }}
          >
            {rider}
          </motion.div>
        ) : (
          rider
        )}
      </div>
      {gap && !monster && (
        <span className="absolute top-[4%] left-[22%] flex aspect-square w-[56%] items-center justify-center rounded-full border-[3px] border-dashed border-ink bg-white font-display text-xl sm:text-3xl motion-safe:animate-pulse">
          ?
        </span>
      )}
      <Wagon highlight={gap} />
    </div>
  );
}
