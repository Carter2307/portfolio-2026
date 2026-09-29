import { DEFAULT_SHADER, type ShaderId } from '../shaders'
import { DitherRenderer } from './renderer'
import { DitherScene } from './scene'
import type { DitherOptions, DitherStatus } from './types'

/** ~30 fps is plenty for a slow background and halves the GPU cost. */
const FRAME_INTERVAL_MS = 33
const MAX_FRAME_SECONDS = 0.1

export interface DitherController {
  setOptions(options: Partial<DitherOptions>): void
  dispose(): void
}

interface MountOptions extends DitherOptions {
  onStatusChange?: (status: DitherStatus) => void
}

const clampCell = (cell: number) => Math.max(2, Math.min(12, Math.round(cell) || 4))

/**
 * Wires a canvas to the WebGPU renderer: sizing, input, render loop,
 * reduced motion and device-loss recovery. Framework-agnostic.
 *
 * `shader: null` pauses everything: no frames are drawn, but the device and
 * compiled pipelines are kept so picking a shader again is instant.
 */
export function mountDitherBackground(canvas: HTMLCanvasElement, initial: MountOptions): DitherController {
  const { onStatusChange, ...rest } = initial
  const options: DitherOptions = { ...rest }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const scene = new DitherScene(reducedMotion)
  const aborter = new AbortController()
  const grid = { cell: clampCell(options.cell), width: 0, height: 0 }

  let renderer: DitherRenderer | null = null
  let raf = 0
  let lastTick = 0
  let lastDraw = 0

  // Render at one pixel per cell; CSS upscales it with `image-rendering: pixelated`.
  const fit = () => {
    const cell = clampCell(options.cell)
    const width = Math.max(1, Math.ceil(window.innerWidth / cell))
    const height = Math.max(1, Math.ceil(window.innerHeight / cell))
    if (cell === grid.cell && width === grid.width && height === grid.height) return
    Object.assign(grid, { cell, width, height })
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width * cell}px`
    canvas.style.height = `${height * cell}px`
  }

  const draw = () => {
    if (!renderer || options.shader === null) return
    fit()
    scene.ease()
    renderer.render(scene.uniforms(grid.width, grid.height))
  }

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop)
    if (now - lastDraw < FRAME_INTERVAL_MS) return
    const seconds = lastTick ? Math.min(MAX_FRAME_SECONDS, (now - lastTick) / 1000) : 0
    lastTick = now
    lastDraw = now
    scene.advance(seconds, options.speed)
    draw()
  }

  const startLoop = () => {
    if (reducedMotion || raf || !renderer || options.shader === null) return
    lastTick = 0 // no time jump after a pause
    raf = requestAnimationFrame(loop)
  }

  const stopLoop = () => {
    cancelAnimationFrame(raf)
    raf = 0
  }

  // With reduced motion there is no loop: redraw only when something changes.
  const redrawIfStill = () => {
    if (reducedMotion) draw()
  }

  const onPointerMove = (event: PointerEvent) => {
    scene.pointerMove(event.clientX / grid.cell, (window.innerHeight - event.clientY) / grid.cell)
  }
  const onPointerLeave = () => scene.pointerLeave()

  // Keeps drawing the current shader until the new pipeline is compiled.
  const applyShader = (id: ShaderId) => {
    renderer
      ?.use(id)
      .then((switched) => switched && redrawIfStill())
      .catch((error: unknown) => console.error(`[dither-background] shader "${id}" failed`, error))
  }

  const { signal } = aborter
  window.addEventListener('pointermove', onPointerMove, { passive: true, signal })
  document.addEventListener('pointerleave', onPointerLeave, { signal })
  window.addEventListener('blur', onPointerLeave, { signal })
  window.addEventListener('resize', redrawIfStill, { signal })

  const start = async () => {
    let next: DitherRenderer | null = null
    try {
      // Compile a default even when paused, so resuming is instant.
      next = await DitherRenderer.create(canvas, options.shader ?? DEFAULT_SHADER, signal)
    } catch (error) {
      console.error('[dither-background] WebGPU init failed', error)
    }
    if (signal.aborted) return
    if (!next) {
      onStatusChange?.('unsupported')
      return
    }

    renderer = next
    // The shader may have changed while the device was being created.
    if (options.shader !== null && next.shader !== options.shader) applyShader(options.shader)
    draw()
    onStatusChange?.('ready')
    startLoop()

    const info = await next.lost
    if (signal.aborted || info.reason === 'destroyed') return
    console.warn('[dither-background] GPU device lost, restarting:', info.message)
    stopLoop()
    renderer = null
    onStatusChange?.('pending')
    void start()
  }

  void start()

  return {
    setOptions(patch) {
      const previous = options.shader
      Object.assign(options, patch)
      const next = options.shader
      if (next === null) {
        stopLoop()
        return
      }
      if (next !== previous) applyShader(next)
      else redrawIfStill()
      startLoop()
    },
    dispose() {
      aborter.abort()
      stopLoop()
      renderer?.destroy()
      renderer = null
    },
  }
}
