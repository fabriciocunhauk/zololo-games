import type { Locale } from "@/app/i18n/locales";
import type { LevelStep } from "@/app/utils/advanceLevel";

const en = {
  blurb:
    "Number bubbles are floating up! Work out the sum, then pop the bubble with the right answer before it drifts away.",
  howToPlay: {
    steps: [
      "Read the sum on the card. What does it make?",
      "Bubbles float up with numbers inside. Find the answer!",
      "Tap it to pop it. Get 5 right to go up a level!",
    ],
    tip: "missed one? Don’t worry, the bubbles float round again. Take your time.",
  },
  score: "Score",
  reset: "Reset game",
  go: "GO!",
  prompt: "Pop the bubble with the answer!",
  bubble: (value: number) => `Answer ${value}`,
  right: (next: LevelStep): string =>
    next.levelUp
      ? "🎉 Correct! Level up: the bubbles float faster now!"
      : next.stars === 0
        ? "🎉 Correct! Another row of stars!"
        : "🎉 Correct!",
  /** `solved` is the sum with its answer, e.g. "3 + 4 = 7". */
  wrong: (solved: string) => `Not quite! ${solved}.`,
};

const pt: typeof en = {
  blurb:
    "Bolhas com números estão subindo! Resolva a conta e estoure a bolha com a resposta certa antes que ela voe para longe.",
  howToPlay: {
    steps: [
      "Leia a conta no cartão. Quanto dá?",
      "As bolhas sobem com números dentro. Ache a resposta!",
      "Toque nela para estourar. Acerte 5 para subir de nível!",
    ],
    tip: "deixou uma passar? Não tem problema, as bolhas voltam a subir. Vá com calma.",
  },
  score: "Pontos",
  reset: "Recomeçar",
  go: "JÁ!",
  prompt: "Estoure a bolha com a resposta!",
  bubble: (value) => `Resposta ${value}`,
  right: (next) =>
    next.levelUp
      ? "🎉 Acertou! Subiu de nível: agora as bolhas sobem mais rápido!"
      : next.stars === 0
        ? "🎉 Acertou! Mais uma fileira de estrelas!"
        : "🎉 Acertou!",
  wrong: (solved) => `Quase! ${solved}.`,
};

export const BUBBLE_POP_TEXT: Record<Locale, typeof en> = { en, pt };
