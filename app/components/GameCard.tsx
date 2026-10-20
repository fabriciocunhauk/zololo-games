import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/app/constants/games";
import { classNames } from "@/app/utils/appearance";

type GameCardProps = {
  game: Game;
  tilt: "left" | "right";
  priority?: boolean;
};

export default function GameCard({ game, tilt, priority }: GameCardProps) {
  const style: CSSProperties & { "--tile": string } = { "--tile": game.tile };

  return (
    <Link
      href={game.href}
      style={style}
      className={classNames(
        "toy-block group flex flex-col h-full p-4 pb-5 text-ink",
        tilt === "left" ? "motion-safe:-rotate-1" : "motion-safe:rotate-1"
      )}
    >
      <span className="self-start rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.12em]">
        {game.skill}
      </span>
      <span className="flex flex-1 items-center justify-center py-3 sm:py-5">
        <Image
          src={game.image}
          alt=""
          height={112}
          priority={priority}
          className="h-20 sm:h-28 w-auto object-contain drop-shadow-md motion-safe:transition-transform motion-safe:group-hover:scale-105"
        />
      </span>
      <span className="font-display text-2xl leading-tight">{game.name}</span>
    </Link>
  );
}
