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
import { useLocale, useMessages } from "@/app/i18n/LocaleProvider";
import { shapeSorterHowToPlay } from "../constants/howToPlay";
import { SHAPE_TEXT } from "../constants/text";
import { useShapeSorterGame } from "../hooks/useShapeSorterGame";
import ShapeParade from "./ShapeParade";
import ShapeTray from "./ShapeTray";
import SortingBins from "./SortingBins";

export default function ShapeSorterGame() {
  const game = useShapeSorterGame();
  const [difficulty, setDifficulty] = useDifficulty("shape-sorter");
  const locale = useLocale();
  const title = useMessages().games["shape-sorter"].name;
  const text = SHAPE_TEXT[locale];

  if (!game.difficulty || !game.round) {
    return (
      <GameIntro
        hero={<ShapeParade />}
        title={title}
        blurb={text.blurb}
        howToPlay={<HowToPlay {...shapeSorterHowToPlay(locale)} />}
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
          title={title}
          difficulty={game.difficulty}
          onChangeDifficulty={game.quit}
          meter={
            <StarMeter
              level={game.level}
              stars={game.stars}
              total={game.roundsPerLevel}
              caption={text.caption[settings.sortBy]}
            />
          }
          stats={
            <Stat
              label={text.sorted}
              value={`${game.sorted}/${game.total}`}
              testId="sorted"
            />
          }
        />
        <h2
          data-testid="question"
          className="text-center font-display text-2xl sm:text-4xl"
        >
          {text.question[settings.sortBy]}
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
