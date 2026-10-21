import Glyph from "./Glyph";
import TileArtFrame from "./TileArtFrame";
import TileMonster from "./TileMonster";
import ToyBlock from "./ToyBlock";
import { monsterNamed } from "./monsterNamed";
import { GROUND_Y } from "./tileGeometry";

const SIZE = 44;
const BASE_Y = GROUND_Y - 4 - SIZE;

const BLOCKS = [
  { letter: "b", fill: "fill-sky", x: 26, y: BASE_Y, rotate: -6 },
  { letter: "c", fill: "fill-leaf", x: 74, y: BASE_Y, rotate: 5 },
  { letter: "A", fill: "fill-sun", x: 47, y: BASE_Y - SIZE - 3, rotate: -9 },
];

/** Home tile for Letter Sounds: a stack of A b c toy blocks with Rix peeking round them. */
export default function LetterSoundsArt({ className }: { className?: string }) {
  return (
    <TileArtFrame className={className}>
      <TileMonster
        monster={monsterNamed("Rix")}
        cx={128}
        bottom={GROUND_Y}
        size={66}
        rotate={8}
      />
      {BLOCKS.map(({ letter, fill, x, y, rotate }) => (
        <ToyBlock
          key={letter}
          x={x}
          y={y}
          width={SIZE}
          height={SIZE}
          rx={10}
          fill={fill}
          rotate={rotate}
          shine
        >
          <Glyph x={x + SIZE / 2} y={y + SIZE / 2} size={32}>
            {letter}
          </Glyph>
        </ToyBlock>
      ))}
    </TileArtFrame>
  );
}
