import type { HowToPlayStep } from "@/app/components/HowToPlay";
import BinPicture from "../components/BinPicture";
import ShapeArt from "../components/ShapeArt";
import { COLOUR_BINS, SHAPE_BINS } from "./bins";

const miniBin =
  "relative flex h-14 w-12 flex-col items-center justify-center rounded-xl border-[3px] border-ink bg-white shadow-[0_4px_0_var(--color-ink)] sm:w-14";
const triangles =
  SHAPE_BINS.find((bin) => bin.id === "triangle") ?? SHAPE_BINS[0];

const steps: ReadonlyArray<HowToPlayStep> = [
  {
    text: "A shape rides along the conveyor belt. Look at it closely!",
    picture: (
      <span className="flex h-14 w-24 flex-col justify-end overflow-hidden rounded-xl border-[3px] border-ink bg-sky/30 sm:w-28">
        <ShapeArt kind="triangle" colour="sky" className="mx-auto mb-0.5 w-9" />
        <span className="h-2.5 border-t-[3px] border-ink bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_8px,var(--color-grape)_8px_16px)]" />
      </span>
    ),
  },
  {
    text: "Tap the bin it belongs in. Wrong bin? It wiggles, so try another!",
    picture: (
      <>
        <span className={miniBin}>
          <BinPicture picture={COLOUR_BINS.sun.picture} className="w-7" />
        </span>
        <span className={miniBin}>
          <BinPicture picture={triangles.picture} className="w-8" />
        </span>
      </>
    ),
  },
  {
    text: "Sort 10 shapes to finish a round and earn a star. 3 stars and you go up a level!",
    picture: (
      <>
        <span className={miniBin}>
          <BinPicture picture={triangles.picture} className="w-8" />
          <span
            aria-hidden
            className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-paper bg-ink font-display text-xs text-paper"
          >
            10
          </span>
        </span>
        <span
          aria-hidden
          className="text-4xl leading-none text-sun drop-shadow-[0_3px_0_var(--color-ink)]"
        >
          ★
        </span>
      </>
    ),
  },
];

export const SHAPE_HOW_TO_PLAY = Object.freeze({
  steps,
  tip: "every round you finish earns a star, even if some shapes needed a second try. Easy sorts by colour, Medium by shape and Hard by how many sides.",
});
