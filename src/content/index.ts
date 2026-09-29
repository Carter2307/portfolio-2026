import type { Locale } from '@/i18n/locale'
import { en } from './en'
import { fr } from './fr'
import type { Portfolio } from './types'

export const portfolio: Record<Locale, Portfolio> = { en, fr }
