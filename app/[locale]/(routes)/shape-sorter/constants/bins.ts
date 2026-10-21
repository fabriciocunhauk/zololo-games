import { SHAPE_COLOURS, type ShapeColour, type ShapeKind } from "./shapes";

export type BinPicture =
  | { type: "swatch"; colour: ShapeColour }
  | { type: "outline"; kind: ShapeKind };

/** The shapes Medium sorts into. */
export type ShapeBinFamily = "circle" | "square" | "triangle";

/** What a bin collects. Its label and praise are in `SHAPE_TEXT[locale]`. */
export type BinName =
  | { type: "colour"; colour: ShapeColour }
  | { type: "shape"; family: ShapeBinFamily }
  | { type: "sides"; sides: number };

export type Bin = {
  /** Matches what `binFor` returns. */
  id: string;
  name: BinName;
  picture: BinPicture;
};

export const COLOUR_BINS: Readonly<Record<ShapeColour, Bin>> = Object.freeze(
  Object.fromEntries(
    SHAPE_COLOURS.map((colour) => [
      colour,
      {
        id: colour,
        name: { type: "colour", colour },
        picture: { type: "swatch", colour },
      },
    ])
  ) as Record<ShapeColour, Bin>
);

const SHAPE_FAMILIES: ReadonlyArray<ShapeBinFamily> = [
  "circle",
  "square",
  "triangle",
];

export const SHAPE_BINS: ReadonlyArray<Bin> = Object.freeze(
  SHAPE_FAMILIES.map((family) => ({
    id: family,
    name: { type: "shape", family } as const,
    picture: { type: "outline", kind: family } as const,
  }))
);

const SIDE_PICTURES: ReadonlyArray<[number, ShapeKind]> = [
  [3, "triangle"],
  [4, "square"],
  [5, "pentagon"],
  [6, "hexagon"],
];

export const sidesBinId = (sides: number) => `${sides}-sides`;

export const SIDE_BINS: ReadonlyArray<Bin> = Object.freeze(
  SIDE_PICTURES.map(([sides, kind]) => ({
    id: sidesBinId(sides),
    name: { type: "sides", sides } as const,
    picture: { type: "outline", kind } as const,
  }))
);
