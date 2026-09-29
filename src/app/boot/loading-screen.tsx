import { useEffect, useState } from 'react'
import { Monogram } from '@/components/ui/monogram'
import { LEAVE_MS, type BootPhase } from './use-boot-phase'

const CELLS = 12
const TICK_MS = 90

/** Full-screen boot screen: the pixel R builds up, a pixel bar fills, then it all dissolves. */
export function LoadingScreen({ phase, label }: { phase: BootPhase; label: string }) {
  const [filled, setFilled] = useState(0)
  const complete = phase !== 'loading'

  // Progress is not measurable: creep up to CELLS - 2, finish when the page is ready.
  useEffect(() => {
    if (complete) return
    const id = setInterval(() => setFilled((n) => Math.min(n + 1, CELLS - 2)), TICK_MS)
    return () => clearInterval(id)
  }, [complete])

  const shown = complete ? CELLS : filled

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 grid place-items-center bg-sand text-ink transition-opacity ease-[steps(5,end)] ${
        phase === 'leaving' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${LEAVE_MS}ms` }}
    >
      <div className="flex flex-col items-center gap-7">
        <Monogram className="h-24 w-auto animate-reveal" />
        <div aria-hidden="true" className="flex gap-1">
          {Array.from({ length: CELLS }, (_, i) => (
            <span key={i} className={`block size-2 ${i < shown ? 'bg-ink' : 'bg-ink/15'}`} />
          ))}
        </div>
        <p className="m-0 font-pixel text-[13px] tracking-[0.12em] text-ink-soft uppercase">{label}</p>
      </div>
    </div>
  )
}
