import type { Messages } from './types'

export const en: Messages = {
  sections: {
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education',
    contact: 'Contact',
  },
  background: {
    title: 'Animated background',
    close: 'Close',
    tab: 'Background',
    legend: 'Shader type',
    options: {
      drift: { label: 'Drift', technique: 'fbm noise' },
      ripples: { label: 'Ripples', technique: 'Interference' },
      relief: { label: 'Relief', technique: 'Contours' },
      cells: { label: 'Cells', technique: 'Voronoi' },
      none: { label: 'None', technique: 'Plain white' },
    },
  },
  notFound: {
    pageTitle: 'Page not found · Roger Bentcha',
    eyebrow: 'Error 404',
    title: 'Off the map',
    body: "This page doesn't exist or has moved.",
    back: 'Back to the portfolio',
  },
  routeError: {
    pageTitle: 'Error · Roger Bentcha',
    eyebrow: 'Something broke',
    unknown: 'Unknown error',
    back: 'Back to home',
  },
}
