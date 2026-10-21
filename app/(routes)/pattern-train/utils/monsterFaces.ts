import type { Monster, MonsterColor } from "@/app/components/monsters/monsters";

const COLOUR_NAMES: Record<MonsterColor, string> = {
  sun: "Yellow",
  sky: "Blue",
  leaf: "Green",
  bubblegum: "Pink",
  tangerine: "Orange",
  grape: "Purple",
};

/** The colour word for a monster, e.g. "Blue". */
export function colourName(monster: Monster): string {
  return COLOUR_NAMES[monster.color];
}

/** The same monster in every colour, named by colour (e.g. "Blue Pip"). */
export function colourVariants(base: Monster): Monster[] {
  return (Object.keys(COLOUR_NAMES) as MonsterColor[]).map((color) => ({
    ...base,
    color,
    name: `${COLOUR_NAMES[color]} ${base.name}`,
  }));
}

const TRAITS = ["body", "color", "eyes", "top", "mouth", "pattern"] as const;

/** Number of looks two monsters share, for near-miss answer options. */
export function monsterResemblance(a: Monster, b: Monster): number {
  return TRAITS.filter((trait) => a[trait] === b[trait]).length;
}
