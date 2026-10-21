"use client";
import { motion, useReducedMotion } from "framer-motion";

type MathProblemProps = {
  /** "3 + 4 = ?", or null while counting down. */
  problem: string | null;
  roundId: number;
};

const sumClasses = "font-display text-4xl sm:text-5xl";

/** The question card above the bubbles. */
export default function MathProblem({ problem, roundId }: MathProblemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-1 rounded-3xl border-[3px] border-ink bg-white px-6 py-4 text-center shadow-[0_4px_0_var(--color-ink)]">
      {problem ? (
        <motion.h2
          key={roundId}
          data-testid="math-problem"
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={sumClasses}
        >
          {problem}
        </motion.h2>
      ) : (
        <p aria-hidden className={`${sumClasses} text-ink/25`}>
          ? + ? = ?
        </p>
      )}
      <p className="text-base sm:text-lg">Pop the bubble with the answer!</p>
    </div>
  );
}
