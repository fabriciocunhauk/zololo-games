import type { ReactNode } from "react";

/** How far the hard ink edge sits below a solid part. */
const EDGE = 4;
/** Twice the visible outline width: half of the stroke hides under the fill. */
const OUTLINE = 7.5;

/**
 * A solid body part: hard ink edge underneath, a wide ink stroke for the
 * outline, then the fill. Shapes passed together merge into one silhouette.
 */
export function Solid({
  fill,
  children,
}: {
  /** Tailwind fill class, e.g. "fill-sun". */
  fill: string;
  children: ReactNode;
}) {
  return (
    <g strokeLinejoin="round">
      <g
        transform={`translate(0 ${EDGE})`}
        className="fill-ink stroke-ink"
        strokeWidth={OUTLINE}
      >
        {children}
      </g>
      <g className="fill-ink stroke-ink" strokeWidth={OUTLINE}>
        {children}
      </g>
      <g className={fill}>{children}</g>
    </g>
  );
}

/** A flat detail (muzzle, inner ear, beak) with a thin ink outline. */
export function Patch({
  fill,
  children,
}: {
  fill: string;
  children: ReactNode;
}) {
  return (
    <g
      className={`stroke-ink ${fill}`}
      strokeWidth={3}
      strokeLinejoin="round"
    >
      {children}
    </g>
  );
}

/** The house eye: white sclera, ink pupil nudged down-right, white shine dot. */
export function Eye({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        className="fill-white stroke-ink"
        strokeWidth={3}
      />
      <circle
        cx={cx + r * 0.15}
        cy={cy + r * 0.12}
        r={r * 0.52}
        className="fill-ink"
      />
      <circle
        cx={cx - r * 0.02}
        cy={cy - r * 0.15}
        r={r * 0.19}
        className="fill-white"
      />
    </g>
  );
}

/** Rosy cheeks at the given points. */
export function Cheeks({
  points,
  r = 4.5,
}: {
  points: ReadonlyArray<readonly [number, number]>;
  r?: number;
}) {
  return (
    <g className="fill-pink-primary">
      {points.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
    </g>
  );
}

/** An open ink line: mouths, whiskers, feather marks. */
export function Line({ d, width = 3.5 }: { d: string; width?: number }) {
  return (
    <path
      d={d}
      fill="none"
      className="stroke-ink"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** White gloss arc on the upper left of a round part. */
export function Shine({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const s = r * 0.68;
  return (
    <path
      d={`M ${cx - s} ${cy - r * 0.1} A ${s} ${s} 0 0 1 ${cx - r * 0.1} ${cy - s}`}
      fill="none"
      stroke="white"
      strokeWidth={3.5}
      strokeLinecap="round"
    />
  );
}

/** Soft ground shadow every animal sits on. */
export function GroundShadow() {
  return (
    <ellipse
      cx={50}
      cy={94}
      rx={28}
      ry={4}
      className="fill-ink"
      opacity={0.15}
    />
  );
}
