import { classNames } from "@/app/utils/appearance";
import type { Monster } from "../constants/monsters";
import MonsterArt from "./MonsterArt";

/** Face-up side: the monster, its name when there's room, and a tick once matched. */
export default function CardFront({
  monster,
  isMatched,
}: {
  monster: Monster;
  isMatched: boolean;
}) {
  return (
    <span
      className={classNames(
        "@container relative flex h-full w-full flex-col items-center justify-center rounded-2xl border-[3px] border-ink p-[6%] transition-colors",
        isMatched ? "bg-leaf/35" : "bg-white"
      )}
    >
      <MonsterArt monster={monster} className="w-full min-h-0 flex-1" />
      <span className="hidden @min-[96px]:block font-display text-sm leading-none">
        {monster.name}
      </span>
      {isMatched && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="absolute -right-2 -top-2 w-7 rounded-full border-[3px] border-ink bg-leaf p-0.5"
        >
          <path
            d="M5 12.5 L10 17 L19 7"
            fill="none"
            className="stroke-ink"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
