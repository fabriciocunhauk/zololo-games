import type { ReactNode } from "react";
import { classNames } from "@/app/utils/appearance";

export type HowToPlayStep = { text: string; picture: ReactNode };

type HowToPlayProps = {
  steps: ReadonlyArray<HowToPlayStep>;
  tip?: ReactNode;
  className?: string;
};

/** Numbered, illustrated steps. The numbers are real: steps happen in order. */
export default function HowToPlay({ steps, tip, className }: HowToPlayProps) {
  return (
    <section
      aria-labelledby="how-to-play"
      className={classNames(
        "w-full rounded-3xl border-[3px] border-ink bg-white p-5 sm:p-8 text-left shadow-[0_8px_0_var(--color-ink)]",
        className
      )}
    >
      <h2 id="how-to-play" className="font-display text-2xl sm:text-3xl">
        How to play
      </h2>
      <ol className="mt-6 grid gap-6 sm:grid-cols-3">
        {steps.map(({ text, picture }, idx) => (
          <li key={text} className="flex gap-4 sm:flex-col">
            <div className="flex w-26 shrink-0 items-center gap-2 sm:w-auto">
              {picture}
            </div>
            <p className="flex gap-2 text-base sm:text-lg">
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm text-paper"
              >
                {idx + 1}
              </span>
              <span>{text}</span>
            </p>
          </li>
        ))}
      </ol>
      {tip && (
        <p className="mt-6 rounded-2xl bg-sun/40 px-4 py-3 text-sm sm:text-base">
          <strong>Tip:</strong> {tip}
        </p>
      )}
    </section>
  );
}
