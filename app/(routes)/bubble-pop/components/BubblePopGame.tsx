"use client";
import Container from "@/app/components/Container";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HeaderButton from "@/app/components/HeaderButton";
import HowToPlay from "@/app/components/HowToPlay";
import StarMeter from "@/app/components/StarMeter";
import Stat from "@/app/components/Stat";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { BUBBLE_POP_HOW_TO_PLAY } from "../constants/howToPlay";
import { useBubblePopGame } from "../hooks/useBubblePopGame";
import BubbleCluster from "./BubbleCluster";
import BubbleField from "./BubbleField";
import CountdownOverlay from "./CountdownOverlay";
import MathProblem from "./MathProblem";

export default function BubblePopGame() {
  const game = useBubblePopGame();
  const [difficulty, setDifficulty] = useDifficulty("bubble-pop");

  if (!game.difficulty) {
    return (
      <GameIntro
        hero={<BubbleCluster />}
        title="Bubble Pop"
        blurb="Number bubbles are floating up! Work out the sum, then pop the bubble with the right answer before it drifts away."
        howToPlay={<HowToPlay {...BUBBLE_POP_HOW_TO_PLAY} />}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStart={() => game.start(difficulty)}
      />
    );
  }

  return (
    <main className="flex-1 pt-24 pb-20 sm:pt-28">
      <Container
        size="md"
        classes={{
          container: "flex flex-col items-center gap-6 px-4 sm:px-10",
        }}
      >
        <GameHeader
          title="Bubble Pop"
          difficulty={game.difficulty}
          onChangeDifficulty={game.quit}
          meter={
            <StarMeter
              level={game.level}
              stars={game.stars}
              total={game.roundsPerLevel}
            />
          }
          stats={<Stat label="Score" value={game.score} testId="score" />}
          actions={
            <HeaderButton onClick={game.restart}>Reset game</HeaderButton>
          }
        />
        <MathProblem problem={game.problem} roundId={game.roundId} />
        <BubbleField
          bubbles={game.bubbles}
          roundId={game.roundId}
          poppedId={game.poppedId}
          disabled={game.isLocked}
          onPop={game.popBubble}
          areaRef={game.areaRef}
        />
        <FeedbackMessage feedback={game.feedback} />
      </Container>
      <CountdownOverlay countdown={game.countdown} />
    </main>
  );
}
