import type { Locale } from "@/app/i18n/locales";
import type { LevelStep } from "@/app/utils/advanceLevel";
import type { AnimalNames } from "./animals";

/** Portuguese agreement: "contado" / "contada", "quantos" / "quantas". */
const ending = (animal: AnimalNames) => (animal.feminine ? "a" : "o");

const en = {
  blurb:
    "Ducks, cats, owls and more are waiting to be counted. Tap each animal to count it, then pick the right number!",
  howToPlay: {
    steps: [
      "Look at the question. Which animal do you need to count?",
      "Tap each animal once to count it: 1, 2, 3… Each one gets its number.",
      "Tap the number you counted. Get 5 right to go up a level!",
    ],
    tip: "tapped the same animal twice or lost track? Tap “Count again” to start over.",
  },
  caption: (max: number) => `up to ${max}`,
  question: (animal: AnimalNames) => `How many ${animal.plural}?`,
  tapEach: (animal: AnimalNames) => `Tap each ${animal.name} to count it.`,
  countedSoFar: (count: number) => `You counted ${count}.`,
  countAgain: "Count again",
  animalLabel: (animal: AnimalNames, count?: number) =>
    count === undefined
      ? `${animal.name}, not counted yet`
      : `${animal.name}, counted ${count}`,
  right: (label: string, next: LevelStep, max: number) => {
    const extra = next.levelUp
      ? ` Level up! Now count up to ${max}.`
      : next.stars === 0
        ? " Another row of stars!"
        : "";
    return `🎉 Yes! ${label}!${extra}`;
  },
  countTogether: "Not quite! Let's count them together.",
  reveal: (label: string) => `There are ${label}.`,
};

const pt: typeof en = {
  blurb:
    "Patos, gatos, corujas e outros bichos estão esperando para ser contados. Toque em cada animal para contar e depois escolha o número certo!",
  howToPlay: {
    steps: [
      "Leia a pergunta. Qual animal você precisa contar?",
      "Toque uma vez em cada animal para contar: 1, 2, 3… Cada um ganha o seu número.",
      "Toque no número que você contou. Acerte 5 para subir de nível!",
    ],
    tip: "tocou duas vezes no mesmo animal ou se perdeu? Toque em “Contar de novo” para recomeçar.",
  },
  caption: (max) => `até ${max}`,
  question: (animal) => `Quant${ending(animal)}s ${animal.plural}?`,
  tapEach: (animal) => `Toque em cada ${animal.name} para contar.`,
  countedSoFar: (count) => `Você contou ${count}.`,
  countAgain: "Contar de novo",
  animalLabel: (animal, count) =>
    count === undefined
      ? `${animal.name}, ainda não contad${ending(animal)}`
      : `${animal.name}, contad${ending(animal)} ${count}`,
  right: (label, next, max) => {
    const extra = next.levelUp
      ? ` Subiu de nível! Agora conte até ${max}.`
      : next.stars === 0
        ? " Mais uma fileira de estrelas!"
        : "";
    return `🎉 Isso! ${label}!${extra}`;
  },
  countTogether: "Quase! Vamos contar juntos.",
  reveal: (label) => `Tem ${label}.`,
};

export const COUNTING_TEXT: Record<Locale, typeof en> = { en, pt };
