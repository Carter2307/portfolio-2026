import { createContext } from 'react'
import type { Portfolio } from '@/content/types'
import type { Messages } from './messages/types'

export interface I18nValue {
  /** Interface strings. */
  t: Messages
  /** Portfolio content in the same language. */
  content: Portfolio
}

export const I18nContext = createContext<I18nValue | null>(null)
