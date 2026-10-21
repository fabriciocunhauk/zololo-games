"use client";
import { motion, useAnimate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import { useFocusRescue } from "@/app/hooks/useFocusRescue";
import { classNames } from "@/app/utils/appearance";
import type { Shake } from "../hooks/useLetterSoundsGame";

type SpellingBoardProps = {
  word: string;
  bank: ReadonlyArray<string>;
  placed: ReadonlyArray<string>;
  usedTiles: ReadonlyArray<number>;
  shake: Shake | null;
  /** Taps are ignored (not disabled, so keyboard focus stays put). */
  disabled: boolean;
  onPick: (tile: number) => void;
};

const tileStyle: CSSProperties & { "--tile": string; "--depth": string } = {
  "--tile": "white",
  "--depth": "6px",
};

type BankTileProps = {
  letter: string;
  used: boolean;
  disabled: boolean;
  /** Changes each time this tile should wiggle; 0 for never. */
  shakeKey: number;
  onPick: () => void;
};

function BankTile({ letter, used, disabled, shakeKey, onPick }: BankTileProps) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!shakeKey || reduceMotion || !scope.current) return;
    animate(
      scope.current,
      { x: [0, -10, 10, -7, 7, 0], rotate: [0, -4, 4, -2, 2, 0] },
      { duration: 0.45 }
    );
  }, [shakeKey, reduceMotion, animate, scope]);

  const isLocked = disabled || used;

  return (
    <motion.span ref={scope} className="block">
      {/* aria-disabled, not disabled: the tile keeps keyboard focus. */}
      <button
        type="button"
        onClick={() => {
          if (!isLocked) onPick();
        }}
        aria-disabled={isLocked}
        aria-label={used ? `${letter}, used` : letter}
        style={tileStyle}
        className={classNames(
          "toy-block flex h-16 w-16 items-center justify-center font-display text-3xl sm:h-20 sm:w-20 sm:text-4xl",
          used && "opacity-30",
          isLocked && "cursor-default"
        )}
      >
        {letter}
      </button>
    </motion.span>
  );
}

/** Empty slots for the word, and a bank of letter blocks to fill them in order. */
export default function SpellingBoard({
  word,
  bank,
  placed,
  usedTiles,
  shake,
  disabled,
  onPick,
}: SpellingBoardProps) {
  const complete = placed.length === word.length;
  const bankArea = useRef<HTMLDivElement>(null);
  useFocusRescue(bankArea);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <ol aria-label="Your spelling" className="flex gap-3 sm:gap-4">
        {Array.from(word, (_, idx) => {
          const letter = placed[idx];
          const isNext = idx === placed.length;
          return (
            <li
              key={idx}
              data-testid="slot"
              className={classNames(
                "flex h-16 w-16 items-center justify-center rounded-2xl border-[3px] border-ink font-display text-3xl sm:h-20 sm:w-20 sm:text-4xl",
                letter
                  ? classNames(
                      "shadow-[0_4px_0_var(--color-ink)] motion-safe:animate-[pop_200ms_ease-out]",
                      complete ? "bg-leaf" : "bg-sun"
                    )
                  : "border-dashed",
                isNext && "bg-tangerine/30"
              )}
            >
              {letter ?? <span className="sr-only">empty</span>}
            </li>
          );
        })}
      </ol>

      <div
        ref={bankArea}
        role="group"
        aria-label="Letter blocks"
        className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4"
      >
        {/* Keyed by place, so a focused tile stays mounted into the next round. */}
        {bank.map((letter, idx) => (
          <BankTile
            key={idx}
            letter={letter}
            used={usedTiles.includes(idx)}
            disabled={disabled}
            shakeKey={shake?.tile === idx ? shake.nonce : 0}
            onPick={() => onPick(idx)}
          />
        ))}
      </div>
    </div>
  );
}
