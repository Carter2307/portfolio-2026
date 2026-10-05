import { Outlet, ScrollRestoration } from 'react-router'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteNavigation } from '@/components/layout/site-navigation'
import { EdgeField } from '@/features/edge-field/edge-field'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useI18n } from '@/i18n'

/** A static editorial page with pixel fields at its two edges. */
export function RootLayout() {
  const { t } = useI18n()
  return (
    <div className="portfolio">
      <EdgeField edge="top" />
      <div className="page-theme-control">
        <ThemeToggle />
      </div>
      <a className="skip-link" href="#main">
        {t.navigation.skip}
      </a>
      <div className="portfolio-layout">
        <SiteNavigation />
        <div className="portfolio-column">
          <main id="main" className="portfolio-main">
            <Outlet />
          </main>
        </div>
      </div>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  )
}
