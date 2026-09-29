import { profile } from '@/content/portfolio'
import { revealDelay } from '@/lib/motion'

const YEAR = new Date().getFullYear()

export function SiteFooter({ revealOrder = 5 }: { revealOrder?: number }) {
  return (
    <footer
      className="flex animate-rise flex-col gap-1.5 font-pixel text-[13px] leading-[1.6] tracking-[0.08em] text-ink-soft uppercase"
      style={revealDelay(revealOrder)}
    >
      <span>{profile.location}</span>
      <span>{profile.offScreen}</span>
      <span>
        © {YEAR} {profile.firstName} {profile.lastName}
      </span>
    </footer>
  )
}
