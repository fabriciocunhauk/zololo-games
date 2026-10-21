import type { HowToPlayStep } from "@/app/components/HowToPlay";
import AnimalTile from "../components/AnimalTile";
import { ANIMALS } from "./animals";

const duck = ANIMALS.find((a) => a.name === "duck") ?? ANIMALS[0];
const mini = "w-12 sm:w-14";

const steps: ReadonlyArray<HowToPlayStep> = [
  {
    text: "Look at the question. Which animal do you need to count?",
    picture: (
      <>
        <AnimalTile kind={duck.kind} className={mini} />
        <AnimalTile kind={duck.kind} className={mini} />
      </>
    ),
  },
  {
    text: "Tap each animal once to count it: 1, 2, 3… Each one gets its number.",
    picture: (
      <>
        <AnimalTile kind={duck.kind} count={1} className={mini} />
        <AnimalTile kind={duck.kind} count={2} className={mini} />
      </>
    ),
  },
  {
    text: "Tap the number you counted. Get 5 right to go up a level!",
    picture: (
      <span className="flex h-14 w-12 items-center justify-center rounded-xl border-4 border-pink-primary bg-white font-display text-2xl shadow-lg sm:w-14">
        2
      </span>
    ),
  },
];

export const COUNTING_HOW_TO_PLAY = Object.freeze({
  steps,
  tip: "tapped the same animal twice or lost track? Tap “Count again” to start over.",
});
