export const BUBBLE_POP_CONFIG = Object.freeze({
  bubbleCount: 4,
  minOperand: 1,
  maxOperand: 10,
  minResult: 1,
  maxResult: 20,
  optionSpread: 3,
  points: 10,
  countdownFrom: 3,
  /** Pause after each bubble's entrance stagger before clicks are accepted. */
  bubbleStaggerMs: 200,
  roundSettleMs: 500,
  nextRoundDelayMs: 1500,
  fallbackAreaSize: 400,
});
