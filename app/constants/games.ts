import type { ComponentType } from "react";
import BubblePopArt from "@/app/components/gameArt/BubblePopArt";
import CountTheAnimalsArt from "@/app/components/gameArt/CountTheAnimalsArt";
import FrogJumpArt from "@/app/components/gameArt/FrogJumpArt";
import LetterSoundsArt from "@/app/components/gameArt/LetterSoundsArt";
import MemoryCardsArt from "@/app/components/gameArt/MemoryCardsArt";
import OddOneOutArt from "@/app/components/gameArt/OddOneOutArt";
import PatternTrainArt from "@/app/components/gameArt/PatternTrainArt";
import ShapeSorterArt from "@/app/components/gameArt/ShapeSorterArt";
import type { GameSlug } from "@/app/i18n/messages";

/** A game's name and skill are in `MESSAGES[locale].games[slug]`. */
export type Game = {
  slug: GameSlug;
  /** Path without a locale prefix. */
  href: string;
  /** Home tile illustration. Decorative. */
  Art: ComponentType<{ className?: string }>;
  /** CSS colour for the home tile. */
  tile: string;
};

export const GAMES: ReadonlyArray<Game> = Object.freeze([
  {
    slug: "memory-game",
    href: "/memory-game",
    Art: MemoryCardsArt,
    tile: "var(--color-pink-primary)",
  },
  {
    slug: "count-the-animals",
    href: "/count-the-animals",
    Art: CountTheAnimalsArt,
    tile: "var(--color-sky)",
  },
  {
    slug: "frog-jump",
    href: "/frog-jump",
    Art: FrogJumpArt,
    tile: "var(--color-leaf)",
  },
  {
    slug: "bubble-pop",
    href: "/bubble-pop",
    Art: BubblePopArt,
    tile: "var(--color-sun)",
  },
  {
    slug: "odd-one-out",
    href: "/odd-one-out",
    Art: OddOneOutArt,
    tile: "var(--color-leaf)",
  },
  {
    slug: "letter-sounds",
    href: "/letter-sounds",
    Art: LetterSoundsArt,
    tile: "var(--color-tangerine)",
  },
  {
    slug: "shape-sorter",
    href: "/shape-sorter",
    Art: ShapeSorterArt,
    tile: "var(--color-sky)",
  },
  {
    slug: "pattern-train",
    href: "/pattern-train",
    Art: PatternTrainArt,
    tile: "var(--color-grape)",
  },
]);
