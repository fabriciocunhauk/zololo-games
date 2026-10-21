import AnimalArt, { type AnimalKind } from "@/app/components/animals/AnimalArt";
import { classNames } from "@/app/utils/appearance";

type AnimalTileProps = {
  kind: AnimalKind;
  /** The number this animal was counted as, if it has been counted. */
  count?: number;
  className?: string;
};

/** An animal on a white tile; counted animals turn yellow and wear their number. */
export default function AnimalTile({
  kind,
  count,
  className,
}: AnimalTileProps) {
  const isCounted = count !== undefined;

  return (
    <span
      className={classNames(
        "relative flex aspect-square items-center justify-center rounded-2xl border-[3px] border-ink shadow-[0_4px_0_var(--color-ink)] transition-colors",
        isCounted ? "bg-sun" : "bg-white",
        className
      )}
    >
      <AnimalArt kind={kind} className="w-3/5 h-auto" />
      {isCounted && (
        <span
          aria-hidden
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-paper bg-ink font-display text-base leading-none text-paper motion-safe:animate-[pop_200ms_ease-out]"
        >
          {count}
        </span>
      )}
    </span>
  );
}
