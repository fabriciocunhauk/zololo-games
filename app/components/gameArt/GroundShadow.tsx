import { GROUND_Y } from "./tileGeometry";

type GroundShadowProps = {
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
};

/** Soft ink puddle that objects stand on. SVG only. */
export default function GroundShadow({
  cx = 80,
  cy = GROUND_Y + 1,
  rx = 62,
  ry = 6,
}: GroundShadowProps) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      className="fill-ink"
      opacity={0.15}
    />
  );
}
