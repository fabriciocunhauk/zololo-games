"use client";
import { motion, type Variants } from "framer-motion";
import { classNames } from "@/app/utils/appearance";

type AnswerOptionsProps = {
  options: ReadonlyArray<number>;
  onSelect: (option: number) => void;
  disabled: boolean;
  /** When set, the chosen option is ringed green or red against `correctAnswer`. */
  selected?: number | null;
  correctAnswer?: number;
};

const optionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function AnswerOptions({
  options,
  onSelect,
  disabled,
  selected = null,
  correctAnswer,
}: AnswerOptionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-xl">
      {options.map((option, idx) => (
        <motion.button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          variants={optionVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          disabled={disabled}
          className={classNames(
            "relative bg-white text-gray-800 font-display text-2xl sm:text-3xl w-16 sm:w-28 h-20 xl:h-32 rounded-xl shadow-xl border-4 border-pink-primary",
            "flex items-center justify-center cursor-pointer transition-transform duration-200",
            "hover:ring-4 hover:ring-pink-primary/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink",
            idx % 2 === 0 ? "motion-safe:rotate-1" : "motion-safe:-rotate-1",
            disabled && "opacity-50 cursor-not-allowed",
            selected === option &&
              (option === correctAnswer
                ? "ring-4 ring-green-500"
                : "ring-4 ring-red-500")
          )}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}
