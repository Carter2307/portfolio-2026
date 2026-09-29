import type { ShaderId } from '@/features/dither-background/shaders'

export interface ShaderLabel {
  label: string
  /** Short technical hint shown next to the label. */
  technique: string
}

/** Interface strings. Portfolio content lives in `src/content`. */
export interface Messages {
  boot: {
    /** Followed by the shader drawn this visit, e.g. "Loading background · Drift". */
    loading: string
  }
  sections: {
    experience: string
    projects: string
    education: string
    contact: string
  }
  background: {
    title: string
    close: string
    /** Prefix of the collapsed tab, e.g. "Background · Drift". */
    tab: string
    legend: string
    /** `none` is the "no shader" option. */
    options: Record<ShaderId | 'none', ShaderLabel>
  }
  notFound: {
    pageTitle: string
    eyebrow: string
    title: string
    body: string
    back: string
  }
  routeError: {
    pageTitle: string
    eyebrow: string
    unknown: string
    back: string
  }
}
