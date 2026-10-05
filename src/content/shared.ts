import type { ContactLink } from './types'

/** Language-independent data shared by every locale. */
export const identity = { firstName: 'Roger', lastName: 'BENTCHA' } as const

export const contactLinks: readonly ContactLink[] = [
  { label: 'Email', href: 'mailto:rogerbentcha@gmail.com', text: 'rogerbentcha@gmail.com' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/roger-bentcha',
    text: 'linkedin.com/in/roger-bentcha',
  },
  { label: 'GitHub', href: 'https://github.com/Carter2307', text: 'github.com/Carter2307' },
]
