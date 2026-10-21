import Marble from "@/app/components/Marble";
import Sparkle from "./Sparkle";
import TileArtFrame from "./TileArtFrame";
import TileMonster from "./TileMonster";
import ToyBlock from "./ToyBlock";
import { monsterNamed } from "./monsterNamed";
import { GROUND_Y } from "./tileGeometry";

const CARD_W = 52;
const CARD_H = 64;
const CARD_Y = GROUND_Y - 4 - CARD_H;

/** Home tile for Memory Cards: a face-down card, a face-up card and a monster peeking over. */
export default function MemoryCardsArt({ className }: { className?: string }) {
  const backX = 22;
  const frontX = 84;

  return (
    <TileArtFrame className={className}>
      <TileMonster
        monster={monsterNamed("Boo")}
        cx={44}
        bottom={50}
        size={48}
        rotate={-12}
      />

      <ToyBlock
        x={backX}
        y={CARD_Y}
        width={CARD_W}
        height={CARD_H}
        fill="fill-grape"
        rotate={-9}
      >
        <Marble cx={backX + 26} cy={CARD_Y + 22} r={8.5} fill="fill-sky" />
        <Marble cx={backX + 14.5} cy={CARD_Y + 42} r={8.5} fill="fill-sun" />
        <Marble cx={backX + 37.5} cy={CARD_Y + 42} r={8.5} fill="fill-leaf" />
      </ToyBlock>

      <ToyBlock
        x={frontX}
        y={CARD_Y - 2}
        width={CARD_W}
        height={CARD_H}
        fill="fill-white"
        rotate={8}
      >
        <TileMonster
          monster={monsterNamed("Nim")}
          cx={frontX + CARD_W / 2}
          bottom={CARD_Y + CARD_H - 6}
          size={54}
        />
      </ToyBlock>

      <Sparkle x={144} y={22} size={9} fill="fill-sun" />
    </TileArtFrame>
  );
}
