"use client";
import AnswerOptions from "@/app/components/AnswerOptions";
import Container from "@/app/components/Container";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HowToPlay from "@/app/components/HowToPlay";
import StarMeter from "@/app/components/StarMeter";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { FROG_JUMP_HOW_TO_PLAY } from "../constants/howToPlay";
import { useFrogJumpGame } from "../hooks/useFrogJumpGame";
import FrogPond from "./FrogPond";
import NumberLine from "./NumberLine";
import ProblemDisplay from "./ProblemDisplay";

export default function FrogJumpGame() {
  const game = useFrogJumpGame();
  const [difficulty, setDifficulty] = useDifficulty("frog-jump");

  if (!game.difficulty || !game.problem) {
    return (
      <GameIntro
        hero={<FrogPond />}
        title="Frog Jump"
        blurb="Help the frog hop from pad to pad. Read the jump, work out where it lands, then tap the number!"
        howToPlay={<HowToPlay {...FROG_JUMP_HOW_TO_PLAY} />}
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
          title="Frog Jump"
          difficulty={game.difficulty}
          onChangeDifficulty={game.quit}
          meter={
            <StarMeter
              level={game.level}
              stars={game.stars}
              total={game.roundsPerLevel}
              caption={`jumps up to ${game.maxJump}`}
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
