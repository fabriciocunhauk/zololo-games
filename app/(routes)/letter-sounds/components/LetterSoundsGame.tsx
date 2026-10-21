"use client";
import AnswerOptions from "@/app/components/AnswerOptions";
import Container from "@/app/components/Container";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import GameHeader from "@/app/components/GameHeader";
import GameIntro from "@/app/components/GameIntro";
import HowToPlay from "@/app/components/HowToPlay";
import StarMeter from "@/app/components/StarMeter";
import { useDifficulty } from "@/app/hooks/useDifficulty";
import { classNames } from "@/app/utils/appearance";
import { LETTER_DIFFICULTY } from "../constants/config";
import { LETTER_HOW_TO_PLAY } from "../constants/howToPlay";
import { useLetterSoundsGame } from "../hooks/useLetterSoundsGame";
import LetterBlocksHero from "./LetterBlocksHero";
import PictureCard from "./PictureCard";
import SpellingBoard from "./SpellingBoard";

const TITLE = "Letter Sounds";

export default function LetterSoundsGame() {
  const game = useLetterSoundsGame();
  const [difficulty, setDifficulty] = useDifficulty("letter-sounds");

  if (!game.difficulty || !game.round) {
    return (
      <GameIntro
        hero={<LetterBlocksHero />}
        title={TITLE}
        blurb="Apple, ball, cat… Look at the picture, listen to the word and find the letter it starts with!"
        howToPlay={<HowToPlay {...LETTER_HOW_TO_PLAY} />}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        onStart={() => game.start(difficulty)}
      />
    );
  }

  const { round } = game;
  const settings = LETTER_DIFFICULTY[game.difficulty];
  const isChoose = round.kind === "choose";

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
        />
        <h2
          data-testid="question"
          className="text-center font-display text-2xl sm:text-4xl"
        >
          {isChoose ? "Which letter does it start with?" : "Spell the word"}
        </h2>
        <PictureCard
          word={round.word}
          wordDisplay={
            settings.mode === "choose" && settings.showWord
              ? "blanked"
              : "hidden"
          }
          revealed={isChoose && game.locked}
          canSpeak={game.canSpeak}
          onHear={game.hear}
        />
        {round.kind === "choose" ? (
          <AnswerOptions
            options={round.options}
            onSelect={game.answer}
            disabled={game.locked}
            selected={game.selected}
            correctAnswer={round.answer}
            optionLabel={(letter) => letter}
            renderOption={(letter) => (
              <span
                className={classNames(
                  "flex h-12 min-w-12 items-center justify-center rounded-xl px-2 sm:h-16 sm:min-w-16",
                  game.locked && letter === round.answer && "bg-leaf"
                )}
              >
                {letter}
              </span>
            )}
          />
        ) : (
          <SpellingBoard
            word={round.word.word}
            bank={round.bank}
            placed={game.placed}
            usedTiles={game.usedTiles}
            shake={game.shake}
            disabled={game.locked}
            onPick={game.pickTile}
          />
        )}
        <FeedbackMessage feedback={game.feedback} />
      </Container>
    </main>
  );
}
