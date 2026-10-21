import type { HowToPlayStep } from "@/app/components/HowToPlay";
import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";
import MiniTile from "../components/MiniTile";

const pip = MONSTERS[0];
const threeEyedPip: Monster = { ...pip, eyes: 3 };

const steps: ReadonlyArray<HowToPlayStep> = [
  {
    text: "Look at all the monsters. They're all the same… except one!",
    picture: (
      <>
        <MiniTile monster={pip} />
        <MiniTile monster={pip} />
      </>
    ),
  },
  {
    text: "Find the one that's different and tap it.",
    picture: (
      <>
        <MiniTile monster={pip} />
        <MiniTile monster={threeEyedPip} />
      </>
    ),
  },
  {
    text: "Spot 5 odd ones to go up a level and meet more monsters!",
    picture: <MiniTile monster={threeEyedPip} ringed />,
  },
];

export const ODD_HOW_TO_PLAY = Object.freeze({
  steps,
  tip: "check one thing at a time: colour, shape, eyes, the top of the head, mouths and spots.",
});
