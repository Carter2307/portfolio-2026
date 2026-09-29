import { StatusBadge } from '@/components/ui/status-badge'
import { useI18n } from '@/i18n'
import { revealDelay } from '@/lib/motion'

export function Hero() {
  const { profile } = useI18n().content
  return (
    <header className="flex animate-rise flex-col gap-7" style={revealDelay(0)}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <span className="font-pixel text-[14px] tracking-[0.16em] text-ink-soft uppercase">{profile.edition}</span>
        <StatusBadge>{profile.availability}</StatusBadge>
      </div>

      <h1 className="m-0 font-pixel text-[clamp(52px,12vw,100px)] leading-[0.94] font-semibold tracking-[-0.01em] text-ink">
        <span className="block">{profile.firstName}</span>
        <span className="block">{profile.lastName}</span>
      </h1>

      <p className="m-0 font-pixel text-[clamp(16px,3.4vw,20px)] tracking-[0.12em] text-ink-soft uppercase">
        {profile.role}
      </p>

      <p className="m-0 max-w-[34em] text-[clamp(17px,3vw,19px)] leading-[1.55] text-ink">{profile.intro}</p>
    </header>
  )
}
