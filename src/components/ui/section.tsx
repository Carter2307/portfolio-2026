import type { ReactNode } from 'react'
import { revealDelay } from '@/lib/motion'

interface SectionProps {
  /** Shown as a two-digit prefix: 1 → "01." */
  number: number
  title: string
  /** Entrance stagger position (see `revealDelay`). */
  revealOrder: number
  /** Tighter spacing for short entries (education, contact). */
  compact?: boolean
  id?: string
  children: ReactNode
}

export function Section({ number, title, revealOrder, compact = false, id, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={`flex animate-rise flex-col ${compact ? 'gap-7' : 'gap-8'}`}
      style={revealDelay(revealOrder)}
    >
      <h2
        id={id ? `${id}-title` : undefined}
        className="m-0 font-pixel text-[15px] font-medium tracking-[0.18em] text-ink uppercase"
      >
        {String(number).padStart(2, '0')}. {title}
      </h2>
      {children}
    </section>
  )
}
