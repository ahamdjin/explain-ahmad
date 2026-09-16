import { Camera, ChosenTeam, Ground, NumberRow, Room, Slot, Tower } from '../../../../paper'
import { Counter } from '../../../../paper/cast/Memory'
import { Narrator } from '../../../../paper/cast/Narrator'
import { type Feel } from '../../../../paper/motion'
import { type SceneState } from './scene'

/**
 * The room is mounted at the same z as the tower and shrinks into it, so beat
 * 2 is one object becoming small inside another rather than a cut between two
 * scenes. If those were swapped, the pull-back would read as a slide change and
 * the section would lose the only moment it exists for.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        <Slot on={scene.tower.on} at={scene.tower.at} scale={scene.tower.scale} z={1} feel={feel}>
          <Tower
            floor={scene.tower.floor}
            markers={scene.tower.markers}
            flash={scene.tower.flash}
            teams={scene.tower.teams}
            trace={scene.tower.trace}
          />
        </Slot>

        <Slot on={scene.room.on} at={scene.room.at} scale={scene.room.scale} z={2} feel={feel}>
          <Room bounded={scene.room.bounded} />
        </Slot>

        {/* Two floors, two rows. Different seeds, because they are different
            rows -- that is the fact the beat is making. */}
        <Slot on={scene.rowA.on} at={scene.rowA.at} scale={scene.rowA.scale} z={4} feel={feel}>
          <NumberRow seed={777} shown={8} tone="measure" label={scene.rowA.label} />
        </Slot>
        <Slot on={scene.rowB.on} at={scene.rowB.at} scale={scene.rowB.scale} z={4} feel={feel}>
          <NumberRow seed={1301} shown={8} tone="measure" label={scene.rowB.label} />
        </Slot>

        {/* Floor one's eight and floor two's eight, in the frame together.
            The overlap between the two sets is the only evidence that a fresh
            decision does not mean a forced new team. */}
        <Slot on={scene.teamA.on} at={scene.teamA.at} scale={scene.teamA.scale} z={4} feel={feel}>
          <ChosenTeam lit={scene.teamA.lit} boxed={scene.teamA.boxed} />
        </Slot>
        <Slot on={scene.teamB.on} at={scene.teamB.at} scale={scene.teamB.scale} z={4} feel={feel}>
          <ChosenTeam lit={scene.teamB.lit} boxed={scene.teamB.boxed} />
        </Slot>

        {/* 42 on one side, 336 on the other. Beat 11 is a correction, and a
            correction needs both figures visible at once. */}
        <Slot on={scene.count.on} at={scene.count.at} scale={scene.count.scale} z={5} feel={feel}>
          <Counter value={scene.count.value} label={scene.count.label} run={scene.count.run} seconds={2.2} />
        </Slot>
        <Slot on={scene.visits.on} at={scene.visits.at} scale={scene.visits.scale} z={5} feel={feel}>
          <Counter value={scene.visits.value} label={scene.visits.label} run={scene.visits.run} seconds={2.6} />
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
