import { classNames } from "@/app/utils/appearance";

type SparkleProps = {
  x: number;
  y: number;
  /** Centre to tip. */
  size?: number;
  /** Tailwind fill class. */
  fill?: string;
};

/** The brand's 4-point star accent. SVG only; use at most one per illustration. */
export default function Sparkle({
  x,
  y,
  size = 9,
  fill = "fill-white",
}: SparkleProps) {
  const k = size * 0.22;
  const d = [
    `M ${x} ${y - size}`,
    `Q ${x + k} ${y - k} ${x + size} ${y}`,
    `Q ${x + k} ${y + k} ${x} ${y + size}`,
    `Q ${x - k} ${y + k} ${x - size} ${y}`,
    `Q ${x - k} ${y - k} ${x} ${y - size}`,
    "Z",
  ].join(" ");

  return (
    <path
      d={d}
      strokeWidth={2.5}
      strokeLinejoin="round"
      className={classNames("stroke-ink", fill)}
    />
  );
}
