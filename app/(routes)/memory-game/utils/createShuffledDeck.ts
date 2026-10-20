import { shuffle } from "@/app/utils/shuffle";

export type MemoryCardData<T> = {
  id: number;
  /** Cards with the same pairId match. */
  pairId: number;
  face: T;
};

/** Two cards per face; level n uses 2n faces, capped at the faces available. */
export function createShuffledDeck<T>(
  level: number,
  faces: ReadonlyArray<T>
): MemoryCardData<T>[] {
  const pairCount = Math.min(level * 2, faces.length);
  const chosen = shuffle(faces).slice(0, pairCount);
  const deck = chosen
    .concat(chosen)
    .map((face, idx) => ({ id: idx, pairId: idx % pairCount, face }));
  return shuffle(deck);
}
