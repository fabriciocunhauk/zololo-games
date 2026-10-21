import type { Locale } from "@/app/i18n/locales";
import { capitalise } from "@/app/utils/capitalise";
import type { BinName, ShapeBinFamily } from "./bins";
import type { SortBy } from "./config";
import type { ShapeColour, ShapeKind } from "./shapes";

/** A noun's grammatical gender, for the adjectives that agree with it. */
type Gender = "m" | "f";

/** A word with its masculine and feminine forms (the same in English). */
type Agreeing = Readonly<Record<Gender, string>>;

const same = (word: string): Agreeing => ({ m: word, f: word });


const EN_WORDS = {
  colours: {
    sun: same("yellow"),
    sky: same("blue"),
    leaf: same("green"),
    "pink-primary": same("pink"),
    tangerine: same("orange"),
    grape: same("purple"),
  } satisfies Record<ShapeColour, Agreeing>,
  kinds: {
    circle: { name: "circle", gender: "m" },
    square: { name: "square", gender: "m" },
    rectangle: { name: "long rectangle", gender: "m" },
    triangle: { name: "triangle", gender: "m" },
    "right-triangle": { name: "right-angle triangle", gender: "m" },
    "scalene-triangle": { name: "pointy triangle", gender: "m" },
    pentagon: { name: "pentagon", gender: "m" },
    hexagon: { name: "hexagon", gender: "m" },
  } as Record<ShapeKind, { name: string; gender: Gender }>,
  small: same("small"),
  big: same("big"),
  tilted: same("tilted"),
};

const PT_WORDS: typeof EN_WORDS = {
  colours: {
    sun: { m: "amarelo", f: "amarela" },
    sky: same("azul"),
    leaf: same("verde"),
    // Rosa and laranja don't change as colour words.
    "pink-primary": same("rosa"),
    tangerine: same("laranja"),
    grape: { m: "roxo", f: "roxa" },
  },
  kinds: {
    circle: { name: "círculo", gender: "m" },
    square: { name: "quadrado", gender: "m" },
    rectangle: { name: "retângulo comprido", gender: "m" },
    triangle: { name: "triângulo", gender: "m" },
    "right-triangle": { name: "triângulo retângulo", gender: "m" },
    "scalene-triangle": { name: "triângulo pontudo", gender: "m" },
    pentagon: { name: "pentágono", gender: "m" },
    hexagon: { name: "hexágono", gender: "m" },
  },
  small: { m: "pequeno", f: "pequena" },
  big: same("grande"),
  tilted: { m: "inclinado", f: "inclinada" },
};

const SHAPE_PLURALS: Record<Locale, Record<ShapeBinFamily, string>> = {
  en: { circle: "Circles", square: "Squares", triangle: "Triangles" },
  pt: { circle: "Círculos", square: "Quadrados", triangle: "Triângulos" },
};

const en = {
  blurb:
    "Shapes are rolling along the conveyor belt! Tap the right bin to sort each one by colour, by shape or by how many sides it has.",
  howToPlay: {
    steps: [
      "A shape rides along the conveyor belt. Look at it closely!",
      "Tap the bin it belongs in. Wrong bin? It wiggles, so try another!",
      "Sort 10 shapes to finish a round and earn a star. 3 stars and you go up a level!",
    ],
    tip: "every round you finish earns a star, even if some shapes needed a second try. Easy sorts by colour, Medium by shape and Hard by how many sides.",
  },
  question: {
    colour: "What colour is it?",
    shape: "What shape is it?",
    sides: "How many sides does it have?",
  } satisfies Record<SortBy, string>,
  caption: {
    colour: "by colour",
    shape: "by shape",
    sides: "by sides",
  } satisfies Record<SortBy, string>,
  sorted: "Sorted",
  bins: "Sorting bins",
  binAria: (label: string, count: number) => `${label} bin, ${count} sorted`,
  hereComes: (description: string) => `Here comes ${description}.`,
  roundBanner: "Round complete!",
  right: (praise: string) => `Yes! ${praise}`,
  wrong: "Not that one! Try another bin.",
  roundComplete: {
    star: "🎉 Round complete! You earned a star.",
    levelUp: "🎉 Round complete! You earned a star and went up a level!",
    newRow: "🎉 Round complete! Another row of stars!",
  },
  words: EN_WORDS,
  binLabel: (name: BinName): string => {
    switch (name.type) {
      case "colour":
        return capitalise(EN_WORDS.colours[name.colour].m);
      case "shape":
        return SHAPE_PLURALS.en[name.family];
      case "sides":
        return `${name.sides} sides`;
    }
  },
  binPraise: (name: BinName): string => {
    switch (name.type) {
      case "colour":
        return `It's ${EN_WORDS.colours[name.colour].m}!`;
      case "shape":
        return `It's a ${EN_WORDS.kinds[name.family].name}!`;
      case "sides":
        return `It has ${name.sides} sides!`;
    }
  },
};

export type ShapeText = typeof en;

const pt: ShapeText = {
  blurb:
    "As formas estão passando na esteira! Toque na caixa certa para separar cada uma pela cor, pelo formato ou pelo número de lados.",
  howToPlay: {
    steps: [
      "Uma forma vem andando na esteira. Olhe bem para ela!",
      "Toque na caixa onde ela deve ir. Caixa errada? Ela balança, então tente outra!",
      "Separe 10 formas para terminar uma rodada e ganhar uma estrela. Com 3 estrelas, você sobe de nível!",
    ],
    tip: "toda rodada que você termina vale uma estrela, mesmo que algumas formas precisem de uma segunda tentativa. No Fácil você separa por cor, no Médio por formato e no Difícil pelo número de lados.",
  },
  question: {
    colour: "De que cor ela é?",
    shape: "Que forma é essa?",
    sides: "Quantos lados ela tem?",
  },
  caption: {
    colour: "por cor",
    shape: "por formato",
    sides: "por lados",
  },
  sorted: "Separadas",
  bins: "Caixas",
  binAria: (label, count) =>
    `Caixa: ${label}, ${count} ${count === 1 ? "forma" : "formas"}`,
  hereComes: (description) => `Lá vem ${description}.`,
  roundBanner: "Rodada completa!",
  right: (praise) => `Isso! ${praise}`,
  wrong: "Essa não! Tente outra caixa.",
  roundComplete: {
    star: "🎉 Rodada completa! Você ganhou uma estrela.",
    levelUp: "🎉 Rodada completa! Você ganhou uma estrela e subiu de nível!",
    newRow: "🎉 Rodada completa! Mais uma fileira de estrelas!",
  },
  words: PT_WORDS,
  binLabel: (name) => {
    switch (name.type) {
      case "colour":
        return capitalise(PT_WORDS.colours[name.colour].m);
      case "shape":
        return SHAPE_PLURALS.pt[name.family];
      case "sides":
        return `${name.sides} lados`;
    }
  },
  // Every shape on the belt is a masculine noun (círculo, quadrado…).
  binPraise: (name) => {
    switch (name.type) {
      case "colour":
        return `É ${PT_WORDS.colours[name.colour].m}!`;
      case "shape":
        return `É um ${PT_WORDS.kinds[name.family].name}!`;
      case "sides":
        return `Tem ${name.sides} lados!`;
    }
  },
};

export const SHAPE_TEXT: Record<Locale, ShapeText> = { en, pt };
