import { contactLinks, hellioSimulator, identity } from './shared'
import type { Portfolio } from './types'

export const fr: Portfolio = {
  profile: {
    ...identity,
    role: 'Software engineer full-stack',
    intro:
      "Près de trois ans d'alternance sur des plateformes B2C et B2B en production. Je pars du front-end et je vais jusqu'au back-end, au cloud et à la CI/CD. Je cherche un CDI pour m'inscrire dans la durée et prendre des responsabilités techniques.",
    availability: 'Disponible immédiatement en CDI',
    edition: 'Portfolio 2026',
    location: 'Paris, Île-de-France',
    offScreen: 'Hors écran : football, running, musculation, dessin',
  },
  experience: [
    {
      title: 'Hellio',
      period: '10/2024 - 09/2026',
      subtitle: 'Développeur full-stack JavaScript/TypeScript, alternance',
      details: 'Rénovation énergétique, pôle digital · Agile/Scrum · Paris, hybride',
      highlights: [
        [
          "Refonte du simulateur d'acquisition de leads (",
          hellioSimulator,
          ') en React/TypeScript : conversion +30 %.',
        ],
        "Création d'une bibliothèque de composants React partagée et développement des endpoints API NestJS de l'offre Solaire.",
        'Synchronisation automatisée des leads qualifiés de HubSpot vers Salesforce (Make.com) : 15 leads par jour sans saisie manuelle.',
      ],
    },
    {
      title: 'Preciyus Studio',
      period: '11/2023 - 09/2024',
      subtitle: 'Développeur full-stack JavaScript/TypeScript, alternance',
      details: 'Studio de production vidéo · Paris, à distance',
      highlights: [
        "Mise en place de l'infrastructure AWS (EC2, S3, CloudFront, Route53, Amplify) derrière un reverse proxy Nginx.",
        'Pipeline CI/CD GitHub Actions vers AWS : déploiement passé de 7 min 40 à 2 min 20 (-70 %).',
        'API utilisateurs, médias et paiements (Stripe), avec optimisation du chargement des médias.',
      ],
    },
  ],
  projects: [
    {
      title: 'Savely',
      period: 'ESGI · 2026',
      subtitle: 'Application web et mobile de revalorisation du stock dormant',
      details: 'Next.js · Flutter · NestJS · PostgreSQL · Redis · GCP',
      highlights: [
        "Architecture en monolithe modulaire (NestJS) : l'import des stocks et des ventes est isolé dans un module dédié pour optimiser son traitement.",
        'CI/CD avec environnements dev et prod séparés, développement accéléré avec Claude Code.',
      ],
    },
    {
      title: 'Gestion de projets étudiants',
      period: 'ESGI · 2025',
      subtitle: 'Plateforme de suivi des promotions, projets, évaluations et soutenances',
      details: 'NestJS · Next.js · Flutter · GCP · GitLab CI',
      highlights: [
        "Conception d'une application de suivi pour une école.",
        'Découpage en microservices par domaine métier, déployés via GitLab CI sur GCP (build, tests automatisés, déploiement continu).',
      ],
    },
    {
      title: 'Contrat',
      period: 'ESGI',
      subtitle: 'Jeu de plateforme 2D en reinforcement learning',
      details: 'Python · Pygame',
      highlights: [
        "Modélisation du jeu en processus de décision markovien (états, actions, récompenses) pour que l'agent choisisse seul ses actions.",
        "Entraînement de l'agent par apprentissage par renforcement, rendu 2D et visualisations avec Pygame.",
      ],
    },
  ],
  education: [
    {
      title: 'Master Architecture des Logiciels',
      period: '2024 - 2026',
      subtitle: 'ESGI Paris · Bac+5, titre RNCP niveau 7',
    },
    {
      title: 'Bachelor Architecture Logicielle',
      period: '2023 - 2024',
      subtitle: 'ESGI Nantes',
    },
    {
      title: 'Classe préparatoire ATS',
      period: '2022 - 2023',
      subtitle: 'Lycée François Arago, Reims',
    },
  ],
  contact: {
    pitch: 'Disponible immédiatement en CDI. Écrivez-moi, je réponds vite.',
    links: contactLinks,
  },
}
