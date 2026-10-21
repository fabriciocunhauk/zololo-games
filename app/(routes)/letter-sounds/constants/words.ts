export type PictureWord = {
  /** Lowercase, as a child would spell it. */
  word: string;
  emoji: string;
  /** A three-letter consonant–vowel–consonant word, spelled on Hard. */
  cvc: boolean;
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
export const PICTURE_WORDS: ReadonlyArray<PictureWord> = Object.freeze([
  { word: "apple", emoji: "🍎", cvc: false },
  { word: "ant", emoji: "🐜", cvc: false },
  { word: "bat", emoji: "🦇", cvc: true },
  { word: "bed", emoji: "🛏️", cvc: true },
  { word: "bin", emoji: "🗑️", cvc: true, alsoCalled: ["rubbish bin"] },
  { word: "bus", emoji: "🚌", cvc: true },
  { word: "cat", emoji: "🐱", cvc: true, alsoCalled: ["kitten"] },
  { word: "dog", emoji: "🐶", cvc: true, alsoCalled: ["puppy"] },
  { word: "duck", emoji: "🦆", cvc: false },
  { word: "egg", emoji: "🥚", cvc: false },
  { word: "elephant", emoji: "🐘", cvc: false },
  { word: "fish", emoji: "🐟", cvc: false },
  { word: "fox", emoji: "🦊", cvc: true },
  { word: "frog", emoji: "🐸", cvc: false },
  { word: "goat", emoji: "🐐", cvc: false },
  { word: "hat", emoji: "🎩", cvc: true },
  { word: "hedgehog", emoji: "🦔", cvc: false },
  { word: "kite", emoji: "🪁", cvc: false },
  { word: "kangaroo", emoji: "🦘", cvc: false },
  { word: "leg", emoji: "🦵", cvc: true },
  { word: "lion", emoji: "🦁", cvc: false },
  { word: "moon", emoji: "🌙", cvc: false },
  { word: "map", emoji: "🗺️", cvc: true },
  { word: "nose", emoji: "👃", cvc: false },
  { word: "octopus", emoji: "🐙", cvc: false },
  { word: "pig", emoji: "🐷", cvc: true },
  { word: "pen", emoji: "🖊️", cvc: true },
  { word: "rainbow", emoji: "🌈", cvc: false },
  { word: "robot", emoji: "🤖", cvc: false },
  { word: "sun", emoji: "☀️", cvc: true },
  { word: "tent", emoji: "⛺", cvc: false },
  { word: "umbrella", emoji: "☂️", cvc: false },
  { word: "volcano", emoji: "🌋", cvc: false, alsoCalled: ["mountain"] },
  { word: "wizard", emoji: "🧙", cvc: false, alsoCalled: ["witch"] },
  { word: "yo-yo", emoji: "🪀", cvc: false },
  { word: "zebra", emoji: "🦓", cvc: false },
]);
