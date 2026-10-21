import { shuffle } from "@/app/utils/shuffle";

export type MemoryCardData<T> = {
  id: number;
  /** Cards with the same pairId match. */
  pairId: number;
  face: T;
};

/** Two cards per face, capped at the faces available. */
export function createShuffledDeck<T>(
  pairs: number,
  faces: ReadonlyArray<T>
): MemoryCardData<T>[] {
  const pairCount = Math.min(pairs, faces.length);
  const chosen = shuffle(faces).slice(0, pairCount);
  const deck = chosen
    .concat(chosen)
    .map((face, idx) => ({ id: idx, pairId: idx % pairCount, face }));
  return shuffle(deck);
}
