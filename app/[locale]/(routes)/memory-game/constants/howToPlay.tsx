import { withPictures } from "@/app/components/HowToPlay";
import { Fragment, type ReactNode } from "react";
import { MONSTERS } from "@/app/components/monsters/monsters";
import type { Locale } from "@/app/i18n/locales";
import CardBack from "../components/CardBack";
import CardFront from "../components/CardFront";
import { MEMORY_TEXT } from "./text";

const [pip, bop] = MONSTERS;

function MiniCard({ children }: { children: ReactNode }) {
  return (
    <span className="block w-12 sm:w-14 aspect-square rounded-2xl shadow-[0_4px_0_var(--color-ink)]">
      {children}
    </span>
  );
}

/** One picture per step, in the same order as the text's steps. */
const pictures: ReadonlyArray<ReactNode> = [
  <MiniCard key="flip">
    <CardBack />
  </MiniCard>,
  <Fragment key="compare">
    <MiniCard>
      <CardFront monster={pip} isMatched={false} />
    </MiniCard>
    <MiniCard>
      <CardFront monster={bop} isMatched={false} />
    </MiniCard>
  </Fragment>,
  <Fragment key="pair">
    <MiniCard>
      <CardFront monster={pip} isMatched />
    </MiniCard>
    <MiniCard>
      <CardFront monster={pip} isMatched />
    </MiniCard>
  </Fragment>,
];

export function memoryHowToPlay(locale: Locale) {
  return withPictures(MEMORY_TEXT[locale].howToPlay, pictures);
}
