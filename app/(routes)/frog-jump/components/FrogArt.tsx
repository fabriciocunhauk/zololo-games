import type { CSSProperties } from "react";

type FrogArtProps = {
  /** Sit the frog on its own lily pad. */
  pad?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Darker than the frog so the two greens read apart. */
const padFill: CSSProperties = {
  fill: "color-mix(in oklab, var(--color-leaf) 65%, var(--color-ink))",
};

/** Body, eye bumps, haunches and feet: drawn twice for one clean outline. */
function Silhouette() {
  return (
    <>
      <circle cx={33} cy={34} r={14} />
      <circle cx={67} cy={34} r={14} />
      <ellipse cx={20} cy={78} rx={12} ry={9} />
      <ellipse cx={80} cy={78} rx={12} ry={9} />
      <ellipse cx={50} cy={64} rx={34} ry={24} />
      <ellipse cx={37} cy={89} rx={9} ry={4.5} />
      <ellipse cx={63} cy={89} rx={9} ry={4.5} />
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

/** A friendly leaf-green frog with an ink outline, optionally on a lily pad. SVG only. */
export default function FrogArt({
  pad = false,
  className,
  style,
}: FrogArtProps) {
  return (
    <svg
      aria-hidden
      viewBox={pad ? "0 14 100 98" : "0 14 100 88"}
      className={className}
      style={style}
    >
      {pad && (
        <g strokeLinejoin="round">
          <path
            transform="translate(0 3)"
            d="M50 96 L93.2 99.4 A46 10 0 1 0 79.6 103.7 Z"
            className="fill-ink"
          />
          <path
            d="M50 96 L93.2 99.4 A46 10 0 1 0 79.6 103.7 Z"
            style={padFill}
            className="stroke-ink"
            strokeWidth={3}
          />
        </g>
      )}
      {/* Hard ink edge under the frog, then a wide ink stroke, then the fill. */}
      <g
        transform="translate(0 3)"
        className="fill-ink stroke-ink"
        strokeWidth={7}
      >
        <Silhouette />
      </g>
      <g className="fill-ink stroke-ink" strokeWidth={7}>
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
        opacity={0.6}
      />
      <path
        d="M23 59 Q25 50 33 46.5"
        fill="none"
        stroke="white"
        strokeWidth={3.5}
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
    </svg>
  );
}
