import { useRef, type RefObject } from 'react'
import { DEFAULT_SHADER } from './shaders'
import type { DitherOptions, DitherStatus } from './lib/types'
import { useDitherBackground } from './use-dither-background'

interface DitherBackgroundProps extends Partial<DitherOptions> {
  onStatusChange?: (status: DitherStatus) => void
  /** Content column that shaders such as « Averse » keep calm, so it stays readable. */
  focusRef?: RefObject<HTMLElement | null>
}

/**
 * Fixed, pointer-reactive dithered background behind the page.
 * Without WebGPU, or with `shader={null}`, the canvas fades out and the page's own background shows through.
 */
export function DitherBackground({
  cell = 4,
  speed = 1,
  shader = DEFAULT_SHADER,
  onStatusChange,
  focusRef,
}: DitherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const status = useDitherBackground(canvasRef, { cell, speed, shader }, { onStatusChange, focusRef })
  const visible = status === 'ready' && shader !== null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-status={status}
      data-visible={visible}
      className="pointer-events-none fixed top-0 left-0 z-0 block h-screen w-screen opacity-0 transition-opacity duration-700 [image-rendering:pixelated] data-[visible=true]:opacity-100"
    />
  )
}
