import { Link } from 'react-router'
import * as motion from 'motion/react-m'
import { useI18n } from '@/i18n'
import { useTextEntrance } from '@/lib/motion'

export function NotFoundPage() {
  const { notFound } = useI18n().t
  const entrance = useTextEntrance()
  return (
    <motion.section {...entrance.group} className="flex flex-col gap-7">
      <title>{notFound.pageTitle}</title>
      <motion.p {...entrance.item} className="m-0 text-[14px] text-ink-soft">
        {notFound.eyebrow}
      </motion.p>
      <motion.h1
        {...entrance.item}
        className="m-0 font-pixel text-[clamp(52px,12vw,100px)] leading-[0.94] font-semibold tracking-[-0.01em]"
      >
        {notFound.title}
      </motion.h1>
      <motion.p
        {...entrance.item}
        className="m-0 max-w-[34em] text-[clamp(19px,3.4vw,22px)] leading-[1.5]"
      >
        {notFound.body} <Link to="/">{notFound.back}</Link>.
      </motion.p>
    </motion.section>
  )
}
