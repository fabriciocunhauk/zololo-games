import type { Locale } from "@/app/i18n/locales";

export type PictureWord = {
  /** Lowercase, as a child would spell it. */
  word: string;
  emoji: string;
  /**
   * Short and spelled just as it sounds, so it is spelled on Hard. In English
   * a three-letter consonant–vowel–consonant word.
   */
  spellable: boolean;
  /** Other names a child might give the picture; their first letters are never distractors. */
  alsoCalled?: ReadonlyArray<string>;
};

/**
 * Picture words whose first letter makes its usual short or hard sound: no
 * silent letters, no "sh"/"ch"/"th", no soft c or g. Each picture has one
 * name a young British child would give it, and every emoji is from Emoji
 * 12.0 or earlier so older tablets draw it (see words.test.ts).
 *
 * No word starts with i, j, q or x: none has a clear enough picture.
 * Short i is practised in the middle of Hard words (pig, bin).
 */
const ENGLISH_WORDS: ReadonlyArray<PictureWord> = Object.freeze([
  { word: "apple", emoji: "🍎", spellable: false },
  { word: "ant", emoji: "🐜", spellable: false },
  { word: "bat", emoji: "🦇", spellable: true },
  { word: "bed", emoji: "🛏️", spellable: true },
  { word: "bin", emoji: "🗑️", spellable: true, alsoCalled: ["rubbish bin"] },
  { word: "bus", emoji: "🚌", spellable: true },
  { word: "cat", emoji: "🐱", spellable: true, alsoCalled: ["kitten"] },
  { word: "dog", emoji: "🐶", spellable: true, alsoCalled: ["puppy"] },
  { word: "duck", emoji: "🦆", spellable: false },
  { word: "egg", emoji: "🥚", spellable: false },
  { word: "elephant", emoji: "🐘", spellable: false },
  { word: "fish", emoji: "🐟", spellable: false },
  { word: "fox", emoji: "🦊", spellable: true },
  { word: "frog", emoji: "🐸", spellable: false },
  { word: "goat", emoji: "🐐", spellable: false },
  { word: "hat", emoji: "🎩", spellable: true },
  { word: "hedgehog", emoji: "🦔", spellable: false },
  { word: "kite", emoji: "🪁", spellable: false },
  { word: "kangaroo", emoji: "🦘", spellable: false },
  { word: "leg", emoji: "🦵", spellable: true },
  { word: "lion", emoji: "🦁", spellable: false },
  { word: "moon", emoji: "🌙", spellable: false },
  { word: "map", emoji: "🗺️", spellable: true },
  { word: "nose", emoji: "👃", spellable: false },
  { word: "octopus", emoji: "🐙", spellable: false },
  { word: "pig", emoji: "🐷", spellable: true },
  { word: "pen", emoji: "🖊️", spellable: true },
  { word: "rainbow", emoji: "🌈", spellable: false },
  { word: "robot", emoji: "🤖", spellable: false },
  { word: "sun", emoji: "☀️", spellable: true },
  { word: "tent", emoji: "⛺", spellable: false },
  { word: "umbrella", emoji: "☂️", spellable: false },
  { word: "volcano", emoji: "🌋", spellable: false, alsoCalled: ["mountain"] },
  { word: "wizard", emoji: "🧙", spellable: false, alsoCalled: ["witch"] },
  { word: "yo-yo", emoji: "🪀", spellable: false },
  { word: "zebra", emoji: "🦓", spellable: false },
]);

/**
 * Portuguese (Brazil) picture words, chosen the same way: the first letter
 * makes its usual sound (no silent h, no "ch"/"lh"/"nh", no soft c or g, no
 * "qu"), with names a young Brazilian child would give the picture. Accents
 * are fine after the first letter.
 *
 * Spellable words have three or four letters, no accents or ç, no digraphs
 * and no repeated letter, so each tile in the bank is different.
 * No word starts with h, k, q, w or y.
 */
