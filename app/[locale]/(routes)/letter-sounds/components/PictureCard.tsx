import type { PictureWord } from "../constants/words";

type PictureCardProps = {
  word: PictureWord;
  /** Before answering: the word with its first letter blanked, or nothing. */
  wordDisplay: "blanked" | "hidden";
  /** After answering: the whole word, first letter highlighted. */
  revealed: boolean;
};

function WordLine({
  word,
  wordDisplay,
  revealed,
}: Pick<PictureCardProps, "wordDisplay" | "revealed"> & { word: string }) {
  const [first, rest] = [word.charAt(0), word.slice(1)];

  if (revealed) {
    return (
      <p data-testid="word" className="font-display text-4xl sm:text-5xl">
        <span className="rounded-xl bg-sun px-1.5">{first}</span>
        {rest}
      </p>
    );
  }
  if (wordDisplay === "blanked") {
    return (
      <p data-testid="word" className="font-display text-4xl sm:text-5xl">
        <span className="text-tangerine">_</span>
        {rest}
      </p>
    );
  }
  return null;
}

/** The big picture to name, with its word underneath. */
export default function PictureCard({
  word,
  wordDisplay,
  revealed,
}: PictureCardProps) {
  return (
    <div
      data-testid="picture-card"
      data-word={word.word}
      className="flex w-full max-w-xs flex-col items-center gap-3 rounded-3xl border-[3px] border-ink bg-white px-6 py-5 shadow-[0_8px_0_var(--color-ink)]"
    >
      <span
        role="img"
        aria-label={word.word}
        className="text-[6rem] leading-none sm:text-[8rem]"
      >
        {word.emoji}
      </span>
      <div className="flex min-h-14 items-center">
        <WordLine
          word={word.word}
          wordDisplay={wordDisplay}
          revealed={revealed}
        />
      </div>
    </div>
  );
}
