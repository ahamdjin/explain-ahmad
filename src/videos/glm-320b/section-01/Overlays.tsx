import { type Overlay } from './beats'
import { braceBox } from './ExpertField'
import { Arrow, Brace, Bubble, Cross, Note, Sparks } from './marks'
import { type SceneState } from './scene'

/**
 * Overlays are the only things a beat replaces outright: handwriting, braces and
 * leader lines belong to one moment. Scene actors never come through here.
 */
export function Overlays({ overlays, scene }: { overlays: Overlay[]; scene: SceneState }) {
  const anchors = braceBox(scene.grid.at.x, scene.grid.scale)

  return (
    <>
      {overlays.map((overlay, index) => {
        const key = `${overlay.kind}-${index}`

        switch (overlay.kind) {
          case 'title':
            return (
              <span className="s1-field-title" key={key} style={{ left: anchors.total.left }}>
                {overlay.text}
              </span>
            )

          case 'note':
            return (
              <Note
                key={key}
                at={overlay.at!}
                rotate={overlay.rotate}
                tone={overlay.tone}
                size={overlay.size}
                backed={overlay.backed}
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

          case 'brace': {
            const anchored =
              overlay.anchor === 'grid-active'
                ? anchors.active
                : overlay.anchor === 'grid-total'
                  ? anchors.total
                  : null

            return (
              <Brace
                key={key}
                label={overlay.text!}
                sub={overlay.sub}
                at={{ x: anchored ? anchored.left : overlay.at!.x, y: overlay.at!.y }}
                width={anchored ? anchored.width : (overlay.width as string)}
                side={overlay.side}
                tone={overlay.tone === 'orange' ? 'orange' : 'ink'}
              />
            )
          }

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

          case 'cross':
            return <Cross key={key} at={overlay.at!} />

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
