import type { ReactNode } from "react";
import { withPictures } from "@/app/components/HowToPlay";
import type { Locale } from "@/app/i18n/locales";
import FrogArt from "../components/FrogArt";
import LilyPad from "../components/LilyPad";
import { FROG_JUMP_TEXT } from "./text";

/** One picture per step, in the same order as the text's steps. */
const pictures: ReadonlyArray<ReactNode> = [
  <span key="start" className="flex w-16 flex-col items-center">
    <FrogArt className="relative z-10 -mb-2 w-11" />
    <LilyPad value={3} isStart className="w-16" />
  </span>,
  <span key="hops" className="flex w-24 flex-col">
    <svg aria-hidden viewBox="0 0 96 30" className="w-full">
      <path
        d="M16 28 Q48 -8 80 26"
        fill="none"
        className="stroke-ink"
        strokeWidth={3}
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      <path
        d="M72 21 L80 27 L82 17"
        fill="none"
        className="stroke-ink"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="flex">
      <LilyPad value={3} isStart className="w-8" />
      <LilyPad value={4} className="w-8" />
      <LilyPad value={5} className="w-8" />
    </span>
  </span>,
  <span
    key="tap"
    className="flex h-14 w-12 items-center justify-center rounded-xl border-[3px] border-ink bg-white font-display text-2xl shadow-[0_4px_0_var(--color-ink)] sm:w-14"
  >
    5
  </span>,
];

export function frogJumpHowToPlay(locale: Locale) {
  return withPictures(FROG_JUMP_TEXT[locale].howToPlay, pictures);
}
