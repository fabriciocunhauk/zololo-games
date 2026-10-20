"use client";
import { useCallback, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { ANIMALS, type Animal } from "../constants/animals";
import { COUNTING_CONFIG } from "../constants/config";
import { countLabel } from "../utils/countLabel";
import {
  generateCountingRound,
  type CountingRound,
} from "../utils/generateCountingRound";

const { levels, roundsPerLevel } = COUNTING_CONFIG;

export function useCountingGame() {
  const [hasStarted, setHasStarted] = useState(false);
  const [level, setLevel] = useState(0);
  const [stars, setStars] = useState(0);
  const [round, setRound] = useState<CountingRound<Animal> | null>(null);
  /** Animal positions in the order they were counted. */
  const [counted, setCounted] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { schedule } = useSafeTimeout();

  const startRound = useCallback((forLevel: number, previous?: Animal) => {
    const next = generateCountingRound(ANIMALS, levels[forLevel], previous);
    setRound(next);
    setCounted([]);
    setSelected(null);
    setFeedback(null);
  }, []);

  const start = useCallback(() => {
    setHasStarted(true);
    startRound(0);
  }, [startRound]);

  const countAnimal = useCallback(
    (position: number) => {
      if (selected !== null || counted.includes(position)) return;
      setCounted([...counted, position]);
    },
    [selected, counted]
  );

  const countAgain = useCallback(() => {
    if (selected === null) setCounted([]);
  }, [selected]);

  const answer = useCallback(
    (choice: number) => {
      if (!round || selected !== null) return;
      setSelected(choice);
      const label = countLabel(round.answer, round.animal);

      if (choice === round.answer) {
        const earned = stars + 1;
        const levelUp = earned >= roundsPerLevel && level < levels.length - 1;
        const nextLevel = levelUp ? level + 1 : level;
        const text = levelUp
          ? `Yes! ${label}! Level up! Now count up to ${levels[nextLevel].max}.`
          : `Yes! ${label}!`;
        setStars(earned >= roundsPerLevel ? 0 : earned);
        setLevel(nextLevel);
        setFeedback({ tone: "success", text: `🎉 ${text}` });
        schedule(
          () => startRound(nextLevel, round.animal),
          COUNTING_CONFIG.nextRoundDelayMs
        );
        return;
      }

      // Wrong: count along together, then say the answer.
      const { revealLeadMs, revealStepMs, revealHoldMs } = COUNTING_CONFIG;
      const lead = "Not quite! Let's count them together.";
      setCounted([]);
      setFeedback({ tone: "error", text: lead });
      for (let i = 1; i <= round.answer; i++) {
        schedule(
          () => setCounted(Array.from({ length: i }, (_, idx) => idx)),
          revealLeadMs + revealStepMs * i
        );
      }
      const doneAt = revealLeadMs + revealStepMs * (round.answer + 1);
      schedule(() => {
        setFeedback({ tone: "info", text: `There are ${label}.` });
      }, doneAt);
      schedule(() => startRound(level, round.animal), doneAt + revealHoldMs);
    },
    [round, selected, stars, level, schedule, startRound]
  );

  return {
    hasStarted,
    level: level + 1,
    levelMax: levels[level].max,
    stars,
    round,
    counted,
    selected,
    feedback,
    start,
    countAnimal,
    countAgain,
    answer,
  };
}
