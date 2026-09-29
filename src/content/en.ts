import { contactLinks, hellioSimulator, identity } from './shared'
import type { Portfolio } from './types'

export const en: Portfolio = {
  profile: {
    ...identity,
    role: 'Full-stack software engineer',
    intro:
      "Nearly three years as a work-study developer on B2C and B2B platforms in production. I start from the front end and go all the way to the back end, the cloud and CI/CD. I'm looking for a permanent role where I can grow for the long term and take on technical responsibilities.",
    availability: 'Available now for a permanent role',
    edition: 'Portfolio 2026',
    location: 'Paris, France',
    offScreen: 'Off screen: football, running, weight training, drawing',
  },
  experience: [
    {
      title: 'Hellio',
      period: '10/2024 - 09/2026',
      subtitle: 'Full-stack JavaScript/TypeScript developer, work-study',
      details: 'Energy renovation, digital team · Agile/Scrum · Paris, hybrid',
      highlights: [
        ['Rebuilt the lead-generation simulator (', hellioSimulator, ') in React/TypeScript: +30% conversion.'],
        'Built a shared React component library and developed the NestJS API endpoints for the Solar offer.',
        'Automated the sync of qualified leads from HubSpot to Salesforce (Make.com): 15 leads a day with no manual entry.',
      ],
    },
    {
      title: 'Preciyus Studio',
      period: '11/2023 - 09/2024',
      subtitle: 'Full-stack JavaScript/TypeScript developer, work-study',
      details: 'Video production studio · Paris, remote',
      highlights: [
        'Set up the AWS infrastructure (EC2, S3, CloudFront, Route53, Amplify) behind an Nginx reverse proxy.',
        'GitHub Actions CI/CD pipeline to AWS: deployment time cut from 7 min 40 s to 2 min 20 s (-70%).',
        'Users, media and payments (Stripe) APIs, with faster media loading.',
      ],
    },
  ],
  projects: [
    {
      title: 'Savely',
      period: 'ESGI · 2026',
      subtitle: 'Web and mobile app that turns dead stock back into value',
      details: 'Next.js · Flutter · NestJS · PostgreSQL · Redis · GCP',
      highlights: [
        'Modular monolith architecture (NestJS): stock and sales imports are isolated in a dedicated module to optimize their processing.',
        'CI/CD with separate dev and prod environments, development accelerated with Claude Code.',
      ],
    },
    {
      title: 'Student project management',
      period: 'ESGI · 2025',
      subtitle: 'Platform to track cohorts, projects, assessments and final presentations',
      details: 'NestJS · Next.js · Flutter · GCP · GitLab CI',
      highlights: [
        'Designed a tracking application for a school.',
        'Split into microservices by business domain, deployed to GCP through GitLab CI (build, automated tests, continuous deployment).',
      ],
    },
    {
      title: 'Contrat',
      period: 'ESGI',
      subtitle: '2D platformer played by a reinforcement learning agent',
      details: 'Python · Pygame',
      highlights: [
        'Modeled the game as a Markov decision process (states, actions, rewards) so the agent chooses its own actions.',
        'Trained the agent with reinforcement learning; 2D rendering and visualizations with Pygame.',
      ],
    },
  ],
  education: [
    {
      title: "Master's in Software Architecture",
      period: '2024 - 2026',
      subtitle: "ESGI Paris · Master's level, RNCP level 7",
    },
    {
      title: "Bachelor's in Software Architecture",
      period: '2023 - 2024',
      subtitle: 'ESGI Nantes',
    },
    {
      title: 'Engineering preparatory class (ATS)',
      period: '2022 - 2023',
      subtitle: 'Lycée François Arago, Reims',
    },
  ],
  contact: {
    pitch: "Available now for a permanent role. Write to me, I'll get back to you quickly.",
    links: contactLinks,
  },
}
