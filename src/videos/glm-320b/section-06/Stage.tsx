import { Camera, Counter, Hospital, Narrator, NumberRow, Slot, Tower } from '../../../paper'
import { type Feel } from '../../../paper/motion'
import { type SceneState } from './scene'

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <Camera at={scene.camera} feel={feel}>
      <Slot on={scene.wall.on} at={scene.wall.at} scale={scene.wall.scale} z={1} feel={feel}>
        <Hospital
          sign="Mixture of Experts"
          plaque=""
          staffed
          lit={scene.wall.lit}
          was={scene.wall.was}
          focus={scene.wall.focus}
          quiet={false}
          heavy={false}
          bunks={false}
          doorsOpen={false}
        />
      </Slot>

      <Slot on={scene.tower.on} at={scene.tower.at} scale={scene.tower.scale} z={2} feel={feel}>
        <Tower floor={scene.tower.floor} label={scene.tower.label} />
      </Slot>

      <Slot on={scene.row.on} at={scene.row.at} scale={scene.row.scale} z={3} feel={feel}>
        <NumberRow seed={scene.row.seed} shown={7} label={scene.row.label} tone="blue" />
      </Slot>

      <Slot on={scene.counter.on} at={scene.counter.at} scale={scene.counter.scale} z={4} feel={feel}>
        <Counter value={scene.counter.value} label={scene.counter.label} />
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={5} feel={feel}>
        <Narrator pose={scene.narrator.pose} flip={scene.narrator.flip} scale={scene.narrator.scale} />
      </Slot>
    </Camera>
  )
}
