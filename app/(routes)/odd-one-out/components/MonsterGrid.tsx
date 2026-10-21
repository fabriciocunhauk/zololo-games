"use client";
import { motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import type { CSSProperties } from "react";
import type { Monster } from "@/app/components/monsters/monsters";
import MonsterArt from "@/app/components/monsters/MonsterArt";
import { classNames } from "@/app/utils/appearance";
import type { RoundOutcome } from "../hooks/useOddOneOutGame";
import { monsterLook } from "../utils/makeOddOneOut";

type MonsterGridProps = {
  tiles: ReadonlyArray<Monster>;
  oddIndex: number;
  /** Tiles tapped by mistake this round. */
  wrongTaps: ReadonlyArray<number>;
  outcome: RoundOutcome;
  onTap: (position: number) => void;
};

const tileStyle: CSSProperties & { "--tile": string; "--depth": string } = {
  "--tile": "white",
  "--depth": "6px",
};

/** Columns and width so even the biggest grid fits a 375px phone. */
function layout(count: number) {
  if (count <= 4) return { columns: 2, width: "max-w-[17rem] sm:max-w-xs" };
  if (count <= 9) return { columns: 3, width: "max-w-sm sm:max-w-md" };
  return { columns: 4, width: "max-w-sm sm:max-w-lg" };
}

const bounce: TargetAndTransition = {
  y: [0, -16, 0, -8, 0],
  scale: [1, 1.08, 1, 1.04, 1],
  transition: { duration: 0.9, ease: "easeOut" },
};

const wiggle: TargetAndTransition = {
  x: [0, -8, 8, -6, 6, -3, 0],
  transition: { duration: 0.5 },
};

const pulse: TargetAndTransition = {
  scale: [1, 1.06, 1],
  transition: { duration: 0.8, repeat: 2 },
};

/** The grid of look-alike monsters. Names never give the answer away. */
export default function MonsterGrid({
  tiles,
  oddIndex,
  wrongTaps,
  outcome,
  onTap,
}: MonsterGridProps) {
  const reduceMotion = useReducedMotion();
  const { columns, width } = layout(tiles.length);
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };

  const motionFor = (idx: number): TargetAndTransition | undefined => {
    if (reduceMotion) return undefined;
    if (idx === oddIndex && outcome === "spotted") return bounce;
    if (idx === oddIndex && outcome === "revealed") return pulse;
    if (wrongTaps.includes(idx)) return wiggle;
    return undefined;
  };

  return (
    <div
      role="group"
      aria-label="Monsters"
      style={gridStyle}
      className={classNames("grid w-full gap-3 sm:gap-4", width)}
    >
      {tiles.map((monster, idx) => {
        const isOdd = idx === oddIndex;
        const isWrong = wrongTaps.includes(idx);
        const isShown = isOdd && outcome !== null;
        const isOver = outcome !== null;
        return (
          <motion.button
            key={idx}
            type="button"
            data-testid="monster-tile"
            data-look={monsterLook(monster)}
            aria-label={`Monster ${idx + 1}`}
            onClick={() => onTap(idx)}
            disabled={isWrong || isOver}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, ...motionFor(idx) }}
            transition={{ duration: 0.25, delay: reduceMotion ? 0 : idx * 0.03 }}
            style={tileStyle}
            className={classNames(
              "toy-block flex aspect-square min-h-12 items-center justify-center p-1.5 sm:p-2.5",
              (isWrong || isOver) && "pointer-events-none",
              isWrong && "opacity-50 ring-[5px] ring-pink-primary ring-offset-2",
              isOver && !isShown && !isWrong && "opacity-60",
              isShown && "ring-[6px] ring-leaf ring-offset-2"
            )}
          >
            <MonsterArt monster={monster} className="h-full w-full" />
          </motion.button>
        );
      })}
    </div>
  );
}
