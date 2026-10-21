/** "1 duck", "3 ducks", "2 fish"; in Portuguese "1 pato", "3 patos". */
export function countLabel(
  count: number,
  animal: { name: string; plural: string }
): string {
  return `${count} ${count === 1 ? animal.name : animal.plural}`;
}
