import type { Difficulty } from "@/app/constants/difficulty";
import type { Locale } from "@/app/i18n/locales";
import type { LevelStep } from "@/app/utils/advanceLevel";

const cheer = (
  next: LevelStep,
  { levelUp, fullRow }: { levelUp: string; fullRow: string }
) => (next.levelUp ? levelUp : next.stars === 0 ? fullRow : "");

const en = {
  blurb:
    "Apple, ball, cat… Look at the picture, say its name and find the letter it starts with!",
  howToPlay: {
    steps: [
      "Look at the picture and say its name out loud.",
      "What sound does it start with? Tap that letter.",
      "On Hard, spell the word one letter at a time. Spell it with no slips to earn a star. Get 5 stars to go up a level!",
    ],
    tip: "say the sound, not the letter’s name: “apple” starts with “a” as in “ant”.",
    /** The example in the pictures: a picture, its first letter, a wrong letter, and a word being spelled. */
    example: { emoji: "🍎", letter: "A", other: "b", spelling: ["c", "a"] },
  },
  /** Shown beside the level in the star meter. */
  caption: {
    easy: "first letter",
    medium: "name & pick",
    hard: "spell it",
  } satisfies Record<Difficulty, string>,
  question: { choose: "Which letter does it start with?", spell: "Spell the word" },
  tryAgain: "Not quite! Say the word slowly…",
  startsWith: (word: string, letter: string) => `${word} starts with ${letter}`,
  right: (sentence: string, next: LevelStep) =>
    `🎉 Yes! ${sentence}!${cheer(next, { levelUp: " Level up!", fullRow: " Another row of stars!" })}`,
  reveal: (sentence: string) => `${sentence}.`,
  spelled: (word: string, next: LevelStep) =>
    `🎉 Yes! You spelled ${word}!${cheer(next, { levelUp: " Level up!", fullRow: " Another row of stars!" })}`,
  spelledWithSlips: (word: string) =>
    `You spelled ${word}! No slips next time for a star.`,
  board: {
    spelling: "Your spelling",
    empty: "empty",
    bank: "Letter blocks",
    used: (letter: string) => `${letter}, used`,
  },
};

const pt: typeof en = {
  blurb:
    "Abelha, bola, gato… Olhe a figura, diga o nome dela e encontre a letra com que ela começa!",
  howToPlay: {
    steps: [
      "Olhe a figura e diga o nome dela em voz alta.",
      "Com que som ela começa? Toque nessa letra.",
      "No Difícil, escreva a palavra uma letra de cada vez. Escreva sem errar para ganhar uma estrela. Junte 5 estrelas para subir de nível!",
    ],
    tip: "diga o som, não o nome da letra: “uva” começa com “u”, como “urso”.",
    example: { emoji: "🍇", letter: "U", other: "b", spelling: ["s", "o"] },
  },
  caption: {
    easy: "primeira letra",
    medium: "diga e escolha",
    hard: "escreva",
  },
  question: { choose: "Com que letra começa?", spell: "Escreva a palavra" },
  tryAgain: "Quase! Fale a palavra devagar…",
  startsWith: (word, letter) => `${word} começa com ${letter}`,
  right: (sentence, next) =>
    `🎉 Isso! ${sentence}!${cheer(next, { levelUp: " Subiu de nível!", fullRow: " Mais uma fileira de estrelas!" })}`,
  reveal: (sentence) => `${sentence}.`,
  spelled: (word, next) =>
    `🎉 Isso! Você escreveu ${word}!${cheer(next, { levelUp: " Subiu de nível!", fullRow: " Mais uma fileira de estrelas!" })}`,
  spelledWithSlips: (word) =>
    `Você escreveu ${word}! Da próxima vez, sem errar, ganha uma estrela.`,
  board: {
    spelling: "Sua palavra",
    empty: "vazio",
    bank: "Blocos de letras",
    used: (letter) => `${letter}, já usada`,
  },
};

export const LETTER_TEXT: Record<Locale, typeof en> = { en, pt };
