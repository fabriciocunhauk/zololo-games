import type { StaticImageData } from "next/image";
import critterCat from "@/public/images/critters/cat.png";
import critterDog from "@/public/images/critters/dog.png";
import critterBird from "@/public/images/critters/bird.png";
import critterFish from "@/public/images/critters/fish.png";
import critterRabbit from "@/public/images/critters/rabbit.png";
import critterBear from "@/public/images/critters/bear.png";
import critterDuck from "@/public/images/critters/duck.png";
import critterOwl from "@/public/images/critters/owl.png";

export const CRITTER_IMAGES: ReadonlyArray<StaticImageData> = Object.freeze([
  critterCat,
  critterDog,
  critterBird,
  critterFish,
  critterRabbit,
  critterBear,
  critterDuck,
  critterOwl,
]);
