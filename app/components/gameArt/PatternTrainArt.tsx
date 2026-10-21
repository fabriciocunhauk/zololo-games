import type { Monster } from "@/app/components/monsters/monsters";
import Glyph from "./Glyph";
import TileArtFrame from "./TileArtFrame";
import TileMonster from "./TileMonster";
import { monsterNamed } from "./monsterNamed";
import { GROUND_Y, STROKE } from "./tileGeometry";

const RAIL_Y = GROUND_Y - 3;
const WHEEL_R = 6;
const WAGON_W = 28;

function Wheel({ cx, r = WHEEL_R }: { cx: number; r?: number }) {
  const cy = RAIL_Y - r - 0.5;
  return (
    <g>
      <circle cx={cx} cy={cy + 1.5} r={r} className="fill-ink" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth={2.5}
        className="fill-tangerine stroke-ink"
      />
      <circle cx={cx} cy={cy} r={r * 0.32} className="fill-ink" />
    </g>
  );
}

function Rail() {
  const sleepers = [6, 26, 46, 66, 86, 106, 126, 146];
  return (
    <g>
      {sleepers.map((x) => (
        <rect
          key={x}
          x={x}
          y={RAIL_Y + 2}
          width={9}
          height={4}
          rx={1.5}
          className="fill-ink"
          opacity={0.3}
        />
      ))}
      <rect
        x={0}
        y={RAIL_Y}
        width={160}
        height={3}
        rx={1.5}
        className="fill-ink"
      />
    </g>
  );
}

/** Steam engine facing left, simplified from Pattern Train's `TrainEngine`. */
function Engine() {
  return (
    <g>
      <g className="fill-white stroke-ink" strokeWidth={2.5}>
        <circle cx={22} cy={40} r={6} />
        <circle cx={32} cy={31} r={4.5} />
      </g>
      <g className="stroke-ink" strokeWidth={STROKE}>
        <path d="M15 72 L16.5 55 H25.5 L27 72 Z" className="fill-tangerine" />
        <rect
          x={12}
          y={49}
          width={17}
          height={8}
          rx={3}
          className="fill-tangerine"
        />
        <rect
          x={6}
          y={68}
          width={42}
          height={26}
          rx={12}
          className="fill-sky"
        />
        <path d="M30 69 A7 7 0 0 1 44 69 Z" className="fill-sun" />
        <path d="M1 100 L8 86 H14 V100 Z" className="fill-sun" />
        <rect
          x={42}
          y={52}
          width={22}
          height={42}
          rx={5}
          className="fill-pink-primary"
        />
        <rect
          x={38}
          y={46}
          width={30}
          height={9}
          rx={4}
          className="fill-tangerine"
        />
        <rect
          x={47}
          y={60}
          width={12}
          height={12}
          rx={3}
          className="fill-white"
          strokeWidth={2.5}
        />
        <circle cx={7} cy={79} r={4} className="fill-sun" strokeWidth={2.5} />
      </g>
      <path
        d="M14 76 Q20 72 28 72"
        fill="none"
        stroke="white"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <rect x={4} y={90} width={60} height={5} rx={2.5} className="fill-ink" />
      <Wheel cx={18} />
      <Wheel cx={33} />
      <Wheel cx={53} r={7.5} />
    </g>
  );
}

/** Open wagon with a rider, or the "?" gap. `x` is its left edge. */
function Wagon({ x, rider }: { x: number; rider: Monster | null }) {
  const cx = x + WAGON_W / 2;
  return (
    <g>
      <rect
        x={x - 4}
        y={87}
        width={6}
        height={4}
        rx={1.5}
        className="fill-ink"
      />
      {rider ? (
        <TileMonster monster={rider} cx={cx} bottom={86} size={40} />
      ) : (
        <g>
          <circle
            cx={cx}
            cy={62}
            r={12}
            strokeWidth={2.5}
            strokeDasharray="4 4"
            className="fill-white stroke-ink"
          />
          <Glyph x={cx} y={62} size={17}>
            ?
          </Glyph>
        </g>
      )}
      <Wheel cx={x + 9} />
      <Wheel cx={x + WAGON_W - 9} />
      <g className="stroke-ink" strokeWidth={STROKE}>
        <rect
          x={x + 1}
          y={78}
          width={WAGON_W - 2}
          height={18}
          rx={5}
          className="fill-paper"
        />
        <rect
          x={x - 1}
          y={75}
          width={WAGON_W + 2}
          height={7}
          rx={3.5}
          className={rider ? "fill-sun" : "fill-leaf"}
        />
      </g>
      <path
        d={`M ${x + 3} 78 H ${x + 12}`}
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  );
}

const kit = monsterNamed("Kit");
const mo = monsterNamed("Mo");
const RIDERS: ReadonlyArray<Monster | null> = [kit, mo, null];

/** Home tile for Pattern Train: an engine pulling a Kit, Mo, ? pattern of riders. */
export default function PatternTrainArt({ className }: { className?: string }) {
  return (
    <TileArtFrame className={className}>
      <Rail />
      <Engine />
      {RIDERS.map((rider, idx) => (
        <Wagon key={idx} x={70 + idx * (WAGON_W + 3)} rider={rider} />
      ))}
    </TileArtFrame>
  );
}
