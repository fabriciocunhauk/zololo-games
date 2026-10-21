export type Difficulty = "easy" | "medium" | "hard";

export type DifficultyOption = {
  id: Difficulty;
  label: string;
  /** Shown on the tile, e.g. "Ages 4–5". */
  ages: string;
  /** Spoken form of `ages` for screen readers. */
  agesSpoken: string;
  /** CSS colour for the picker tile. */
  tile: string;
};

export const DIFFICULTIES: ReadonlyArray<DifficultyOption> = Object.freeze([
  {
    id: "easy",
    label: "Easy",
    ages: "Ages 4–5",
    agesSpoken: "ages 4 to 5",
    tile: "var(--color-leaf)",
  },
  {
    id: "medium",
    label: "Medium",
    ages: "Ages 6–7",
    agesSpoken: "ages 6 to 7",
    tile: "var(--color-sun)",
  },
  {
    id: "hard",
    label: "Hard",
    ages: "Ages 8+",
    agesSpoken: "ages 8 and up",
    tile: "var(--color-tangerine)",
  },
]);

export const DEFAULT_DIFFICULTY: Difficulty = "easy";

export function isDifficulty(value: unknown): value is Difficulty {
  return DIFFICULTIES.some((option) => option.id === value);
}

export function difficultyOption(id: Difficulty): DifficultyOption {
  return DIFFICULTIES.find((option) => option.id === id)!;
}
