import { classNames } from "@/app/utils/appearance";
import TileArtFrame from "./TileArtFrame";
import TileMonster from "./TileMonster";
import ToyBlock from "./ToyBlock";
import { monsterNamed } from "./monsterNamed";
import { DEPTH, GROUND_Y, STROKE } from "./tileGeometry";

type Kind = "circle" | "triangle" | "square";

/** Outline of a shape of half-size `r` centred on (cx, cy). */
function outline(kind: Kind, cx: number, cy: number, r: number) {
  switch (kind) {
    case "circle":
      return <circle cx={cx} cy={cy} r={r} />;
    case "square":
      return (
        <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} rx={r * 0.3} />
      );
    case "triangle":
      return (
        <path
          d={`M ${cx} ${cy - r * 1.1} L ${cx + r * 1.15} ${cy + r * 0.85} L ${cx - r * 1.15} ${cy + r * 0.85} Z`}
        />
      );
  }
}

type ShapeProps = {
  kind: Kind;
  cx: number;
  cy: number;
  r: number;
  fill: string;
  rotate: number;
};

/** A toy shape in the air: token fill, ink outline, hard edge and a white shine. */
function TumblingShape({ kind, cx, cy, r, fill, rotate }: ShapeProps) {
  return (
    <g strokeWidth={STROKE} strokeLinejoin="round">
      <g
        className="fill-ink stroke-ink"
        transform={`translate(0 ${DEPTH - 1}) rotate(${rotate} ${cx} ${cy})`}
      >
        {outline(kind, cx, cy, r)}
      </g>
      <g transform={`rotate(${rotate} ${cx} ${cy})`}>
        <g className={classNames("stroke-ink", fill)}>
          {outline(kind, cx, cy, r)}
        </g>
        <path
          d={`M ${cx - r * 0.55} ${cy - r * 0.05} Q ${cx - r * 0.5} ${cy - r * 0.5} ${cx - r * 0.05} ${cy - r * 0.55}`}
          fill="none"
          stroke="white"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

const BOX = { x: 40, y: 64, width: 96, height: GROUND_Y - 4 - 64 };
const HOLE_Y = BOX.y + 22;

/** Home tile for Shape Sorter: shapes tumbling towards their holes while Gus peeks over the box. */
export default function ShapeSorterArt({ className }: { className?: string }) {
  return (
    <TileArtFrame className={className} shadow={{ cx: 88, rx: 58 }}>
      <TileMonster
        monster={monsterNamed("Gus")}
        cx={108}
        bottom={70}
        size={60}
        rotate={6}
      />

      <ToyBlock {...BOX} fill="fill-sun" rx={8} shine />
      <ToyBlock
        x={BOX.x - 4}
        y={BOX.y - 6}
        width={BOX.width + 8}
        height={12}
        rx={6}
        fill="fill-tangerine"
      />
      <g className="fill-ink">
        {outline("circle", BOX.x + 20, HOLE_Y, 9)}
        {outline("triangle", BOX.x + 48, HOLE_Y + 1, 9)}
        {outline("square", BOX.x + 76, HOLE_Y, 8.5)}
      </g>

      <TumblingShape
        kind="circle"
        cx={26}
        cy={30}
        r={11}
        fill="fill-pink-primary"
        rotate={0}
      />
      <TumblingShape
        kind="triangle"
        cx={58}
        cy={36}
        r={10}
        fill="fill-leaf"
        rotate={-14}
      />
      <TumblingShape
        kind="square"
        cx={20}
        cy={70}
        r={10}
        fill="fill-grape"
        rotate={12}
      />
    </TileArtFrame>
  );
}
