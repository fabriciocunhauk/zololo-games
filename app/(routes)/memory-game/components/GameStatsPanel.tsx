import { classNames } from "@/app/utils/appearance";

type Stat = { label: string; value: number; className: string };

export default function GameStatsPanel({
  level,
  score,
  moves,
  onReset,
}: {
  level: number;
  score: number;
  moves: number;
  onReset: () => void;
}) {
  const stats: Stat[] = [
    { label: "Level", value: level, className: "text-green-400" },
    { label: "Score", value: score, className: "text-pink-400 -rotate-12" },
    { label: "Moves", value: moves, className: "text-yellow-400 rotate-12" },
  ];

  return (
    <div className="flex flex-row lg:flex-col gap-4 sm:gap-8 items-center justify-center order-2 lg:order-1">
      {stats.map(({ label, value, className }) => (
        <div
          key={label}
          className="text-base sm:text-2xl font-bold flex flex-col items-center"
        >
          {label}
          <span
            data-testid={label.toLowerCase()}
            className={classNames(
              "font-extrabold text-4xl sm:text-5xl xl:text-6xl",
              className
            )}
          >
            {value}
          </span>
        </div>
      ))}
      <button
        type="button"
        className="bg-pink-primary text-white px-4 py-2 rounded-lg shadow hover:bg-pink-400 transition text-sm sm:text-base focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink"
        onClick={onReset}
      >
        Reset game
      </button>
    </div>
  );
}
