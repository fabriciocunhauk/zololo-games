import type { CSSProperties, ReactNode } from "react";
import { classNames } from "@/app/utils/appearance";
import type { Monster, MonsterBody, MonsterColor } from "../constants/monsters";

type BodyGeometry = {
  shape: ReactNode;
  /** y of the top of the head. */
  top: number;
  /** y of the head edge at x = 36 / 64, where horns, ears and antennae attach. */
  shoulder: number;
  eyeY: number;
  mouthGap: number;
  bottom: number;
  /** Horizontal squeeze for narrow bodies. */
  spread: number;
};

const BODIES: Record<MonsterBody, BodyGeometry> = {
  round: {
    shape: <circle cx={50} cy={58} r={30} />,
    top: 28,
    shoulder: 31.5,
    eyeY: 50,
    mouthGap: 18,
    bottom: 88,
    spread: 1,
  },
  square: {
    shape: <rect x={20} y={28} width={60} height={60} rx={16} />,
    top: 28,
    shoulder: 28,
    eyeY: 50,
    mouthGap: 18,
    bottom: 88,
    spread: 1,
  },
  tall: {
    shape: <rect x={29} y={16} width={42} height={74} rx={21} />,
    top: 16,
    shoulder: 21.3,
    eyeY: 40,
    mouthGap: 18,
    bottom: 90,
    spread: 0.75,
  },
  wide: {
    shape: <ellipse cx={50} cy={64} rx={38} ry={26} />,
    top: 38,
    shoulder: 39.8,
    eyeY: 56,
    mouthGap: 15,
    bottom: 90,
    spread: 1,
  },
  ghost: {
    shape: (
      <path d="M22 88 V52 A28 28 0 0 1 78 52 V88 L69 81 L60 88 L50 81 L40 88 L31 81 Z" />
    ),
    top: 24,
    shoulder: 27.8,
    eyeY: 48,
    mouthGap: 18,
    bottom: 88,
    spread: 1,
  },
};

const FILL: Record<MonsterColor, string> = {
  sun: "fill-sun",
  sky: "fill-sky",
  leaf: "fill-leaf",
  bubblegum: "fill-pink-primary",
  tangerine: "fill-tangerine",
  grape: "fill-grape",
};

const EYES: Record<
  Monster["eyes"],
  Array<[x: number, dy: number, r: number]>
> = {
  1: [[50, 0, 11]],
  2: [
    [39, 0, 8],
    [61, 0, 8],
  ],
  3: [
    [35, 2, 6.5],
    [50, -3, 6.5],
    [65, 2, 6.5],
  ],
};

const INK = "stroke-ink";

function TopFeature({
  monster,
  body,
}: {
  monster: Monster;
  body: BodyGeometry;
}) {
  const s = body.shoulder;
  const accent = monster.color === "sun" ? "fill-sky" : "fill-sun";
  const inner =
    monster.color === "bubblegum" ? "fill-paper" : "fill-pink-primary";

  switch (monster.top) {
    case "horns":
      return (
        <g
          className={classNames(INK, "fill-paper")}
          strokeWidth={3.5}
          strokeLinejoin="round"
        >
          <path d={`M28 ${s + 4} L34 ${s - 14} L42 ${s + 2} Z`} />
          <path d={`M72 ${s + 4} L66 ${s - 14} L58 ${s + 2} Z`} />
        </g>
      );
    case "antennae":
      return (
        <g className={INK} strokeWidth={3.5} strokeLinecap="round">
          <line x1={41} y1={s + 2} x2={33} y2={s - 15} />
          <line x1={59} y1={s + 2} x2={67} y2={s - 15} />
          <circle cx={33} cy={s - 15} r={5} className={accent} />
          <circle cx={67} cy={s - 15} r={5} className={accent} />
        </g>
      );
    case "ears":
      return (
        <g className={INK} strokeWidth={3.5}>
          <circle cx={33} cy={s + 2} r={10} className={FILL[monster.color]} />
          <circle cx={67} cy={s + 2} r={10} className={FILL[monster.color]} />
          <circle
            cx={33}
            cy={s + 1}
            r={4.5}
            className={inner}
            strokeWidth={0}
          />
          <circle
            cx={67}
            cy={s + 1}
            r={4.5}
            className={inner}
            strokeWidth={0}
          />
        </g>
      );
    case "tuft":
      return (
        <g className={INK} fill="none" strokeWidth={4} strokeLinecap="round">
          <path
            d={`M44 ${body.top + 2} Q42 ${body.top - 6} 38 ${body.top - 11}`}
          />
          <path d={`M50 ${body.top + 1} V${body.top - 14}`} />
          <path
            d={`M56 ${body.top + 2} Q58 ${body.top - 6} 62 ${body.top - 11}`}
          />
        </g>
      );
    case "none":
      return null;
  }
}

