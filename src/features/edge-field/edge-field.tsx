import { PixelField } from 'ferry-shaders'

/** The same full-width edge field used on the ferry-shaders documentation page. */
export function EdgeField({ edge }: { edge: 'top' | 'bottom' }) {
  return (
    <PixelField
      className={`edge-field edge-field--${edge}`}
      origin={edge}
      color="var(--foreground)"
      accent="var(--primary-bright)"
      opacity={0.13}
      accentOpacity={0.5}
      speed={0.15}
      breathing={0.08}
      fps={20}
      fallback={<div className="edge-field-fallback" />}
    />
  )
}
