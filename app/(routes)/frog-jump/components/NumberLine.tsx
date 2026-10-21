"use client";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import type { NumberRange } from "../constants/config";
import HoppingFrog from "./HoppingFrog";
import LilyPad from "./LilyPad";

type NumberLineProps = {
  line: NumberRange;
  start: number;
  /** Where the frog lands, once an answer is in. */
  landing: number | null;
};

/**
 * Lily pads on a pond, one per number. Long lines scroll sideways inside the
 * pond, which follows the frog.
 */
export default function NumberLine({ line, start, landing }: NumberLineProps) {
  const reduceMotion = useReducedMotion();
  const pond = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);
  const frogAt = landing ?? start;
  const values = Array.from(
    { length: line.max - line.min + 1 },
    (_, idx) => line.min + idx,
  );
  const trackStyle: CSSProperties = {
    minWidth: `calc(${values.length} * var(--cell))`,
  };

  // Keep the frog's pad in view when the line is wider than the screen.
  useEffect(() => {
    const scroller = pond.current;
    const pad = scroller?.querySelector<HTMLElement>(
      `[data-value="${frogAt}"]`,
    );
    if (!scroller || !pad) return;
    const padBox = pad.getBoundingClientRect();
    const pondBox = scroller.getBoundingClientRect();
    const left =
      scroller.scrollLeft +
      padBox.left -
      pondBox.left +
      padBox.width / 2 -
      scroller.clientWidth / 2;
    const smooth = hasScrolled.current && !reduceMotion;
    scroller.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
    hasScrolled.current = true;
  }, [frogAt, line, reduceMotion]);

  return (
    <div
      ref={pond}
      role="region"
      aria-label="Number line"
      tabIndex={0}
      className="w-full overflow-x-auto overscroll-x-contain rounded-3xl border-[3px] border-ink bg-sky shadow-[0_6px_0_var(--color-ink)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink focus-visible:ring-offset-2"
    >
      <p className="sr-only">
        Lily pads from {line.min} to {line.max}. The frog is on {frogAt}.
      </p>
      <div className="px-1.5 pt-20 pb-3 [--cell:3rem]">
        <div className="relative" style={trackStyle}>
          <ol aria-hidden className="flex">
            {values.map((value) => (
              <li
                key={value}
                data-value={value}
                className="min-w-0 flex-1 px-0.5"
              >
                <LilyPad
                  value={value}
                  isStart={value === start}
                  className="mx-auto w-full max-w-16"
                />
              </li>
            ))}
          </ol>
          <HoppingFrog line={line} from={start} to={frogAt} />
        </div>
      </div>
    </div>
  );
}
