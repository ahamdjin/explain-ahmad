import { type Overlay } from './beats'
import { Arrow, Brace, Bubble, Note, Sparks } from './marks'

/**
 * Overlays are the only things a beat replaces outright: handwriting, braces
 * and leader lines belong to one moment. Scene actors never come through here.
 *
 * A note has to carry something the voiceover does not -- a number, a label
 * naming an object, a `?` attached to the confusing thing, a brace measuring
 * something. The one banned pattern is a note transcribing the line being
 * spoken over it.
 */
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
                {renderLines(overlay.text!)}
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

function renderLines(text: string) {
  return text.split('\n').map((line, index) => (
    <span key={index}>
      {index > 0 ? <br /> : null}
      {line}
    </span>
  ))
}
