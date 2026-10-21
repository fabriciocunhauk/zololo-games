"use client";
import Container from "@/app/components/Container";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HowToPlay from "@/app/components/HowToPlay";
import StarMeter from "@/app/components/StarMeter";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { useLocale, useMessages } from "@/app/i18n/LocaleProvider";
import { oddOneOutHowToPlay } from "../constants/howToPlay";
import { ODD_TEXT } from "../constants/text";
import { useOddOneOutGame } from "../hooks/useOddOneOutGame";
import MonsterGrid from "./MonsterGrid";
import OddParade from "./OddParade";

export default function OddOneOutGame() {
  const game = useOddOneOutGame();
  const [difficulty, setDifficulty] = useDifficulty("odd-one-out");
  const locale = useLocale();
  const title = useMessages().games["odd-one-out"].name;
  const text = ODD_TEXT[locale];
  const howToPlay = <HowToPlay {...oddOneOutHowToPlay(locale)} />;

  if (!game.difficulty || !game.round) {
    return (
      <GameIntro
        hero={<OddParade />}
        title={title}
        blurb={text.blurb}
        howToPlay={howToPlay}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStart={() => game.start(difficulty)}
      />
    );
  }

  const { round } = game;

  return (
    <main className="flex-1 pt-24 pb-20 sm:pt-28">
      <Container
        size="md"
        classes={{
          container: "flex flex-col items-center gap-6 px-4 sm:px-10",
        }}
      >
        <GameHeader
          title={title}
          difficulty={game.difficulty}
          onChangeDifficulty={game.quit}
          meter={
            <StarMeter
              level={game.level}
              stars={game.stars}
              total={game.roundsPerLevel}
              caption={text.caption(game.count)}
            />
          }
          howToPlay={howToPlay}
        />
        <p
          data-testid="question"
          className="font-display text-2xl sm:text-3xl text-center"
        >
          {text.question}
        </p>
        <MonsterGrid
          roundId={round.id}
          tiles={round.tiles}
          oddIndex={round.oddIndex}
          wrongTaps={game.wrongTaps}
          outcome={game.outcome}
          onTap={game.tap}
        />
        <FeedbackMessage feedback={game.feedback} />
      </Container>
    </main>
  );
}
