export interface TimelineEntry {
  title: string
  /** Dates aligned to the opposite edge of the title row. */
  period: string
  subtitle: string
}

export interface ContactLink {
  label: string
  href: string
  text: string
}

interface Profile {
  firstName: string
  lastName: string
  role: string
  intro: string
  location: string
  offScreen: string
}

export interface Portfolio {
  profile: Profile
  experience: readonly TimelineEntry[]
  education: readonly TimelineEntry[]
  contact: {
    pitch: string
    links: readonly ContactLink[]
  }
}
