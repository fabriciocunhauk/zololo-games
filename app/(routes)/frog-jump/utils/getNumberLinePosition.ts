/** CSS `left` value for `value` on a 0..max line using the centred `widthRatio` of its width. */
export function getNumberLinePosition(
  value: number,
  max: number,
  widthRatio: number
): string {
  const percentage =
    (value / max) * 100 * widthRatio + (100 * (1 - widthRatio)) / 2;
  return `${percentage}%`;
}
