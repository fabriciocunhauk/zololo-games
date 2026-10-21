import type { ComponentType } from "react";
import BubblePopArt from "@/app/components/gameArt/BubblePopArt";
import CountTheAnimalsArt from "@/app/components/gameArt/CountTheAnimalsArt";
import FrogJumpArt from "@/app/components/gameArt/FrogJumpArt";
import LetterSoundsArt from "@/app/components/gameArt/LetterSoundsArt";
import MemoryCardsArt from "@/app/components/gameArt/MemoryCardsArt";
import OddOneOutArt from "@/app/components/gameArt/OddOneOutArt";
import PatternTrainArt from "@/app/components/gameArt/PatternTrainArt";
import ShapeSorterArt from "@/app/components/gameArt/ShapeSorterArt";

export type Game = {
  name: string;
  href: string;
  /** Home tile illustration. Decorative. */
  Art: ComponentType<{ className?: string }>;
  /** What the game practises, shown as the tile's eyebrow. */
  skill: string;
  /** CSS colour for the home tile. */
  tile: string;
};

export const GAMES: ReadonlyArray<Game> = Object.freeze([
  {
    name: "Memory Cards",
    href: "/memory-game",
    Art: MemoryCardsArt,
    skill: "Memory",
    tile: "var(--color-pink-primary)",
  },
  {
    name: "Count the Animals",
    href: "/count-the-animals",
    Art: CountTheAnimalsArt,
    skill: "Counting",
    tile: "var(--color-sky)",
  },
  {
    name: "Frog Jump",
    href: "/frog-jump",
    Art: FrogJumpArt,
    skill: "Number line",
    tile: "var(--color-leaf)",
  },
  {
    name: "Bubble Pop",
    href: "/bubble-pop",
    Art: BubblePopArt,
    skill: "Adding & taking away",
    tile: "var(--color-sun)",
  },
  {
    name: "Odd One Out",
    href: "/odd-one-out",
    Art: OddOneOutArt,
    skill: "Spot the difference",
    tile: "var(--color-leaf)",
  },
  {
    name: "Letter Sounds",
    href: "/letter-sounds",
    Art: LetterSoundsArt,
    skill: "Phonics",
    tile: "var(--color-tangerine)",
  },
  {
    name: "Shape Sorter",
    href: "/shape-sorter",
    Art: ShapeSorterArt,
    skill: "Shapes",
    tile: "var(--color-sky)",
  },
  {
    name: "Pattern Train",
    href: "/pattern-train",
    Art: PatternTrainArt,
    skill: "Patterns",
    tile: "var(--color-grape)",
  },
]);
