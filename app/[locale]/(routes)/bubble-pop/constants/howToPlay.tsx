import { withPictures } from "@/app/components/HowToPlay";
import { Fragment, type ReactNode } from "react";
import type { Locale } from "@/app/i18n/locales";
import BubbleArt from "../components/BubbleArt";
import { BUBBLE_POP_TEXT } from "./text";

const mini = "w-12 sm:w-14 text-xl";

/** One picture per step, in the same order as the text's steps. */
const pictures: ReadonlyArray<ReactNode> = [
  <span
    key="sum"
    className="rounded-xl border-[3px] border-ink bg-white px-2 py-2 font-display text-lg leading-none whitespace-nowrap shadow-[0_3px_0_var(--color-ink)]"
  >
    2+3=?
  </span>,
  <Fragment key="bubbles">
    <BubbleArt fill="fill-sky" className={`${mini} mt-4`}>
      4
    </BubbleArt>
    <BubbleArt fill="fill-grape" className={mini}>
      5
    </BubbleArt>
  </Fragment>,
  <span key="pop" className="relative">
    <BubbleArt fill="fill-grape" className={mini}>
      5
    </BubbleArt>
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="absolute -inset-3 overflow-visible"
    >
      <g className="stroke-ink" strokeWidth={6} strokeLinecap="round">
        <path d="M50 2 V12" />
        <path d="M88 20 L80 27" />
        <path d="M12 20 L20 27" />
        <path d="M98 55 H88" />
        <path d="M2 55 H12" />
      </g>
    </svg>
  </span>,
];

export function bubblePopHowToPlay(locale: Locale) {
  return withPictures(BUBBLE_POP_TEXT[locale].howToPlay, pictures);
}
