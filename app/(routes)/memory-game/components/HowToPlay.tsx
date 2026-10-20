import type { ReactNode } from "react";
import { classNames } from "@/app/utils/appearance";
import { MONSTERS } from "../constants/monsters";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

const [pip, bop] = MONSTERS;

function MiniCard({ children }: { children: ReactNode }) {
  return (
    <span className="block w-12 sm:w-14 aspect-square rounded-2xl shadow-[0_4px_0_var(--color-ink)]">
      {children}
    </span>
  );
}

const STEPS: ReadonlyArray<{ text: string; picture: ReactNode }> = [
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

export default function HowToPlay({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="how-to-play"
      className={classNames(
        "w-full rounded-3xl border-[3px] border-ink bg-white p-5 sm:p-8 text-left shadow-[0_8px_0_var(--color-ink)]",
        className
      )}
    >
      <h2 id="how-to-play" className="font-display text-2xl sm:text-3xl">
        How to play
      </h2>
      <ol className="mt-6 grid gap-6 sm:grid-cols-3">
        {STEPS.map(({ text, picture }, idx) => (
          <li key={text} className="flex gap-4 sm:flex-col">
            <div className="flex w-26 shrink-0 items-center gap-2 sm:w-auto">
              {picture}
            </div>
            <p className="flex gap-2 text-base sm:text-lg">
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm text-paper"
              >
                {idx + 1}
              </span>
              <span>{text}</span>
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-6 rounded-2xl bg-sun/40 px-4 py-3 text-sm sm:text-base">
        <strong>Tip:</strong> say each monster&apos;s name out loud when you see
        it. It helps you remember where it&apos;s hiding!
      </p>
    </section>
  );
}
