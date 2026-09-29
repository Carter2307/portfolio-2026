import { DottedLeader } from '@/components/ui/dotted-leader'
import { Section } from '@/components/ui/section'
import { TextLink } from '@/components/ui/text-link'
import { useI18n } from '@/i18n'

export function ContactSection({ number, revealOrder }: { number: number; revealOrder: number }) {
  const { t, content } = useI18n()
  return (
    <Section id="contact" number={number} title={t.sections.contact} revealOrder={revealOrder} compact>
      <p className="m-0 max-w-[30em] text-[clamp(22px,4.4vw,30px)] leading-[1.3] font-normal text-ink">
        {content.contact.pitch}
      </p>

      <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
        {content.contact.links.map((link) => (
          <li key={link.label} className="flex items-baseline gap-3">
            <span className="font-pixel text-[14px] tracking-[0.12em] text-ink uppercase">{link.label}</span>
            <DottedLeader />
            <TextLink href={link.href} className="text-[18px]">
              {link.text}
            </TextLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}
