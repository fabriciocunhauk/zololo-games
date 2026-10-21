import type { ReactNode } from "react";
import { withPictures } from "@/app/components/HowToPlay";
import type { Locale } from "@/app/i18n/locales";
import BinPicture from "../components/BinPicture";
import ShapeArt from "../components/ShapeArt";
import { COLOUR_BINS, SHAPE_BINS } from "./bins";
import { SHAPE_TEXT } from "./text";

const miniBin =
  "relative flex h-14 w-12 flex-col items-center justify-center rounded-xl border-[3px] border-ink bg-white shadow-[0_4px_0_var(--color-ink)] sm:w-14";
const triangles =
  SHAPE_BINS.find((bin) => bin.id === "triangle") ?? SHAPE_BINS[0];

/** One picture per step, in the same order as the text's steps. */
const pictures: ReadonlyArray<ReactNode> = [
  <span
    key="belt"
    className="flex h-14 w-24 flex-col justify-end overflow-hidden rounded-xl border-[3px] border-ink bg-sky/30 sm:w-28"
  >
    <ShapeArt kind="triangle" colour="sky" className="mx-auto mb-0.5 w-9" />
    <span className="h-2.5 border-t-[3px] border-ink bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_8px,var(--color-grape)_8px_16px)]" />
  </span>,
  <span key="bins" className="contents">
    <span className={miniBin}>
      <BinPicture picture={COLOUR_BINS.sun.picture} className="w-7" />
    </span>
    <span className={miniBin}>
      <BinPicture picture={triangles.picture} className="w-8" />
    </span>
  </span>,
  <span key="star" className="contents">
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
  </span>,
];

export function shapeSorterHowToPlay(locale: Locale) {
  return withPictures(SHAPE_TEXT[locale].howToPlay, pictures);
}
