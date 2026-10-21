import type { ReactNode } from "react";
import { classNames } from "@/app/utils/appearance";

type HeaderButtonProps = {
  onClick: () => void;
  children: ReactNode;
  /** Tailwind background class. */
  tone?: string;
};

/** Chunky ink-edged button for game headers (restart, change difficulty). */
export default function HeaderButton({
  onClick,
  children,
  tone = "bg-pink-primary",
}: HeaderButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "rounded-xl border-[3px] border-ink px-4 py-3 font-bold shadow-[0_4px_0_var(--color-ink)] transition-transform active:translate-y-[3px] active:shadow-[0_1px_0_var(--color-ink)] motion-reduce:transition-none motion-reduce:active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink focus-visible:ring-offset-2",
        tone
      )}
    >
      {children}
    </button>
  );
}
