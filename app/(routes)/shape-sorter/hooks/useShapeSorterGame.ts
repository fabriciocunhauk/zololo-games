"use client";
import { useCallback, useRef, useState } from "react";
import type { Feedback } from "@/app/components/FeedbackMessage";
import type { Difficulty } from "@/app/constants/difficulty";
import { useLevelProgress } from "@/app/hooks/useLevelProgress";
import { useSafeTimeout } from "@/app/hooks/useSafeTimeout";
import type { Bin } from "../constants/bins";
import { SHAPE_CONFIG, SHAPE_DIFFICULTY } from "../constants/config";
import type { Shape } from "../constants/shapes";
import { binFor } from "../utils/binFor";
import { generateTray } from "../utils/generateShape";
import { pickBins } from "../utils/pickBins";
import { roundCompleteText } from "../utils/roundCompleteText";

type Round = { id: number; bins: Bin[]; tray: Shape[] };

/** A shape resting in a bin. `key` is shared with the tray so it can fly across. */
export type DroppedShape = { shape: Shape; key: string };

/** sorting: waiting for a tap · dropping: shape flying into its bin · complete: round done. */
export type Phase = "sorting" | "dropping" | "complete";

export type Shake = { binId: string; nonce: number };

export const shapeKey = (roundId: number, index: number) =>
  `shape-${roundId}-${index}`;

export function useShapeSorterGame() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [round, setRound] = useState<Round | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("sorting");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [dropped, setDropped] = useState<Record<string, DroppedShape>>({});
  const [shake, setShake] = useState<Shake | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const roundId = useRef(0);
  const { schedule, clearAll } = useSafeTimeout();

  const settings = SHAPE_DIFFICULTY[difficulty ?? "easy"];
  const progress = useLevelProgress({
    levelCount: settings.levels.length,
    roundsPerLevel: SHAPE_CONFIG.roundsPerLevel,
  });

  const startRound = useCallback((forDifficulty: Difficulty, level: number) => {
    const forSettings = SHAPE_DIFFICULTY[forDifficulty];
    const bins = pickBins(forSettings);
    roundId.current += 1;
    setRound({
      id: roundId.current,
      bins,
      tray: generateTray(
        forSettings.levels[level],
        forSettings.sortBy,
        bins.map((bin) => bin.id),
        SHAPE_CONFIG.shapesPerRound
      ),
    });
    setIndex(0);
    setPhase("sorting");
    setCounts({});
    setDropped({});
    setShake(null);
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

  const finishRound = useCallback(
    (forDifficulty: Difficulty) => {
      const next = progress.recordCorrect();
      setPhase("complete");
      setFeedback({ tone: "success", text: roundCompleteText(next) });
      schedule(
        () => startRound(forDifficulty, next.level),
        SHAPE_CONFIG.roundCompleteMs
      );
    },
    [progress, schedule, startRound]
  );

  const sort = useCallback(
    (binId: string) => {
      if (!round || !difficulty || phase !== "sorting") return;
      const shape = round.tray[index];
      const bin = round.bins.find((b) => b.id === binId);
      if (!shape || !bin) return;

      if (binFor(shape, settings.sortBy) !== binId) {
        setFeedback({ tone: "error", text: "Not that one! Try another bin." });
        setShake((prev) => ({ binId, nonce: (prev?.nonce ?? 0) + 1 }));
        return;
      }

      setCounts((prev) => ({ ...prev, [binId]: (prev[binId] ?? 0) + 1 }));
      setDropped((prev) => ({
        ...prev,
        [binId]: { shape, key: shapeKey(round.id, index) },
      }));
      setPhase("dropping");
      setFeedback({ tone: "success", text: `Yes! ${bin.praise}` });

      const isLast = index === round.tray.length - 1;
      schedule(() => {
        if (isLast) {
          finishRound(difficulty);
          return;
        }
        setIndex(index + 1);
        setPhase("sorting");
      }, SHAPE_CONFIG.dropMs);
    },
    [round, difficulty, phase, index, settings, schedule, finishRound]
  );

  const sorted = Object.values(counts).reduce((sum, n) => sum + n, 0);

  return {
    difficulty,
    settings,
    level: progress.level + 1,
    stars: progress.stars,
    roundsPerLevel: progress.roundsPerLevel,
    round,
    shape: phase === "sorting" ? (round?.tray[index] ?? null) : null,
    shapeKey: round ? shapeKey(round.id, index) : "",
    phase,
    counts,
    dropped,
    shake,
    sorted,
    total: round?.tray.length ?? SHAPE_CONFIG.shapesPerRound,
    feedback,
    start,
    quit,
    sort,
  };
}
