import { CostBars, Hospital, ModelSheet, Narrator, Slot, VerdictCard } from '../../../../paper'
import { CHOSEN } from '../section-01/scene'
import { type Feel } from '../../../../paper/motion'
import { type SceneState } from './scene'

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      <Slot on={scene.building.on} at={scene.building.at} scale={scene.building.scale} z={1} feel={feel}>
        <Hospital
          sign="Mixture of Experts"
          plaque="320B total"
          staffed
          lit={CHOSEN}
          was={[]}
          focus
          quiet={false}
          heavy={scene.building.heavy}
          bunks={false}
          doorsOpen={false}
        />
      </Slot>

      {/* Pixel-identical to section 1's, or the callback does not land. */}
      <Slot on={scene.sheet.on} at={scene.sheet.at} scale={scene.sheet.scale} z={3} feel={feel}>
        <ModelSheet lit={scene.sheet.lit} />
      </Slot>

      <Slot on={scene.bars.on} at={scene.bars.at} scale={scene.bars.scale} z={3} feel={feel}>
        <CostBars show={scene.bars.show} ratio={scene.bars.ratio} />
      </Slot>

      <Slot on={scene.verdict.on} at={scene.verdict.at} scale={scene.verdict.scale} z={4} feel={feel}>
        <VerdictCard lines={scene.verdict.lines} />
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={5} feel={feel}>
        <Narrator pose={scene.narrator.pose} flip={scene.narrator.flip} scale={scene.narrator.scale} />
      </Slot>
    </>
  )
}
