"use client";
import Container from "@/app/components/Container";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HeaderButton from "@/app/components/HeaderButton";
import HowToPlay from "@/app/components/HowToPlay";
import Stat from "@/app/components/Stat";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { useLocale, useMessages } from "@/app/i18n/LocaleProvider";
import { memoryHowToPlay } from "../constants/howToPlay";
import { MEMORY_TEXT } from "../constants/text";
import { useMemoryGame } from "../hooks/useMemoryGame";
import MemoryBoard from "./MemoryBoard";
import MonsterParade from "./MonsterParade";

export default function MemoryGame() {
  const game = useMemoryGame();
  const [difficulty, setDifficulty] = useDifficulty("memory-game");
  const locale = useLocale();
  const messages = useMessages();
  const title = messages.games["memory-game"].name;
  const text = MEMORY_TEXT[locale];

  if (!game.difficulty) {
    return (
      <GameIntro
        hero={<MonsterParade />}
        title={title}
        blurb={text.blurb}
        howToPlay={<HowToPlay {...memoryHowToPlay(locale)} />}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStart={() => game.start(difficulty)}
      />
    );
  }

  const nextStep = game.isLastLevel
    ? text.lastLevel
    : text.nextLevel(game.level + 1);
  const live = game.gameWon
    ? { text: `${text.won} ${nextStep}`, key: "won" }
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
          title={title}
          difficulty={game.difficulty}
          onChangeDifficulty={game.quit}
          stats={
            <>
              <Stat
                label={messages.meter.level}
                value={game.level}
                testId="level"
              />
              <Stat
                label={text.pairs}
                value={`${game.pairsFound}/${game.totalPairs}`}
                testId="pairs"
              />
              <Stat label={text.moves} value={game.moves} testId="moves" />
            </>
          }
          actions={
            // Hidden while celebrating: the next level is already on its way.
            !game.gameWon && (
              <HeaderButton onClick={game.restartLevel}>
                {text.restart}
              </HeaderButton>
            )
          }
          howToPlay={<HowToPlay {...memoryHowToPlay(locale)} />}
        />
        {game.deck.length === 0 ? (
          <p className="py-10 text-center text-lg font-bold">
            {text.shuffling}
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
