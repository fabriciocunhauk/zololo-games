import type { HowToPlayStep } from "@/app/components/HowToPlay";
import BubbleArt from "../components/BubbleArt";

const mini = "w-12 sm:w-14 text-xl";

const steps: ReadonlyArray<HowToPlayStep> = [
  {
    text: "Read the sum on the card. What does it make?",
    picture: (
      <span className="rounded-xl border-[3px] border-ink bg-white px-2 py-2 font-display text-lg leading-none whitespace-nowrap shadow-[0_3px_0_var(--color-ink)]">
        2+3=?
      </span>
    ),
  },
  {
    text: "Bubbles float up with numbers inside. Find the answer!",
    picture: (
      <>
        <BubbleArt fill="fill-sky" className={`${mini} mt-4`}>
          4
        </BubbleArt>
        <BubbleArt fill="fill-grape" className={mini}>
          5
        </BubbleArt>
      </>
    ),
  },
  {
    text: "Tap it to pop it. Get 5 right to go up a level!",
    picture: (
      <span className="relative">
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
      </span>
    ),
  },
];

export const BUBBLE_POP_HOW_TO_PLAY = Object.freeze({
  steps,
  tip: "missed one? Don’t worry, the bubbles float round again. Take your time.",
});
