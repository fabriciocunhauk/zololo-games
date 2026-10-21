export type PictureWord = {
  /** Lowercase, as a child would spell it. */
  word: string;
  emoji: string;
  /** A three-letter consonant–vowel–consonant word, spelled on Hard. */
  cvc: boolean;
};

/**
 * Picture words whose first letter makes its usual short sound: no silent
 * letters, no "sh"/"ch"/"th", no soft c or g, no long vowels.
 */
export const PICTURE_WORDS: ReadonlyArray<PictureWord> = Object.freeze([
  { word: "apple", emoji: "🍎", cvc: false },
  { word: "ant", emoji: "🐜", cvc: false },
  { word: "ball", emoji: "⚽", cvc: false },
  { word: "bat", emoji: "🦇", cvc: true },
  { word: "bed", emoji: "🛏️", cvc: true },
  { word: "bus", emoji: "🚌", cvc: true },
  { word: "box", emoji: "📦", cvc: true },
  { word: "cat", emoji: "🐱", cvc: true },
  { word: "cup", emoji: "🥤", cvc: true },
  { word: "dog", emoji: "🐶", cvc: true },
  { word: "duck", emoji: "🦆", cvc: false },
  { word: "egg", emoji: "🥚", cvc: false },
  { word: "elephant", emoji: "🐘", cvc: false },
  { word: "fish", emoji: "🐟", cvc: false },
  { word: "fox", emoji: "🦊", cvc: true },
  { word: "goat", emoji: "🐐", cvc: false },
  { word: "hat", emoji: "🎩", cvc: true },
  { word: "hen", emoji: "🐔", cvc: true },
  { word: "jeans", emoji: "👖", cvc: false },
  { word: "kite", emoji: "🪁", cvc: false },
  { word: "kangaroo", emoji: "🦘", cvc: false },
  { word: "lion", emoji: "🦁", cvc: false },
  { word: "log", emoji: "🪵", cvc: true },
  { word: "moon", emoji: "🌙", cvc: false },
  { word: "map", emoji: "🗺️", cvc: true },
  { word: "nest", emoji: "🪺", cvc: false },
  { word: "net", emoji: "🥅", cvc: true },
  { word: "nut", emoji: "🥜", cvc: true },
  { word: "octopus", emoji: "🐙", cvc: false },
  { word: "pig", emoji: "🐷", cvc: true },
  { word: "pen", emoji: "🖊️", cvc: true },
  { word: "queen", emoji: "👸", cvc: false },
  { word: "rabbit", emoji: "🐰", cvc: false },
  { word: "rat", emoji: "🐀", cvc: true },
  { word: "sun", emoji: "☀️", cvc: true },
  { word: "tent", emoji: "⛺", cvc: false },
  { word: "umbrella", emoji: "☂️", cvc: false },
  { word: "van", emoji: "🚐", cvc: true },
  { word: "web", emoji: "🕸️", cvc: true },
  { word: "yo-yo", emoji: "🪀", cvc: false },
  { word: "zebra", emoji: "🦓", cvc: false },
]);
