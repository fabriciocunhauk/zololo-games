"use client";
import Container from "@/app/components/Container";
import { useMemoryGame } from "../hooks/useMemoryGame";
import GameHeader from "./GameHeader";
import IntroScreen from "./IntroScreen";
import MemoryBoard from "./MemoryBoard";

export default function MemoryGame() {
  const game = useMemoryGame();

  if (!game.hasStarted) return <IntroScreen onStart={game.start} />;

  return (
    <main className="flex-1 pt-24 pb-20 sm:pt-28">
      <Container
        size="md"
        classes={{ container: "flex flex-col gap-8 px-4 sm:px-10" }}
      >
        <GameHeader
          level={game.level}
          pairsFound={game.pairsFound}
          totalPairs={game.totalPairs}
          moves={game.moves}
          onRestart={game.restartLevel}
        />
        {game.deck.length === 0 ? (
          <p className="py-10 text-center text-lg font-bold">
            Shuffling the cards…
          </p>
        ) : (
          <MemoryBoard
            deck={game.deck}
            cardState={game.cardState}
            onFlip={game.flipCard}
            gameWon={game.gameWon}
            nextStep={
              game.isLastLevel
                ? "That was the last level! Here comes a fresh set of cards…"
                : `Get ready for level ${game.level + 1}…`
            }
          />
        )}
      </Container>
    </main>
  );
}
