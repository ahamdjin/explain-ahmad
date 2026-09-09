import { Aside, FrontDesk, Narrator, NumberRow, Slot, WordCard } from '../../../paper'
import { type Feel } from '../../../paper/motion'
import { type SceneState } from './scene'

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      <Slot on={scene.desk.on} at={scene.desk.at} scale={scene.desk.scale} z={1} feel={feel}>
        <FrontDesk named ringed={false} />
      </Slot>

      <Slot on={scene.word.on} at={scene.word.at} scale={scene.word.scale} z={4} feel={feel}>
        <WordCard label={scene.word.label} />
      </Slot>

      <Slot on={scene.row.on} at={scene.row.at} scale={scene.row.scale} z={3} feel={feel}>
        <NumberRow seed={11} shown={scene.row.shown} extend={scene.row.extend} label={scene.row.label} tone="measure" />
      </Slot>

      <Slot on={scene.rowB.on} at={scene.rowB.at} scale={scene.rowB.scale} z={3} feel={feel}>
        <NumberRow seed={11} shown={scene.rowB.shown} label={scene.rowB.label} tone="measure" />
      </Slot>

      <Slot on={scene.aside.on} at={scene.aside.at} z={6} feel={feel}>
        <Aside chip="what is a word, exactly?" title="Words, pieces and ids">
          <p>
            The model does not work in whole words. Text is first cut into <b>tokens</b> — sometimes a
            whole word, sometimes a fragment, sometimes punctuation.
          </p>
          <p>
            Each token has a number, an id, which is just its address in a fixed vocabulary of 154,880
            entries. The id carries no meaning at all; it is the row of numbers that does.
          </p>
          <p>None of this changes the answer we are chasing, which is why it lives in here.</p>
        </Aside>
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={5} feel={feel}>
        <Narrator pose={scene.narrator.pose} flip={scene.narrator.flip} scale={scene.narrator.scale} />
      </Slot>
    </>
  )
}
