import { CostBars, Counter, FastMemory, FetchPath, Narrator, Slot, Store, WordCard } from '../../../../paper'
import { type Feel } from '../../../../paper/motion'
import { type SceneState } from './scene'

/**
 * Every actor mounted once for the whole section. Beats change the props it
 * animates toward, so objects move and reconfigure instead of being rebuilt.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      <Slot on={scene.store.on} at={scene.store.at} scale={scene.store.scale} z={2} feel={feel}>
        <Store label={scene.store.label} />
      </Slot>

      <Slot on={scene.path.on} at={scene.path.at} scale={scene.path.scale} z={3} feel={feel}>
        <FetchPath items={scene.path.items} jammed={scene.path.jammed} />
      </Slot>

      <Slot on={scene.memory.on} at={scene.memory.at} scale={scene.memory.scale} z={2} feel={feel}>
        <FastMemory count={scene.memory.count} label={scene.memory.label} strained={scene.memory.strained} />
      </Slot>

      <Slot on={scene.floor.on} at={scene.floor.at} scale={scene.floor.scale} z={4} feel={feel}>
        <span className="s7-floor">floor {scene.floor.n} of 42</span>
      </Slot>

      <Slot on={scene.counter.on} at={scene.counter.at} scale={scene.counter.scale} z={4} feel={feel}>
        <Counter value={scene.counter.value} label={scene.counter.label} />
      </Slot>

      <Slot on={scene.bars.on} at={scene.bars.at} scale={scene.bars.scale} z={5} feel={feel}>
        <CostBars show={scene.bars.show} ratio={scene.bars.ratio} />
      </Slot>

      <Slot on={scene.word.on} at={scene.word.at} scale={scene.word.scale} z={5} feel={feel}>
        <WordCard label={scene.word.label} />
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={6} feel={feel}>
        <Narrator pose={scene.narrator.pose} flip={scene.narrator.flip} scale={scene.narrator.scale} />
      </Slot>
    </>
  )
}
