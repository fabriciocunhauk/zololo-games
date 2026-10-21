import { SHAPE_KINDS, type Point, type ShapeKind } from "../constants/shapes";

/** Shapes are drawn in a 100 × 100 box around this centre. */
export const CENTRE = 50;
/** Every corner sits within this distance of the centre, at any tilt. */
export const SHAPE_RADIUS = 40;
export const CIRCLE_RADIUS = 36;

/**
 * A shape's corners, centred in the 100 × 100 box, scaled to fit
 * `SHAPE_RADIUS` and turned `rotation` degrees clockwise. Null for a circle.
 */
export function shapeOutline(kind: ShapeKind, rotation = 0): Point[] | null {
  const raw = SHAPE_KINDS[kind].outline;
  if (!raw) return null;

  const {
    centre: [cx, cy],
    reach,
  } = enclosingCircle(raw);
  const scale = SHAPE_RADIUS / reach;
  const angle = (rotation * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return raw.map(([x, y]) => {
    const dx = (x - cx) * scale;
    const dy = (y - cy) * scale;
    return [CENTRE + dx * cos - dy * sin, CENTRE + dx * sin + dy * cos];
  });
}

/**
 * The smallest circle around the corners, so thin shapes fill the box as well
 * as round ones. It is centred on the middle of two corners or passes through
 * three, so trying every pair and triple finds it.
 */
function enclosingCircle(points: ReadonlyArray<Point>): {
  centre: Point;
  reach: number;
} {
  const candidates: Point[] = [];
  points.forEach((a, i) =>
    points.slice(i + 1).forEach((b, j) => {
      candidates.push([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
      points.slice(i + j + 2).forEach((c) => {
        const centre = circumcentre(a, b, c);
        if (centre) candidates.push(centre);
      });
    })
  );
  const reachFrom = ([cx, cy]: Point) =>
    Math.max(...points.map(([x, y]) => Math.hypot(x - cx, y - cy)));
  return candidates.reduce(
    (best, centre) => {
      const reach = reachFrom(centre);
      return reach < best.reach ? { centre, reach } : best;
    },
    { centre: candidates[0], reach: reachFrom(candidates[0]) }
  );
}

function circumcentre(a: Point, b: Point, c: Point): Point | null {
  const d =
    2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  if (Math.abs(d) < 1e-9) return null;
  const sq = (p: Point) => p[0] ** 2 + p[1] ** 2;
  return [
    (sq(a) * (b[1] - c[1]) + sq(b) * (c[1] - a[1]) + sq(c) * (a[1] - b[1])) / d,
    (sq(a) * (c[0] - b[0]) + sq(b) * (a[0] - c[0]) + sq(c) * (b[0] - a[0])) / d,
  ];
}

export function toPointsAttr(points: ReadonlyArray<Point>): string {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

/**
 * A short highlight just inside the edge that faces the top left, like light
 * catching it. Stays inside any convex shape.
 */
export function shineLine(points: ReadonlyArray<Point>): [Point, Point] {
  const lerp = (a: Point, b: Point, t: number): Point => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
  ];
  const centre: Point = [
    points.reduce((sum, [x]) => sum + x, 0) / points.length,
    points.reduce((sum, [, y]) => sum + y, 0) / points.length,
  ];
  const edges = points.map((p, i) => [p, points[(i + 1) % points.length]]);
  const [a, b] = edges.reduce((best, edge) => {
    const score = ([p, q]: Point[]) => p[0] + q[0] + p[1] + q[1];
    return score(edge) < score(best) ? edge : best;
  });
  const innerA = lerp(centre, a, 0.68);
  const innerB = lerp(centre, b, 0.68);
  return [lerp(innerA, innerB, 0.2), lerp(innerA, innerB, 0.55)];
}
