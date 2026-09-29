import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { useI18n } from '@/i18n'

/** Last-resort boundary: renders outside the layout, so it carries its own page frame. */
export function RouteErrorPage() {
  const { routeError } = useI18n().t
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : routeError.unknown

  return (
    <main className="mx-auto flex min-h-screen max-w-[680px] flex-col justify-center gap-7 bg-sand px-[clamp(20px,5vw,32px)]">
      <title>{routeError.pageTitle}</title>
      <p className="m-0 font-pixel text-[14px] tracking-[0.16em] text-ink-soft uppercase">{routeError.eyebrow}</p>
      <h1 className="m-0 font-pixel text-[clamp(40px,9vw,72px)] leading-[0.94] font-semibold">{message}</h1>
      <p className="m-0 text-[20px] leading-[1.5]">
        <Link to="/">{routeError.back}</Link>
      </p>
    </main>
  )
}
