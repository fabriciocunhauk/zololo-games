import { describe, expect, it } from "vitest";
import { SHAPE_KINDS, type ShapeKind } from "../constants/shapes";
import { CENTRE, SHAPE_RADIUS, shapeOutline } from "./shapeGeometry";

const KINDS = (Object.keys(SHAPE_KINDS) as ShapeKind[]).filter(
  (kind) => kind !== "circle"
);

describe("shapeOutline", () => {
  it.each(KINDS)("%s fits the box at every tilt and fills it", (kind) => {
    for (let rotation = -180; rotation <= 180; rotation += 15) {
      const reach = shapeOutline(kind, rotation)!.map(([x, y]) =>
        Math.hypot(x - CENTRE, y - CENTRE)
      );
      expect(Math.max(...reach)).toBeCloseTo(SHAPE_RADIUS, 5);
    }
  });

  it("has no outline for a circle", () => {
    expect(shapeOutline("circle", 45)).toBeNull();
  });
});
