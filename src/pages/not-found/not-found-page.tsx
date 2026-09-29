import { Link } from 'react-router'
import { revealDelay } from '@/lib/motion'

export function NotFoundPage() {
  return (
    <section className="flex animate-rise flex-col gap-7" style={revealDelay(0)}>
      <title>Page introuvable · Roger Bentcha</title>
      <p className="m-0 font-pixel text-[14px] tracking-[0.16em] text-ink-soft uppercase">Erreur 404</p>
      <h1 className="m-0 font-pixel text-[clamp(52px,12vw,100px)] leading-[0.94] font-semibold tracking-[-0.01em]">
        Hors carte
      </h1>
      <p className="m-0 max-w-[34em] text-[clamp(19px,3.4vw,22px)] leading-[1.5]">
        Cette page n'existe pas ou a été déplacée. <Link to="/">Retour au portfolio</Link>.
      </p>
    </section>
  )
}
