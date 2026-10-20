import type { StaticImageData } from "next/image";
import bear from "@/public/images/animals/bear.png";
import bird from "@/public/images/animals/bird.png";
import cat from "@/public/images/animals/cat.png";
import dog from "@/public/images/animals/dog.png";
import duck from "@/public/images/animals/duck.png";
import fish from "@/public/images/animals/fish.png";
import owl from "@/public/images/animals/owl.png";
import rabbit from "@/public/images/animals/rabbit.png";

export type Animal = {
  name: string;
  plural: string;
  image: StaticImageData;
};

export const ANIMALS: ReadonlyArray<Animal> = Object.freeze([
  { name: "bear", plural: "bears", image: bear },
  { name: "bird", plural: "birds", image: bird },
  { name: "cat", plural: "cats", image: cat },
  { name: "dog", plural: "dogs", image: dog },
  { name: "duck", plural: "ducks", image: duck },
  { name: "fish", plural: "fish", image: fish },
  { name: "owl", plural: "owls", image: owl },
  { name: "rabbit", plural: "rabbits", image: rabbit },
]);
