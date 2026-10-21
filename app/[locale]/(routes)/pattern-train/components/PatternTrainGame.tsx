"use client";
import { useReducedMotion } from "framer-motion";
import { useState } from "react";
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
import { useLocale, useMessages } from "@/app/i18n/LocaleProvider";
import { patternTrainHowToPlay } from "../constants/howToPlay";
import { PATTERN_TEXT } from "../constants/text";
import { usePatternTrainGame } from "../hooks/usePatternTrainGame";
import TrainStation from "./Train";
import TrainHero from "./TrainHero";

const monsterName = (monster: Monster) => monster.name;
const renderMonster = (monster: Monster) => (
  <MonsterArt monster={monster} className="h-14 w-14 sm:h-20 sm:w-20" />
);

export default function PatternTrainGame() {
  const game = usePatternTrainGame();
  const [difficulty, setDifficulty] = useDifficulty("pattern-train");
  const reduceMotion = useReducedMotion();
  const locale = useLocale();
  const title = useMessages().games["pattern-train"].name;
  const text = PATTERN_TEXT[locale];
  const howToPlay = <HowToPlay {...patternTrainHowToPlay(locale)} />;
  /** The last train to pull in. Until the current one has, the options wait. */
  const [arrivedTrain, setArrivedTrain] = useState(0);

  if (!game.difficulty || !game.round) {
    return (
      <GameIntro
        hero={<TrainHero />}
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
  const boarding = !reduceMotion && arrivedTrain !== game.trainId;

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
              caption={text.caption(game.carriageCount)}
            />
          }
          howToPlay={howToPlay}
        />
        <TrainStation
          trainId={game.trainId}
          carriages={round.carriages}
          answer={round.answer}
          solved={game.solved}
          onArrive={setArrivedTrain}
        />
        <p className="text-center font-display text-2xl sm:text-3xl">
          {text.question.before}{" "}
          <span
            aria-hidden
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-dashed border-ink bg-white align-middle"
          >
            ?
          </span>
          <span className="sr-only">{text.question.hidden}</span>{" "}
          {text.question.after}
        </p>
        <AnswerOptions
          label={text.optionsLabel}
          options={game.options}
          onSelect={game.answer}
          disabled={game.solved || boarding}
          isOptionDisabled={game.isTried}
          selected={game.selected}
          correctAnswer={round.answer}
          optionKey={monsterName}
          optionLabel={monsterName}
          renderOption={renderMonster}
        />
        <FeedbackMessage feedback={game.feedback} />
      </Container>
    </main>
  );
}
