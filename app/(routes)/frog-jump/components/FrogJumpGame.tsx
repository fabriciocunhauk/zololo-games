"use client";
import AnswerOptions from "@/app/components/AnswerOptions";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import ScorePrompt from "@/app/components/ScorePrompt";
import { FROG_JUMP_CONFIG } from "../constants/config";
import { useFrogJumpGame } from "../hooks/useFrogJumpGame";
import { getNumberLinePosition } from "../utils/getNumberLinePosition";
import FrogCharacter from "./FrogCharacter";
import NumberLine from "./NumberLine";
import ProblemDisplay from "./ProblemDisplay";

const getPosition = (value: number) =>
  getNumberLinePosition(
    value,
    FROG_JUMP_CONFIG.max,
    FROG_JUMP_CONFIG.lineWidthRatio
  );

export default function FrogJumpGame() {
  const { problem, selection, feedback, isAnimating, score, selectOption } =
    useFrogJumpGame();
  const frogValue =
    problem && isAnimating && feedback ? problem.answer : problem?.start;

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-green-200 text-gray-700 overflow-hidden px-4">
      {problem && (
        <ProblemDisplay
          start={problem.start}
          operation={problem.operation}
          jump={problem.jump}
        />
      )}

      <NumberLine max={FROG_JUMP_CONFIG.max} getPosition={getPosition}>
        {frogValue !== undefined && (
          <FrogCharacter left={getPosition(frogValue)} />
        )}
      </NumberLine>

      <ScorePrompt
        prompt="Click on the number where the frog lands!"
        score={score}
      />

      <AnswerOptions
        options={problem?.options ?? []}
        onSelect={selectOption}
        disabled={isAnimating || selection !== null}
        selected={selection}
        correctAnswer={problem?.answer}
      />

      <FeedbackMessage feedback={feedback} />
    </main>
  );
}
