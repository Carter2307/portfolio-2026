import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Monogram } from '@/components/ui/monogram'
import { useI18n } from '@/i18n'

const SECTION_IDS = ['about', 'experience', 'education', 'contact'] as const

export function SiteNavigation() {
  const { t, content } = useI18n()
  const { pathname } = useLocation()
  const [active, setActive] = useState<string>('about')

  useEffect(() => {
    const sections = SECTION_IDS.flatMap((id) => {
      const element = document.getElementById(id)
      return element ? [element] : []
    })
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const first = SECTION_IDS.find((id) => visible.has(id))
        if (first) setActive(first)
      },
      { rootMargin: '-10% 0px -45% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <aside className="site-sidebar">
      <Link
        to="/"
        className="site-brand"
        aria-label={`${content.profile.firstName} ${content.profile.lastName}`}
      >
        <Monogram className="site-monogram" />
        <span>
          {content.profile.firstName} {content.profile.lastName}
        </span>
      </Link>
      <nav aria-label={t.navigation.label} className="site-navigation">
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={pathname === '/' ? `#${id}` : `/#${id}`}
            aria-current={pathname === '/' && active === id ? 'location' : undefined}
          >
            {id === 'about' ? t.navigation.about : t.sections[id]}
          </a>
        ))}
      </nav>
    </aside>
  )
}
