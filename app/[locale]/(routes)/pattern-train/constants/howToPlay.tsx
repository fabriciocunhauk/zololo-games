import type { HowToPlayStep } from "@/app/components/HowToPlay";
import { MONSTERS } from "@/app/components/monsters/monsters";
import MonsterArt from "@/app/components/monsters/MonsterArt";
import TrainCarriage from "../components/TrainCarriage";

const [pip, bop] = MONSTERS;
const mini = "w-12 sm:w-14";

const steps: ReadonlyArray<HowToPlayStep> = [
  {
    text: "Look at the train. The monsters ride in a pattern that repeats.",
    picture: (
      <>
        <TrainCarriage monster={pip} className={mini} />
        <TrainCarriage monster={bop} className={mini} />
      </>
    ),
  },
  {
    text: "Find the carriage with the “?”. Who should ride in it?",
    picture: (
      <>
        <TrainCarriage monster={pip} className={mini} />
        <TrainCarriage monster={null} gap className={mini} />
      </>
    ),
  },
  {
    text: "Tap the monster that fits. Get 5 right to go up a level!",
    picture: (
      <span className="flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-ink bg-white p-1 shadow-[0_4px_0_var(--color-ink)] sm:h-16 sm:w-16">
        <MonsterArt monster={bop} className="w-full" />
      </span>
    ),
  },
];

export const PATTERN_HOW_TO_PLAY = Object.freeze({
  steps,
  tip: "say the pattern out loud: “Pip, Bop, Pip, Bop…”. Hearing it helps you guess who comes next.",
});
