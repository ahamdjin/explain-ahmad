/**
 * Shared SVG defs for the paper world.
 *
 * The hand-drawn wobble comes from a fixed-seed turbulence displacement rather
 * than a generative library, so every render of a beat is byte-identical and
 * screenshot comparison stays meaningful.
 */
export function PaperDefs() {
  return (
    <svg className="s1-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="s1-ink" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.7" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="s1-ink-soft" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="19" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.05" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="s1-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="3" result="grain" />
          <feColorMatrix in="grain" type="saturate" values="0" result="mono" />
          <feComponentTransfer in="mono" result="soft">
            <feFuncA type="linear" slope="0.055" intercept="0" />
          </feComponentTransfer>
          <feComposite in="soft" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

export const INK = '#2B2926'
export const GRAPHITE = '#807A72'

export const EXPERT_COLORS = [
  '#E79A63',
  '#7FA8D4',
  '#8FBF9F',
  '#B49AD1',
  '#E3C45B',
  '#E39BA8',
  '#74A297',
  '#C9A87C',
] as const

export function expertColor(index: number) {
  return EXPERT_COLORS[index % EXPERT_COLORS.length]
}
