import { useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  DEFAULT_SHADER,
  DitherBackground,
  initialDitherStatus,
  ShaderPanel,
  type ShaderId,
} from '@/features/dither-background'

/** Persistent shell: the WebGPU background and its picker survive route changes. */
export function RootLayout() {
  const [shader, setShader] = useState<ShaderId | null>(DEFAULT_SHADER)
  const [backgroundStatus, setBackgroundStatus] = useState(initialDitherStatus)

  // No shader (null) means a plain white page; the gradient is otherwise the no-WebGPU fallback.
  const surface = shader === null ? 'bg-white' : 'bg-linear-160/srgb bg-fixed from-paper via-sand via-55% to-dune'

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden text-ink ${surface}`}>
      <DitherBackground cell={4} speed={1} shader={shader} onStatusChange={setBackgroundStatus} />
      <main className="relative z-1 mx-auto box-border flex max-w-[680px] flex-col gap-22 px-[clamp(20px,5vw,32px)] pt-[clamp(56px,12vh,132px)] pb-24">
        <Outlet />
        <SiteFooter />
      </main>
      {/* Nothing to switch without WebGPU. */}
      {backgroundStatus !== 'unsupported' && <ShaderPanel value={shader} onChange={setShader} />}
      <ScrollRestoration />
    </div>
  )
}
