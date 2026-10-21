import type { HowToPlayStep } from "@/app/components/HowToPlay";
import FrogArt from "../components/FrogArt";
import LilyPad from "../components/LilyPad";

const steps: ReadonlyArray<HowToPlayStep> = [
  {
    text: "See where the frog starts. Its lily pad is yellow.",
    picture: (
      <span className="flex w-16 flex-col items-center">
        <FrogArt className="relative z-10 -mb-2 w-11" />
        <LilyPad value={3} isStart className="w-16" />
      </span>
    ),
  },
  {
    text: "Jump + hops forward. Jump - hops back. Count the hops pad by pad.",
    picture: (
      <span className="flex w-24 flex-col">
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
      </span>
    ),
  },
  {
    text: "Tap the number where the frog lands. Get 5 right to go up a level!",
    picture: (
      <span className="flex h-14 w-12 items-center justify-center rounded-xl border-[3px] border-ink bg-white font-display text-2xl shadow-[0_4px_0_var(--color-ink)] sm:w-14">
        5
      </span>
    ),
  },
];

export const FROG_JUMP_HOW_TO_PLAY = Object.freeze({
  steps,
  tip: "put a finger on the yellow pad and count each hop out loud.",
});
