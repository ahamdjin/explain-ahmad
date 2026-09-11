import { Camera, Ground, NumberRow, Slot } from '../../../../paper'
import { ExpertOpen } from '../../../../paper/cast/Blend'
import { Hospital } from '../../../../paper/cast/Hospital'
import { Counter } from '../../../../paper/cast/Memory'
import { Narrator } from '../../../../paper/cast/Narrator'
import { FrontDesk } from '../../../../paper/cast/Props'
import { Specialist } from '../../../../paper/cast/Specialist'
import { type Feel } from '../../../../paper/motion'
import { DOG_SEED, type SceneState } from './scene'

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        <Slot on={scene.hospital.on} at={scene.hospital.at} scale={scene.hospital.scale} z={1} feel={feel}>
          <Hospital
            sign=""
            plaque=""
            staffed={scene.hospital.staffed}
            lit={scene.hospital.lit}
            was={scene.hospital.was}
            focus={scene.hospital.focus}
            quiet={false}
            heavy={false}
            bunks={false}
            doorsOpen={false}
            scoring={scene.hospital.scoring}
            badges={scene.hospital.badges}
          />
        </Slot>

        <Slot on={scene.desk.on} at={scene.desk.at} scale={scene.desk.scale} z={4} feel={feel}>
          <FrontDesk named={scene.desk.named} ringed={scene.desk.ringed} />
        </Slot>

        <Slot on={scene.open.on} at={scene.open.at} scale={scene.open.scale} z={6} feel={feel}>
          <ExpertOpen index={3} />
        </Slot>

        {/* Dashed and neutral: it is not one of the eight, and it must never
            read as a member of the family. */}
        <Slot on={scene.shared.on} at={scene.shared.at} scale={scene.shared.scale} z={5} feel={feel}>
          <Specialist dimmed size={78} />
        </Slot>

        <Slot on={scene.row.on} at={scene.row.at} scale={scene.row.scale} z={5} feel={feel}>
          <div style={{ filter: scene.row.pulse ? 'drop-shadow(0 0 12px rgba(94,131,184,.55))' : 'none' }}>
            <NumberRow seed={311} shown={8} basis={DOG_SEED} drift={0.72} tone="measure" label={scene.row.label} />
          </div>
        </Slot>

        <Slot on={scene.row2.on} at={scene.row2.at} scale={scene.row2.scale} z={5} feel={feel}>
          <NumberRow seed={9041} shown={8} basis={DOG_SEED} drift={0.78} tone="measure" label={scene.row2.label} />
        </Slot>

        <Slot on={scene.count.on} at={scene.count.at} scale={scene.count.scale} z={5} feel={feel}>
          <Counter value={scene.count.value} label={scene.count.label} />
        </Slot>
      </Camera>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={7} feel={feel}>
        <Narrator
          pose={scene.narrator.pose}
          style={scene.narrator.style}
          flip={scene.narrator.flip}
          scale={scene.narrator.scale}
        />
      </Slot>
    </>
  )
}
