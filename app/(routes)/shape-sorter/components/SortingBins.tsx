"use client";
import { motion, useAnimate, useReducedMotion } from "framer-motion";
import { useEffect, type CSSProperties } from "react";
import { classNames } from "@/app/utils/appearance";
import type { Bin } from "../constants/bins";
import type { DroppedShape, Shake } from "../hooks/useShapeSorterGame";
import BinPicture from "./BinPicture";
import ShapeArt from "./ShapeArt";

type SortingBinsProps = {
  bins: ReadonlyArray<Bin>;
  counts: Readonly<Record<string, number>>;
  dropped: Readonly<Record<string, DroppedShape>>;
  shake: Shake | null;
  /** Taps are ignored (not disabled, so keyboard focus stays put). */
  busy: boolean;
  onSort: (binId: string) => void;
};

const columns: Record<number, string> = {
  2: "grid-cols-2 max-w-md",
  3: "grid-cols-3 max-w-xl",
  4: "grid-cols-2 sm:grid-cols-4 max-w-md sm:max-w-3xl",
};

/** Toy-block bins to tap. Each shows its label, a counter and the last shape sorted into it. */
export default function SortingBins({
  bins,
  counts,
  dropped,
  shake,
  busy,
  onSort,
}: SortingBinsProps) {
  return (
    <div
      role="group"
      aria-label="Sorting bins"
      className={classNames(
        "grid w-full gap-3 pt-3 sm:gap-5",
        columns[bins.length] ?? "grid-cols-2"
      )}
    >
      {bins.map((bin) => (
        <SortingBin
          key={bin.id}
          bin={bin}
          count={counts[bin.id] ?? 0}
          dropped={dropped[bin.id]}
          shakeNonce={shake?.binId === bin.id ? shake.nonce : 0}
          busy={busy}
          onSort={onSort}
        />
      ))}
    </div>
  );
}

type SortingBinProps = {
  bin: Bin;
  count: number;
  dropped?: DroppedShape;
  shakeNonce: number;
  busy: boolean;
  onSort: (binId: string) => void;
};

const binStyle: CSSProperties & { "--tile": string; "--depth": string } = {
  "--tile": "white",
  "--depth": "8px",
};

function SortingBin({
  bin,
  count,
  dropped,
  shakeNonce,
  busy,
  onSort,
}: SortingBinProps) {
  const reduceMotion = useReducedMotion();
  // Shake a wrapper so the toy-block's own hover/press transforms keep working.
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    if (shakeNonce === 0 || reduceMotion || !scope.current) return;
    animate(
      scope.current,
      { x: [0, -10, 10, -7, 7, -3, 0] },
      { duration: 0.45, ease: "easeInOut" }
    );
  }, [shakeNonce, reduceMotion, animate, scope]);

  return (
    <div ref={scope}>
      <button
        type="button"
        data-bin={bin.id}
        aria-label={`${bin.label} bin, ${count} sorted`}
        aria-disabled={busy}
        onClick={() => onSort(bin.id)}
        style={binStyle}
        className="toy-block relative flex w-full flex-col items-center gap-2 px-2 pt-3 pb-2"
      >
        <span
          aria-hidden
          className="absolute -right-2 -top-3 flex h-9 min-w-9 items-center justify-center rounded-full border-[3px] border-paper bg-ink px-1 font-display text-base leading-none text-paper"
        >
          {count}
        </span>
        <BinPicture picture={bin.picture} className="w-10 sm:w-12" />
        <span className="font-display text-base leading-tight sm:text-xl">
          {bin.label}
        </span>
        <span className="flex h-12 w-full items-center justify-center rounded-xl border-[3px] border-dashed border-ink/40 bg-ink/10 sm:h-14">
          {dropped && (
            <motion.span
              key={dropped.key}
              layoutId={dropped.key}
              className="block w-9 sm:w-10"
            >
              <ShapeArt
                kind={dropped.shape.kind}
                colour={dropped.shape.colour}
                rotation={dropped.shape.rotation}
              />
            </motion.span>
          )}
        </span>
      </button>
    </div>
  );
}
