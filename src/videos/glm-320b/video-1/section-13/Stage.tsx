import { BigNumber, Block, Camera, Ground, ModelCard, Slot } from '../../../../paper'
import { ShareBar } from '../../../../paper/cast/Boards'
import { VerdictCard } from '../../../../paper/cast/Aside'
import { Narrator } from '../../../../paper/cast/Narrator'
import { type Feel } from '../../../../paper/motion'
import { OTHER_MODEL, THIS_MODEL, type SceneState } from './scene'

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        {/* §1's block, returning whole. Same component, same grain. */}
        <Slot on={scene.block.on} at={scene.block.at} scale={scene.block.scale} z={1} feel={feel}>
          <Block heavy={scene.block.heavy} grain={scene.block.grain} lit={scene.block.lit} />
        </Slot>

        <Slot on={scene.share.on} at={scene.share.at} scale={scene.share.scale} z={3} feel={feel}>
          <ShareBar mode={scene.share.mode} lit={scene.share.lit} caption={scene.share.caption} dark={false} />
        </Slot>

        <Slot on={scene.cardA.on} at={scene.cardA.at} scale={scene.cardA.scale} z={3} feel={feel}>
          <ModelCard
            name="gpt-oss-120b"
            total={OTHER_MODEL.total}
            active={OTHER_MODEL.active}
            experts={OTHER_MODEL.experts}
            chips={scene.cardA.chips}
            grain={scene.cardA.grain}
            litShare={scene.cardA.litShare}
            note={scene.cardA.note}
          />
        </Slot>

        <Slot on={scene.cardB.on} at={scene.cardB.at} scale={scene.cardB.scale} z={3} feel={feel}>
          <ModelCard
            name="this model"
            total={THIS_MODEL.total}
            active={THIS_MODEL.active}
            experts={THIS_MODEL.experts}
            chips={scene.cardB.chips}
            grain={scene.cardB.grain}
            litShare={scene.cardB.litShare}
            note={scene.cardB.note}
          />
        </Slot>

        <Slot on={scene.big.on} at={scene.big.at} scale={scene.big.scale} z={4} feel={feel}>
          <BigNumber value={scene.big.value} caption={scene.big.caption} />
        </Slot>

        <Slot on={scene.verdict.on} at={scene.verdict.at} scale={scene.verdict.scale} z={5} feel={feel}>
          <VerdictCard lines={scene.verdict.lines} />
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
