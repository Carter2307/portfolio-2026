import type { RichText as RichTextValue } from '@/content/types'
import { TextLink } from './text-link'

export function RichText({ value }: { value: RichTextValue }) {
  if (typeof value === 'string') return value
  return value.map((part, index) =>
    typeof part === 'string' ? (
      part
    ) : (
      <TextLink key={index} href={part.href}>
        {part.label}
      </TextLink>
    ),
  )
}
