import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

/** Last-resort boundary: renders outside the layout, so it carries its own page frame. */
export function RouteErrorPage() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Erreur inconnue'

  return (
    <main className="mx-auto flex min-h-screen max-w-[680px] flex-col justify-center gap-7 bg-sand px-[clamp(20px,5vw,32px)]">
      <title>Erreur · Roger Bentcha</title>
      <p className="m-0 font-pixel text-[14px] tracking-[0.16em] text-ink-soft uppercase">Quelque chose a cassé</p>
      <h1 className="m-0 font-pixel text-[clamp(40px,9vw,72px)] leading-[0.94] font-semibold">{message}</h1>
      <p className="m-0 text-[20px] leading-[1.5]">
        <Link to="/">Revenir à l'accueil</Link>
      </p>
    </main>
  )
}
