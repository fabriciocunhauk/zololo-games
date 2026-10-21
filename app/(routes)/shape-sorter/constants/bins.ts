import {
  COLOUR_NAMES,
  SHAPE_COLOURS,
  type ShapeColour,
  type ShapeKind,
} from "./shapes";

export type BinPicture =
  | { type: "swatch"; colour: ShapeColour }
  | { type: "outline"; kind: ShapeKind };

export type Bin = {
  /** Matches what `binFor` returns. */
  id: string;
  label: string;
  /** Said after a right answer, e.g. "It has 3 sides!" */
  praise: string;
  picture: BinPicture;
};

const capitalise = (word: string) => word[0].toUpperCase() + word.slice(1);

export const COLOUR_BINS: Readonly<Record<ShapeColour, Bin>> = Object.freeze(
  Object.fromEntries(
    SHAPE_COLOURS.map((colour) => [
      colour,
      {
        id: colour,
        label: capitalise(COLOUR_NAMES[colour]),
        praise: `It's ${COLOUR_NAMES[colour]}!`,
        picture: { type: "swatch", colour },
      },
    ])
  ) as Record<ShapeColour, Bin>
);

export const SHAPE_BINS: ReadonlyArray<Bin> = Object.freeze([
  {
    id: "circle",
    label: "Circles",
    praise: "It's a circle!",
    picture: { type: "outline", kind: "circle" },
  },
  {
    id: "square",
    label: "Squares",
    praise: "It's a square!",
    picture: { type: "outline", kind: "square" },
  },
  {
    id: "triangle",
    label: "Triangles",
    praise: "It's a triangle!",
    picture: { type: "outline", kind: "triangle" },
  },
]);

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
    label: `${sides} sides`,
    praise: `It has ${sides} sides!`,
    picture: { type: "outline", kind } as const,
  }))
);
