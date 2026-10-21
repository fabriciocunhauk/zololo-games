import type { AnimalKind } from "@/app/components/animals/AnimalArt";
import type { Locale } from "@/app/i18n/locales";

export type AnimalNames = {
  name: string;
  plural: string;
  /** Portuguese nouns are masculine or feminine: "quantos ursos", "quantas corujas". */
  feminine?: boolean;
};

export type Animal = {
  kind: AnimalKind;
  names: Record<Locale, AnimalNames>;
};

export const ANIMALS: ReadonlyArray<Animal> = Object.freeze([
  {
    kind: "bear",
    names: {
      en: { name: "bear", plural: "bears" },
      pt: { name: "urso", plural: "ursos" },
    },
  },
  {
    kind: "bird",
    names: {
      en: { name: "bird", plural: "birds" },
      pt: { name: "passarinho", plural: "passarinhos" },
    },
  },
  {
    kind: "cat",
    names: {
      en: { name: "cat", plural: "cats" },
      pt: { name: "gato", plural: "gatos" },
    },
  },
  {
    kind: "dog",
    names: {
      en: { name: "dog", plural: "dogs" },
      pt: { name: "cachorro", plural: "cachorros" },
    },
  },
  {
    kind: "duck",
    names: {
      en: { name: "duck", plural: "ducks" },
      pt: { name: "pato", plural: "patos" },
    },
  },
  {
    kind: "fish",
    names: {
      en: { name: "fish", plural: "fish" },
      pt: { name: "peixe", plural: "peixes" },
    },
  },
  {
    kind: "owl",
    names: {
      en: { name: "owl", plural: "owls" },
      pt: { name: "coruja", plural: "corujas", feminine: true },
    },
  },
  {
    kind: "rabbit",
    names: {
      en: { name: "rabbit", plural: "rabbits" },
      pt: { name: "coelho", plural: "coelhos" },
    },
  },
]);
