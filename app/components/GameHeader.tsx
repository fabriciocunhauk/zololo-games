import type { CSSProperties, ReactNode } from "react";
import { difficultyOption, type Difficulty } from "@/app/constants/difficulty";
import HeaderButton from "./HeaderButton";
import ScrollToTop from "./ScrollToTop";

type GameHeaderProps = {
  title: string;
  difficulty: Difficulty;
  /** Back to the intro to pick another difficulty. */
  onChangeDifficulty: () => void;
  /** `<Stat>`s, wrapped in a `<dl>` here. */
  stats?: ReactNode;
  /** A `<StarMeter>`. */
  meter?: ReactNode;
  /** Extra buttons, e.g. a restart. */
  actions?: ReactNode;
  /** A `<HowToPlay>` that can be reopened mid-game. */
  howToPlay?: ReactNode;
};

/** In-game header: title, difficulty chip, stats and actions. */
export default function GameHeader({
  title,
  difficulty,
  onChangeDifficulty,
  stats,
  meter,
  actions,
  howToPlay,
}: GameHeaderProps) {
  const option = difficultyOption(difficulty);
  const chipStyle: CSSProperties = { background: option.tile };

  return (
    <header className="flex w-full flex-col gap-3 sm:gap-4">
      <ScrollToTop />
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:flex-col sm:items-start sm:gap-2">
          <h1 className="font-display text-2xl sm:text-4xl">{title}</h1>
          <p
            data-testid="difficulty"
            style={chipStyle}
            className="rounded-full border-[3px] border-ink px-2.5 py-0.5 text-xs font-bold sm:px-3 sm:text-sm"
          >
            {option.label} · {option.ages}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {meter}
          {stats && <dl className="flex gap-2 sm:gap-3">{stats}</dl>}
          {actions}
          <HeaderButton tone="bg-white" onClick={onChangeDifficulty}>
            Change difficulty
          </HeaderButton>
        </div>
      </div>

      {howToPlay && (
        <details className="group">
          <summary className="w-fit cursor-pointer rounded-lg font-bold underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink">
            <span className="group-open:hidden">Show how to play</span>
            <span className="hidden group-open:inline">Hide how to play</span>
          </summary>
          <div className="mt-4">{howToPlay}</div>
        </details>
      )}
    </header>
  );
}
