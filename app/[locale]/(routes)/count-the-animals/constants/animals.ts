import type { AnimalKind } from "@/app/components/animals/AnimalArt";

export type Animal = {
  name: string;
  plural: string;
  kind: AnimalKind;
};

export const ANIMALS: ReadonlyArray<Animal> = Object.freeze([
  { name: "bear", plural: "bears", kind: "bear" },
  { name: "bird", plural: "birds", kind: "bird" },
  { name: "cat", plural: "cats", kind: "cat" },
  { name: "dog", plural: "dogs", kind: "dog" },
  { name: "duck", plural: "ducks", kind: "duck" },
  { name: "fish", plural: "fish", kind: "fish" },
  { name: "owl", plural: "owls", kind: "owl" },
  { name: "rabbit", plural: "rabbits", kind: "rabbit" },
]);
