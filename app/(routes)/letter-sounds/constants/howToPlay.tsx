import type { HowToPlayStep } from "@/app/components/HowToPlay";
import LetterBlock from "../components/LetterBlock";

const miniCard =
  "flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-ink bg-white text-3xl shadow-[0_4px_0_var(--color-ink)]";

const steps: ReadonlyArray<HowToPlayStep> = [
  {
    text: "Look at the picture and say its name. Tap “Hear it” to listen.",
    picture: (
      <>
        <span aria-hidden className={miniCard}>
          🍎
        </span>
        <span aria-hidden className="text-2xl">
          🔊
        </span>
      </>
    ),
  },
  {
    text: "What sound does it start with? Tap that letter.",
    picture: (
      <>
        <LetterBlock letter="A" tile="var(--color-leaf)" />
        <LetterBlock letter="b" />
      </>
    ),
  },
  {
    text: "On Hard, spell the word one letter at a time. Get 5 stars to go up a level!",
    picture: (
      <>
        <LetterBlock letter="c" tile="var(--color-sun)" depth="4px" />
        <LetterBlock letter="a" tile="var(--color-sun)" depth="4px" />
        <span
          aria-hidden
          className="h-12 w-12 shrink-0 rounded-2xl border-[3px] border-dashed border-ink sm:h-14 sm:w-14"
        />
      </>
    ),
  },
];

export const LETTER_HOW_TO_PLAY = Object.freeze({
  steps,
  tip: "say the sound, not the letter’s name: “apple” starts with “a” as in “ant”.",
});
