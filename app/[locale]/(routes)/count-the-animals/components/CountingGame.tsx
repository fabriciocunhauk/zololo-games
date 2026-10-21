"use client";
import AnswerOptions from "@/app/components/AnswerOptions";
import Container from "@/app/components/Container";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HowToPlay from "@/app/components/HowToPlay";
import StarMeter from "@/app/components/StarMeter";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { useLocale, useMessages } from "@/app/i18n/LocaleProvider";
import { countingHowToPlay } from "../constants/howToPlay";
import { COUNTING_TEXT } from "../constants/text";
import { useCountingGame } from "../hooks/useCountingGame";
import AnimalField from "./AnimalField";
import AnimalParade from "./AnimalParade";
import CountingQuestion from "./CountingQuestion";

export default function CountingGame() {
  const game = useCountingGame();
  const [difficulty, setDifficulty] = useDifficulty("count-the-animals");
  const locale = useLocale();
  const title = useMessages().games["count-the-animals"].name;
  const text = COUNTING_TEXT[locale];
  const howToPlay = <HowToPlay {...countingHowToPlay(locale)} />;

  if (!game.difficulty || !game.round) {
    return (
      <GameIntro
        hero={<AnimalParade />}
        title={title}
        blurb={text.blurb}
        howToPlay={howToPlay}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStart={() => game.start(difficulty)}
      />
    );
  }

  const { round, counted, selected } = game;
  const isAnswered = selected !== null;

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
              caption={text.caption(game.levelMax)}
            />
          }
          howToPlay={howToPlay}
        />
        <CountingQuestion
          animal={round.animal}
          countedSoFar={counted.length}
          canRecount={!isAnswered}
          onCountAgain={game.countAgain}
        />
        <AnimalField
          animal={round.animal}
          total={round.answer}
          counted={counted}
          disabled={isAnswered}
          onCount={game.countAnimal}
        />
        <AnswerOptions
          options={round.options}
          onSelect={game.answer}
          disabled={isAnswered}
          selected={selected}
          correctAnswer={round.answer}
        />
        <FeedbackMessage feedback={game.feedback} />
      </Container>
    </main>
  );
}
