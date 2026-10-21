"use client";
import { motion } from "framer-motion";
import { useLocale } from "@/app/i18n/LocaleProvider";
import type { Shape, ShapeSize } from "../constants/shapes";
import { describeShape } from "../utils/describeShape";
import { binFor } from "../utils/binFor";
import type { SortBy } from "../constants/config";
import { SHAPE_TEXT } from "../constants/text";
import ShapeArt from "./ShapeArt";

type ShapeTrayProps = {
  /** The shape waiting to be sorted, or null while one drops or a round ends. */
  shape: Shape | null;
  /** Shared with the bin's copy so the shape flies into it. */
  shapeKey: string;
  sortBy: SortBy;
  isComplete: boolean;
};

const SIZE_CLASS: Record<ShapeSize, string> = {
  small: "w-20 sm:w-24",
  medium: "w-28 sm:w-32",
  big: "w-36 sm:w-40",
};

/** The conveyor belt: one shape rides in at a time. */
export default function ShapeTray({
  shape,
  shapeKey,
  sortBy,
  isComplete,
}: ShapeTrayProps) {
  const locale = useLocale();
  const text = SHAPE_TEXT[locale];
  const description = shape ? describeShape(shape, locale) : "";

  return (
    <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-[3px] border-ink bg-sky/30 shadow-[0_8px_0_var(--color-ink)]">
      <div className="flex h-48 items-end justify-center pb-3 sm:h-56">
        {shape && (
          <motion.div
            key={shapeKey}
            layoutId={shapeKey}
            role="img"
            aria-label={description}
            data-testid="shape"
            data-belongs={binFor(shape, sortBy) ?? undefined}
            initial={{ x: -220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={SIZE_CLASS[shape.size]}
          >
            <ShapeArt
              kind={shape.kind}
              colour={shape.colour}
              rotation={shape.rotation}
            />
          </motion.div>
        )}
        {/* Announces each new shape; the feedback keeps the only role="status". */}
        <p aria-live="polite" className="sr-only">
          {shape ? text.hereComes(description) : ""}
        </p>
        {isComplete && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="mb-6 flex flex-col items-center gap-1"
          >
            <span
              aria-hidden
              className="text-6xl leading-none text-sun drop-shadow-[0_3px_0_var(--color-ink)]"
            >
              ★
            </span>
            <p className="font-display text-3xl sm:text-4xl">
              {text.roundBanner}
            </p>
          </motion.div>
        )}
      </div>
      <div
        aria-hidden
        className="h-6 border-t-[3px] border-ink bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_16px,var(--color-grape)_16px_32px)]"
      />
    </div>
  );
}
