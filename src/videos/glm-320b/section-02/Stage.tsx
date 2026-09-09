import { Camera, FrontDesk, Hospital, Narrator, NumberRow, Slot, WordCard } from '../../../paper'
import { type Feel } from '../../../paper/motion'
import { type SceneState } from './scene'

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <Camera at={scene.camera} feel={feel}>
      <Slot on={scene.hospital.on} at={scene.hospital.at} scale={scene.hospital.scale} z={1} feel={feel}>
        <Hospital
          sign={scene.hospital.sign}
          plaque={scene.hospital.plaque}
          staffed={scene.hospital.staffed}
          lit={scene.hospital.lit}
          was={scene.hospital.was}
          focus={scene.hospital.focus}
          quiet={scene.hospital.quiet}
          heavy={scene.hospital.heavy}
          bunks={scene.hospital.bunks}
          doorsOpen={scene.hospital.doorsOpen}
        />
      </Slot>

      <Slot on={scene.desk.on} at={scene.desk.at} scale={scene.desk.scale} z={3} feel={feel}>
        <FrontDesk named={scene.desk.named} ringed={scene.desk.ringed} />
      </Slot>

      <Slot on={scene.row.on} at={scene.row.at} scale={scene.row.scale} z={4} feel={feel}>
        <NumberRow seed={11} shown={9} label={scene.row.label} tone="blue" />
      </Slot>

      <Slot on={scene.word.on} at={scene.word.at} scale={scene.word.scale} z={5} feel={feel}>
        <div className="s2-word" data-refused={scene.word.refused ? 'true' : undefined}>
          <WordCard label={scene.word.label} />
        </div>
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={6} feel={feel}>
        <Narrator pose={scene.narrator.pose} flip={scene.narrator.flip} scale={scene.narrator.scale} />
      </Slot>
    </Camera>
  )
}
