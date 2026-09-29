import cells from './cells.wgsl?raw'
import common from './common.wgsl?raw'
import drift from './drift.wgsl?raw'
import relief from './relief.wgsl?raw'
import ripples from './ripples.wgsl?raw'

export interface ShaderDefinition {
  id: string
  label: string
  /** Short technical hint shown next to the label. */
  technique: string
  /** Variant body: must define `fn field(px: vec2f, uv: vec2f) -> f32`. */
  body: string
}

export const SHADERS = [
  { id: 'drift', label: 'Dérive', technique: 'Bruit fbm', body: drift },
  { id: 'ripples', label: 'Ondes', technique: 'Interférences', body: ripples },
  { id: 'relief', label: 'Relief', technique: 'Isolignes', body: relief },
  { id: 'cells', label: 'Cellules', technique: 'Voronoï', body: cells },
] as const satisfies readonly ShaderDefinition[]

export type ShaderId = (typeof SHADERS)[number]['id']

export const DEFAULT_SHADER: ShaderId = 'drift'

export const getShader = (id: ShaderId) => SHADERS.find((shader) => shader.id === id) ?? SHADERS[0]

/** Full WGSL module for a variant: shared prelude + its `field` function. */
export const shaderSource = (id: ShaderId) => `${common}\n${getShader(id).body}`
