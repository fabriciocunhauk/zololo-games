"use client";
import AnswerOptions from "@/app/components/AnswerOptions";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import ScorePrompt from "@/app/components/ScorePrompt";
import { useCountTheCrittersGame } from "../hooks/useCountTheCrittersGame";
import CritterGrid from "./CritterGrid";

export default function CountTheCrittersGame() {
  const { round, feedback, isAnimating, score, selectOption } =
    useCountTheCrittersGame();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 bg-blue-200 text-gray-700">
      <CritterGrid critters={round?.critters ?? []} />
      <ScorePrompt prompt="How many critters do you see?" score={score} />
      <AnswerOptions
        options={round?.options ?? []}
        onSelect={selectOption}
        disabled={isAnimating}
      />
      <FeedbackMessage feedback={feedback} />
    </main>
  );
}
