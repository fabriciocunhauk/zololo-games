"use client";
import FeedbackMessage from "@/app/components/FeedbackMessage";
import { useBubblePopGame } from "../hooks/useBubblePopGame";
import BubbleField from "./BubbleField";
import CountdownOverlay from "./CountdownOverlay";
import FloatingBackground from "./FloatingBackground";
import GameControls from "./GameControls";
import StartScreen from "./StartScreen";

export default function BubblePopGame() {
  const {
    gameState,
    countdown,
    problem,
    bubbles,
    feedback,
    score,
    isProcessingClick,
    gameAreaRef,
    startGame,
    resetGame,
    popBubble,
  } = useBubblePopGame();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4 sm:p-8 xl:p-10 overflow-hidden">
      <FloatingBackground />

      <div className="relative z-10 w-full max-w-full sm:max-w-3xl xl:max-w-6xl flex flex-col items-center">
        {gameState === "countdown" && (
          <CountdownOverlay countdown={countdown} />
        )}

        {gameState === "playing" && (
          <div className="w-full flex flex-col items-center">
            <BubbleField
              bubbles={bubbles}
              problem={problem}
              isProcessingClick={isProcessingClick}
              onPop={popBubble}
              areaRef={gameAreaRef}
            />
            <FeedbackMessage feedback={feedback} />
          </div>
        )}

        <GameControls
          gameState={gameState}
          score={score}
          onStart={startGame}
          onReset={resetGame}
        />

        {gameState === "idle" && <StartScreen />}
      </div>
    </main>
  );
}
