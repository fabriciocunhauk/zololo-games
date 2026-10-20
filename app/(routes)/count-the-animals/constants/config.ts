export const COUNTING_CONFIG = Object.freeze({
  /** Each level widens the range of animals to count. */
  levels: Object.freeze([
    { min: 1, max: 5 },
    { min: 3, max: 8 },
    { min: 5, max: 10 },
  ]),
  roundsPerLevel: 5,
  optionCount: 4,
  optionSpread: 3,
  minOption: 1,
  maxOption: 10,
  nextRoundDelayMs: 2200,
  /** Count-along after a wrong answer: pause, then one animal per step. */
  revealLeadMs: 1200,
  revealStepMs: 700,
  revealHoldMs: 2600,
});
