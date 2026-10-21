import { sidesBinId } from "../constants/bins";
import type { SortBy } from "../constants/config";
import { SHAPE_KINDS, sideCount, type Shape } from "../constants/shapes";

/**
 * The id of the bin a shape belongs in under a sorting rule, or null when the
 * rule doesn't apply (a circle has no straight sides to count).
 */
export function binFor(shape: Shape, sortBy: SortBy): string | null {
  switch (sortBy) {
    case "colour":
      return shape.colour;
    case "shape":
      return SHAPE_KINDS[shape.kind].family;
    case "sides": {
      const sides = sideCount(shape.kind);
      return sides === 0 ? null : sidesBinId(sides);
    }
  }
}
