export type Difficulty = "easy" | "medium" | "hard";

/** Labels and ages are in `MESSAGES[locale].difficulty[id]`. */
export type DifficultyOption = {
  id: Difficulty;
  /** CSS colour for the picker tile. */
  tile: string;
};

export const DIFFICULTIES: ReadonlyArray<DifficultyOption> = Object.freeze([
  { id: "easy", tile: "var(--color-leaf)" },
  { id: "medium", tile: "var(--color-sun)" },
  { id: "hard", tile: "var(--color-tangerine)" },
]);

export const DEFAULT_DIFFICULTY: Difficulty = "easy";

export function isDifficulty(value: unknown): value is Difficulty {
  return DIFFICULTIES.some((option) => option.id === value);
}

export function difficultyOption(id: Difficulty): DifficultyOption {
  return DIFFICULTIES.find((option) => option.id === id)!;
}
