import type { StaticImageData } from "next/image";
import bandit from "@/public/images/memory-game/bandit.png";
import bingoInSpace from "@/public/images/memory-game/bingo-in-space.png";
import bingo from "@/public/images/memory-game/bingo.png";
import blueyBingoFamily from "@/public/images/memory-game/bluey-bingo-family.avif";
import blueyBingoWrestling from "@/public/images/memory-game/bluey-bingo-wrestling.png";
import blueyFamilyHousePorch from "@/public/images/memory-game/bluey-family-house-porch.jpeg";
import bluey from "@/public/images/memory-game/bluey.jpg";
import chloe from "@/public/images/memory-game/chloe.webp";
import coco from "@/public/images/memory-game/coco.webp";
import dougie from "@/public/images/memory-game/dougie.jpg";
import indy from "@/public/images/memory-game/indy.webp";
import mackenzie from "@/public/images/memory-game/mackenzie.webp";
import missy from "@/public/images/memory-game/missy.webp";
import muffin from "@/public/images/memory-game/muffin.webp";
import playingNailPolish from "@/public/images/memory-game/playng-nail-polish.png";
import queenMummy from "@/public/images/memory-game/queen-mummy.png";
import rusty from "@/public/images/memory-game/rusty.webp";
import snickers from "@/public/images/memory-game/snickers.webp";
import socks from "@/public/images/memory-game/socks.webp";
import winton from "@/public/images/memory-game/winton.webp";

export type CardFace = { image: StaticImageData; name: string };

export const CARD_FACES: ReadonlyArray<CardFace> = Object.freeze([
  { image: bandit, name: "Bandit" },
  { image: bingoInSpace, name: "Bingo in space" },
  { image: bingo, name: "Bingo" },
  { image: blueyBingoFamily, name: "Bluey and Bingo's family" },
  { image: blueyBingoWrestling, name: "Bluey and Bingo wrestling" },
  { image: blueyFamilyHousePorch, name: "Bluey's family on the porch" },
  { image: bluey, name: "Bluey" },
  { image: chloe, name: "Chloe" },
  { image: coco, name: "Coco" },
  { image: dougie, name: "Dougie" },
  { image: indy, name: "Indy" },
  { image: mackenzie, name: "Mackenzie" },
  { image: missy, name: "Missy" },
  { image: muffin, name: "Muffin" },
  { image: playingNailPolish, name: "Playing with nail polish" },
  { image: queenMummy, name: "Queen Mummy" },
  { image: rusty, name: "Rusty" },
  { image: snickers, name: "Snickers" },
  { image: socks, name: "Socks" },
  { image: winton, name: "Winton" },
]);
