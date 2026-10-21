import { randomInt } from "@/app/utils/randomInt";
import { shuffle } from "@/app/utils/shuffle";
import {
  SHAPE_CONFIG,
  type ShapeLevel,
  type SortBy,
} from "../constants/config";
import {
  SHAPE_COLOURS,
  type Shape,
  type ShapeColour,
} from "../constants/shapes";
import { binFor } from "./binFor";

const pick = <T>(items: ReadonlyArray<T>): T =>
  items[randomInt(0, items.length - 1)];

function randomRotation(maxRotation: number): number {
  const steps = Math.floor(maxRotation / SHAPE_CONFIG.rotationStep);
  return randomInt(-steps, steps) * SHAPE_CONFIG.rotationStep || 0;
}

/**
 * A random shape for a level that belongs in `target` (one of `binIds`,
 * random if not given). Throws if the level can't fill that bin.
 */
export function generateShape(
  level: ShapeLevel,
  sortBy: SortBy,
  binIds: ReadonlyArray<string>,
  target: string = pick(binIds)
): Shape {
  // Sorting by colour, the bins are the colours; otherwise any colour goes.
  const colour = (
    sortBy === "colour" ? target : pick(SHAPE_COLOURS)
  ) as ShapeColour;
  const kinds = level.kinds.filter(
    (kind) =>
      binFor({ kind, colour, size: "medium", rotation: 0 }, sortBy) === target
  );
  if (kinds.length === 0) {
    throw new Error(`No shape in this level belongs in the "${target}" bin`);
  }

  return {
    kind: pick(kinds),
    colour,
    size: pick(level.sizes),
    rotation: randomRotation(level.maxRotation),
  };
}

/** A round's worth of shapes, shared out evenly between the bins, in a random order. */
export function generateTray(
  level: ShapeLevel,
  sortBy: SortBy,
  binIds: ReadonlyArray<string>,
  count: number
): Shape[] {
  const offset = randomInt(0, binIds.length - 1);
  const targets = Array.from(
    { length: count },
    (_, i) => binIds[(i + offset) % binIds.length]
  );
  return shuffle(targets).map((target) =>
    generateShape(level, sortBy, binIds, target)
  );
}
