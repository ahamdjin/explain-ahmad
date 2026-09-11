import { ExpertBlend, Ground, NumberRow, Room, Slot } from '../../../../paper'
import { Hospital } from '../../../../paper/cast/Hospital'
import { Narrator } from '../../../../paper/cast/Narrator'
import { type Feel } from '../../../../paper/motion'
import { type SceneState } from './scene'

/**
 * The room is drawn behind everything, at z 0, so beat 11 encloses the row that
 * is already standing there rather than arriving in front of it.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Slot on={scene.room.on} at={{ x: 50, y: 50 }} z={0} feel={feel}>
        <div style={{ transform: `scale(${scene.room.scale})`, transition: 'transform .9s cubic-bezier(.2,.7,.2,1)' }}>
          <Room bounded={scene.room.bounded} more={scene.room.more} />
        </div>
      </Slot>

      <Slot on={scene.hospital.on} at={scene.hospital.at} scale={scene.hospital.scale} z={1} feel={feel}>
        <div style={{ opacity: scene.hospital.recede ? 0.24 : 1, transition: 'opacity .6s' }}>
          <Hospital
            sign=""
            plaque=""
            staffed
            lit={scene.hospital.lit}
            was={[]}
            focus
            quiet={false}
            heavy={false}
            bunks={false}
            doorsOpen={false}
          />
        </div>
      </Slot>

      <Slot on={scene.blend.on} at={scene.blend.at} scale={scene.blend.scale} z={3} feel={feel}>
        <ExpertBlend
          stage={scene.blend.stage}
          shared={scene.blend.shared}
          ghost={scene.blend.ghost}
          label={scene.blend.label}
        />
      </Slot>

      <Slot on={scene.row.on} at={scene.row.at} scale={scene.row.scale} z={4} feel={feel}>
        <NumberRow seed={777} shown={10} tone="measure" label={scene.row.label} />
      </Slot>

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
