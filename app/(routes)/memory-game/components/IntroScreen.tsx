import type { CSSProperties } from "react";
import Container from "@/app/components/Container";
import HowToPlay from "./HowToPlay";
import MonsterParade from "./MonsterParade";

const startStyle: CSSProperties & { "--tile": string } = {
  "--tile": "var(--color-sun)",
};

export default function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="flex-1 pt-24 pb-20 sm:pt-32">
      <Container
        size="md"
        classes={{
          container:
            "flex flex-col items-center gap-10 px-4 text-center sm:px-10",
        }}
      >
        <div className="flex flex-col items-center gap-5">
          <MonsterParade />
          <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95]">
            Memory Cards
          </h1>
          <p className="max-w-xl text-lg text-ink/80 sm:text-xl">
            Meet the Zololo monsters! Every monster has a twin hiding under the
            cards. Can you find them all?
          </p>
        </div>

        <HowToPlay />

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
