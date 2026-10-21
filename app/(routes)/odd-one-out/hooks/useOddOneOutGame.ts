"use client";
import { useCallback, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import { MONSTERS } from "@/app/components/monsters/monsters";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { playSound } from "@/app/utils/soundPlayer";
import { resultSound } from "@/app/utils/sounds";
import { ODD_CONFIG, ODD_DIFFICULTY } from "../constants/config";
import { makeOddOneOut, type OddOneOutRound } from "../utils/makeOddOneOut";
import { spottedText } from "../utils/spottedText";

/** How the round ended: the child spotted it, or we showed them. */
export type RoundOutcome = "spotted" | "revealed" | null;

type Round = OddOneOutRound & { id: number };

export function useOddOneOutGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [wrongTaps, setWrongTaps] = useState<number[]>([]);
  const [outcome, setOutcome] = useState<RoundOutcome>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { schedule, clearAll } = useSafeTimeout();

  const settings = ODD_DIFFICULTY[difficulty ?? "easy"];
  const progress = useLevelProgress({
    levelCount: settings.levels.length,
    roundsPerLevel: ODD_CONFIG.roundsPerLevel,
  });

  const startRound = useCallback(
    (forDifficulty: Difficulty, forLevel: number, previous?: string) => {
      const { levels, attributes } = ODD_DIFFICULTY[forDifficulty];
      const next = makeOddOneOut(
        MONSTERS,
        attributes,
        levels[forLevel],
        previous
      );
      setRound((current) => ({ ...next, id: (current?.id ?? 0) + 1 }));
      setWrongTaps([]);
      setOutcome(null);
      setFeedback(null);
    },
    []
  );

  const start = useCallback(
    (chosen: Difficulty) => {
      clearAll();
      progress.reset();
      setDifficulty(chosen);
      startRound(chosen, 0);
    },
    [clearAll, progress, startRound]
  );

  const quit = useCallback(() => {
    clearAll();
    setDifficulty(null);
    setRound(null);
  }, [clearAll]);

  const tap = useCallback(
    (position: number) => {
      if (!round || !difficulty || outcome !== null) return;
      if (wrongTaps.includes(position)) return;
      const baseName = round.tiles[(round.oddIndex + 1) % round.tiles.length]
        .name;

      if (position === round.oddIndex) {
        const next = progress.recordCorrect();
        playSound(resultSound(next));
        setOutcome("spotted");
        setFeedback({
          tone: "success",
          text: spottedText(
            round.description,
            next,
            settings.levels[next.level]
          ),
        });
        schedule(
          () => startRound(difficulty, next.level, baseName),
          ODD_CONFIG.nextRoundDelayMs
        );
        return;
      }

      playSound("wrong");
      const wrong = [...wrongTaps, position];
      setWrongTaps(wrong);
      if (wrong.length < ODD_CONFIG.maxWrongTaps) {
        setFeedback({
          tone: "error",
          text: "Look closely — they all match except one!",
        });
        return;
      }

      setOutcome("revealed");
      setFeedback({
        tone: "info",
        text: `Here's the odd one! ${round.description}`,
      });
      schedule(
        () => startRound(difficulty, progress.level, baseName),
        ODD_CONFIG.revealHoldMs
      );
    },
    [
      round,
      difficulty,
      outcome,
      wrongTaps,
      progress,
      settings,
      schedule,
      startRound,
    ]
  );

  return {
    difficulty,
    level: progress.level + 1,
    count: settings.levels[progress.level],
    stars: progress.stars,
    roundsPerLevel: progress.roundsPerLevel,
    round,
    wrongTaps,
    outcome,
    feedback,
    start,
    quit,
    tap,
  };
}
