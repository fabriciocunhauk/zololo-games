import type { CSSProperties, ReactNode } from "react";
import type { Difficulty } from "@/app/constants/difficulty";
import Container from "./Container";
import DifficultyPicker from "./DifficultyPicker";
import ScrollToTop from "./ScrollToTop";

type GameIntroProps = {
  hero: ReactNode;
  title: string;
  blurb: string;
  howToPlay: ReactNode;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStart: () => void;
};

const startStyle: CSSProperties & { "--tile": string } = {
  "--tile": "var(--color-sun)",
};

/** Shared start screen: hero art, title, how to play, difficulty, and a big start button. */
export default function GameIntro({
  hero,
  title,
  blurb,
  howToPlay,
  difficulty,
  onDifficultyChange,
  onStart,
}: GameIntroProps) {
  return (
    <main className="flex-1 pt-24 pb-20 sm:pt-32">
      <ScrollToTop />
      <Container
        size="md"
        classes={{
          container:
            "flex flex-col items-center gap-10 px-4 text-center sm:px-10",
        }}
      >
        <div className="flex flex-col items-center gap-5">
          {hero}
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95]">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-ink/80 sm:text-xl">{blurb}</p>
        </div>

        {howToPlay}

        <section className="flex w-full flex-col items-center gap-5">
          <h2
            id="difficulty-heading"
            className="font-display text-2xl sm:text-3xl"
          >
            Who&apos;s playing?
          </h2>
          <DifficultyPicker value={difficulty} onChange={onDifficultyChange} />
        </section>

        <button
          type="button"
          onClick={onStart}
          style={startStyle}
          className="toy-block px-10 py-4 font-display text-2xl"
        >
          Start playing
        </button>
      </Container>
    </main>
  );
}
