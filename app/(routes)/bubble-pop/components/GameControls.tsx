import Button from "@/app/components/Button";
import type { GameState } from "../hooks/useBubblePopGame";
import ScoreDisplay from "./ScoreDisplay";

const controlClasses =
  "text-white font-bold rounded-full shadow-lg text-xl transition-all hover:scale-105 hover:shadow-xl bg-gradient-to-r";

export default function GameControls({
  gameState,
  score,
  onStart,
  onReset,
}: {
  gameState: GameState;
  score: number;
  onStart: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center gap-5 mt-10">
      <ScoreDisplay score={score} />
      {gameState === "idle" ? (
        <Button
          onClick={onStart}
          classes={{
            button: `${controlClasses} from-pink-400 to-pink-500 hover:from-purple-500 hover:to-pink-400`,
          }}
        >
          Start game
        </Button>
      ) : (
        <Button
          onClick={onReset}
          classes={{
            button: `${controlClasses} from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600`,
          }}
        >
          Reset game
        </Button>
      )}
    </div>
  );
}
