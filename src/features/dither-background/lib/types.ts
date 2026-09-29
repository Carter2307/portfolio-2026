import type { ShaderId } from '../shaders'

export type Vec2 = readonly [number, number]

/** Values uploaded to the shader each frame (see `Uniforms` in common.wgsl). */
export interface FrameUniforms {
  /** Grid size, in cells. */
  resolution: Vec2
  /** Pointer position, in cells, origin bottom-left. */
  mouse: Vec2
  time: number
  /** Pointer influence, 0..1. */
  amount: number
  /** Readable column `[left, right]`, in cells; `[0, 0]` when there is none. */
  focus: Vec2
}

/** What the pure scene state provides; the controller adds layout data. */
export type SceneUniforms = Omit<FrameUniforms, 'focus'>

export interface DitherOptions {
  /** Size of one dither cell, in CSS px (clamped to 2..12). */
  cell: number
  /** Animation speed multiplier (0 freezes the noise). */
  speed: number
  /** Which background variant to draw; `null` draws nothing (the page background shows). */
  shader: ShaderId | null
}

export type DitherStatus = 'pending' | 'ready' | 'unsupported'
