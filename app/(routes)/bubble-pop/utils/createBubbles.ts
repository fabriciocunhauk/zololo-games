import { shuffle } from "@/app/utils/shuffle";
import {
  BUBBLE_FILLS,
  type BubbleFill,
  type NumberRange,
} from "../constants/config";

export type Bubble = {
  id: number;
  value: number;
  isCorrect: boolean;
  fill: BubbleFill;
  /** Which of the equal-width columns it rises in; see `getBubbleX`. */
  column: number;
  /** -1 to 1: how far it drifts off its column centre. */
  nudge: number;
  /** Start offset below the area's bottom edge, in px. */
  startY: number;
  /** Seconds before it sets off. */
  delay: number;
  /** Seconds for one trip up. */
  duration: number;
};

type CreateBubblesInput = {
  values: ReadonlyArray<number>;
  answer: number;
  riseSeconds: NumberRange;
  staggerSeconds: number;
};

/**
 * One bubble per value, each in its own column and rising at its own pace.
 * Positions are relative, so the layout survives a resize or rotation.
 */
export function createBubbles({
  values,
  answer,
  riseSeconds,
  staggerSeconds,
}: CreateBubblesInput): Bubble[] {
  const columns = shuffle(values.map((_, i) => i));

  return values.map((value, i) => ({
    id: i,
    value,
    isCorrect: value === answer,
    fill: BUBBLE_FILLS[i % BUBBLE_FILLS.length],
    column: columns[i],
    nudge: Math.random() * 2 - 1,
    startY: Math.random() * 30,
    delay: i * staggerSeconds,
    duration:
      riseSeconds.min + Math.random() * (riseSeconds.max - riseSeconds.min),
  }));
}
