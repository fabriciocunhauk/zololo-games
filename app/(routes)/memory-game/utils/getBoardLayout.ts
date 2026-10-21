/** Tailwind grid columns for a deck size, so cards stay big on small decks. */
export function getBoardLayout(cardCount: number): string {
  const cardsPerRow = Math.ceil(Math.sqrt(cardCount));
  if (cardsPerRow <= 2) return "grid-cols-2 sm:grid-cols-4";
  if (cardsPerRow <= 4) return "grid-cols-3 sm:grid-cols-4";
  return "grid-cols-4 sm:grid-cols-5 md:grid-cols-6";
}

/** Width ÷ height of the board on tablet and desktop widths (md and up). */
export function getBoardAspect(cardCount: number): number {
  const columns = Math.ceil(Math.sqrt(cardCount)) <= 4 ? 4 : 6;
  const rows = Math.ceil(cardCount / columns);
  return columns / rows;
}
