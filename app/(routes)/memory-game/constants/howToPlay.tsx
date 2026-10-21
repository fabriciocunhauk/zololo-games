import type { ReactNode } from "react";
import type { HowToPlayStep } from "@/app/components/HowToPlay";
import CardBack from "../components/CardBack";
import CardFront from "../components/CardFront";
import { MONSTERS } from "@/app/components/monsters/monsters";

const [pip, bop] = MONSTERS;

function MiniCard({ children }: { children: ReactNode }) {
  return (
    <span className="block w-12 sm:w-14 aspect-square rounded-2xl shadow-[0_4px_0_var(--color-ink)]">
      {children}
    </span>
  );
}

const steps: ReadonlyArray<HowToPlayStep> = [
  {
    text: "Tap a card to turn it over and meet a monster.",
    picture: (
      <MiniCard>
        <CardBack />
      </MiniCard>
    ),
  },
  {
    text: "Tap one more card. Is it the same monster? If not, both cards turn back.",
    picture: (
      <>
        <MiniCard>
          <CardFront monster={pip} isMatched={false} />
        </MiniCard>
        <MiniCard>
          <CardFront monster={bop} isMatched={false} />
        </MiniCard>
      </>
    ),
  },
  {
    text: "Find every pair of twins to go up a level. Each level has more cards!",
    picture: (
      <>
        <MiniCard>
          <CardFront monster={pip} isMatched />
        </MiniCard>
        <MiniCard>
          <CardFront monster={pip} isMatched />
        </MiniCard>
      </>
    ),
  },
];

export const MEMORY_HOW_TO_PLAY = Object.freeze({
  steps,
  tip: "say each monster's name out loud when you see it. It helps you remember where it's hiding!",
});
