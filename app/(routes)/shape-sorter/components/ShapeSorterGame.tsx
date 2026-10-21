"use client";
import { MotionConfig } from "framer-motion";
import Container from "@/app/components/Container";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HowToPlay from "@/app/components/HowToPlay";
import StarMeter from "@/app/components/StarMeter";
import Stat from "@/app/components/Stat";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { SHAPE_HOW_TO_PLAY } from "../constants/howToPlay";
import { useShapeSorterGame } from "../hooks/useShapeSorterGame";
import ShapeParade from "./ShapeParade";
import ShapeTray from "./ShapeTray";
import SortingBins from "./SortingBins";

const TITLE = "Shape Sorter";

export default function ShapeSorterGame() {
  const game = useShapeSorterGame();
  const [difficulty, setDifficulty] = useDifficulty("shape-sorter");

  if (!game.difficulty || !game.round) {
    return (
      <GameIntro
        hero={<ShapeParade />}
        title={TITLE}
        blurb="Shapes are rolling along the conveyor belt! Tap the right bin to sort each one by colour, by shape or by how many sides it has."
        howToPlay={<HowToPlay {...SHAPE_HOW_TO_PLAY} />}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStart={() => game.start(difficulty)}
      />
    );
  }

  const { settings, round } = game;

  return (
    <main className="flex-1 pt-24 pb-20 sm:pt-28">
      <Container
        size="md"
        classes={{
          container: "flex flex-col items-center gap-6 px-4 sm:px-10",
        }}
      >
        <GameHeader
          title={TITLE}
          difficulty={game.difficulty}
          onChangeDifficulty={game.quit}
          meter={
            <StarMeter
              level={game.level}
              stars={game.stars}
              total={game.roundsPerLevel}
              caption={settings.caption}
            />
          }
          stats={
            <Stat
              label="Sorted"
              value={`${game.sorted}/${game.total}`}
              testId="sorted"
            />
          }
        />
        <h2
          data-testid="question"
          className="text-center font-display text-2xl sm:text-4xl"
        >
          {settings.question}
        </h2>
        {/* Reduced motion: shapes appear and land without flying. */}
        <MotionConfig reducedMotion="user">
          <ShapeTray
            shape={game.shape}
            shapeKey={game.shapeKey}
            sortBy={settings.sortBy}
            isComplete={game.phase === "complete"}
          />
          <SortingBins
            bins={round.bins}
            counts={game.counts}
            dropped={game.dropped}
            shake={game.shake}
            busy={game.phase !== "sorting"}
            onSort={game.sort}
          />
        </MotionConfig>
        <FeedbackMessage feedback={game.feedback} />
      </Container>
    </main>
  );
}
