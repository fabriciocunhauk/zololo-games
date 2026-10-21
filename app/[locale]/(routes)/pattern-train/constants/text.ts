import type { MonsterColor } from "@/app/components/monsters/monsters";
import type { Locale } from "@/app/i18n/locales";

const en = {
  blurb:
    "All aboard! The monsters ride the train in a pattern. Spot who's missing and help the train chuff along.",
  howToPlay: {
    steps: [
      "Look at the train. The monsters ride in a pattern that repeats.",
      "Find the carriage with the “?”. Who should ride in it?",
      "Tap the monster that fits. Get 5 right to go up a level!",
    ],
    tip: "say the pattern out loud: “Pip, Bop, Pip, Bop…”. Hearing it helps you guess who comes next.",
  },
  caption: (count: number) => `${count} carriages`,
  /** The question, split around the "?" badge; `hidden` is for screen readers only. */
  question: { before: "Who rides in the", hidden: "empty", after: "carriage?" },
  optionsLabel: "Who rides in the empty carriage?",
  train: "The pattern train",
  emptyCarriage: "Empty carriage",
  colours: {
    sun: "Yellow",
    sky: "Blue",
    leaf: "Green",
    bubblegum: "Pink",
    tangerine: "Orange",
    grape: "Purple",
  } satisfies Record<MonsterColor, string>,
  /** A colour train's monster, e.g. "Blue Pip". */
  colourVariant: (colour: string, name: string) => `${colour} ${name}`,
  right: {
    base: "🎉 Choo choo! That's right!",
    levelUp: " Level up: longer trains!",
    fullRow: " Another row of stars!",
  },
  tryAgain: "Not quite — look at the pattern again!",
  revealColour: (colour: string) => `It was the ${colour.toLowerCase()} one!`,
  revealGap: "Here's who rides in the empty carriage!",
  nextTrain: "Here comes the next train.",
};

const pt: typeof en = {
  blurb:
    "Todos a bordo! Os monstrinhos andam de trem seguindo um padrão. Descubra quem está faltando e ajude o trem a seguir viagem.",
  howToPlay: {
    steps: [
      "Olhe o trem. Os monstrinhos estão sentados num padrão que se repete.",
      "Ache o vagão com o “?”. Quem deve ir nele?",
      "Toque no monstrinho que encaixa. Acerte 5 para subir de nível!",
    ],
    tip: "fale o padrão em voz alta: “Pip, Bop, Pip, Bop…”. Ouvir ajuda a adivinhar quem vem depois.",
  },
  caption: (count) => `${count} vagões`,
  question: { before: "Quem vai no", hidden: "vazio", after: "vagão?" },
  optionsLabel: "Quem vai no vagão vazio?",
  train: "O trem dos padrões",
  emptyCarriage: "Vagão vazio",
  // Masculine, to agree with "o monstrinho".
  colours: {
    sun: "Amarelo",
    sky: "Azul",
    leaf: "Verde",
    bubblegum: "Rosa",
    tangerine: "Laranja",
    grape: "Roxo",
  },
  colourVariant: (colour, name) => `${name} ${colour}`,
  right: {
    base: "🎉 Piuí! Acertou!",
    levelUp: " Subiu de nível: trens mais compridos!",
    fullRow: " Mais uma fileira de estrelas!",
  },
  tryAgain: "Quase! Olhe o padrão de novo!",
  revealColour: (colour) => `Era o monstrinho ${colour.toLowerCase()}!`,
  revealGap: "Olha quem vai no vagão vazio!",
  nextTrain: "Lá vem o próximo trem.",
};

export const PATTERN_TEXT: Record<Locale, typeof en> = { en, pt };
