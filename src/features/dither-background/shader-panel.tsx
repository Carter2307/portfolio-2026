import { useId, useState } from 'react'
import { DottedLeader } from '@/components/ui/dotted-leader'
import { SHADERS, type ShaderId } from './shaders'

interface ShaderPanelProps {
  /** `null` = no shader, plain white page. */
  value: ShaderId | null
  onChange: (shader: ShaderId | null) => void
}

interface PanelOption {
  id: ShaderId | null
  label: string
  technique: string
}

const OPTIONS: readonly PanelOption[] = [...SHADERS, { id: null, label: 'Aucun', technique: 'Fond blanc' }]

const labelOf = (id: ShaderId | null) => OPTIONS.find((option) => option.id === id)?.label ?? ''

const frame =
  'fixed bottom-4 left-4 z-10 border border-ink bg-paper/95 text-ink shadow-[3px_3px_0_0_var(--color-ink)] sm:bottom-6 sm:left-6'
const pixelCaps = 'font-pixel text-[13px] tracking-[0.12em] uppercase'
const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink'

/** Bottom-left picker for the background shader. Open by default, collapses to a small tab. */
export function ShaderPanel({ value, onChange }: ShaderPanelProps) {
  const [open, setOpen] = useState(true)
  const panelId = useId()
  const titleId = useId()

  if (!open) {
    return (
      <button
        type="button"
        aria-expanded={false}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
        className={`${frame} ${pixelCaps} ${focusRing} inline-flex cursor-pointer items-center gap-2.5 px-3.5 py-2.5 hover:text-rust`}
      >
        <span aria-hidden="true" className="block size-[9px] bg-current" />
        Fond · {labelOf(value)}
      </button>
    )
  }

  return (
    <aside id={panelId} aria-labelledby={titleId} className={`${frame} w-[min(300px,calc(100vw-32px))]`}>
      <div className="flex items-center justify-between gap-4 border-b border-ink/20 px-4 py-3">
        <h2 id={titleId} className={`m-0 font-medium text-ink-soft ${pixelCaps}`}>
          Fond animé
        </h2>
        <button
          type="button"
          aria-expanded
          aria-controls={panelId}
          onClick={() => setOpen(false)}
          className={`cursor-pointer text-ink underline decoration-ink/45 underline-offset-3 hover:text-rust hover:decoration-rust ${pixelCaps} ${focusRing}`}
        >
          Fermer
        </button>
      </div>

      <fieldset className="m-0 flex flex-col gap-1 border-0 px-4 py-3">
        <legend className="sr-only">Type de shader</legend>
        {OPTIONS.map((option) => (
          <label
            key={option.id ?? 'none'}
            className={`group flex cursor-pointer items-baseline gap-3 py-1 ${option.id === null ? 'mt-1 border-t border-ink/20 pt-2' : ''}`}
          >
            <input
              type="radio"
              name="background-shader"
              value={option.id ?? 'none'}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="block size-2 flex-none -translate-y-px border border-ink peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink"
            />
            <span className="text-[18px] leading-[1.3] group-hover:text-rust">{option.label}</span>
            <DottedLeader />
            <span className="font-pixel text-[12px] tracking-[0.08em] whitespace-nowrap text-ink-soft uppercase">
              {option.technique}
            </span>
          </label>
        ))}
      </fieldset>
    </aside>
  )
}
