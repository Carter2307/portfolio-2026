import type { Messages } from './types'

export const en: Messages = {
  boot: {
    loading: 'Loading background',
  },
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
      rain: { label: 'Downpour', technique: 'Shards' },
      stars: { label: 'Constellations', technique: 'Stars' },
      dunes: { label: 'Dunes', technique: 'Ripples' },
      grass: { label: 'Grass', technique: 'Blades' },
      aurora: { label: 'Auroras', technique: 'Curtains' },
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
