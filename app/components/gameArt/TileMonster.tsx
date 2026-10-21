import type { Monster } from "@/app/components/monsters/monsters";
import MonsterArt from "@/app/components/monsters/MonsterArt";

type TileMonsterProps = {
  monster: Monster;
  /** Horizontal centre. */
  cx: number;
  /** Where the monster's feet touch down. */
  bottom: number;
  /** Width and height of its 100-unit art box. */
  size: number;
  /** Degrees, around the feet. */
  rotate?: number;
};

/** MonsterArt bodies end about 90% of the way down their box. */
const FEET = 0.9;

/** Places a Zololo monster inside tile art by its feet rather than its box. SVG only. */
export default function TileMonster({
  monster,
  cx,
  bottom,
  size,
  rotate = 0,
}: TileMonsterProps) {
  return (
    <g transform={rotate ? `rotate(${rotate} ${cx} ${bottom})` : undefined}>
      <MonsterArt
        monster={monster}
        x={cx - size / 2}
        y={bottom - size * FEET}
        width={size}
        height={size}
      />
    </g>
  );
}
