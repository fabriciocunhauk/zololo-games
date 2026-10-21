import Glyph from "./Glyph";
import { STROKE } from "./tileGeometry";

type NumberBadgeProps = {
  cx: number;
  cy: number;
  r?: number;
  value: number;
};

/** A white counting disc with an ink rim, hard edge and a display-font number. SVG only. */
export default function NumberBadge({
  cx,
  cy,
  r = 10,
  value,
}: NumberBadgeProps) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy + 2.5}
        r={r}
        strokeWidth={STROKE}
        className="fill-ink stroke-ink"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth={STROKE}
        className="fill-white stroke-ink"
      />
      <Glyph x={cx} y={cy} size={r * 1.45}>
        {value}
      </Glyph>
    </g>
  );
}
