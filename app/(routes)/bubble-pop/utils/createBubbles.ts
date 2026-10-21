import { shuffle } from "@/app/utils/shuffle";
import {
  BUBBLE_FILLS,
  type BubbleFill,
  type NumberRange,
} from "../constants/config";
import { getEvenlySpacedPositions } from "./getEvenlySpacedPositions";

export type Bubble = {
  id: number;
  value: number;
  isCorrect: boolean;
  fill: BubbleFill;
  /** Centre of the bubble from the area's left edge, in px. */
  x: number;
  /** Start offset below the area's bottom edge, in px. */
  startY: number;
  /** Where the bubble floats up to, in px (negative = up). */
  riseTo: number;
  /** Seconds before it sets off. */
  delay: number;
  /** Seconds for one trip up. */
  duration: number;
};

type CreateBubblesInput = {
  values: ReadonlyArray<number>;
  answer: number;
  areaWidth: number;
  areaHeight: number;
  bubbleSize: number;
  riseSeconds: NumberRange;
  staggerSeconds: number;
};

/** Lays bubbles out in columns that never overlap, each rising at its own pace. */
export function createBubbles({
  values,
  answer,
  areaWidth,
  areaHeight,
  bubbleSize,
  riseSeconds,
  staggerSeconds,
}: CreateBubblesInput): Bubble[] {
  const margin = bubbleSize / 2 + 8;
  const step =
    values.length > 1 ? (areaWidth - 2 * margin) / (values.length - 1) : 0;
  const jitter = Math.max(0, Math.min(bubbleSize * 0.3, step - bubbleSize));
  const xPositions = shuffle(
    getEvenlySpacedPositions(values.length, margin, areaWidth - margin, jitter)
  );

  return values.map((value, i) => ({
    id: i,
    value,
    isCorrect: value === answer,
    fill: BUBBLE_FILLS[i % BUBBLE_FILLS.length],
    x: xPositions[i],
    startY: Math.random() * 30,
    riseTo: -(areaHeight + bubbleSize + 30),
    delay: i * staggerSeconds,
    duration:
      riseSeconds.min + Math.random() * (riseSeconds.max - riseSeconds.min),
  }));
}
