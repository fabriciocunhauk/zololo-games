import type { Locale } from "@/app/i18n/locales";
import type { LevelStep } from "@/app/utils/advanceLevel";
import type { JumpProblem } from "../utils/generateJumpProblem";

const sign = (operation: JumpProblem["operation"]) =>
  operation === "+" ? "+" : "−";

const en = {
  blurb:
    "Help the frog hop from pad to pad. Read the jump, work out where it lands, then tap the number!",
  howToPlay: {
    steps: [
      "See where the frog starts. Its lily pad is yellow.",
      "Jump + hops forward. Jump - hops back. Count the hops pad by pad.",
      "Tap the number where the frog lands. Get 5 right to go up a level!",
    ],
    tip: "put a finger on the yellow pad and count each hop out loud.",
  },
  caption: (max: number) => `jumps up to ${max}`,
  numberLine: "Number line",
  problem: { start: "Start at ", jump: ", jump ", end: "." },
  hint: (operation: JumpProblem["operation"], jump: number) => {
    const hops = `${jump} ${jump === 1 ? "pad" : "pads"}`;
    const move = operation === "+" ? `Hop forward ${hops}.` : `Hop back ${hops}.`;
    return `${move} Where does the frog land?`;
  },
  right: (next: LevelStep, max: number) =>
    next.levelUp
      ? `🎉 Excellent! Level up! Now jumps go up to ${max}.`
      : next.stars === 0
        ? "🎉 Excellent! Another row of stars!"
        : "🎉 Excellent!",
  wrong: ({ start, operation, jump, answer }: JumpProblem) =>
    `Not quite! ${start} ${sign(operation)} ${jump} = ${answer}, so the frog lands on ${answer}.`,
};

const pt: typeof en = {
  blurb:
    "Ajude o sapo a pular de folha em folha. Leia o pulo, descubra onde ele cai e toque no número!",
  howToPlay: {
    steps: [
      "Veja onde o sapo começa. A folha dele é amarela.",
      "Pulo + vai para a frente. Pulo - volta para trás. Conte os pulos de folha em folha.",
      "Toque no número onde o sapo cai. Acerte 5 para subir de nível!",
    ],
    tip: "ponha o dedo na folha amarela e conte cada pulo em voz alta.",
  },
  caption: (max) => `pulos até ${max}`,
  numberLine: "Reta numérica",
  problem: { start: "Comece no ", jump: ", pule ", end: "." },
  hint: (operation, jump) => {
    const hops = `${jump} ${jump === 1 ? "folha" : "folhas"}`;
    const move =
      operation === "+"
        ? `Pule ${hops} para a frente.`
        : `Pule ${hops} para trás.`;
    return `${move} Onde o sapo vai cair?`;
  },
  right: (next, max) =>
    next.levelUp
      ? `🎉 Muito bem! Subiu de nível! Agora os pulos vão até ${max}.`
      : next.stars === 0
        ? "🎉 Muito bem! Mais uma fileira de estrelas!"
        : "🎉 Muito bem!",
  wrong: ({ start, operation, jump, answer }) =>
    `Quase! ${start} ${sign(operation)} ${jump} = ${answer}, então o sapo cai no ${answer}.`,
};

export const FROG_JUMP_TEXT: Record<Locale, typeof en> = { en, pt };