const PORTUGUESE_WORDS: ReadonlyArray<PictureWord> = Object.freeze([
  { word: "abelha", emoji: "🐝", spellable: false },
  { word: "avião", emoji: "✈️", spellable: false },
  { word: "banana", emoji: "🍌", spellable: false },
  { word: "bola", emoji: "⚽", spellable: true },
  { word: "bota", emoji: "👢", spellable: true },
  { word: "cavalo", emoji: "🐴", spellable: false },
  { word: "cobra", emoji: "🐍", spellable: false, alsoCalled: ["serpente"] },
  { word: "coelho", emoji: "🐰", spellable: false, alsoCalled: ["coelhinho"] },
  { word: "dado", emoji: "🎲", spellable: false },
  { word: "dente", emoji: "🦷", spellable: false },
  { word: "elefante", emoji: "🐘", spellable: false },
  { word: "flor", emoji: "🌷", spellable: true, alsoCalled: ["tulipa"] },
  { word: "foguete", emoji: "🚀", spellable: false, alsoCalled: ["nave"] },
  { word: "galinha", emoji: "🐔", spellable: false, alsoCalled: ["galo"] },
  { word: "gato", emoji: "🐱", spellable: true, alsoCalled: ["gatinho"] },
  { word: "igreja", emoji: "⛪", spellable: false },
  { word: "ilha", emoji: "🏝️", spellable: false, alsoCalled: ["praia"] },
  { word: "jacaré", emoji: "🐊", spellable: false, alsoCalled: ["crocodilo"] },
  { word: "joaninha", emoji: "🐞", spellable: false },
  { word: "lápis", emoji: "✏️", spellable: false },
  { word: "leão", emoji: "🦁", spellable: false },
  { word: "lua", emoji: "🌙", spellable: true },
  { word: "luva", emoji: "🧤", spellable: true },
  { word: "macaco", emoji: "🐒", spellable: false },
  { word: "mel", emoji: "🍯", spellable: true },
  { word: "milho", emoji: "🌽", spellable: false },
  { word: "navio", emoji: "🚢", spellable: false, alsoCalled: ["barco"] },
  { word: "nuvem", emoji: "☁️", spellable: false },
  { word: "olho", emoji: "👁️", spellable: false },
  { word: "ovo", emoji: "🥚", spellable: false },
  { word: "pato", emoji: "🦆", spellable: true },
  { word: "peixe", emoji: "🐟", spellable: false },
  { word: "pera", emoji: "🍐", spellable: true },
  { word: "porco", emoji: "🐷", spellable: false, alsoCalled: ["porquinho"] },
  { word: "rato", emoji: "🐭", spellable: true, alsoCalled: ["ratinho"] },
  { word: "robô", emoji: "🤖", spellable: false },
  { word: "rosa", emoji: "🌹", spellable: true, alsoCalled: ["flor"] },
  { word: "sapo", emoji: "🐸", spellable: true },
  { word: "sol", emoji: "☀️", spellable: true },
  { word: "sorvete", emoji: "🍦", spellable: false },
  { word: "tartaruga", emoji: "🐢", spellable: false, alsoCalled: ["jabuti"] },
  { word: "tomate", emoji: "🍅", spellable: false },
  { word: "urso", emoji: "🐻", spellable: true, alsoCalled: ["ursinho"] },
  { word: "uva", emoji: "🍇", spellable: true },
  { word: "vaca", emoji: "🐮", spellable: false },
  { word: "vela", emoji: "🕯️", spellable: true },
  { word: "vulcão", emoji: "🌋", spellable: false, alsoCalled: ["montanha"] },
  { word: "xícara", emoji: "☕", spellable: false, alsoCalled: ["café", "caneca"] },
  { word: "zebra", emoji: "🦓", spellable: false },
]);

export const PICTURE_WORDS: Readonly<Record<Locale, ReadonlyArray<PictureWord>>> =
  Object.freeze({ en: ENGLISH_WORDS, pt: PORTUGUESE_WORDS });
