/**
 * Shared SVG pieces. Engine and carriages use the same 120-unit height and
 * put the rail at the same y, so neighbouring pieces join into one track.
 */
export const TRAIN_HEIGHT = 120;
const RAIL_Y = 112;

/** A stretch of track the width of one piece, with sleepers. */
export function Rail({ width }: { width: number }) {
  const sleepers = Array.from(
    { length: Math.round(width / 25) },
    (_, idx) => idx * 25 + 7
  );
  return (
    <g>
      {sleepers.map((x) => (
        <rect
          key={x}
          x={x}
          y={RAIL_Y + 2}
          width={11}
          height={6}
          rx={1.5}
          className="fill-ink"
          opacity={0.3}
        />
      ))}
      <rect x={0} y={RAIL_Y} width={width} height={4} className="fill-ink" />
    </g>
  );
}

/** A wheel sitting on the rail, with a hard shadow and a hub. */
export function Wheel({ cx, r = 9 }: { cx: number; r?: number }) {
  const cy = RAIL_Y - r - 1;
  return (
    <g>
      <circle cx={cx} cy={cy + 1.5} r={r} className="fill-ink" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth={3}
        className="fill-tangerine stroke-ink"
      />
      <circle cx={cx} cy={cy} r={r * 0.3} className="fill-ink" />
    </g>
  );
}

/** Link bar between two pieces. `x` is its left edge. */
export function Coupling({ x }: { x: number }) {
  return (
    <rect x={x} y={86} width={12} height={6} rx={2} className="fill-ink" />
  );
}
