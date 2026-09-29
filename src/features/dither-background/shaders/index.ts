import aurora from './aurora.wgsl?raw'
import cells from './cells.wgsl?raw'
import common from './common.wgsl?raw'
import drift from './drift.wgsl?raw'
import dunes from './dunes.wgsl?raw'
import grass from './grass.wgsl?raw'
import rain from './rain.wgsl?raw'
import relief from './relief.wgsl?raw'
import ripples from './ripples.wgsl?raw'
import stars from './stars.wgsl?raw'

/** Display names live in the i18n messages (`background.options`). */
export interface ShaderDefinition {
  id: string
  /** Variant body: must define `fn field(px: vec2f, uv: vec2f) -> f32`. */
  body: string
  /** Pipeline-overridable constants declared in common.wgsl, e.g. `WHITE_BACKGROUND`. */
  constants?: Record<string, number>
}

export const SHADERS = [
  { id: 'drift', body: drift },
  { id: 'ripples', body: ripples },
  { id: 'relief', body: relief },
  { id: 'cells', body: cells },
  { id: 'rain', body: rain, constants: { WHITE_BACKGROUND: 1 } },
  { id: 'stars', body: stars },
  { id: 'dunes', body: dunes },
  { id: 'grass', body: grass },
  { id: 'aurora', body: aurora },
] as const satisfies readonly ShaderDefinition[]

export type ShaderId = (typeof SHADERS)[number]['id']

export const DEFAULT_SHADER: ShaderId = 'drift'

export const getShader = (id: ShaderId): ShaderDefinition =>
  SHADERS.find((shader) => shader.id === id) ?? SHADERS[0]

/** Full WGSL module for a variant: shared prelude + its `field` function. */
export const shaderSource = (id: ShaderId) => `${common}\n${getShader(id).body}`
