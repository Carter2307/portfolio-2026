import type { ReactNode } from 'react'
import * as motion from 'motion/react-m'
import { useTextEntrance } from '@/lib/motion'

interface SectionProps {
  /** Shown as a two-digit prefix: 1 → "01". */
  number: number
  title: string
  id?: string
  children: ReactNode
}

export function Section({ number, title, id, children }: SectionProps) {
  const entrance = useTextEntrance()
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className="portfolio-section flex flex-col"
    >
      <motion.h2
        {...entrance.single}
        id={id ? `${id}-title` : undefined}
        className="section-heading m-0"
      >
        <span className="section-number">{String(number).padStart(2, '0')}</span>{' '}
        <span className="section-title">{title}</span>
      </motion.h2>
      {children}
    </section>
  )
}
