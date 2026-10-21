import type { ReactNode } from "react";
import { classNames } from "@/app/utils/appearance";
import { DEPTH, STROKE } from "./tileGeometry";

type ToyBlockProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  /** Tailwind fill class. */
  fill: string;
  rx?: number;
  /** Degrees, around the block's centre. */
  rotate?: number;
  /** Add a short white shine along the top-left corner. */
  shine?: boolean;
  /** Drawn on top of the block, in the same rotated frame. */
  children?: ReactNode;
};

/** A chunky rounded block on a hard ink edge, like `.toy-block`. SVG only. */
export default function ToyBlock({
  x,
  y,
  width,
  height,
  fill,
  rx = 9,
  rotate = 0,
  shine = false,
  children,
}: ToyBlockProps) {
  const inset = rx * 0.75;
  return (
    <g
      transform={
        rotate
          ? `rotate(${rotate} ${x + width / 2} ${y + height / 2})`
          : undefined
      }
    >
      <rect
        x={x}
        y={y + DEPTH}
        width={width}
        height={height}
        rx={rx}
        strokeWidth={STROKE}
        className="fill-ink stroke-ink"
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        strokeWidth={STROKE}
        strokeLinejoin="round"
        className={classNames("stroke-ink", fill)}
      />
      {shine && (
        <path
          d={`M ${x + inset} ${y + inset + height * 0.18} V ${y + inset} H ${x + inset + width * 0.2}`}
          fill="none"
          stroke="white"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {children}
    </g>
  );
}
