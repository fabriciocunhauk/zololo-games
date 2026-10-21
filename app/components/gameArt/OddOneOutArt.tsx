import type { Monster } from "@/app/components/monsters/monsters";
import Sparkle from "./Sparkle";
import TileArtFrame from "./TileArtFrame";
import TileMonster from "./TileMonster";
import { monsterNamed } from "./monsterNamed";
import { GROUND_Y } from "./tileGeometry";

const pip = monsterNamed("Pip");
const oddPip: Monster = { ...pip, color: "sky" };

const SIZE = 52;
const LINE_UP = [
  { monster: pip, cx: 24, rotate: -6 },
  { monster: pip, cx: 60, rotate: 5 },
  { monster: oddPip, cx: 98, rotate: -3 },
  { monster: pip, cx: 136, rotate: 6 },
];

/** Centred on the odd monster's face. */
const LENS = { cx: 98, cy: GROUND_Y - SIZE * 0.36, r: 23 };

/** Magnifying glass: white glass, ink rim and a sun handle with a hard edge. */
function MagnifyingGlass() {
  const { cx, cy, r } = LENS;
  const shine = r * 0.6;
  return (
    <g>
      <path
        d={`M ${cx + 17} ${cy - 17} L ${cx + 34} ${cy - 36}`}
        className="stroke-ink"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d={`M ${cx + 18} ${cy - 18} L ${cx + 33} ${cy - 35}`}
        className="stroke-tangerine"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={r} className="fill-white" fillOpacity={0.15} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        className="stroke-ink"
        strokeWidth={8}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        className="stroke-grape"
        strokeWidth={3.5}
      />
      <path
        d={`M ${cx - shine} ${cy - r * 0.15} A ${shine} ${shine} 0 0 1 ${cx - r * 0.15} ${cy - shine}`}
        fill="none"
        stroke="white"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </g>
  );
}

/** Home tile for Odd One Out: three Pips and one sky-blue twin under a magnifying glass. */
export default function OddOneOutArt({ className }: { className?: string }) {
  return (
    <TileArtFrame className={className}>
      {LINE_UP.map(({ monster, cx, rotate }) => (
        <TileMonster
          key={cx}
          monster={monster}
          cx={cx}
          bottom={GROUND_Y}
          size={SIZE}
          rotate={rotate}
        />
      ))}
      <MagnifyingGlass />
      <Sparkle x={70} y={34} size={8} fill="fill-sun" />
    </TileArtFrame>
  );
}
