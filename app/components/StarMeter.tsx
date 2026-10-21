type StarMeterProps = {
  level: number;
  stars: number;
  total: number;
  /** Extra detail after the level, e.g. "up to 10". */
  caption?: string;
};

/** Level number and a row of stars earned towards the next level. */
export default function StarMeter({
  level,
  stars,
  total,
  caption,
}: StarMeterProps) {
  return (
    <div className="rounded-xl border-[3px] border-ink bg-white px-2 py-1 sm:px-3 sm:py-1.5 shadow-[0_4px_0_var(--color-ink)]">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em]">
        Level <span data-testid="level">{level}</span>
        {caption && ` · ${caption}`}
      </p>
      <p
        role="img"
        aria-label={`${stars} of ${total} stars`}
        data-testid="stars"
        data-stars={stars}
        className="text-lg leading-tight tracking-wider sm:text-xl"
      >
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={i < stars ? "text-ink" : "text-ink/20"}>
            ★
          </span>
        ))}
      </p>
    </div>
  );
}
