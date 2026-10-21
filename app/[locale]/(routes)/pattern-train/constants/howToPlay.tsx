import { withPictures } from "@/app/components/HowToPlay";
import { Fragment, type ReactNode } from "react";
import { MONSTERS } from "@/app/components/monsters/monsters";
import MonsterArt from "@/app/components/monsters/MonsterArt";
import type { Locale } from "@/app/i18n/locales";
import TrainCarriage from "../components/TrainCarriage";
import { PATTERN_TEXT } from "./text";

const [pip, bop] = MONSTERS;
const mini = "w-12 sm:w-14";

/** One picture per step, in the same order as the text's steps. */
const pictures: ReadonlyArray<ReactNode> = [
  <Fragment key="pattern">
    <TrainCarriage monster={pip} className={mini} />
    <TrainCarriage monster={bop} className={mini} />
  </Fragment>,
  <Fragment key="gap">
    <TrainCarriage monster={pip} className={mini} />
    <TrainCarriage monster={null} gap className={mini} />
  </Fragment>,
  <span
    key="tap"
    className="flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-ink bg-white p-1 shadow-[0_4px_0_var(--color-ink)] sm:h-16 sm:w-16"
  >
    <MonsterArt monster={bop} className="w-full" />
  </span>,
];

export function patternTrainHowToPlay(locale: Locale) {
  return withPictures(PATTERN_TEXT[locale].howToPlay, pictures);
}
