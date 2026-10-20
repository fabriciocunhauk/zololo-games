import HowToPlay from "@/app/components/HowToPlay";
import { MEMORY_HOW_TO_PLAY } from "../constants/howToPlay";

type GameHeaderProps = {
  level: number;
  pairsFound: number;
  totalPairs: number;
  moves: number;
  onRestart: () => void;
};

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-16 rounded-xl border-[3px] border-ink bg-white px-3 py-1.5 text-center shadow-[0_4px_0_var(--color-ink)]">
      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em]">
        {label}
      </dt>
      <dd
        data-testid={label.toLowerCase()}
        className="text-2xl font-extrabold leading-tight"
      >
        {value}
      </dd>
    </div>
  );
}

export default function GameHeader({
  level,
  pairsFound,
  totalPairs,
  moves,
  onRestart,
}: GameHeaderProps) {
  return (
    <header className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl sm:text-4xl">Memory Cards</h1>
        <div className="flex flex-wrap items-center gap-3">
          <dl className="flex gap-2 sm:gap-3">
            <Stat label="Level" value={level} />
            <Stat label="Pairs" value={`${pairsFound}/${totalPairs}`} />
            <Stat label="Moves" value={moves} />
          </dl>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-xl border-[3px] border-ink bg-pink-primary px-4 py-3 font-bold shadow-[0_4px_0_var(--color-ink)] transition-transform active:translate-y-[3px] active:shadow-[0_1px_0_var(--color-ink)] motion-reduce:transition-none motion-reduce:active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            Restart level
          </button>
        </div>
      </div>

      <details className="group">
        <summary className="w-fit cursor-pointer rounded-lg font-bold underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink">
          <span className="group-open:hidden">Show how to play</span>
          <span className="hidden group-open:inline">Hide how to play</span>
        </summary>
        <HowToPlay {...MEMORY_HOW_TO_PLAY} className="mt-4" />
      </details>
    </header>
  );
}
