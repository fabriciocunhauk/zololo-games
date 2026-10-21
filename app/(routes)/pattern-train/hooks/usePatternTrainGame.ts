"use client";
import { useCallback, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import { playSound } from "@/app/utils/soundPlayer";
import { resultSound } from "@/app/utils/sounds";
import { randomInt } from "@/app/utils/randomInt";
import { PATTERN_CONFIG, PATTERN_DIFFICULTY } from "../constants/config";
import { revealText, rightText } from "../utils/feedbackText";
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
  /** The first wrong pick: stays in place, locked, so the child tries another. */
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
        playSound(resultSound(next));
        setFeedback({ tone: "success", text: rightText(next) });
        schedule(
          () => startRound(difficulty, next.level),
          PATTERN_CONFIG.nextRoundDelayMs
        );
        return;
      }

      playSound("wrong");
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
        text: revealText(round.answer, settings.faces),
      });
      schedule(
        () => startRound(difficulty, progress.level),
        PATTERN_CONFIG.revealHoldMs
      );
    },
    [
      round,
      difficulty,
      selected,
      tried,
      settings,
      progress,
      schedule,
      startRound,
    ]
  );

  const isTried = useCallback(
    (option: Monster) => option.name === tried,
    [tried]
  );

  return {
    difficulty,
    level: progress.level + 1,
    carriageCount: settings.levels[progress.level],
    stars: progress.stars,
    roundsPerLevel: progress.roundsPerLevel,
    round,
    trainId,
    options: round?.options ?? [],
    isTried,
    /** The final pick, or the first miss so it stays ringed pink. */
    selected: selected ?? round?.options.find(isTried) ?? null,
    /** The gap shows its monster once the round is over. */
    solved: selected !== null,
    feedback,
    start,
    quit,
    answer,
  };
}
