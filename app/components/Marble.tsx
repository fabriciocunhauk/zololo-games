import { classNames } from "@/app/utils/appearance";

type MarbleProps = {
  cx: number;
  cy: number;
  r: number;
  /** Tailwind fill class, e.g. "fill-sun". */
  fill: string;
};

/** Glossy counting marble with an ink outline and hard bottom edge. SVG only. */
export default function Marble({ cx, cy, r, fill }: MarbleProps) {
  const shine = r * 0.54;
  return (
    <g>
      <circle cx={cx} cy={cy + r * 0.3} r={r} className="fill-ink" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth={r * 0.27}
        className={classNames("stroke-ink", fill)}
      />
      <path
        d={`M ${cx - shine} ${cy - r * 0.15} A ${shine} ${shine} 0 0 1 ${cx - r * 0.15} ${cy - shine}`}
        fill="none"
        stroke="white"
        strokeWidth={r * 0.23}
        strokeLinecap="round"
      />
    </g>
  );
}
