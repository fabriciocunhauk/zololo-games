"use client";
import AnswerOptions from "@/app/components/AnswerOptions";
import Container from "@/app/components/Container";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HowToPlay from "@/app/components/HowToPlay";
import type { Monster } from "@/app/components/monsters/monsters";
import MonsterArt from "@/app/components/monsters/MonsterArt";
import StarMeter from "@/app/components/StarMeter";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { PATTERN_HOW_TO_PLAY } from "../constants/howToPlay";
import { usePatternTrainGame } from "../hooks/usePatternTrainGame";
import TrainStation from "./Train";
import TrainHero from "./TrainHero";

const TITLE = "Pattern Train";
const monsterName = (monster: Monster) => monster.name;
const renderMonster = (monster: Monster) => (
  <MonsterArt monster={monster} className="h-14 w-14 sm:h-20 sm:w-20" />
);

export default function PatternTrainGame() {
  const game = usePatternTrainGame();
  const [difficulty, setDifficulty] = useDifficulty("pattern-train");

  if (!game.difficulty || !game.round) {
    return (
      <GameIntro
        hero={<TrainHero />}
        title={TITLE}
        blurb="All aboard! The monsters ride the train in a pattern. Spot who's missing and help the train chuff along."
        howToPlay={<HowToPlay {...PATTERN_HOW_TO_PLAY} />}
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
          title={TITLE}
          difficulty={game.difficulty}
          onChangeDifficulty={game.quit}
          meter={
            <StarMeter
              level={game.level}
              stars={game.stars}
              total={game.roundsPerLevel}
              caption={`${game.carriageCount} carriages`}
            />
          }
          howToPlay={<HowToPlay {...PATTERN_HOW_TO_PLAY} />}
        />
        <TrainStation
          trainId={game.trainId}
          carriages={round.carriages}
          answer={round.answer}
          solved={game.solved}
        />
        <p
          id="pattern-question"
          className="text-center font-display text-2xl sm:text-3xl"
        >
          Who rides in the{" "}
          <span
            aria-hidden
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-dashed border-ink bg-white align-middle"
          >
            ?
          </span>
          <span className="sr-only">empty</span> carriage?
        </p>
        <div
          role="group"
          aria-labelledby="pattern-question"
          className="flex w-full justify-center"
        >
          <AnswerOptions
            options={game.options}
            onSelect={game.answer}
            disabled={game.solved}
            selected={game.selected}
            correctAnswer={round.answer}
            optionKey={monsterName}
            optionLabel={monsterName}
            renderOption={renderMonster}
          />
        </div>
        <FeedbackMessage feedback={game.feedback} />
      </Container>
    </main>
  );
}
