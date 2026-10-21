/** One tone in a sound effect. Times are in seconds from the sound's start. */
export type Note = {
  freq: number;
  start: number;
  duration: number;
  type: OscillatorType;
  /** Peak volume, 0 to 1. */
  gain: number;
  /** Glide to this frequency by the end of the note. */
  slideTo?: number;
};

export type SoundName =
  | "tap"
  | "flip"
  | "pop"
  | "tick"
  | "go"
  | "correct"
  | "wrong"
  | "levelUp"
  | "win";

const C5 = 523.25;
const E5 = 659.25;
const G5 = 783.99;
const C6 = 1046.5;

const note = (
  freq: number,
  start: number,
  duration: number,
  gain = 0.2,
  type: OscillatorType = "triangle"
): Note => ({ freq, start, duration, type, gain });

/** Short synthesised effects: no audio files, nothing to download. */
export const SOUND_RECIPES: Record<SoundName, Note[]> = {
  tap: [note(880, 0, 0.06, 0.12, "sine")],
  flip: [{ ...note(500, 0, 0.08, 0.12, "sine"), slideTo: 800 }],
  pop: [{ ...note(400, 0, 0.1, 0.2, "sine"), slideTo: 1200 }],
  tick: [note(660, 0, 0.1, 0.15, "square")],
  go: [note(C6, 0, 0.25, 0.15, "square")],
  correct: [note(C5, 0, 0.12), note(E5, 0.1, 0.2)],
  // Soft and low so a mistake never sounds like a telling-off.
  wrong: [{ ...note(330, 0, 0.3, 0.15, "sine"), slideTo: 220 }],
  levelUp: [
    note(C5, 0, 0.12),
    note(E5, 0.1, 0.12),
    note(G5, 0.2, 0.12),
    note(C6, 0.3, 0.35),
  ],
  win: [
    note(G5, 0, 0.12),
    note(G5, 0.12, 0.12),
    note(G5, 0.24, 0.12),
    note(C6, 0.36, 0.5, 0.22),
    note(E5, 0.36, 0.5, 0.12),
  ],
};

/** The cheer for a correct answer, bigger when it fills the star row. */
export const resultSound = (next: { levelUp: boolean }): SoundName =>
  next.levelUp ? "levelUp" : "correct";
