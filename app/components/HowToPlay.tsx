"use client";
import type { ReactNode } from "react";
import { useMessages } from "@/app/i18n/LocaleProvider";
import { classNames } from "@/app/utils/appearance";

export type HowToPlayStep = { text: string; picture: ReactNode };

/**
 * Pairs each translated step with its picture, in order. The counts must
 * match, or a picture would land on the wrong step.
 */
export function withPictures(
  { steps, tip }: { steps: ReadonlyArray<string>; tip: string },
  pictures: ReadonlyArray<ReactNode>
) {
  if (steps.length !== pictures.length) {
    throw new Error(
      `How to play has ${steps.length} steps but ${pictures.length} pictures.`
    );
  }
  return {
    steps: steps.map((text, idx) => ({ text, picture: pictures[idx] })),
    tip,
  };
}

type HowToPlayProps = {
  steps: ReadonlyArray<HowToPlayStep>;
  tip?: ReactNode;
  className?: string;
};

/** Numbered, illustrated steps. The numbers are real: steps happen in order. */
export default function HowToPlay({ steps, tip, className }: HowToPlayProps) {
  const text = useMessages().howToPlay;

  return (
    <section
      aria-labelledby="how-to-play"
      className={classNames(
        "w-full rounded-3xl border-[3px] border-ink bg-white p-5 sm:p-8 text-left shadow-[0_8px_0_var(--color-ink)]",
        className
      )}
    >
      <h2 id="how-to-play" className="font-display text-2xl sm:text-3xl">
        {text.heading}
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
          <strong>{text.tip}</strong> {tip}
        </p>
      )}
    </section>
  );
}
