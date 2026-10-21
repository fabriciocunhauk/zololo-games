"use client";
import Container from "@/app/components/Container";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HowToPlay from "@/app/components/HowToPlay";
import StarMeter from "@/app/components/StarMeter";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { ODD_HOW_TO_PLAY } from "../constants/howToPlay";
import { useOddOneOutGame } from "../hooks/useOddOneOutGame";
import MonsterGrid from "./MonsterGrid";
import OddParade from "./OddParade";

export default function OddOneOutGame() {
  const game = useOddOneOutGame();
  const [difficulty, setDifficulty] = useDifficulty("odd-one-out");

  if (!game.difficulty || !game.round) {
    return (
      <GameIntro
        hero={<OddParade />}
        title="Odd One Out"
        blurb="The monsters are all dressed alike… except one! Look closely and tap the monster that's different."
        howToPlay={<HowToPlay {...ODD_HOW_TO_PLAY} />}
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
          title="Odd One Out"
          difficulty={game.difficulty}
          onChangeDifficulty={game.quit}
          meter={
            <StarMeter
              level={game.level}
              stars={game.stars}
              total={game.roundsPerLevel}
              caption={`${game.count} monsters`}
            />
          }
          howToPlay={<HowToPlay {...ODD_HOW_TO_PLAY} />}
        />
        <p
          data-testid="question"
          className="font-display text-2xl sm:text-3xl text-center"
        >
          Which monster is different?
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
