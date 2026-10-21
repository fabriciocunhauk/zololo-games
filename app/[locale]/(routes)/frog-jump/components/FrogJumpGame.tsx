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
import { frogJumpHowToPlay } from "../constants/howToPlay";
import { FROG_JUMP_TEXT } from "../constants/text";
import { useFrogJumpGame } from "../hooks/useFrogJumpGame";
import FrogPond from "./FrogPond";
import NumberLine from "./NumberLine";
import ProblemDisplay from "./ProblemDisplay";

export default function FrogJumpGame() {
  const game = useFrogJumpGame();
  const [difficulty, setDifficulty] = useDifficulty("frog-jump");
  const locale = useLocale();
  const title = useMessages().games["frog-jump"].name;
  const text = FROG_JUMP_TEXT[locale];

  if (!game.difficulty || !game.problem) {
    return (
      <GameIntro
        hero={<FrogPond />}
        title={title}
        blurb={text.blurb}
        howToPlay={<HowToPlay {...frogJumpHowToPlay(locale)} />}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStart={() => game.start(difficulty)}
      />
    );
  }

  const { problem, selected } = game;
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
              caption={text.caption(game.maxJump)}
            />
          }
        />
        <ProblemDisplay
          start={problem.start}
          operation={problem.operation}
          jump={problem.jump}
        />
        <NumberLine
          line={game.settings.line}
          start={problem.start}
          landing={isAnswered ? problem.answer : null}
        />
        <AnswerOptions
          options={problem.options}
          onSelect={game.answer}
          disabled={isAnswered}
          selected={selected}
          correctAnswer={problem.answer}
        />
        <FeedbackMessage feedback={game.feedback} />
      </Container>
    </main>
  );
}
