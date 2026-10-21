import type { CSSProperties } from "react";
import { classNames } from "@/app/utils/appearance";
import type { Monster } from "@/app/components/monsters/monsters";
import type { CardState } from "../hooks/useMemoryGame";
import type { MemoryCardData } from "../utils/createShuffledDeck";
import { getBoardAspect, getBoardLayout } from "../utils/getBoardLayout";
import MemoryCard from "./MemoryCard";
import MonsterArt from "@/app/components/monsters/MonsterArt";

type MemoryBoardProps = {
  deck: ReadonlyArray<MemoryCardData<Monster>>;
  cardState: (idx: number) => CardState;
  onFlip: (idx: number) => void;
  gameWon: boolean;
  nextStep: string;
};

const MAX_CELEBRATING = 6;

export default function MemoryBoard({
  deck,
  cardState,
  onFlip,
  gameWon,
  nextStep,
}: MemoryBoardProps) {
  if (gameWon) {
    const found = deck
      .filter(
        (card, idx) => deck.findIndex((c) => c.pairId === card.pairId) === idx
      )
      .slice(0, MAX_CELEBRATING);

    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border-[3px] border-ink bg-white px-6 py-10 text-center shadow-[0_8px_0_var(--color-ink)]"
      >
        <div aria-hidden className="flex flex-wrap justify-center gap-2">
          {found.map(({ face }, idx) => (
            <MonsterArt
              key={face.name}
              monster={face}
              className="w-14 sm:w-16 motion-safe:animate-bounce"
              style={{ animationDelay: `${idx * 120}ms` }}
            />
          ))}
        </div>
        <p className="font-display text-3xl sm:text-4xl">
          You found every pair! 🎉
        </p>
        <p className="text-lg text-ink/80">{nextStep}</p>
      </div>
    );
  }

  // On landscape screens, keep the whole board within the window height.
  const boardStyle = {
    "--board-aspect": getBoardAspect(deck.length),
  } as CSSProperties;

  return (
    <div
      style={boardStyle}
      className={classNames(
        "mx-auto grid w-full justify-items-center gap-3 sm:gap-5",
        "landscape:max-w-[max(20rem,calc((100svh-18rem)*var(--board-aspect)))]",
        getBoardLayout(deck.length)
      )}
    >
      {deck.map((card, idx) => (
        <MemoryCard
          key={card.id}
          monster={card.face}
          position={idx + 1}
          state={cardState(idx)}
          onFlip={() => onFlip(idx)}
        />
      ))}
    </div>
  );
}
