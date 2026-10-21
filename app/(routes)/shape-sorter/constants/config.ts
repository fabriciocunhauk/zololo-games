import type { Difficulty } from "@/app/constants/difficulty";
import type { ShapeKind, ShapeSize } from "./shapes";

export type SortBy = "colour" | "shape" | "sides";

export type ShapeLevel = {
  kinds: ReadonlyArray<ShapeKind>;
  sizes: ReadonlyArray<ShapeSize>;
  /** Largest tilt either way, in degrees. Tilts come in steps of 15. */
  maxRotation: number;
};

export type ShapeSorterSettings = {
  sortBy: SortBy;
  /** How many bins to sort into. Colour bins are picked fresh each round. */
  binCount: number;
  /** Asked above the conveyor belt. */
  question: string;
  /** Shown after the level in the star meter. */
  caption: string;
  /** Each level adds variety: more kinds, sizes and tilts. */
  levels: ReadonlyArray<ShapeLevel>;
};

const ALL_SIZES: ReadonlyArray<ShapeSize> = ["small", "medium", "big"];

export const SHAPE_DIFFICULTY: Readonly<
  Record<Difficulty, ShapeSorterSettings>
> = Object.freeze({
  easy: {
    sortBy: "colour",
    binCount: 2,
    question: "What colour is it?",
    caption: "by colour",
    levels: [
      { kinds: ["circle", "square"], sizes: ["medium"], maxRotation: 0 },
      { kinds: ["circle", "square"], sizes: ["medium"], maxRotation: 45 },
    ],
  },
  medium: {
    sortBy: "shape",
    binCount: 3,
    question: "What shape is it?",
    caption: "by shape",
    levels: [
      {
        kinds: ["circle", "square", "triangle"],
        sizes: ["medium", "big"],
        maxRotation: 0,
      },
      {
        kinds: ["circle", "square", "triangle"],
        sizes: ALL_SIZES,
        maxRotation: 30,
      },
      {
        kinds: ["circle", "square", "triangle", "right-triangle"],
        sizes: ALL_SIZES,
        maxRotation: 45,
      },
    ],
  },
  hard: {
    sortBy: "sides",
    binCount: 4,
    question: "How many sides does it have?",
    caption: "by sides",
    levels: [
      {
        kinds: ["triangle", "square", "pentagon", "hexagon"],
        sizes: ALL_SIZES,
        maxRotation: 0,
      },
      {
        kinds: [
          "triangle",
          "right-triangle",
          "square",
          "rectangle",
          "pentagon",
          "hexagon",
        ],
        sizes: ALL_SIZES,
        maxRotation: 45,
      },
      {
        kinds: [
          "triangle",
          "right-triangle",
          "scalene-triangle",
          "square",
          "rectangle",
          "pentagon",
          "hexagon",
        ],
        sizes: ALL_SIZES,
        maxRotation: 180,
      },
    ],
  },
});

export const SHAPE_CONFIG = Object.freeze({
  /** Rounds are long (10 shapes), so fewer stars fill a level. */
  roundsPerLevel: 3,
  shapesPerRound: 10,
  rotationStep: 15,
  /** Time for a sorted shape to drop into its bin before the next arrives. */
  dropMs: 550,
  /** How long "Round complete!" shows before the next round. */
  roundCompleteMs: 2600,
});
