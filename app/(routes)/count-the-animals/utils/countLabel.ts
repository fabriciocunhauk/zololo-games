/** "1 duck", "3 ducks", "2 fish". */
export function countLabel(
  count: number,
  animal: { name: string; plural: string }
): string {
  return `${count} ${count === 1 ? animal.name : animal.plural}`;
}
