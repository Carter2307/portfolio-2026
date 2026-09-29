import { useRef, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { SiteFooter } from '@/components/layout/site-footer'
import {
  DitherBackground,
  initialDitherStatus,
  pickRandomShader,
  ShaderPanel,
  type ShaderId,
} from '@/features/dither-background'
import { useI18n } from '@/i18n'
import { LoadingScreen } from '../boot/loading-screen'
import { useBootPhase } from '../boot/use-boot-phase'

/** Drawn once per page load, so every visit opens on a different background. */
const INITIAL_SHADER = pickRandomShader()

/** Persistent shell: loading screen, WebGPU background and its picker; survives route changes. */
export function RootLayout() {
  const { t } = useI18n()
  const [shader, setShader] = useState<ShaderId | null>(INITIAL_SHADER)
  const [backgroundStatus, setBackgroundStatus] = useState(initialDitherStatus)
  const mainRef = useRef<HTMLElement>(null)
  const bootPhase = useBootPhase(backgroundStatus !== 'pending')

  // No shader (null) means a plain white page; the gradient is otherwise the no-WebGPU fallback.
  const surface = shader === null ? 'bg-white' : 'bg-linear-160/srgb bg-fixed from-paper via-sand via-55% to-dune'

  return (
    <div className={`relative min-h-screen w-full overflow-x-hidden text-ink ${surface}`}>
      <DitherBackground
        cell={4}
        speed={1}
        shader={shader}
        onStatusChange={setBackgroundStatus}
        focusRef={mainRef}
      />
      <main
        ref={mainRef}
        className="relative z-1 mx-auto box-border flex max-w-[680px] flex-col gap-22 px-[clamp(20px,5vw,32px)] pt-[clamp(56px,12vh,132px)] pb-24"
      >
        <Outlet />
        <SiteFooter />
      </main>
      {/* Nothing to switch without WebGPU. */}
      {backgroundStatus !== 'unsupported' && <ShaderPanel value={shader} onChange={setShader} />}
      {bootPhase !== 'done' && (
        <LoadingScreen
          phase={bootPhase}
          label={`${t.boot.loading} · ${t.background.options[INITIAL_SHADER].label}`}
        />
      )}
      <ScrollRestoration />
    </div>
  )
}
