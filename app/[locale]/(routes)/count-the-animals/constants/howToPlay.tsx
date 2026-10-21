import { withPictures } from "@/app/components/HowToPlay";
import { Fragment, type ReactNode } from "react";
import type { Locale } from "@/app/i18n/locales";
import AnimalTile from "../components/AnimalTile";
import { COUNTING_TEXT } from "./text";

const mini = "w-12 sm:w-14";

/** One picture per step, in the same order as the text's steps. */
const pictures: ReadonlyArray<ReactNode> = [
  <Fragment key="look">
    <AnimalTile kind="duck" className={mini} />
    <AnimalTile kind="duck" className={mini} />
  </Fragment>,
  <Fragment key="count">
    <AnimalTile kind="duck" count={1} className={mini} />
    <AnimalTile kind="duck" count={2} className={mini} />
  </Fragment>,
  <span
    key="tap"
    className="flex h-14 w-12 items-center justify-center rounded-xl border-4 border-pink-primary bg-white font-display text-2xl shadow-lg sm:w-14"
  >
    2
  </span>,
];

export function countingHowToPlay(locale: Locale) {
  return withPictures(COUNTING_TEXT[locale].howToPlay, pictures);
}
