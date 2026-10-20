import { describe, expect, it } from "vitest";
import { createShuffledDeck } from "./createShuffledDeck";

const faces = Array.from({ length: 20 }, (_, i) => `face-${i}`);

describe("createShuffledDeck", () => {
  it("deals 2 pairs per level", () => {
    expect(createShuffledDeck(1, faces)).toHaveLength(4);
    expect(createShuffledDeck(3, faces)).toHaveLength(12);
  });

  it("caps the deck at the faces available", () => {
    expect(createShuffledDeck(15, faces)).toHaveLength(40);
  });

  it("contains exactly two cards per pair, sharing a face", () => {
    const deck = createShuffledDeck(4, faces);
    const byPair = new Map<number, string[]>();
    for (const card of deck) {
      byPair.set(card.pairId, [...(byPair.get(card.pairId) ?? []), card.face]);
    }
    expect(byPair.size).toBe(8);
    for (const [, pairFaces] of byPair) {
      expect(pairFaces).toHaveLength(2);
      expect(pairFaces[0]).toBe(pairFaces[1]);
    }
    expect(new Set(deck.map((c) => c.id)).size).toBe(deck.length);
  });
});
