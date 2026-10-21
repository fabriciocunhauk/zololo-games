import type { Monster } from "@/app/components/monsters/monsters";
import MonsterArt from "@/app/components/monsters/MonsterArt";
import { classNames } from "@/app/utils/appearance";

/** A small, static grid tile for the how-to-play pictures. */
export default function MiniTile({
  monster,
  ringed = false,
}: {
  monster: Monster;
  ringed?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={classNames(
        "flex aspect-square w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-ink bg-white p-0.5 shadow-[0_3px_0_var(--color-ink)] sm:w-14",
        ringed && "ring-4 ring-leaf ring-offset-1"
      )}
    >
      <MonsterArt monster={monster} className="h-full w-full" />
    </span>
  );
}
