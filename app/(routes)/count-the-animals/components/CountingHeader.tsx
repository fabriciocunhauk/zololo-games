import { COUNTING_CONFIG } from "../constants/config";

type CountingHeaderProps = {
  level: number;
  levelMax: number;
  stars: number;
};

export default function CountingHeader({
  level,
  levelMax,
  stars,
}: CountingHeaderProps) {
  const total = COUNTING_CONFIG.roundsPerLevel;

  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-4">
      <h1 className="font-display text-3xl sm:text-4xl">Count the Animals</h1>
      <div className="rounded-xl border-[3px] border-ink bg-white px-3 py-1.5 shadow-[0_4px_0_var(--color-ink)]">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em]">
          Level <span data-testid="level">{level}</span> · up to {levelMax}
        </p>
        <p
          role="img"
          aria-label={`${stars} of ${total} stars`}
          data-testid="stars"
          data-stars={stars}
          className="text-xl leading-tight tracking-wider"
        >
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={i < stars ? "text-ink" : "text-ink/20"}>
              ★
            </span>
          ))}
        </p>
      </div>
    </header>
  );
}
