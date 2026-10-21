import type { ComponentType, CSSProperties } from "react";
import { Bird, Duck, Owl } from "./birds";
import Fish from "./Fish";
import { Bear, Cat, Dog, Rabbit } from "./mammals";
import { GroundShadow } from "./parts";

export type AnimalKind =
  | "bear"
  | "bird"
  | "cat"
  | "dog"
  | "duck"
  | "fish"
  | "owl"
  | "rabbit";

const ANIMALS: Record<AnimalKind, ComponentType> = {
  bear: Bear,
  bird: Bird,
  cat: Cat,
  dog: Dog,
  duck: Duck,
  fish: Fish,
  owl: Owl,
  rabbit: Rabbit,
};

type AnimalArtProps = {
  kind: AnimalKind;
  className?: string;
  style?: CSSProperties;
  /** Position and size, for nesting inside another SVG. */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

/** One Zololo animal on its ground shadow. Decorative: label the surrounding control instead. */
export default function AnimalArt({
  kind,
  className,
  style,
  x,
  y,
  width,
  height,
}: AnimalArtProps) {
  const Animal = ANIMALS[kind];
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={className}
      style={style}
      x={x}
      y={y}
      width={width}
      height={height}
    >
      <GroundShadow />
      <Animal />
    </svg>
  );
}
