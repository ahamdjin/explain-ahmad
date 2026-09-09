import { Arrow, Brace, Bubble, Note, Sparks } from './marks'

/**
 * Handwriting, braces and leader lines. Shared by every section.
 *
 * A note must carry something the voice does not -- a number, a label naming
 * an object, a `?` on the confusing thing, a brace measuring something. The one
 * banned pattern is a note transcribing the line being spoken over it.
 */
export type Overlay = {
  kind: 'note' | 'bubble' | 'brace' | 'arrow' | 'sparks'
  /** Percentages of the stage, except `arrow`, which uses 1920x1080 units. */
  at?: { x: string; y: string }
  from?: { x: number; y: number }
  to?: { x: number; y: number }
  text?: string
  sub?: string
  width?: string | number
  rotate?: number
  tone?: 'ink' | 'orange' | 'red' | 'blue'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  side?: 'top' | 'bottom'
  bow?: number
  dashed?: boolean
  backed?: boolean
  tail?: 'bottom-left' | 'bottom-center' | 'left'
  label?: string
  /**
   * Survives into later beats until one sets `clearSticky`. Overlays are
   * otherwise replaced wholesale each beat, which silently drops a label one
   * beat after it appears -- and takes the following frame's point with it.
   */
  sticky?: boolean
}

export function Overlays({ overlays }: { overlays: Overlay[] }) {
  return (
    <>
      {overlays.map((overlay, index) => {
        const key = `${overlay.kind}-${index}`

        switch (overlay.kind) {
          case 'note':
            return (
              <Note
                key={key}
                at={overlay.at!}
                rotate={overlay.rotate}
                tone={overlay.tone}
                size={overlay.size}
                backed={overlay.backed}
                width={overlay.width as string | undefined}
              >
                {overlay.text!.split('\n').map((line, i) => (
                  <span key={i}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
                {overlay.sub ? <em>{overlay.sub}</em> : null}
              </Note>
            )

          case 'bubble':
            return (
              <Bubble key={key} at={overlay.at!} tail={overlay.tail} width={overlay.width as number}>
                {overlay.text}
              </Bubble>
            )

          case 'brace':
            return (
              <Brace
                key={key}
                label={overlay.text!}
                sub={overlay.sub}
                at={overlay.at!}
                width={overlay.width as string}
                side={overlay.side}
                tone={overlay.tone === 'orange' ? 'orange' : 'ink'}
              />
            )

          case 'arrow':
            return (
              <Arrow
                key={key}
                from={overlay.from!}
                to={overlay.to!}
                bow={overlay.bow}
                tone={overlay.tone === 'orange' ? 'orange' : 'ink'}
                dashed={overlay.dashed}
                label={overlay.label}
              />
            )

          case 'sparks':
            return <Sparks key={key} at={overlay.at!} />

          default:
            return null
        }
      })}
    </>
  )
}
