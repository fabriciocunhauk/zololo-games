import type { JumpProblem } from "../utils/generateJumpProblem";
import FrogArt from "./FrogArt";

const chip =
  "inline-block rounded-xl border-[3px] border-ink px-2 leading-tight shadow-[0_3px_0_var(--color-ink)]";

/** The question card: where the frog starts and how far it jumps. */
export default function ProblemDisplay({
  start,
  operation,
  jump,
}: Pick<JumpProblem, "start" | "operation" | "jump">) {
  const hops = `${jump} ${jump === 1 ? "pad" : "pads"}`;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-3">
        <FrogArt className="w-10 shrink-0 sm:w-14" />
        <h2
          data-testid="jump-problem"
          className="font-display text-[clamp(1.6rem,7vw,3rem)] leading-tight"
        >
          {"Start at "}
          <span className={`${chip} bg-sun`}>{start}</span>
          {", jump "}
          <span className={`${chip} bg-white`}>{`${operation} ${jump}`}</span>
          {"."}
        </h2>
      </div>
      <p className="text-base sm:text-lg">
        {operation === "+" ? `Hop forward ${hops}.` : `Hop back ${hops}.`} Where
        does the frog land?
      </p>
    </div>
  );
}
