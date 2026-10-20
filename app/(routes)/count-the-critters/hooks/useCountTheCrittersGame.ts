"use client";
import { useCallback, useEffect, useState } from "react";
import type { StaticImageData } from "next/image";
import type { Feedback } from "@/app/components/FeedbackMessage";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { CRITTER_IMAGES } from "../constants/critterImages";
import { CRITTERS_CONFIG } from "../constants/config";
import {
  generateCritterRound,
  type CritterRound,
} from "../utils/generateCritterRound";

export function useCountTheCrittersGame() {
  const [round, setRound] = useState<CritterRound<StaticImageData> | null>(
    null
  );
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState(0);
  const { schedule } = useSafeTimeout();

  const startRound = useCallback(() => {
    setIsAnimating(true);
    setRound(generateCritterRound(CRITTER_IMAGES));
    setFeedback(null);
    schedule(() => setIsAnimating(false), CRITTERS_CONFIG.roundIntroMs);
  }, [schedule]);

  useEffect(() => {
    startRound();
  }, [startRound]);

  const selectOption = useCallback(
    (selected: number) => {
      if (isAnimating || feedback || !round) return;

      setIsAnimating(true);
      if (selected === round.answer) {
        setFeedback({ tone: "success", text: "🎉 Great job!" });
        setScore((prev) => prev + CRITTERS_CONFIG.points);
      } else {
        setFeedback({ tone: "error", text: "Oops! Try again." });
      }
      schedule(startRound, CRITTERS_CONFIG.nextRoundDelayMs);
    },
    [isAnimating, feedback, round, schedule, startRound]
  );

  return { round, feedback, isAnimating, score, selectOption };
}
