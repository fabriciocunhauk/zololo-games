"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useFocusRescue } from "@/app/hooks/useFocusRescue";
import { classNames } from "@/app/utils/appearance";

type AnswerOptionsProps<T> = {
  options: ReadonlyArray<T>;
  onSelect: (option: T) => void;
  /** Locks every option, e.g. once the round is answered. */
  disabled: boolean;
  /** Locks single options, e.g. a wrong pick that stays on screen. */
  isOptionDisabled?: (option: T) => boolean;
  /** When set, the chosen option is ringed green or red against `correctAnswer`. */
  selected?: T | null;
  correctAnswer?: T;
  /** Identity for keys and comparison. Defaults to `String(option)`. */
  optionKey?: (option: T) => string;
  /** Accessible name. Defaults to the key. */
  optionLabel?: (option: T) => string;
  /** Tile content. Defaults to the key. */
  renderOption?: (option: T) => ReactNode;
  /** Names the group of options for screen readers. */
  label?: string;
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
  isOptionDisabled,
  selected = null,
  correctAnswer,
  optionKey = String,
  optionLabel,
  renderOption,
  label,
}: AnswerOptionsProps<T>) {
  const reduceMotion = useReducedMotion();
  const area = useRef<HTMLDivElement>(null);
  useFocusRescue(area);
  const selectedKey = selected === null ? null : optionKey(selected);
  const correctKey =
    correctAnswer === undefined ? undefined : optionKey(correctAnswer);

  return (
    <div
      ref={area}
      role="group"
      aria-label={label}
      className="flex w-full max-w-xs flex-wrap justify-center gap-3 sm:max-w-2xl sm:gap-5"
    >
      {options.map((option) => {
        const key = optionKey(option);
        const isChosen = key === selectedKey;
        const isLocked = disabled || (isOptionDisabled?.(option) ?? false);
        return (
          // The entrance animates a wrapper: framer writes an inline
          // transform that would override the toy-block hover and press.
          <motion.div
            key={key}
            variants={optionVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            {/* aria-disabled, not disabled: the button keeps keyboard focus. */}
            <button
              type="button"
              onClick={() => {
                if (!isLocked) onSelect(option);
              }}
              aria-disabled={isLocked}
              aria-label={optionLabel?.(option)}
              style={tileStyle}
              className={classNames(
                "toy-block flex h-20 min-w-16 items-center justify-center px-3 font-display text-3xl sm:h-28 sm:min-w-28 sm:text-4xl",
                isLocked && !isChosen && "opacity-60",
                isLocked && "cursor-default",
                isChosen &&
                  (key === correctKey
                    ? "ring-[6px] ring-leaf ring-offset-2"
                    : "ring-[6px] ring-pink-primary ring-offset-2")
              )}
            >
              {renderOption ? renderOption(option) : key}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
