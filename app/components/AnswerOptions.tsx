"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { classNames } from "@/app/utils/appearance";

type AnswerOptionsProps<T> = {
  options: ReadonlyArray<T>;
  onSelect: (option: T) => void;
  disabled: boolean;
  /** When set, the chosen option is ringed green or red against `correctAnswer`. */
  selected?: T | null;
  correctAnswer?: T;
  /** Identity for keys and comparison. Defaults to `String(option)`. */
  optionKey?: (option: T) => string;
  /** Accessible name. Defaults to the key. */
  optionLabel?: (option: T) => string;
  /** Tile content. Defaults to the key. */
  renderOption?: (option: T) => ReactNode;
};

const optionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const tileStyle: CSSProperties & { "--tile": string; "--depth": string } = {
  "--tile": "white",
  "--depth": "6px",
};

/** A row of chunky answer tiles. */
export default function AnswerOptions<T>({
  options,
  onSelect,
  disabled,
  selected = null,
  correctAnswer,
  optionKey = String,
  optionLabel,
  renderOption,
}: AnswerOptionsProps<T>) {
  const reduceMotion = useReducedMotion();
  const selectedKey = selected === null ? null : optionKey(selected);
  const correctKey =
    correctAnswer === undefined ? undefined : optionKey(correctAnswer);

  return (
    <div className="flex w-full max-w-xs flex-wrap justify-center gap-3 sm:max-w-2xl sm:gap-5">
      {options.map((option) => {
        const key = optionKey(option);
        const isChosen = key === selectedKey;
        const label = optionLabel?.(option);
        return (
          <motion.button
            key={key}
            type="button"
            onClick={() => onSelect(option)}
            variants={optionVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            disabled={disabled}
            aria-label={label}
            style={tileStyle}
            className={classNames(
              "toy-block flex h-20 min-w-16 items-center justify-center px-3 font-display text-3xl sm:h-28 sm:min-w-28 sm:text-4xl",
              disabled && !isChosen && "opacity-60",
              disabled && "pointer-events-none",
              isChosen &&
                (key === correctKey
                  ? "ring-[6px] ring-leaf ring-offset-2"
                  : "ring-[6px] ring-pink-primary ring-offset-2")
            )}
          >
            {renderOption ? renderOption(option) : key}
          </motion.button>
        );
      })}
    </div>
  );
}
