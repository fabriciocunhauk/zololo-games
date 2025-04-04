import { classNames } from "@/app/utils/appearance";
import Link from "next/link";
import React, { ReactNode, FC } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  link?: string;
  classes?: { link?: string; button?: string };
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  link,
  classes,
  disabled,
}) => {
  const baseClasses =
    "flex items-center justify-center bg-white hover:bg-white/90 rounded-full transition ease-in-out duration-150 w-40 h-12 cursor-pointer";

  const linkClasses = classNames(baseClasses, classes?.link);
  const buttonClasses = classNames(
    baseClasses,
    classes?.button,
    disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
  );

  return link ? (
    <Link href={link} className={linkClasses}>
      {children}
    </Link>
  ) : (
    <button
      className={buttonClasses}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
