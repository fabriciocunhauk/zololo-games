import { CRITTERS_CONFIG } from "../constants/config";
import { randomInt } from "@/app/utils/randomInt";
import { shuffle } from "@/app/utils/shuffle";

export type CritterRound<T> = {
  critters: Array<{ image: T; tilt: number }>;
  answer: number;
  options: number[];
};

export function generateCritterRound<T>(
  images: ReadonlyArray<T>
): CritterRound<T> {
  const { minCount, maxCount, optionCount, minOption, maxOption } =
    CRITTERS_CONFIG;
  const answer = randomInt(minCount, maxCount);

  const critters = Array.from({ length: answer }, () => ({
    image: images[randomInt(0, images.length - 1)],
    tilt: Math.random() * 6 - 3,
  }));

  const options = new Set<number>([answer]);
  while (options.size < optionCount) {
    options.add(randomInt(minOption, maxOption));
  }

  return { critters, answer, options: shuffle(Array.from(options)) };
}
