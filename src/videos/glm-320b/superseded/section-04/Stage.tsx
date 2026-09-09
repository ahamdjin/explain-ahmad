import { Narrator, NumberRow, Sentence, Slot } from '../../../paper'
import { type Feel } from '../../../paper/motion'
import { type SceneState } from './scene'

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {(['a', 'b'] as const).map((key) => {
        const line = scene[key]
        return (
          <Slot key={key} on={line.on} at={line.at} scale={line.scale} z={2} feel={feel}>
            <Sentence
              words={line.words}
              focus={line.focus}
              weights={line.weights}
              dim={line.dim}
              caption={line.caption}
            />
          </Slot>
        )
      })}

      <Slot on={scene.rowA.on} at={scene.rowA.at} scale={scene.rowA.scale} z={3} feel={feel}>
        <NumberRow seed={scene.rowA.seed} shown={9} label={scene.rowA.label} tone="measure" />
      </Slot>

      <Slot on={scene.rowB.on} at={scene.rowB.at} scale={scene.rowB.scale} z={3} feel={feel}>
        <NumberRow seed={scene.rowB.seed} shown={9} label={scene.rowB.label} tone="measure" />
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={5} feel={feel}>
        <Narrator pose={scene.narrator.pose} flip={scene.narrator.flip} scale={scene.narrator.scale} />
      </Slot>
    </>
  )
}
