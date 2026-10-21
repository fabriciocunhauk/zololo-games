import type { ReactNode } from "react";
import GroundShadow from "./GroundShadow";
import { TILE_HEIGHT, TILE_WIDTH } from "./tileGeometry";

type TileArtFrameProps = {
  className?: string;
  /** Override the ground shadow's centre and half-width when the scene sits off-centre. */
  shadow?: { cx?: number; rx?: number };
  children: ReactNode;
};

/** The fixed canvas for every home-tile illustration: 160 × 120 with a shared ground shadow. */
export default function TileArtFrame({
  className,
  shadow,
  children,
}: TileArtFrameProps) {
  return (
    <svg
      viewBox={`0 0 ${TILE_WIDTH} ${TILE_HEIGHT}`}
      aria-hidden
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <GroundShadow cx={shadow?.cx} rx={shadow?.rx} />
      {children}
    </svg>
  );
}
