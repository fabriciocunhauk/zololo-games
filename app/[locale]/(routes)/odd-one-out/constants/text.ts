import type { Locale } from "@/app/i18n/locales";

const en = {
  blurb:
    "The monsters are all dressed alike… except one! Look closely and tap the monster that's different.",
  howToPlay: {
    steps: [
      "Look at all the monsters. They're all the same… except one!",
      "Find the one that's different and tap it.",
      "Spot 5 odd ones to go up a level and meet more monsters!",
    ],
    tip: "check one thing at a time: colour, shape, eyes, the top of the head, mouths and spots.",
  },
  caption: (count: number) => `${count} monsters`,
  question: "Which monster is different?",
  grid: "Monsters",
  tile: (position: number) => `Monster ${position}`,
  tryAgain: "Look closely — they all match except one!",
  reveal: (description: string) => `Here's the odd one! ${description}`,
  spotted: {
    lead: "🎉 You spotted it!",
    levelUp: (count: number) => ` Level up! Now there are ${count} monsters.`,
    fullRow: " Another row of stars!",
  },
};

const pt: typeof en = {
  blurb:
    "Os monstrinhos estão todos iguaizinhos… menos um! Olhe bem e toque no monstrinho diferente.",
  howToPlay: {
    steps: [
      "Olhe todos os monstrinhos. Eles são todos iguais… menos um!",
      "Ache o que é diferente e toque nele.",
      "Ache 5 diferentes para subir de nível e conhecer mais monstrinhos!",
    ],
    tip: "confira uma coisa de cada vez: a cor, o formato, os olhos, o alto da cabeça, a boca e as pintas.",
  },
  caption: (count) => `${count} monstrinhos`,
  question: "Qual monstrinho é diferente?",
  grid: "Monstrinhos",
  tile: (position) => `Monstrinho ${position}`,
  tryAgain: "Olhe bem: todos são iguais, menos um!",
  reveal: (description) => `Olha o diferente aqui! ${description}`,
  spotted: {
    lead: "🎉 Você achou!",
    levelUp: (count) => ` Subiu de nível! Agora são ${count} monstrinhos.`,
    fullRow: " Mais uma fileira de estrelas!",
  },
};

export const ODD_TEXT: Record<Locale, typeof en> = { en, pt };
