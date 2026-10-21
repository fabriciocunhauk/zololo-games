import type { StaticImageData } from "next/image";
import memoryImage from "@/public/images/memory-game/memory-cards.svg";
import animalsImage from "@/public/images/animals/duck.png";
import frogImage from "@/public/images/frog-jump/frog.svg";
import bubblesImage from "@/public/images/bubble-pop/bubbles.svg";
import letterSoundsImage from "@/public/images/letter-sounds/letter-sounds.svg";
import shapeSorterImage from "@/public/images/shape-sorter/shape-sorter.svg";
import patternTrainImage from "@/public/images/pattern-train/pattern-train.svg";
import oddOneOutImage from "@/public/images/odd-one-out/odd-one-out.svg";

export type Game = {
  name: string;
  href: string;
  image: StaticImageData;
  /** What the game practises, shown as the tile's eyebrow. */
  skill: string;
  /** CSS colour for the home tile. */
  tile: string;
};

export const GAMES: ReadonlyArray<Game> = Object.freeze([
  {
    name: "Memory Cards",
    href: "/memory-game",
    image: memoryImage,
    skill: "Memory",
    tile: "var(--color-pink-primary)",
  },
  {
    name: "Count the Animals",
    href: "/count-the-animals",
    image: animalsImage,
    skill: "Counting",
    tile: "var(--color-sky)",
  },
  {
    name: "Frog Jump",
    href: "/frog-jump",
    image: frogImage,
    skill: "Number line",
    tile: "var(--color-leaf)",
  },
  {
    name: "Bubble Pop",
    href: "/bubble-pop",
    image: bubblesImage,
    skill: "Adding & taking away",
    tile: "var(--color-sun)",
  },
  {
    name: "Odd One Out",
    href: "/odd-one-out",
    image: oddOneOutImage,
    skill: "Spot the difference",
    tile: "var(--color-leaf)",
  },
  {
    name: "Letter Sounds",
    href: "/letter-sounds",
    image: letterSoundsImage,
    skill: "Phonics",
    tile: "var(--color-tangerine)",
  },
  {
    name: "Shape Sorter",
    href: "/shape-sorter",
    image: shapeSorterImage,
    skill: "Shapes",
    tile: "var(--color-sky)",
  },
  {
    name: "Pattern Train",
    href: "/pattern-train",
    image: patternTrainImage,
    skill: "Patterns",
    tile: "var(--color-grape)",
  },
]);
