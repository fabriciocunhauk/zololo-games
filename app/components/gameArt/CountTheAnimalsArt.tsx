import AnimalArt, { type AnimalKind } from "@/app/components/animals/AnimalArt";
import NumberBadge from "./NumberBadge";
import TileArtFrame from "./TileArtFrame";
import { GROUND_Y } from "./tileGeometry";

const SIZE = 54;
/** AnimalArt feet sit about 92% of the way down their box. */
const FEET = 0.92;

const PARADE: ReadonlyArray<{ kind: AnimalKind; cx: number; rotate: number }> =
  [
    { kind: "duck", cx: 30, rotate: -6 },
    { kind: "cat", cx: 80, rotate: 4 },
    { kind: "bear", cx: 130, rotate: -4 },
  ];

/** Home tile for Count the Animals: three animals in a row, each with its counting number. */
export default function CountTheAnimalsArt({
  className,
}: {
  className?: string;
}) {
  const top = GROUND_Y - SIZE * FEET;
  return (
    <TileArtFrame className={className}>
      {PARADE.map(({ kind, cx, rotate }, idx) => (
        <g key={kind}>
          <g transform={`rotate(${rotate} ${cx} ${GROUND_Y})`}>
            <AnimalArt
              kind={kind}
              x={cx - SIZE / 2}
              y={top}
              width={SIZE}
              height={SIZE}
            />
          </g>
          <NumberBadge
            cx={cx + 6}
            cy={top - 4 + (idx % 2) * -4}
            value={idx + 1}
          />
        </g>
      ))}
    </TileArtFrame>
  );
}
