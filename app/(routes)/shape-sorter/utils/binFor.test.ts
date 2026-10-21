import { describe, expect, it } from "vitest";
import { SHAPE_BINS, SIDE_BINS } from "../constants/bins";
import {
  SHAPE_COLOURS,
  SHAPE_KINDS,
  sideCount,
  type Shape,
  type ShapeKind,
} from "../constants/shapes";
import { binFor } from "./binFor";
import { shapeOutline } from "./shapeGeometry";

const EXPECTED_SIDES: Record<ShapeKind, number> = {
  circle: 0,
  square: 4,
  rectangle: 4,
  triangle: 3,
  "right-triangle": 3,
  "scalene-triangle": 3,
  pentagon: 5,
  hexagon: 6,
};

const KINDS = Object.keys(SHAPE_KINDS) as ShapeKind[];
const shapeOf = (kind: ShapeKind, rotation = 0): Shape => ({
  kind,
  colour: "grape",
  size: "medium",
  rotation,
});

describe("side counts", () => {
  it.each(KINDS)("%s has the right number of sides", (kind) => {
    expect(sideCount(kind)).toBe(EXPECTED_SIDES[kind]);
  });

  it.each(KINDS)("%s is drawn with one corner per side", (kind) => {
    for (const rotation of [0, 45, -90, 180]) {
      const outline = shapeOutline(kind, rotation);
      expect(outline?.length ?? 0).toBe(EXPECTED_SIDES[kind]);
    }
  });
});

describe("binFor", () => {
  it("sorts by colour into the shape's colour", () => {
    for (const colour of SHAPE_COLOURS) {
      for (const kind of KINDS) {
        expect(binFor({ ...shapeOf(kind), colour }, "colour")).toBe(colour);
      }
    }
  });

  it("sorts every triangle, tilted or not, into Triangles", () => {
    const triangles: ShapeKind[] = [
      "triangle",
      "right-triangle",
      "scalene-triangle",
    ];
    for (const kind of triangles) {
      expect(binFor(shapeOf(kind, 45), "shape")).toBe("triangle");
    }
    expect(binFor(shapeOf("circle"), "shape")).toBe("circle");
    expect(binFor(shapeOf("square", 45), "shape")).toBe("square");
    expect(SHAPE_BINS.map((bin) => bin.id)).toEqual([
      "circle",
      "square",
      "triangle",
    ]);
  });

  it("sorts by sides into the bin with that many sides", () => {
    for (const kind of KINDS) {
      const bin = binFor(shapeOf(kind), "sides");
      if (kind === "circle") {
        expect(bin).toBeNull();
        continue;
      }
      const match = SIDE_BINS.filter((b) => b.id === bin);
      expect(match).toHaveLength(1);
      expect(match[0].label).toBe(`${EXPECTED_SIDES[kind]} sides`);
    }
  });
});
