"use client";
import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import { DIFFICULTIES, type Difficulty } from "@/app/constants/difficulty";
import { useMessages } from "@/app/i18n/LocaleProvider";
import { classNames } from "@/app/utils/appearance";

type DifficultyPickerProps = {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
};

/** Three age-labelled tiles. A radio group: arrow keys move the choice. */
export default function DifficultyPicker({
  value,
  onChange,
}: DifficultyPickerProps) {
  const text = useMessages().difficulty;
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent, idx: number) => {
    const step =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (step === 0) return;
    event.preventDefault();
    const next = (idx + step + DIFFICULTIES.length) % DIFFICULTIES.length;
    onChange(DIFFICULTIES[next].id);
    tiles.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-labelledby="difficulty-heading"
      className="grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-5"
    >
      {DIFFICULTIES.map((option, idx) => {
        const isSelected = option.id === value;
        const { label, ages, agesSpoken } = text[option.id];
        const style: CSSProperties & { "--tile": string; "--depth": string } =
          {
            "--tile": isSelected ? option.tile : "white",
            "--depth": isSelected ? "4px" : "8px",
          };
        return (
          <button
            key={option.id}
            ref={(el) => {
              tiles.current[idx] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${label}, ${agesSpoken}`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(option.id)}
            onKeyDown={(event) => onKeyDown(event, idx)}
            style={style}
            className={classNames(
              "toy-block relative flex flex-col items-center gap-1 px-2 py-4 sm:py-5",
              isSelected && "translate-y-1"
            )}
          >
            {isSelected && (
              <span
                aria-hidden
                className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-ink bg-white text-lg font-extrabold"
              >
                ✓
              </span>
            )}
            <span className="font-display text-xl sm:text-3xl">
              {label}
            </span>
            <span className="text-sm font-bold sm:text-base">
              {ages}
            </span>
          </button>
        );
      })}
    </div>
  );
}
