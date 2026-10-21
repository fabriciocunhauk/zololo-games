import { classNames } from "@/app/utils/appearance";
import {
  FILL_CLASS,
  type ShapeColour,
  type ShapeKind,
} from "../constants/shapes";
import {
  CENTRE,
  CIRCLE_RADIUS,
  shapeOutline,
  shineLine,
  toPointsAttr,
} from "../utils/shapeGeometry";

type ShapeArtProps = {
  kind: ShapeKind;
  /** Leave out for a white outline, as on a bin label. */
  colour?: ShapeColour;
  /** Degrees, clockwise. */
  rotation?: number;
  className?: string;
};

const STROKE = 4;
const DROP = 5;

/** One toy shape: token fill, ink outline, hard ink edge below and a white shine. Decorative. */
export default function ShapeArt({
  kind,
  colour,
  rotation = 0,
  className,
}: ShapeArtProps) {
  const fill = colour ? FILL_CLASS[colour] : "fill-white";
  const outline = shapeOutline(kind, rotation);

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={classNames("block h-auto w-full overflow-visible", className)}
    >
      {outline ? (
        <>
          <polygon
            points={toPointsAttr(outline)}
            transform={`translate(0 ${DROP})`}
            strokeWidth={STROKE}
            strokeLinejoin="round"
            className="fill-ink stroke-ink"
          />
          <polygon
            points={toPointsAttr(outline)}
            strokeWidth={STROKE}
            strokeLinejoin="round"
            className={classNames("stroke-ink", fill)}
          />
          {colour && <Shine points={shineLine(outline)} />}
        </>
      ) : (
        <>
          <circle
            cx={CENTRE}
            cy={CENTRE + DROP}
            r={CIRCLE_RADIUS}
            strokeWidth={STROKE}
            className="fill-ink stroke-ink"
          />
          <circle
            cx={CENTRE}
            cy={CENTRE}
            r={CIRCLE_RADIUS}
            strokeWidth={STROKE}
            className={classNames("stroke-ink", fill)}
          />
          {colour && <CircleShine />}
        </>
      )}
    </svg>
  );
}

function Shine({ points: [a, b] }: { points: ReturnType<typeof shineLine> }) {
  return (
    <line
      x1={a[0]}
      y1={a[1]}
      x2={b[0]}
      y2={b[1]}
      stroke="white"
      strokeWidth={6}
      strokeLinecap="round"
    />
  );
}

function CircleShine() {
  const r = CIRCLE_RADIUS * 0.6;
  const start = `${CENTRE - r} ${CENTRE - CIRCLE_RADIUS * 0.12}`;
  const end = `${CENTRE - CIRCLE_RADIUS * 0.12} ${CENTRE - r}`;
  return (
    <path
      d={`M ${start} A ${r} ${r} 0 0 1 ${end}`}
      fill="none"
      stroke="white"
      strokeWidth={6}
      strokeLinecap="round"
    />
  );
}
