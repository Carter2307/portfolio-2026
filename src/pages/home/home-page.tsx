import { Section } from '@/components/ui/section'
import { TimelineEntry } from '@/components/ui/timeline-entry'
import { useI18n } from '@/i18n'
import { ContactSection } from './sections/contact-section'
import { Hero } from './sections/hero'

export function HomePage() {
  const { t, content } = useI18n()
  const { profile, experience, projects, education } = content

  return (
    <>
      <title>{`${profile.firstName} ${profile.lastName}`}</title>
      <meta name="description" content={`${profile.role}. ${profile.availability}.`} />

      <Hero />

      <Section id="experience" number={1} title={t.sections.experience} revealOrder={1}>
        {experience.map((entry) => (
          <TimelineEntry key={entry.title} entry={entry} />
        ))}
      </Section>

      <Section id="projects" number={2} title={t.sections.projects} revealOrder={2}>
        {projects.map((entry) => (
          <TimelineEntry key={entry.title} entry={entry} />
        ))}
      </Section>

      <Section id="education" number={3} title={t.sections.education} revealOrder={3} compact>
        {education.map((entry) => (
          <TimelineEntry key={entry.title} entry={entry} size="sm" />
        ))}
      </Section>

      <ContactSection number={4} revealOrder={4} />
    </>
  )
}
