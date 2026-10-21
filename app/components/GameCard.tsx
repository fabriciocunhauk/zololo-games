import type { CSSProperties } from "react";
import Link from "next/link";
import type { Game } from "@/app/constants/games";
import { localeHref, type Locale } from "@/app/i18n/locales";
import { MESSAGES } from "@/app/i18n/messages";
import { classNames } from "@/app/utils/appearance";

type GameCardProps = {
  game: Game;
  locale: Locale;
  tilt: "left" | "right";
};

export default function GameCard({ game, locale, tilt }: GameCardProps) {
  const { Art } = game;
  const { name, skill } = MESSAGES[locale].games[game.slug];
  const style: CSSProperties & { "--tile": string } = { "--tile": game.tile };

  return (
    <Link
      href={localeHref(locale, game.href)}
      style={style}
      className={classNames(
        "toy-block group flex flex-col h-full p-4 pb-5 text-ink",
        tilt === "left" ? "motion-safe:-rotate-1" : "motion-safe:rotate-1"
      )}
    >
      <span className="self-start rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.12em]">
        {skill}
      </span>
      <span className="flex flex-1 items-center justify-center py-3 sm:py-5">
        <Art className="h-24 sm:h-32 w-auto motion-safe:transition-transform motion-safe:group-hover:scale-105" />
      </span>
      <span className="font-display text-2xl leading-tight">{name}</span>
    </Link>
  );
}
