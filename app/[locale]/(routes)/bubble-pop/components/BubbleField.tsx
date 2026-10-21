"use client";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useFocusRescue } from "@/app/hooks/useFocusRescue";
import { useBubbleSize } from "../hooks/useBubbleSize";
import { getBubbleX } from "../utils/bubbleLayout";
import type { Bubble } from "../utils/createBubbles";
import FloatingBubble from "./FloatingBubble";

type BubbleFieldProps = {
  bubbles: ReadonlyArray<Bubble>;
  /** Bubbles per round, so leaving bubbles keep their size and column. */
  count: number;
  roundId: number;
  /** The bubble just tapped: it bursts while the rest fade away. */
  poppedId: number | null;
  disabled: boolean;
  onPop: (bubble: Bubble) => void;
};

export default function BubbleField({
  bubbles,
  count,
  roundId,
  poppedId,
  disabled,
  onPop,
}: BubbleFieldProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const { areaWidth, size } = useBubbleSize(areaRef, count);
  // Stays mounted across rounds, so focus can hop to the new bubbles.
  useFocusRescue(areaRef);
  const isMeasured = Number.isFinite(areaWidth);

  return (
    <div
      ref={areaRef}
      className="relative h-80 w-full overflow-hidden rounded-3xl border-[3px] border-ink bg-sky/25 shadow-[0_8px_0_var(--color-ink)] sm:h-96 lg:h-[28rem] landscape:h-[clamp(16rem,calc(100svh-25rem),28rem)]"
    >
      <AnimatePresence custom={poppedId}>
        {isMeasured &&
          bubbles.map((bubble) => (
            <FloatingBubble
              key={`${roundId}-${bubble.id}`}
              bubble={bubble}
              x={getBubbleX({
                column: bubble.column,
                nudge: bubble.nudge,
                count,
                areaWidth,
                bubbleSize: size,
              })}
              size={size}
              disabled={disabled}
              onPop={onPop}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
