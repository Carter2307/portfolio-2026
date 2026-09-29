import { SHADERS, type ShaderId } from './shaders'

const LAST_SHADER_KEY = 'portfolio:last-shader'

/**
 * A random shader for this visit. Skips the one shown on the previous visit
 * (remembered in localStorage, best effort) so reloading always changes it.
 */
export function pickRandomShader(random: () => number = Math.random): ShaderId {
  const ids = SHADERS.map((shader) => shader.id)
  const last = readLast()
  const pool = ids.length > 1 ? ids.filter((id) => id !== last) : ids
  const pick = pool[Math.floor(random() * pool.length)] ?? ids[0]
  writeLast(pick)
  return pick
}

function readLast(): string | null {
  try {
    return localStorage.getItem(LAST_SHADER_KEY)
  } catch {
    return null // storage blocked (private mode, sandbox…)
  }
}

function writeLast(id: ShaderId): void {
  try {
    localStorage.setItem(LAST_SHADER_KEY, id)
  } catch {
    // Not critical: the next visit may just repeat this shader.
  }
}
