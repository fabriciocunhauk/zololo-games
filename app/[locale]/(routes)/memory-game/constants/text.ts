import type { Locale } from "@/app/i18n/locales";

const en = {
  blurb:
    "Meet the Zololo monsters! Every monster has a twin hiding under the cards. Can you find them all?",
  howToPlay: {
    steps: [
      "Tap a card to turn it over and meet a monster.",
      "Tap one more card. Is it the same monster? If not, both cards turn back.",
      "Find every pair of twins to go up a level. Each level has more cards!",
    ],
    tip: "say each monster's name out loud when you see it. It helps you remember where it's hiding!",
  },
  pairs: "Pairs",
  moves: "Moves",
  restart: "Restart level",
  shuffling: "Shuffling the cards…",
  match: "It's a match!",
  mismatch: "Not a match. They flip back.",
  won: "You found every pair!",
  lastLevel: "That was the last level! Here comes a fresh set of cards…",
  nextLevel: (level: number) => `Get ready for level ${level}…`,
  faceDown: (position: number) => `Card ${position}, face down`,
  matched: (name: string) => `${name}, matched`,
};

const pt: typeof en = {
  blurb:
    "Conheça os monstrinhos do Zololo! Cada monstrinho tem um gêmeo escondido embaixo das cartas. Você consegue achar todos?",
  howToPlay: {
    steps: [
      "Toque em uma carta para virar e conhecer um monstrinho.",
      "Toque em mais uma carta. É o mesmo monstrinho? Se não for, as duas cartas viram de volta.",
      "Ache todos os pares de gêmeos para subir de nível. Cada nível tem mais cartas!",
    ],
    tip: "fale o nome de cada monstrinho em voz alta quando ele aparecer. Isso ajuda a lembrar onde ele está escondido!",
  },
  pairs: "Pares",
  moves: "Jogadas",
  restart: "Recomeçar nível",
  shuffling: "Embaralhando as cartas…",
  match: "Achou um par!",
  mismatch: "Não é par. As cartas vão virar de volta.",
  won: "Você achou todos os pares!",
  lastLevel: "Esse foi o último nível! Lá vêm cartas novas…",
  nextLevel: (level) => `Prepare-se para o nível ${level}…`,
  faceDown: (position) => `Carta ${position}, virada para baixo`,
  matched: (name) => `${name}, par encontrado`,
};

export const MEMORY_TEXT: Record<Locale, typeof en> = { en, pt };
