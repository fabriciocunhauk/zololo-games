import { SOUND_RECIPES, type SoundName } from "./sounds";

const STORAGE_KEY = "zololo:sound";

let context: AudioContext | null = null;
let enabled: boolean | null = null;
const listeners = new Set<() => void>();

function readEnabled() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    // Storage can be blocked (private mode); sound stays on.
    return true;
  }
}

/** Whether sound is on, remembered in this browser. */
export function isSoundEnabled() {
  if (typeof window === "undefined") return true;
  enabled ??= readEnabled();
  return enabled;
}

export function setSoundEnabled(next: boolean) {
  enabled = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // Not remembered, but it applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeToSound(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function audioContext() {
  if (!context) {
    const Ctor = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctor) return null;
    context = new Ctor();
  }
  // Safari starts it suspended until a tap.
  if (context.state === "suspended") void context.resume();
  return context;
}

/** Play a sound effect, unless sound is off. Never throws. */
export function playSound(name: SoundName) {
  if (typeof window === "undefined" || !isSoundEnabled()) return;
  try {
    const ctx = audioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    for (const n of SOUND_RECIPES[name]) {
      const start = now + n.start;
      const end = start + n.duration;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = n.type;
      osc.frequency.setValueAtTime(n.freq, start);
      if (n.slideTo) osc.frequency.exponentialRampToValueAtTime(n.slideTo, end);
      // Quick fade in and out so notes don't click.
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(n.gain, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(end + 0.02);
    }
  } catch {
    // Audio is a nice extra; the game carries on without it.
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
