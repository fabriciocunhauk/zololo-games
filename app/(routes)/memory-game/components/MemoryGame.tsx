"use client";
import Container from "@/app/components/Container";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HeaderButton from "@/app/components/HeaderButton";
import HowToPlay from "@/app/components/HowToPlay";
import Stat from "@/app/components/Stat";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { MEMORY_HOW_TO_PLAY } from "../constants/howToPlay";
import { useMemoryGame } from "../hooks/useMemoryGame";
import MemoryBoard from "./MemoryBoard";
import MonsterParade from "./MonsterParade";

export default function MemoryGame() {
  const game = useMemoryGame();
  const [difficulty, setDifficulty] = useDifficulty("memory-game");

  if (!game.difficulty) {
    return (
      <GameIntro
        hero={<MonsterParade />}
        title="Memory Cards"
        blurb="Meet the Zololo monsters! Every monster has a twin hiding under the cards. Can you find them all?"
        howToPlay={<HowToPlay {...MEMORY_HOW_TO_PLAY} />}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStart={() => game.start(difficulty)}
      />
    );
  }

  const nextStep = game.isLastLevel
    ? "That was the last level! Here comes a fresh set of cards…"
    : `Get ready for level ${game.level + 1}…`;
  const live = game.gameWon
    ? { text: `You found every pair! ${nextStep}`, key: "won" }
    : game.announcement && {
        text: game.announcement.text,
        key: String(game.announcement.nonce),
      };

  return (
    <main className="flex-1 pt-24 pb-20 sm:pt-28">
      <Container
        size="md"
        classes={{ container: "flex flex-col gap-8 px-4 sm:px-10" }}
      >
        <GameHeader
          title="Memory Cards"
          difficulty={game.difficulty}
          onChangeDifficulty={game.quit}
          stats={
            <>
              <Stat label="Level" value={game.level} />
              <Stat
                label="Pairs"
                value={`${game.pairsFound}/${game.totalPairs}`}
              />
              <Stat label="Moves" value={game.moves} />
            </>
          }
          actions={
            // Hidden while celebrating: the next level is already on its way.
            !game.gameWon && (
              <HeaderButton onClick={game.restartLevel}>
                Restart level
              </HeaderButton>
            )
          }
          howToPlay={<HowToPlay {...MEMORY_HOW_TO_PLAY} />}
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
            nextStep={nextStep}
          />
        )}
        {/* One live region for matches and the win, mounted all game so
            every message is read. Keyed so a repeat is read again. */}
        <p role="status" className="sr-only">
          {live && <span key={live.key}>{live.text}</span>}
        </p>
      </Container>
    </main>
  );
}
