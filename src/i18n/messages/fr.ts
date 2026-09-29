import type { Messages } from './types'

export const fr: Messages = {
  boot: {
    loading: 'Chargement du fond',
  },
  sections: {
    experience: 'Expérience',
    projects: 'Projets',
    education: 'Formation',
    contact: 'Contact',
  },
  background: {
    title: 'Fond animé',
    close: 'Fermer',
    tab: 'Fond',
    legend: 'Type de shader',
    options: {
      drift: { label: 'Dérive', technique: 'Bruit fbm' },
      ripples: { label: 'Ondes', technique: 'Interférences' },
      relief: { label: 'Relief', technique: 'Isolignes' },
      cells: { label: 'Cellules', technique: 'Voronoï' },
      rain: { label: 'Averse', technique: 'Éclats' },
      none: { label: 'Aucun', technique: 'Fond blanc' },
    },
  },
  notFound: {
    pageTitle: 'Page introuvable · Roger Bentcha',
    eyebrow: 'Erreur 404',
    title: 'Hors carte',
    body: "Cette page n'existe pas ou a été déplacée.",
    back: 'Retour au portfolio',
  },
  routeError: {
    pageTitle: 'Erreur · Roger Bentcha',
    eyebrow: 'Quelque chose a cassé',
    unknown: 'Erreur inconnue',
    back: "Revenir à l'accueil",
  },
}
