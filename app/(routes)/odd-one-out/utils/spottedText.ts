/**
 * Praise for spotting the odd one. `count` is how many monsters the next
 * level deals; a full row on the last level starts another row of stars.
 */
export function spottedText(
  description: string,
  { levelUp, stars }: { levelUp: boolean; stars: number },
  count: number
): string {
  const extra = levelUp
    ? ` Level up! Now there are ${count} monsters.`
    : stars === 0
      ? " Another row of stars!"
      : "";
  return `🎉 You spotted it! ${description}${extra}`;
}
