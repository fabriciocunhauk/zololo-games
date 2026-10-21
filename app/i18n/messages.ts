import type { Difficulty } from "@/app/constants/difficulty";
import type { Locale } from "./locales";

export type GameSlug =
  | "memory-game"
  | "count-the-animals"
  | "frog-jump"
  | "bubble-pop"
  | "odd-one-out"
  | "letter-sounds"
  | "shape-sorter"
  | "pattern-train";

type GameText = {
  name: string;
  /** What the game practises, shown as the home tile's eyebrow. */
  skill: string;
  /** The page's meta description. */
  description: string;
};

type DifficultyText = {
  label: string;
  /** Shown on the tile, e.g. "Ages 4–5". */
  ages: string;
  /** Spoken form of `ages` for screen readers. */
  agesSpoken: string;
};

const en = {
  site: {
    name: "Zololo Games",
    description:
      "Short games for counting, sums, phonics, shapes, patterns and memory, for children aged 4 to 8 and up.",
    logoAlt: "Zololo Games",
  },
  nav: {
    label: "Main",
    home: "Home",
    homeAria: "Zololo Games home",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  home: {
    heading: "Tap a game to play.",
    blurb:
      "Short games for counting, sums, letters, shapes and more. Pick Easy (4–5), Medium (6–7) or Hard (8+) in every game. Free to play, nothing to sign up for.",
  },
  footer: {
    tagline: "Little games for curious minds. Free to play, nothing to sign up for.",
    games: "Games",
    grownUps: "For grown-ups",
    grownUpsText:
      "Every game has three levels. Pick the one that fits, then play along and talk about what you see.",
    backToTop: "Back to top ↑",
  },
  games: {
    "memory-game": {
      name: "Memory Cards",
      skill: "Memory",
      description: "Flip the cards and find the matching pairs.",
    },
    "count-the-animals": {
      name: "Count the Animals",
      skill: "Counting",
      description:
        "Tap each animal to count it, then pick the right number. Three levels, counting up to 10.",
    },
    "frog-jump": {
      name: "Frog Jump",
      skill: "Number line",
      description:
        "Hop the frog along a lily-pad number line to practise adding and taking away. Easy for ages 4–5, Medium for ages 6–7 and Hard for ages 8+.",
    },
    "bubble-pop": {
      name: "Bubble Pop",
      skill: "Adding & taking away",
      description:
        "Work out the sum, then pop the bubble with the right answer. Adding and taking away for ages 4 to 8+.",
    },
    "odd-one-out": {
      name: "Odd One Out",
      skill: "Spot the difference",
      description:
        "The monsters all match except one. Look closely and tap the odd one out!",
    },
    "letter-sounds": {
      name: "Letter Sounds",
      skill: "Phonics",
      description:
        "Look at the picture, hear the word and pick the letter it starts with. On Hard, spell three-letter words.",
    },
    "shape-sorter": {
      name: "Shape Sorter",
      skill: "Shapes",
      description:
        "Tap the right bin to sort each shape by colour, by shape or by how many sides it has.",
    },
    "pattern-train": {
      name: "Pattern Train",
      skill: "Patterns",
      description:
        "Monsters ride the train in a pattern. Spot who belongs in the empty carriage and help the train chuff along.",
    },
  } satisfies Record<GameSlug, GameText>,
  difficulty: {
    easy: { label: "Easy", ages: "Ages 4–5", agesSpoken: "ages 4 to 5" },
    medium: { label: "Medium", ages: "Ages 6–7", agesSpoken: "ages 6 to 7" },
    hard: { label: "Hard", ages: "Ages 8+", agesSpoken: "ages 8 and up" },
  } satisfies Record<Difficulty, DifficultyText>,
  intro: {
    whoIsPlaying: "Who's playing?",
    start: "Start playing",
  },
  header: {
    changeDifficulty: "Change difficulty",
    showHowToPlay: "Show how to play",
    hideHowToPlay: "Hide how to play",
    sound: "Sound",
  },
  howToPlay: {
    heading: "How to play",
    tip: "Tip:",
  },
  meter: {
    level: "Level",
    stars: (stars: number, total: number) => `${stars} of ${total} stars`,
  },
};

export type Messages = typeof en;

const pt: Messages = {
  site: {
    name: "Zololo Games",
    description:
      "Joguinhos de contar, fazer contas, letras, formas, padrões e memória, para crianças de 4 a 8 anos ou mais.",
    logoAlt: "Zololo Games",
  },
  nav: {
    label: "Principal",
    home: "Início",
    homeAria: "Início do Zololo Games",
    menu: "Menu",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    language: "Idioma",
  },
  home: {
    heading: "Toque em um jogo para jogar.",
    blurb:
      "Joguinhos de contar, fazer contas, letras, formas e muito mais. Escolha Fácil (4–5), Médio (6–7) ou Difícil (8+) em todos os jogos. É grátis e não precisa criar conta.",
  },
  footer: {
    tagline:
      "Joguinhos para mentes curiosas. É grátis e não precisa criar conta.",
    games: "Jogos",
    grownUps: "Para os adultos",
    grownUpsText:
      "Todos os jogos têm três níveis. Escolha o que mais combina com a criança e joguem juntos. Conversem sobre o que vocês veem.",
    backToTop: "Voltar ao topo ↑",
  },
  games: {
    "memory-game": {
      name: "Jogo da Memória",
      skill: "Memória",
      description: "Vire as cartas e encontre os pares iguais.",
    },
    "count-the-animals": {
      name: "Conte os Animais",
      skill: "Contagem",
      description:
        "Toque em cada animal para contar e depois escolha o número certo. Três níveis, contando até 10.",
    },
    "frog-jump": {
      name: "Pulo do Sapo",
      skill: "Reta numérica",
      description:
        "Faça o sapo pular pelas vitórias-régias de uma reta numérica para praticar somar e subtrair. Fácil para 4–5 anos, Médio para 6–7 anos e Difícil para 8 anos ou mais.",
    },
    "bubble-pop": {
      name: "Estoure as Bolhas",
      skill: "Somar e subtrair",
      description:
        "Resolva a conta e estoure a bolha com a resposta certa. Somar e subtrair para crianças de 4 a 8 anos ou mais.",
    },
    "odd-one-out": {
      name: "Qual É o Diferente?",
      skill: "Ache o diferente",
      description:
        "Os monstrinhos são todos iguais, menos um. Olhe com atenção e toque no diferente!",
    },
    "letter-sounds": {
      name: "Sons das Letras",
      skill: "Letras e sons",
      description:
        "Olhe a figura, fale a palavra e escolha a letra com que ela começa. No Difícil, soletre palavras curtas.",
    },
    "shape-sorter": {
      name: "Separe as Formas",
      skill: "Formas",
      description:
        "Toque na caixa certa para separar cada forma pela cor, pelo formato ou pelo número de lados.",
    },
    "pattern-train": {
      name: "Trem dos Padrões",
      skill: "Padrões",
      description:
        "Os monstrinhos andam de trem seguindo um padrão. Descubra quem vai no vagão vazio e ajude o trem a seguir viagem.",
    },
  },
  difficulty: {
    easy: { label: "Fácil", ages: "4–5 anos", agesSpoken: "4 a 5 anos" },
    medium: { label: "Médio", ages: "6–7 anos", agesSpoken: "6 a 7 anos" },
    hard: { label: "Difícil", ages: "8+ anos", agesSpoken: "8 anos ou mais" },
  },
  intro: {
    whoIsPlaying: "Quem vai jogar?",
    start: "Começar a jogar",
  },
  header: {
    changeDifficulty: "Mudar dificuldade",
    showHowToPlay: "Mostrar como jogar",
    hideHowToPlay: "Esconder como jogar",
    sound: "Som",
  },
  howToPlay: {
    heading: "Como jogar",
    tip: "Dica:",
  },
  meter: {
    level: "Nível",
    stars: (stars, total) => `${stars} de ${total} estrelas`,
  },
};

export const MESSAGES: Record<Locale, Messages> = { en, pt };
