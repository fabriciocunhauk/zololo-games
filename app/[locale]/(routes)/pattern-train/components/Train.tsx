"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Monster } from "@/app/components/monsters/monsters";
import TrainCarriage from "./TrainCarriage";
import TrainEngine from "./TrainEngine";

type TrainProps = {
  /** Front to back. `null` is the missing carriage. */
  carriages: ReadonlyArray<Monster | null>;
  /** Who belongs in the gap, shown once `solved`. */
  answer: Monster;
  solved: boolean;
};

/** Engine is 1.3× a carriage wide, so both draw at the same scale. */
const ENGINE_SIZE = "w-[4.55rem] sm:w-[6.5rem]";
const CARRIAGE_SIZE = "w-14 sm:w-20";

/**
 * The engine and its carriages. Long trains wrap onto a second track on
 * small screens; each piece carries its own stretch of rail.
 */
export function Train({ carriages, answer, solved }: TrainProps) {
  return (
    <ol
      aria-label="The pattern train"
      className="flex flex-wrap items-end justify-center gap-y-4"
    >
      <li aria-hidden className={ENGINE_SIZE}>
        <TrainEngine />
      </li>
      {carriages.map((monster, idx) =>
        monster === null ? (
          <li key={idx} data-testid="gap" className={CARRIAGE_SIZE}>
            <span className="sr-only">
              {solved ? answer.name : "Empty carriage"}
            </span>
            <TrainCarriage monster={solved ? answer : null} gap />
          </li>
        ) : (
          <li key={idx} data-testid="carriage" className={CARRIAGE_SIZE}>
            <span className="sr-only">{monster.name}</span>
            <TrainCarriage monster={monster} />
          </li>
        )
      )}
    </ol>
  );
}

type TrainStationProps = TrainProps & {
  trainId: number;
  /** Called with `trainId` once that train has pulled in. */
  onArrive: (trainId: number) => void;
};

/**
 * The track the trains run on. A new `trainId` sends the old train chuffing
 * off to the left before the next one pulls in from the right.
 */
export default function TrainStation({
  trainId,
  onArrive,
  ...train
}: TrainStationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-44 w-full items-center justify-center overflow-hidden rounded-3xl border-[3px] border-ink bg-sky/30 px-2 pt-6 pb-4 shadow-[0_8px_0_var(--color-ink)] sm:min-h-52 sm:px-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={trainId}
          className="w-full"
          initial={reduceMotion ? false : { x: "110%" }}
          animate={{ x: 0 }}
          exit={
            reduceMotion
              ? undefined
              : { x: "-110%", transition: { duration: 0.8, ease: "easeIn" } }
          }
          transition={{ duration: 0.9, ease: "easeOut" }}
          // Also fires as an old train leaves; its stale id is ignored.
          onAnimationComplete={() => onArrive(trainId)}
        >
          <Train {...train} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
