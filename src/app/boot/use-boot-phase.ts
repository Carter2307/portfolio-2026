import { useEffect, useState } from 'react'

/**
 * loading  → waiting for fonts and the background (at least MIN_MS, at most MAX_MS)
 * complete → progress bar full, held briefly
 * leaving  → loading screen dissolves, page entrance animations start
 * done     → loading screen unmounted
 */
export type BootPhase = 'loading' | 'complete' | 'leaving' | 'done'

const MIN_MS = 700 // long enough not to flash
const MAX_MS = 3000 // never block the page on a slow GPU
const HOLD_MS = 220
export const LEAVE_MS = 450

/**
 * `<html data-booting>` (set in index.html) pauses `animate-rise` until the page is revealed.
 * Removed only when leaving, never on unmount: StrictMode's dev remount would unpause too early.
 * MAX_MS guarantees we always get there.
 */
const unpausePage = () => document.documentElement.removeAttribute('data-booting')

export function useBootPhase(backgroundSettled: boolean): BootPhase {
  // Where the sequence stands once ready; before that the phase is derived as 'loading'.
  const [stage, setStage] = useState<Exclude<BootPhase, 'loading'>>('complete')
  const [fontsReady, setFontsReady] = useState(false)
  const [minElapsed, setMinElapsed] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    let alive = true
    void document.fonts.ready.then(() => alive && setFontsReady(true))
    const min = setTimeout(() => setMinElapsed(true), MIN_MS)
    const max = setTimeout(() => setTimedOut(true), MAX_MS)
    return () => {
      alive = false
      clearTimeout(min)
      clearTimeout(max)
    }
  }, [])

  const ready = timedOut || (fontsReady && minElapsed && backgroundSettled)
  const phase: BootPhase = stage === 'complete' && !ready ? 'loading' : stage

  useEffect(() => {
    if (phase === 'complete') {
      const id = setTimeout(() => setStage('leaving'), HOLD_MS)
      return () => clearTimeout(id)
    }
    if (phase === 'leaving') {
      unpausePage()
      const id = setTimeout(() => setStage('done'), LEAVE_MS)
      return () => clearTimeout(id)
    }
  }, [phase])

  return phase
}
