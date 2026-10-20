/** Bubble diameter in px for a viewport width. */
export function getBubbleSize(viewportWidth: number): number {
  if (viewportWidth < 640) return 64;
  if (viewportWidth < 1024) return 72;
  return 80;
}
