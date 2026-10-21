export type Point = readonly [x: number, y: number];

export const SHAPE_COLOURS = Object.freeze([
  "sun",
  "sky",
  "leaf",
  "pink-primary",
  "tangerine",
  "grape",
] as const);

export type ShapeColour = (typeof SHAPE_COLOURS)[number];

export const COLOUR_NAMES: Readonly<Record<ShapeColour, string>> =
  Object.freeze({
    sun: "yellow",
    sky: "blue",
    leaf: "green",
    "pink-primary": "pink",
    tangerine: "orange",
    grape: "purple",
  });

/** Spelled out in full so Tailwind sees every class. */
export const FILL_CLASS: Readonly<Record<ShapeColour, string>> = Object.freeze({
  sun: "fill-sun",
  sky: "fill-sky",
  leaf: "fill-leaf",
  "pink-primary": "fill-pink-primary",
  tangerine: "fill-tangerine",
  grape: "fill-grape",
});

export const BG_CLASS: Readonly<Record<ShapeColour, string>> = Object.freeze({
  sun: "bg-sun",
  sky: "bg-sky",
  leaf: "bg-leaf",
  "pink-primary": "bg-pink-primary",
  tangerine: "bg-tangerine",
  grape: "bg-grape",
});

export type ShapeFamily =
  "circle" | "square" | "rectangle" | "triangle" | "pentagon" | "hexagon";

export type ShapeKind =
  | "circle"
  | "square"
  | "rectangle"
  | "triangle"
  | "right-triangle"
  | "scalene-triangle"
  | "pentagon"
  | "hexagon";

export type ShapeKindInfo = {
  family: ShapeFamily;
  /** Spoken name, e.g. "right-angle triangle". */
  name: string;
  /** Corner points in any units; null for a circle. One side per point. */
  outline: ReadonlyArray<Point> | null;
};

function regularPolygon(sides: number): Point[] {
  return Array.from({ length: sides }, (_, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
    return [Math.cos(angle), Math.sin(angle)] as const;
  });
}

export const SHAPE_KINDS: Readonly<Record<ShapeKind, ShapeKindInfo>> =
  Object.freeze({
    circle: { family: "circle", name: "circle", outline: null },
    square: {
      family: "square",
      name: "square",
      outline: [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    },
    rectangle: {
      family: "rectangle",
      name: "long rectangle",
      outline: [
        [0, 0],
        [2.3, 0],
        [2.3, 1],
        [0, 1],
      ],
    },
    triangle: {
      family: "triangle",
      name: "triangle",
      outline: regularPolygon(3),
    },
    "right-triangle": {
      family: "triangle",
      name: "right-angle triangle",
      outline: [
        [0, 0],
        [0, 1],
        [1.25, 1],
      ],
    },
    "scalene-triangle": {
      family: "triangle",
      name: "pointy triangle",
      outline: [
        [0, 0],
        [1.5, 0.7],
        [0.3, 1],
      ],
    },
    pentagon: {
      family: "pentagon",
      name: "pentagon",
      outline: regularPolygon(5),
    },
    hexagon: { family: "hexagon", name: "hexagon", outline: regularPolygon(6) },
  });

export type ShapeSize = "small" | "medium" | "big";

export type Shape = {
  kind: ShapeKind;
  colour: ShapeColour;
  size: ShapeSize;
  /** Degrees, clockwise. */
  rotation: number;
};

/** A circle has no straight sides. */
export function sideCount(kind: ShapeKind): number {
  return SHAPE_KINDS[kind].outline?.length ?? 0;
}
