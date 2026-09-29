import { createContext } from 'react'
import type { Portfolio } from '@/content/types'
import type { Locale } from './locale'
import type { Messages } from './messages/types'

export interface I18nValue {
  locale: Locale
  /** Interface strings. */
  t: Messages
  /** Portfolio content in the same language. */
  content: Portfolio
}

export const I18nContext = createContext<I18nValue | null>(null)
