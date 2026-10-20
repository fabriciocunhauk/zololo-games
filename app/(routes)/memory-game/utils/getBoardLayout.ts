type BoardLayout = { columns: string; aspect: string };

/** Tailwind grid columns and card aspect ratio for a deck size. */
export function getBoardLayout(cardCount: number): BoardLayout {
  const cardsPerRow = Math.ceil(Math.sqrt(cardCount));
  if (cardsPerRow <= 2) {
    return { columns: "grid-cols-2 sm:grid-cols-4", aspect: "aspect-square" };
  }
  if (cardsPerRow <= 4) {
    return { columns: "grid-cols-3 sm:grid-cols-4", aspect: "aspect-[6/4]" };
  }
  return {
    columns: "grid-cols-4 sm:grid-cols-5 md:grid-cols-6",
    aspect: "aspect-square",
  };
}
