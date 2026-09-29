import cells from './cells.wgsl?raw'
import common from './common.wgsl?raw'
import drift from './drift.wgsl?raw'
import relief from './relief.wgsl?raw'
import ripples from './ripples.wgsl?raw'

/** Display names live in the i18n messages (`background.options`). */
export interface ShaderDefinition {
  id: string
  /** Variant body: must define `fn field(px: vec2f, uv: vec2f) -> f32`. */
  body: string
}

export const SHADERS = [
  { id: 'drift', body: drift },
  { id: 'ripples', body: ripples },
  { id: 'relief', body: relief },
  { id: 'cells', body: cells },
] as const satisfies readonly ShaderDefinition[]

export type ShaderId = (typeof SHADERS)[number]['id']

export const DEFAULT_SHADER: ShaderId = 'drift'

export const getShader = (id: ShaderId) => SHADERS.find((shader) => shader.id === id) ?? SHADERS[0]

/** Full WGSL module for a variant: shared prelude + its `field` function. */
export const shaderSource = (id: ShaderId) => `${common}\n${getShader(id).body}`
