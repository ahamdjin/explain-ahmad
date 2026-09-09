import { Choice, FrontDesk, Hospital, Narrator, NumberRow, Slot, Specialist } from '../../../paper'
import { type Feel } from '../../../paper/motion'
import { TEAMS, type Route, type SceneState } from './scene'

export function Stage({
  scene,
  feel,
  route,
  onPick,
  picked,
}: {
  scene: SceneState
  feel: Feel
  route: Route
  onPick: (next: Route) => void
  picked: boolean
}) {
  /* Once the viewer is driving, the wall answers to the control, not the beat. */
  const lit = scene.choice.on ? TEAMS[route] : scene.wall.lit
  const was = scene.choice.on ? TEAMS[route === 'barked' ? 'hot' : 'barked'] : scene.wall.was

  return (
    <>
      <Slot on={scene.wall.on} at={scene.wall.at} scale={scene.wall.scale} z={1} feel={feel}>
        <Hospital
          sign="Mixture of Experts"
          plaque=""
          staffed
          lit={lit}
          was={scene.choice.on ? was : scene.wall.was}
          focus={scene.wall.focus}
          quiet={false}
          heavy={false}
          bunks={false}
          doorsOpen={false}
          scoring={scene.wall.scoring}
        />
      </Slot>

      <Slot on={scene.desk.on} at={scene.desk.at} scale={scene.desk.scale} z={3} feel={feel}>
        <FrontDesk named ringed={false} />
      </Slot>

      <Slot on={scene.row.on} at={scene.row.at} scale={scene.row.scale} z={3} feel={feel}>
        <NumberRow seed={scene.row.seed} shown={7} label={scene.row.label} tone="blue" />
      </Slot>

      <Slot on={scene.shared.on} at={scene.shared.at} scale={scene.shared.scale} z={3} feel={feel}>
        <div className="s5-shared">
          <Specialist index={0} size={62} lit />
          <span>always on</span>
        </div>
      </Slot>

      <Slot on={scene.choice.on} at={scene.choice.at} z={6} feel={feel}>
        <Choice
          options={['barked', 'hot'] as const}
          value={route}
          onPick={onPick}
          hint={picked ? 'same 288. different eight.' : 'pick one'}
        />
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={5} feel={feel}>
        <Narrator pose={scene.narrator.pose} flip={scene.narrator.flip} scale={scene.narrator.scale} />
      </Slot>
    </>
  )
}
