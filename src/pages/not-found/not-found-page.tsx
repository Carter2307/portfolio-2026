import { Link } from 'react-router'
import { useI18n } from '@/i18n'
import { revealDelay } from '@/lib/motion'

export function NotFoundPage() {
  const { notFound } = useI18n().t
  return (
    <section className="flex animate-rise flex-col gap-7" style={revealDelay(0)}>
      <title>{notFound.pageTitle}</title>
      <p className="m-0 font-pixel text-[14px] tracking-[0.16em] text-ink-soft uppercase">{notFound.eyebrow}</p>
      <h1 className="m-0 font-pixel text-[clamp(52px,12vw,100px)] leading-[0.94] font-semibold tracking-[-0.01em]">
        {notFound.title}
      </h1>
      <p className="m-0 max-w-[34em] text-[clamp(19px,3.4vw,22px)] leading-[1.5]">
        {notFound.body} <Link to="/">{notFound.back}</Link>.
      </p>
    </section>
  )
}
