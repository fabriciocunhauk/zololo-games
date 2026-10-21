import { shuffle } from "@/app/utils/shuffle";
import {
  COLOUR_BINS,
  SHAPE_BINS,
  SIDE_BINS,
  type Bin,
} from "../constants/bins";
import type { ShapeSorterSettings } from "../constants/config";
import { SHAPE_COLOURS } from "../constants/shapes";

/** The bins for a round. Colour bins are a fresh random pick each time. */
export function pickBins({
  sortBy,
  binCount,
}: Pick<ShapeSorterSettings, "sortBy" | "binCount">): Bin[] {
  switch (sortBy) {
    case "colour":
      return shuffle(SHAPE_COLOURS)
        .slice(0, binCount)
        .map((colour) => COLOUR_BINS[colour]);
    case "shape":
      return SHAPE_BINS.slice(0, binCount);
    case "sides":
      return SIDE_BINS.slice(0, binCount);
  }
}
