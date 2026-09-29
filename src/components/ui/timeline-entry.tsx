import type { TimelineEntry as TimelineEntryData } from '@/content/types'
import { DottedLeader } from './dotted-leader'
import { RichText } from './rich-text'

const sizes = {
  lg: { article: 'gap-2.5', title: 'text-[26px] leading-[1.2]', subtitle: 'text-[19px]' },
  sm: { article: 'gap-1.5', title: 'text-[22px] leading-[1.25]', subtitle: 'text-[18px]' },
} as const

interface TimelineEntryProps {
  entry: TimelineEntryData
  size?: keyof typeof sizes
}

/** Title ····· period, then an italic subtitle, an uppercase details line and bullet highlights. */
export function TimelineEntry({ entry, size = 'lg' }: TimelineEntryProps) {
  const s = sizes[size]
  return (
    <article className={`flex flex-col ${s.article}`}>
      <div className="flex items-baseline gap-3">
        <h3 className={`m-0 font-medium ${s.title}`}>{entry.title}</h3>
        <DottedLeader />
        <span className="font-pixel text-[13px] tracking-[0.08em] whitespace-nowrap text-ink-soft uppercase">
          {entry.period}
        </span>
      </div>

      <p className={`m-0 text-ink-soft italic ${s.subtitle}`}>{entry.subtitle}</p>

      {entry.details && (
        <p className="m-0 font-pixel text-[13px] leading-[1.6] tracking-[0.06em] text-ink-soft uppercase">
          {entry.details}
        </p>
      )}

      {entry.highlights && entry.highlights.length > 0 && (
        <ul className="mt-2 flex list-none flex-col gap-2.5 p-0">
          {entry.highlights.map((highlight, index) => (
            <li key={index} className="flex gap-3.5 text-[18px] leading-[1.5]">
              <span aria-hidden="true" className="mt-[0.62em] size-1.5 flex-none bg-ink" />
              <span>
                <RichText value={highlight} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
