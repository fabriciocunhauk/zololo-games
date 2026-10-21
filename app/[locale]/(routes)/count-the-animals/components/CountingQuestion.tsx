"use client";
import AnimalArt from "@/app/components/animals/AnimalArt";
import { useLocale } from "@/app/i18n/LocaleProvider";
import type { Animal } from "../constants/animals";
import { COUNTING_TEXT } from "../constants/text";

type CountingQuestionProps = {
  animal: Animal;
  countedSoFar: number;
  canRecount: boolean;
  onCountAgain: () => void;
};

const smallButton =
  "rounded-xl border-[3px] border-ink bg-white px-3 py-2 text-sm font-bold shadow-[0_3px_0_var(--color-ink)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink";

export default function CountingQuestion({
  animal,
  countedSoFar,
  canRecount,
  onCountAgain,
}: CountingQuestionProps) {
  const locale = useLocale();
  const text = COUNTING_TEXT[locale];
  const names = animal.names[locale];

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-3">
        <AnimalArt kind={animal.kind} className="w-10 sm:w-12 h-auto" />
        <h2
          data-testid="question"
          className="font-display text-3xl sm:text-5xl"
        >
          {text.question(names)}
        </h2>
      </div>
      <div className="flex min-h-11 flex-wrap items-center justify-center gap-3">
        <p className="text-base sm:text-lg" aria-live="polite">
          {countedSoFar === 0
            ? text.tapEach(names)
            : text.countedSoFar(countedSoFar)}
        </p>
        {canRecount && countedSoFar > 0 && (
          <button type="button" onClick={onCountAgain} className={smallButton}>
            {text.countAgain}
          </button>
        )}
      </div>
    </div>
  );
}
