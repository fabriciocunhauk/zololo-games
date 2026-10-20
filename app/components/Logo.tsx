import { classNames } from "@/app/utils/appearance";
import Marble from "./Marble";

// The O's are counting marbles that hop along the word.
const MARBLES = [
  { cx: 51, cy: 24, fill: "fill-sun" },
  { cx: 117, cy: 20, fill: "fill-sky" },
  { cx: 183, cy: 24, fill: "fill-leaf" },
] as const;

/** "zololo" wordmark: chunky ink strokes with three marble O's. */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 48"
      aria-hidden
      className={classNames("h-10 w-auto", className)}
    >
      <g
        className="stroke-ink"
        fill="none"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6,11 26,11 6,37 26,37" />
        <polyline points="76,11 76,37 92,37" />
        <polyline points="142,11 142,37 158,37" />
      </g>

      {MARBLES.map((marble) => (
        <Marble key={marble.cx} {...marble} r={13} />
      ))}
    </svg>
  );
}
