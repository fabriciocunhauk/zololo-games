import { classNames } from "@/app/utils/appearance";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  classes?: { container?: string };
  size?: "xs" | "sm" | "md" | "lg";
}

const sizeMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  xs: "max-w-md",
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
};

const Container: React.FC<ContainerProps> = ({
  children,
  classes,
  size = "lg",
}) => {
  const className = classNames(
    "mx-auto py-4 px-10",
    sizeMap[size],
    classes?.container
  );

  return <div className={className}>{children}</div>;
};

export default Container;