function Mouth({ type, y }: { type: Monster["mouth"]; y: number }) {
  switch (type) {
    case "smile":
      return (
        <path
          d={`M42 ${y} Q50 ${y + 9} 58 ${y}`}
          className={INK}
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
        />
      );
    case "teeth":
      return (
        <g>
          <path
            d={`M40 ${y} H60 A10 10 0 0 1 40 ${y} Z`}
            className="fill-ink"
          />
          <rect x={44} y={y} width={4} height={4} className="fill-white" />
          <rect x={52} y={y} width={4} height={4} className="fill-white" />
        </g>
      );
    case "open":
      return (
        <g>
          <ellipse cx={50} cy={y + 3} rx={6} ry={7} className="fill-ink" />
          <ellipse
            cx={50}
            cy={y + 7}
            rx={4}
            ry={2.5}
            className="fill-pink-primary"
          />
        </g>
      );
  }
}

function Pattern({
  monster,
  body,
  mouthY,
}: {
  monster: Monster;
  body: BodyGeometry;
  mouthY: number;
}) {
  const x = (offset: number) => 50 + offset * body.spread;

  switch (monster.pattern) {
    case "belly":
      return (
        <ellipse
          cx={50}
          cy={body.bottom - 14}
          rx={14 * body.spread}
          ry={9}
          className="fill-white"
          opacity={0.4}
        />
      );
    case "spots":
      return (
        <g className="fill-ink" opacity={0.15}>
          <circle cx={x(-18)} cy={body.eyeY + 16} r={4} />
          <circle cx={x(18)} cy={body.eyeY + 10} r={3} />
          <circle cx={x(14)} cy={body.eyeY + 24} r={4.5} />
        </g>
      );
    case "cheeks":
      return (
        <g
          className={
            monster.color === "bubblegum"
              ? "fill-tangerine"
              : "fill-pink-primary"
          }
          opacity={0.85}
        >
          <circle cx={x(-16)} cy={mouthY - 2} r={4.5} />
          <circle cx={x(16)} cy={mouthY - 2} r={4.5} />
        </g>
      );
    case "none":
      return null;
  }
}

/** Draws one Zololo monster from its spec. Decorative: label the surrounding control instead. */
export default function MonsterArt({
  monster,
  className,
  style,
}: {
  monster: Monster;
  className?: string;
  style?: CSSProperties;
}) {
  const body = BODIES[monster.body];
  const mouthY = body.eyeY + body.mouthGap;

  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} style={style}>
      <ellipse
        cx={50}
        cy={93}
        rx={26}
        ry={4}
        className="fill-ink"
        opacity={0.15}
      />
      <TopFeature monster={monster} body={body} />
      <g
        className={classNames(INK, FILL[monster.color])}
        strokeWidth={4}
        strokeLinejoin="round"
      >
        {body.shape}
      </g>
      <Pattern monster={monster} body={body} mouthY={mouthY} />
      {EYES[monster.eyes].map(([ex, dy, r]) => {
        const cx = 50 + (ex - 50) * body.spread;
        const cy = body.eyeY + dy;
        return (
          <g key={ex}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              className={classNames(INK, "fill-white")}
              strokeWidth={3}
            />
            <circle
              cx={cx + r * 0.15}
              cy={cy + r * 0.1}
              r={r * 0.48}
              className="fill-ink"
            />
            <circle
              cx={cx - r * 0.05}
              cy={cy - r * 0.15}
              r={r * 0.17}
              className="fill-white"
            />
          </g>
        );
      })}
      <Mouth type={monster.mouth} y={mouthY} />
    </svg>
  );
}
