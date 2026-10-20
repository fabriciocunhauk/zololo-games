import type { StaticImageData } from "next/image";
import memoryImage from "@/public/images/memory-game/bluey-bingo-family.avif";
import crittersImage from "@/public/images/critters/bear.png";
import frogImage from "@/public/images/frog-jump/frog.png";
import bubblesImage from "@/public/images/bubble-pop/bubbles.png";

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
    name: "Count the Critters",
    href: "/count-the-critters",
    image: crittersImage,
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
]);
