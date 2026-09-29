export const LOCALES = ['en', 'fr'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/**
 * English by default; French when the browser's default (first preferred)
 * language is French, e.g. `fr`, `fr-FR`, `fr-CA`.
 */
export function detectLocale(preferred: readonly string[] = browserLanguages()): Locale {
  const primary = preferred[0]?.toLowerCase() ?? ''
  return primary === 'fr' || primary.startsWith('fr-') ? 'fr' : DEFAULT_LOCALE
}

function browserLanguages(): readonly string[] {
  if (typeof navigator === 'undefined') return []
  return navigator.languages?.length ? navigator.languages : [navigator.language]
}
