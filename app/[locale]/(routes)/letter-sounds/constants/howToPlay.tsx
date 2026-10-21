import { withPictures } from "@/app/components/HowToPlay";
import type { Locale } from "@/app/i18n/locales";
import LetterBlock from "../components/LetterBlock";
import { LETTER_TEXT } from "./text";

const miniCard =
  "flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-ink bg-white text-3xl shadow-[0_4px_0_var(--color-ink)]";

export function letterSoundsHowToPlay(locale: Locale) {
  const { steps, tip, example } = LETTER_TEXT[locale].howToPlay;
  // One picture per step, in the same order as the text's steps.
  const pictures = [
    <span key="picture" aria-hidden className={miniCard}>
      {example.emoji}
    </span>,
    <span key="letters" className="contents">
      <LetterBlock letter={example.letter} tile="var(--color-leaf)" />
      <LetterBlock letter={example.other} />
    </span>,
    <span key="spell" className="contents">
      {example.spelling.map((letter) => (
        <LetterBlock
          key={letter}
          letter={letter}
          tile="var(--color-sun)"
          depth="4px"
        />
      ))}
      <span
        aria-hidden
        className="h-12 w-12 shrink-0 rounded-2xl border-[3px] border-dashed border-ink sm:h-14 sm:w-14"
      />
    </span>,
  ];

  return withPictures({ steps, tip }, pictures);
}
