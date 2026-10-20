/** `count` evenly spaced points between min and max, each nudged by up to ±jitter/2 and clamped. */
export function getEvenlySpacedPositions(
  count: number,
  min: number,
  max: number,
  jitter = 0
): number[] {
  if (count === 1) return [min + (max - min) / 2];
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => {
    const base = min + i * step;
    if (jitter <= 0) return base;
    const nudged = base + (Math.random() - 0.5) * jitter;
    return Math.max(min, Math.min(max, nudged));
  });
}
