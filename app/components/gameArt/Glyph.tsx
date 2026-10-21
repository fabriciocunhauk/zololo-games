type GlyphProps = {
  /** Centre of the glyph. */
  x: number;
  y: number;
  size: number;
  children: string | number;
};

/** One big display-font number, letter or sign: the only text tile art may carry. */
export default function Glyph({ x, y, size, children }: GlyphProps) {
  return (
    <text
      x={x}
      y={y + size * 0.36}
      fontSize={size}
      textAnchor="middle"
      className="font-display fill-ink"
    >
      {children}
    </text>
  );
}
