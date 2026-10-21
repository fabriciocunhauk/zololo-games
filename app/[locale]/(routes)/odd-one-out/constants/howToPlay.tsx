import { withPictures } from "@/app/components/HowToPlay";
import { Fragment, type ReactNode } from "react";
import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";
import type { Locale } from "@/app/i18n/locales";
import MiniTile from "../components/MiniTile";
import { ODD_TEXT } from "./text";

const pip = MONSTERS[0];
const threeEyedPip: Monster = { ...pip, eyes: 3 };

/** One picture per step, in the same order as the text's steps. */
const pictures: ReadonlyArray<ReactNode> = [
  <Fragment key="look">
    <MiniTile monster={pip} />
    <MiniTile monster={pip} />
  </Fragment>,
  <Fragment key="find">
    <MiniTile monster={pip} />
    <MiniTile monster={threeEyedPip} />
  </Fragment>,
  <MiniTile key="spot" monster={threeEyedPip} ringed />,
];

export function oddOneOutHowToPlay(locale: Locale) {
  return withPictures(ODD_TEXT[locale].howToPlay, pictures);
}
