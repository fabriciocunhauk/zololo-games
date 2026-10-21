import type { ReactNode } from "react";
import { classNames } from "@/app/utils/appearance";
import type { BubbleFill } from "../constants/config";

type BubbleArtProps = {
  fill: BubbleFill;
  /** Usually the number, drawn in the display font. */
  children?: ReactNode;
  className?: string;
};

/** A see-through bubble with an ink outline and a white shine, like a `Marble`. */
export default function BubbleArt({ fill, children, className }: BubbleArtProps) {
  return (
    <span
      className={classNames(
        "relative flex aspect-square items-center justify-center",
        className
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <circle cx={50} cy={50} r={45} className="fill-white" fillOpacity={0.5} />
        <circle
          cx={50}
          cy={50}
          r={45}
          strokeWidth={5}
          fillOpacity={0.6}
          className={classNames("stroke-ink", fill)}
        />
        <path
          d="M 25.7 43.3 A 24.3 24.3 0 0 1 43.3 25.7"
          fill="none"
          stroke="white"
          strokeWidth={8}
          strokeLinecap="round"
        />
        <circle cx={30} cy={60} r={3.5} fill="white" />
      </svg>
      {children !== undefined && (
        <span
          aria-hidden
          className="relative font-display leading-none text-ink"
        >
          {children}
        </span>
      )}
    </span>
  );
}
