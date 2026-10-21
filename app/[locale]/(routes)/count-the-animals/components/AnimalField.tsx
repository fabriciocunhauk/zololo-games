"use client";
import type { Animal } from "../constants/animals";
import AnimalTile from "./AnimalTile";

type AnimalFieldProps = {
  animal: Animal;
  total: number;
  counted: ReadonlyArray<number>;
  disabled: boolean;
  onCount: (position: number) => void;
};

/** Animals in rows of five, like a ten-frame, so groups are easy to see. */
export default function AnimalField({
  animal,
  total,
  counted,
  disabled,
  onCount,
}: AnimalFieldProps) {
  return (
    <div className="grid w-full max-w-lg grid-cols-5 gap-3 sm:gap-4 rounded-3xl border-[3px] border-ink bg-sky/30 p-3 sm:p-5">
      {Array.from({ length: total }, (_, position) => {
        const order = counted.indexOf(position);
        const count = order === -1 ? undefined : order + 1;
        return (
          <button
            key={position}
            type="button"
            data-testid="animal"
            aria-label={
              count === undefined
                ? `${animal.name}, not counted yet`
                : `${animal.name}, counted ${count}`
            }
            disabled={disabled}
            onClick={() => onCount(position)}
            className="rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:cursor-default enabled:motion-safe:active:translate-y-[3px] transition-transform"
          >
            <AnimalTile kind={animal.kind} count={count} />
          </button>
        );
      })}
    </div>
  );
}
