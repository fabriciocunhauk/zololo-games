"use client";
import { useSyncExternalStore } from "react";
import {
  isSoundEnabled,
  setSoundEnabled,
  subscribeToSound,
} from "@/app/utils/soundPlayer";

/** Whether sound effects are on, shared by every toggle on the page. */
export function useSoundEnabled() {
  // The server renders "on", so the first client render matches.
  const enabled = useSyncExternalStore(
    subscribeToSound,
    isSoundEnabled,
    () => true
  );
  return [enabled, setSoundEnabled] as const;
}
