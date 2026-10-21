import type { CSSProperties } from "react";
import { classNames } from "@/app/utils/appearance";

type LetterBlockProps = {
  letter: string;
  /** CSS colour for the block, e.g. "var(--color-sun)". */
  tile?: string;
  depth?: string;
  className?: string;
};

/** A decorative toy-block with a letter on it, for intro art and how-to-play pictures. */
export default function LetterBlock({
  letter,
  tile = "white",
  depth = "6px",
  className,
}: LetterBlockProps) {
  const style: CSSProperties & { "--tile": string; "--depth": string } = {
    "--tile": tile,
    "--depth": depth,
  };

  return (
    <span
      aria-hidden
      style={style}
      className={classNames(
        "toy-block pointer-events-none flex h-12 w-12 items-center justify-center font-display text-2xl sm:h-14 sm:w-14 sm:text-3xl",
        className
      )}
    >
      {letter}
    </span>
  );
}
