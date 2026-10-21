"use client";
import { useCallback, useEffect, useState } from "react";

/** Reads words aloud for children who can't read yet. No-op where unsupported. */
export function useSpeak() {
  const [canSpeak, setCanSpeak] = useState(false);

  // Feature-detect after mount so server and client render the same.
  useEffect(() => {
    setCanSpeak(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!canSpeak) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      utterance.rate = 0.85;
      const voice = synth.getVoices().find((v) => v.lang === "en-GB");
      if (voice) utterance.voice = voice;
      synth.speak(utterance);
    },
    [canSpeak]
  );

  return { canSpeak, speak };
}
