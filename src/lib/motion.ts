import type { CSSProperties } from 'react'

const REVEAL_STEP_MS = 120

/** Staggers the `animate-rise` entrance: order 0 plays first, then +120 ms per step. */
export const revealDelay = (order: number): CSSProperties => ({
  animationDelay: `${order * REVEAL_STEP_MS}ms`,
})
