import type { Monster } from "@/app/components/monsters/monsters";

/** The monster features that can make one monster the odd one out. */
export type OddAttribute = Exclude<keyof Monster, "name">;

type ValueLists = { [K in OddAttribute]: ReadonlyArray<Monster[K]> };
type Descriptions = { [K in OddAttribute]: Record<Monster[K], string> };

/** Every valid value for each feature. */
export const ATTRIBUTE_VALUES: Readonly<ValueLists> = Object.freeze({
  body: ["round", "square", "tall", "wide", "ghost"],
  color: ["sun", "sky", "leaf", "bubblegum", "tangerine", "grape"],
  eyes: [1, 2, 3],
  top: ["none", "horns", "antennae", "ears", "tuft"],
  mouth: ["smile", "teeth", "open"],
  pattern: ["none", "belly", "spots", "cheeks"],
});

/** Kid words for what makes the odd monster different. */
export const ATTRIBUTE_DESCRIPTIONS: Readonly<Descriptions> = Object.freeze({
  body: {
    round: "It has a round body.",
    square: "It has a square body.",
    tall: "It has a tall body.",
    wide: "It has a wide body.",
    ghost: "It has a wavy ghost body.",
  },
  color: {
    sun: "It is yellow.",
    sky: "It is blue.",
    leaf: "It is green.",
    bubblegum: "It is pink.",
    tangerine: "It is orange.",
    grape: "It is purple.",
  },
  eyes: {
    1: "It has 1 eye.",
    2: "It has 2 eyes.",
    3: "It has 3 eyes.",
  },
  top: {
    none: "It has nothing on its head.",
    horns: "It has horns.",
    antennae: "It has antennae.",
    ears: "It has round ears.",
    tuft: "It has a tuft of hair.",
  },
  mouth: {
    smile: "It has a smiley mouth.",
    teeth: "It is showing its teeth.",
    open: "Its mouth is wide open.",
  },
  pattern: {
    none: "It has no spots or patches.",
    belly: "It has a pale tummy patch.",
    spots: "It has spots.",
    cheeks: "It has rosy cheeks.",
  },
});

export function describeAttribute<K extends OddAttribute>(
  attribute: K,
  value: Monster[K]
): string {
  return (ATTRIBUTE_DESCRIPTIONS[attribute] as Record<Monster[K], string>)[
    value
  ];
}
