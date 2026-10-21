/** Room kept clear around each bubble's column, in px. */
const COLUMN_GAP = 8;

/** The most a bubble drifts off its column centre, as a share of its size. */
const MAX_NUDGE = 0.15;

/** Shrinks a bubble so `count` of them fit side by side in the area. */
export function fitBubbleSize(
  size: number,
  areaWidth: number,
  count: number
): number {
  return Math.max(0, Math.min(size, areaWidth / count - COLUMN_GAP));
}

type BubbleXInput = {
  /** Which of the `count` equal columns the bubble rises in. */
  column: number;
  /** -1 to 1: how far it drifts off the column centre. */
  nudge: number;
  count: number;
  areaWidth: number;
  /** Already fitted with `fitBubbleSize`. */
  bubbleSize: number;
};

/**
 * Centre of a bubble from the area's left edge, in px. Worked out from the
 * current width on every render, so columns never overlap after a resize.
 */
export function getBubbleX({
  column,
  nudge,
  count,
  areaWidth,
  bubbleSize,
}: BubbleXInput): number {
  const columnWidth = areaWidth / count;
  const room = Math.max(0, (columnWidth - bubbleSize - COLUMN_GAP) / 2);
  const drift = Math.min(room, bubbleSize * MAX_NUDGE);
  return (column + 0.5) * columnWidth + nudge * drift;
}
