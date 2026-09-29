import { useEffect, useRef, useState, type RefObject } from 'react'
import { mountDitherBackground, type DitherController } from './lib/controller'
import { DitherRenderer } from './lib/renderer'
import type { DitherOptions, DitherStatus } from './lib/types'

/** Synchronous best guess, so UI tied to the background can skip a flash on unsupported browsers. */
export const initialDitherStatus = (): DitherStatus =>
  DitherRenderer.isSupported() ? 'pending' : 'unsupported'

/** Mounts the WebGPU background on `canvasRef` once; option changes are applied live. */
export function useDitherBackground(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  { cell, speed, shader }: DitherOptions,
  onStatusChange?: (status: DitherStatus) => void,
): DitherStatus {
  const [status, setStatus] = useState<DitherStatus>(initialDitherStatus)
  const controllerRef = useRef<DitherController | null>(null)
  const initialOptions = useRef<DitherOptions>({ cell, speed, shader })
  const onStatusChangeRef = useRef(onStatusChange)

  useEffect(() => {
    onStatusChangeRef.current = onStatusChange
  }, [onStatusChange])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const controller = mountDitherBackground(canvas, {
      ...initialOptions.current,
      onStatusChange: (next) => {
        setStatus(next)
        onStatusChangeRef.current?.(next)
      },
    })
    controllerRef.current = controller
    return () => {
      controller.dispose()
      controllerRef.current = null
    }
  }, [canvasRef])

  useEffect(() => {
    controllerRef.current?.setOptions({ cell, speed, shader })
  }, [cell, speed, shader])

  return status
}
