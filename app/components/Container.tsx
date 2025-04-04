import { classNames } from "@/app/utils/appearance";
import { ReactNode, type JSX } from "react";

interface ContainerProps {
  children: ReactNode;
  element?: keyof JSX.IntrinsicElements;
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
  element: Tag = "div",
  classes,
  size = "lg",
}) => {
  const className = classNames(
    "mx-auto py-4 px-10",
    sizeMap[size],
    classes?.container
  );

  return <Tag className={className}>{children}</Tag>;
};

export default Container;
