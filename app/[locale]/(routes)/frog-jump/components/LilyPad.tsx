import { classNames } from "@/app/utils/appearance";

type LilyPadProps = {
  value: number;
  /** The frog's starting pad is yellow. */
  isStart?: boolean;
  className?: string;
};

// The notch starts near the rim, clear of the number in the middle.
const PAD = "M35 9.5 L40.9 8.3 A22 12 0 1 1 31.5 4.7 Z";

/** One numbered lily pad on the pond. Purely visual. */
export default function LilyPad({
  value,
  isStart = false,
  className,
}: LilyPadProps) {
  return (
    <span
      className={classNames(
        "@container relative flex aspect-[4/3] items-center justify-center pb-[10%]",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 48 36"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <path transform="translate(0 3)" d={PAD} className="fill-ink" />
        <path
          d={PAD}
          strokeWidth={2.5}
          strokeLinejoin="round"
          className={classNames(
            "stroke-ink",
            isStart ? "fill-sun" : "fill-leaf",
          )}
        />
      </svg>
      <span className="relative font-display text-[clamp(0.8rem,38cqw,1.25rem)] leading-none">
        {value}
      </span>
    </span>
  );
}
