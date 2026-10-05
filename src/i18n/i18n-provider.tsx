import { useMemo, type ReactNode } from 'react'
import { portfolio } from '@/content'
import { I18nContext } from './i18n-context'
import type { Locale } from './locale'
import { en } from './messages/en'
import { fr } from './messages/fr'

const messages = { en, fr }

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo(() => ({ t: messages[locale], content: portfolio[locale] }), [locale])
  return <I18nContext value={value}>{children}</I18nContext>
}
