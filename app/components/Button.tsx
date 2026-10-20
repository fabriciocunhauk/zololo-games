import type { ReactNode } from "react";
import { classNames } from "@/app/utils/appearance";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  classes?: { button?: string };
  disabled?: boolean;
};

export default function Button({
  children,
  type = "button",
  onClick,
  classes,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "flex items-center justify-center bg-white hover:bg-white/90 rounded-full transition ease-in-out duration-150 w-40 h-12 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink",
        classes?.button,
        disabled && "opacity-30 cursor-not-allowed pointer-events-none"
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
