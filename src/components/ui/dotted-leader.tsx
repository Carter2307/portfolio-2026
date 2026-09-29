/** Dotted line filling the gap between a label and its value, like a table of contents. */
export function DottedLeader() {
  return (
    <span
      aria-hidden="true"
      className="min-w-6 flex-[1_1_24px] -translate-y-[5px] border-b-2 border-dotted border-ink/40"
    />
  )
}
