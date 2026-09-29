/** Blinking pixel + label, e.g. availability. */
export function StatusBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-pixel text-[14px] tracking-[0.1em] text-ink uppercase">
      <span aria-hidden="true" className="block size-[9px] animate-blink bg-moss" />
      <span>{children}</span>
    </span>
  )
}
