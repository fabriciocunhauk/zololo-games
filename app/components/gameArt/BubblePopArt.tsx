import { classNames } from "@/app/utils/appearance";
import Glyph from "./Glyph";
import TileArtFrame from "./TileArtFrame";
import TileMonster from "./TileMonster";
import { monsterNamed } from "./monsterNamed";
import { GROUND_Y } from "./tileGeometry";

type BubbleProps = {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  glyph?: string;
};

/** A see-through bubble, as in Bubble Pop's `BubbleArt`, scaled to `r`. */
function Bubble({ cx, cy, r, fill, glyph }: BubbleProps) {
  const shine = r * 0.54;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} className="fill-white" fillOpacity={0.5} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth={Math.max(2.5, r * 0.11)}
        fillOpacity={0.6}
        className={classNames("stroke-ink", fill)}
      />
      <path
        d={`M ${cx - shine} ${cy - r * 0.15} A ${shine} ${shine} 0 0 1 ${cx - r * 0.15} ${cy - shine}`}
        fill="none"
        stroke="white"
        strokeWidth={Math.max(2.5, r * 0.17)}
        strokeLinecap="round"
      />
      {glyph && (
        <Glyph x={cx + r * 0.06} y={cy + r * 0.04} size={r * 1.15}>
          {glyph}
        </Glyph>
      )}
    </g>
  );
}

/** Home tile for Bubble Pop: Lulu blowing a stream of numbered bubbles. */
export default function BubblePopArt({ className }: { className?: string }) {
  return (
    <TileArtFrame className={className} shadow={{ cx: 52, rx: 38 }}>
      <TileMonster
        monster={monsterNamed("Lulu")}
        cx={46}
        bottom={GROUND_Y}
        size={72}
        rotate={6}
      />
      <Bubble cx={77} cy={84} r={5} fill="fill-sky" />
      <Bubble cx={95} cy={70} r={15} fill="fill-grape" glyph="+" />
      <Bubble cx={100} cy={32} r={19} fill="fill-sky" glyph="2" />
      <Bubble cx={137} cy={62} r={19} fill="fill-pink-primary" glyph="3" />
    </TileArtFrame>
  );
}
