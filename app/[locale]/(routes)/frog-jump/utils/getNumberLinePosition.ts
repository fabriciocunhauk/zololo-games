import type { NumberRange } from "../constants/config";

/**
 * CSS `left` for the centre of `value`'s lily pad, when the line's pads share
 * its width equally. Values off the line are clamped to the end pads.
 */
export function getNumberLinePosition(
  value: number,
  line: NumberRange,
): string {
  const clamped = Math.min(line.max, Math.max(line.min, value));
  const padCount = line.max - line.min + 1;
  return `${((clamped - line.min + 0.5) / padCount) * 100}%`;
}
