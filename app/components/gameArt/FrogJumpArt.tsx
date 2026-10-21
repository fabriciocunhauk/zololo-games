import { classNames } from "@/app/utils/appearance";
import Glyph from "./Glyph";
import TileArtFrame from "./TileArtFrame";
import { GROUND_Y, STROKE } from "./tileGeometry";

/** Frog Jump's lily pad: an ellipse with a notch, in a 48 × 36 box centred on (24, 16). */
const PAD = "M34 14 L45.3 12.9 A22 12 0 1 1 38.1 6.8 Z";
const PAD_SCALE = 1;

const PADS = [
  { value: 1, cx: 28, fill: "fill-sun" },
  { value: 2, cx: 80, fill: "fill-leaf" },
  { value: 3, cx: 132, fill: "fill-leaf" },
];
const PAD_Y = GROUND_Y - 12;

function LilyPad({ value, cx, fill }: (typeof PADS)[number]) {
  const t = `translate(${cx - 24 * PAD_SCALE} ${PAD_Y - 16 * PAD_SCALE}) scale(${PAD_SCALE})`;
  return (
    <g>
      <g transform={t}>
        <path transform="translate(0 3)" d={PAD} className="fill-ink" />
        <path
          d={PAD}
          strokeWidth={2.5}
          className={classNames("stroke-ink", fill)}
        />
      </g>
      <Glyph x={cx - 2} y={PAD_Y} size={17}>
        {value}
      </Glyph>
    </g>
  );
}

/** Body, eye bumps, haunches and feet, as in Frog Jump's `FrogArt`: drawn three times for one outline. */
function Silhouette() {
  return (
    <>
      <circle cx={33} cy={34} r={14} />
      <circle cx={67} cy={34} r={14} />
      <ellipse cx={14} cy={80} rx={12} ry={9} />
      <ellipse cx={86} cy={80} rx={12} ry={9} />
      <ellipse cx={50} cy={64} rx={34} ry={24} />
      <ellipse cx={28} cy={93} rx={9} ry={5} />
      <ellipse cx={72} cy={93} rx={9} ry={5} />
    </>
  );
}

function Eye({ cx }: { cx: number }) {
  return (
    <g>
      <circle
        cx={cx}
        cy={33}
        r={9}
        className="fill-white stroke-ink"
        strokeWidth={3}
      />
      <circle cx={cx + 1.5} cy={34.5} r={4.6} className="fill-ink" />
      <circle cx={cx - 0.2} cy={32.4} r={1.7} className="fill-white" />
    </g>
  );
}

/** The house frog with legs kicked out, drawn in a 100-unit box. */
function HoppingFrog({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <g
        transform="translate(0 4)"
        className="fill-ink stroke-ink"
        strokeWidth={8}
      >
        <Silhouette />
      </g>
      <g className="fill-ink stroke-ink" strokeWidth={8}>
        <Silhouette />
      </g>
      <g className="fill-leaf">
        <Silhouette />
      </g>
      <ellipse
        cx={50}
        cy={72}
        rx={18}
        ry={11}
        className="fill-paper"
        opacity={0.7}
      />
      <path
        d="M23 59 Q25 50 33 46.5"
        fill="none"
        stroke="white"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Eye cx={33} />
      <Eye cx={67} />
      <circle cx={46} cy={52} r={1.3} className="fill-ink" />
      <circle cx={54} cy={52} r={1.3} className="fill-ink" />
      <circle cx={29} cy={64} r={4.5} className="fill-pink-primary" />
      <circle cx={71} cy={64} r={4.5} className="fill-pink-primary" />
      <path
        d="M38 59 Q50 70 62 59"
        fill="none"
        className="stroke-ink"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </g>
  );
}

/** Home tile for Frog Jump: the frog mid-hop along a dotted arc over numbered lily pads. */
export default function FrogJumpArt({ className }: { className?: string }) {
  return (
    <TileArtFrame className={className}>
      <ellipse
        cx={80}
        cy={GROUND_Y - 10}
        rx={76}
        ry={18}
        strokeWidth={STROKE}
        className="fill-sky stroke-ink"
      />
      <circle
        cx={84}
        cy={39}
        r={27}
        strokeWidth={STROKE}
        className="fill-sun stroke-ink"
      />
      {PADS.map((pad) => (
        <LilyPad key={pad.value} {...pad} />
      ))}
      <path
        d={`M 28 ${PAD_Y - 12} Q 70 -6 128 ${PAD_Y - 14}`}
        fill="none"
        className="stroke-ink"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeDasharray="0.1 8"
      />
      <HoppingFrog transform="translate(54 8) rotate(10 26 26) scale(0.52)" />
    </TileArtFrame>
  );
}
