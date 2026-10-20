import { BUBBLE_POP_CONFIG } from "../constants/config";
import { shuffle } from "@/app/utils/shuffle";
import { getEvenlySpacedPositions } from "./getEvenlySpacedPositions";

export type Bubble = {
  id: number;
  value: number;
  isCorrect: boolean;
  x: number;
  /** Start offset below the area, in px. */
  y: number;
  /** Where the bubble floats up to, in px (negative = up). */
  riseTo: number;
  delay: number;
  duration: number;
};

type CreateBubblesInput = {
  values: ReadonlyArray<number>;
  answer: number;
  areaWidth: number;
  areaHeight: number;
  bubbleSize: number;
};

export function createBubbles({
  values,
  answer,
  areaWidth,
  areaHeight,
  bubbleSize,
}: CreateBubblesInput): Bubble[] {
  const margin = bubbleSize / 2 + 8;
  const xPositions = shuffle(
    getEvenlySpacedPositions(
      values.length,
      margin + areaWidth * 0.1,
      areaWidth - margin,
      bubbleSize * 0.2
    )
  );

  return values.map((value, i) => ({
    id: i,
    value,
    isCorrect: value === answer,
    x: xPositions[i],
    y: areaHeight + Math.random() * 50,
    riseTo: -areaHeight - 50,
    delay: i * (BUBBLE_POP_CONFIG.bubbleStaggerMs / 1000),
    duration: Math.random() * 5 + 5,
  }));
}
