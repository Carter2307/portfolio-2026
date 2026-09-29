import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from '@/app/router'
import { detectLocale, I18nProvider } from '@/i18n'
import '@/styles/index.css'

const locale = detectLocale()
document.documentElement.lang = locale

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider locale={locale}>
      <RouterProvider router={router} />
    </I18nProvider>
  </StrictMode>,
)
