"use client";
import Container from "@/app/components/Container";
import { classNames } from "@/app/utils/appearance";
import { useMemoryGame } from "../hooks/useMemoryGame";
import { getBoardLayout } from "../utils/getBoardLayout";
import GameStatsPanel from "./GameStatsPanel";
import MemoryCard from "./MemoryCard";

export default function MemoryGame() {
  const { level, deck, score, moves, gameWon, isFaceUp, flipCard, reset } =
    useMemoryGame();

  if (deck.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16">
        <h1 className="font-display text-3xl md:text-4xl text-pink-primary mb-4 text-center">
          Memory Cards
        </h1>
        <p className="text-lg font-bold text-gray-700">Shuffling the cards…</p>
      </main>
    );
  }

  const { columns, aspect } = getBoardLayout(deck.length);

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 gap-4 sm:gap-8">
      <GameStatsPanel
        level={level}
        score={score}
        moves={moves}
        onReset={reset}
      />

      <div className="order-1 lg:order-2 w-full max-w-6xl">
        <Container
          classes={{
            container: classNames("grid gap-3 sm:gap-4 md:gap-6", columns),
          }}
        >
          {gameWon ? (
            <p
              role="status"
              className="font-display text-xl sm:text-2xl md:text-3xl text-green-600 motion-safe:animate-bounce col-span-full text-center py-8"
            >
              You won! 🎉 Leveling up…
            </p>
          ) : (
            deck.map((card, idx) => (
              <MemoryCard
                key={card.id}
                face={card.face}
                position={idx + 1}
                isFaceUp={isFaceUp(idx)}
                aspect={aspect}
                onFlip={() => flipCard(idx)}
              />
            ))
          )}
        </Container>
      </div>
    </main>
  );
}
