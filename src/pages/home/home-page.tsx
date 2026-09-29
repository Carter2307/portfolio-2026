import { Section } from '@/components/ui/section'
import { TimelineEntry } from '@/components/ui/timeline-entry'
import { education, experience, profile, projects } from '@/content/portfolio'
import { ContactSection } from './sections/contact-section'
import { Hero } from './sections/hero'

export function HomePage() {
  return (
    <>
      <title>{`Portfolio ${profile.firstName} ${profile.lastName}`}</title>
      <meta name="description" content={`${profile.role}. ${profile.availability}.`} />

      <Hero />

      <Section id="experience" number={1} title="Expérience" revealOrder={1}>
        {experience.map((entry) => (
          <TimelineEntry key={entry.title} entry={entry} />
        ))}
      </Section>

      <Section id="projets" number={2} title="Projets" revealOrder={2}>
        {projects.map((entry) => (
          <TimelineEntry key={entry.title} entry={entry} />
        ))}
      </Section>

      <Section id="formation" number={3} title="Formation" revealOrder={3} compact>
        {education.map((entry) => (
          <TimelineEntry key={entry.title} entry={entry} size="sm" />
        ))}
      </Section>

      <ContactSection number={4} revealOrder={4} />
    </>
  )
}
