import { classNames } from "@/app/utils/appearance";

type Marble = { cx: number; cy: number; fill: string };

// The O's are counting marbles that hop along the word.
const MARBLES: ReadonlyArray<Marble> = [
  { cx: 51, cy: 24, fill: "fill-sun" },
  { cx: 117, cy: 20, fill: "fill-sky" },
  { cx: 183, cy: 24, fill: "fill-leaf" },
];

const RADIUS = 13;

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

      {MARBLES.map(({ cx, cy, fill }) => (
        <g key={cx}>
          <circle cx={cx} cy={cy + 4} r={RADIUS} className="fill-ink" />
          <circle
            cx={cx}
            cy={cy}
            r={RADIUS}
            strokeWidth={3.5}
            className={classNames("stroke-ink", fill)}
          />
          <path
            d={`M ${cx - 7} ${cy - 2} A 7 7 0 0 1 ${cx - 2} ${cy - 7}`}
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}
