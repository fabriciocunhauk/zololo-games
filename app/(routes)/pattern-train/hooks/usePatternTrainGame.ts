"use client";
import { useCallback, useMemo, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { randomInt } from "@/app/utils/randomInt";
import { PATTERN_CONFIG, PATTERN_DIFFICULTY } from "../constants/config";
import { generatePattern, type PatternRound } from "../utils/generatePattern";
import { colourVariants, monsterResemblance } from "../utils/monsterFaces";

function buildRound(difficulty: Difficulty, level: number) {
  const { faces, levels, ...settings } = PATTERN_DIFFICULTY[difficulty];
  const pool =
    faces === "colours"
      ? colourVariants(MONSTERS[randomInt(0, MONSTERS.length - 1)])
      : MONSTERS;
  return generatePattern(
    { ...settings, length: levels[level] },
    pool,
    monsterResemblance
  );
}

export function usePatternTrainGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [round, setRound] = useState<PatternRound<Monster> | null>(null);
  /** Changes with every new train, so the old one can chuff away. */
  const [trainId, setTrainId] = useState(0);
  /** The first wrong pick: taken off the options so the child tries another. */
  const [tried, setTried] = useState<string | null>(null);
  /** The final pick (right, or the second miss). Locks the options. */
  const [selected, setSelected] = useState<Monster | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { schedule, clearAll } = useSafeTimeout();

  const settings = PATTERN_DIFFICULTY[difficulty ?? "easy"];
  const progress = useLevelProgress({
    levelCount: settings.levels.length,
    roundsPerLevel: PATTERN_CONFIG.roundsPerLevel,
  });

  const startRound = useCallback((forDifficulty: Difficulty, level: number) => {
    setRound(buildRound(forDifficulty, level));
    setTrainId((id) => id + 1);
    setTried(null);
    setSelected(null);
    setFeedback(null);
  }, []);

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

  const answer = useCallback(
    (choice: Monster) => {
      if (!round || !difficulty || selected || choice.name === tried) return;

      if (choice.name === round.answer.name) {
        setSelected(choice);
        const next = progress.recordCorrect();
        const text = next.levelUp
          ? "🎉 Choo choo! That's right! Level up: longer trains!"
          : "🎉 Choo choo! That's right!";
        setFeedback({ tone: "success", text });
        schedule(
          () => startRound(difficulty, next.level),
          PATTERN_CONFIG.nextRoundDelayMs
        );
        return;
      }

      if (tried === null) {
        setTried(choice.name);
        setFeedback({
          tone: "error",
          text: "Not quite — look at the pattern again!",
        });
        return;
      }

      // Second miss: show who rides in the gap, then bring the next train.
      setSelected(choice);
      setFeedback({
        tone: "info",
        text: `It was ${round.answer.name}! Here comes the next train.`,
      });
      schedule(
        () => startRound(difficulty, progress.level),
        PATTERN_CONFIG.revealHoldMs
      );
    },
    [round, difficulty, selected, tried, progress, schedule, startRound]
  );

  const options = useMemo(
    () => round?.options.filter((option) => option.name !== tried) ?? [],
    [round, tried]
  );

  return {
    difficulty,
    level: progress.level + 1,
    carriageCount: settings.levels[progress.level],
    stars: progress.stars,
    roundsPerLevel: progress.roundsPerLevel,
    round,
    trainId,
    options,
    selected,
    /** The gap shows its monster once the round is over. */
    solved: selected !== null,
    feedback,
    start,
    quit,
    answer,
  };
}
