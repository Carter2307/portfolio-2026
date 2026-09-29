export interface InlineLink {
  label: string
  href: string
}

/** Plain text, or text mixed with inline links. */
export type RichText = string | readonly (string | InlineLink)[]

export interface TimelineEntry {
  title: string
  /** Right-aligned meta after the dotted leader (dates, school…). */
  period: string
  subtitle: string
  /** Uppercase context line: sector, stack, location… */
  details?: string
  highlights?: readonly RichText[]
}

export interface ContactLink {
  label: string
  href: string
  text: string
}

export interface Profile {
  firstName: string
  lastName: string
  role: string
  intro: string
  availability: string
  edition: string
  location: string
  offScreen: string
}

export interface Portfolio {
  profile: Profile
  experience: readonly TimelineEntry[]
  projects: readonly TimelineEntry[]
  education: readonly TimelineEntry[]
  contact: {
    pitch: string
    links: readonly ContactLink[]
  }
}
