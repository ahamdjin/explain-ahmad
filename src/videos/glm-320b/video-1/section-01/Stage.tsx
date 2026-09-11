import { BigNumber, Block, Chat, Counter, Slot, Tower } from '../../../../paper'
import { Hospital } from '../../../../paper/cast/Hospital'
import { Narrator } from '../../../../paper/cast/Narrator'
import { FrontDesk, Rig, WordCard } from '../../../../paper/cast/Props'
import { type Feel } from '../../../../paper/motion'
import { type SceneState } from './scene'

/**
 * Every actor is mounted here exactly once and stays mounted for the whole
 * section. Beats only change the props it animates toward, so objects move and
 * reconfigure instead of being destroyed and rebuilt.
 *
 * Nothing in this file may be wrapped in AnimatePresence keyed on the beat.
 * That was the original mistake in this repo: it made every beat a slide
 * replacement, and no amount of easing work makes a slideshow feel like one
 * continuous world.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? (
        <div className="s1-ground" style={{ top: `${scene.ground.y}%` }} aria-hidden="true" />
      ) : null}

      {/*
        Beats 1-6. The screen everybody recognises, and what is behind it.
        `paper/cast/Chat.tsx` says why the section starts here.
      */}
      <Slot on={scene.chat.on} at={scene.chat.at} scale={scene.chat.scale} z={3} feel={feel}>
        <Chat
          ask={scene.chat.ask}
          said={scene.chat.said}
          typing={scene.chat.typing}
          turned={scene.chat.turned}
          model={scene.chat.model}
        />
      </Slot>

      <Slot on={scene.tower.on} at={scene.tower.at} scale={scene.tower.scale} z={1} feel={feel}>
        <Tower tags={false} floor={scene.tower.floor} markers={scene.tower.markers} />
      </Slot>

      <Slot on={scene.count.on} at={scene.count.at} scale={scene.count.scale} z={2} feel={feel}>
        <Counter value={scene.count.value} label={scene.count.label} run={scene.count.run} />
      </Slot>

      <Slot on={scene.block.on} at={scene.block.at} scale={scene.block.scale} z={1} feel={feel}>
        <Block
          scatter={scene.block.scatter}
          lit={scene.block.lit}
          ghost={scene.block.ghost}
          lifted={scene.block.lifted}
          heavy={scene.block.heavy}
          grain={scene.block.grain}
        />
      </Slot>

      <Slot on={scene.block2.on} at={scene.block2.at} scale={scene.block2.scale} z={1} feel={feel}>
        <Block scatter={scene.block2.scatter} lit={scene.block2.lit} heavy={scene.block2.heavy} grain={scene.block2.grain} />
      </Slot>

      <Slot on={scene.rigA.on} at={scene.rigA.at} scale={scene.rigA.scale} z={2} feel={feel}>
        <Rig count={scene.rigA.count} />
      </Slot>
      <Slot on={scene.rigB.on} at={scene.rigB.at} scale={scene.rigB.scale} z={2} feel={feel}>
        <Rig count={scene.rigB.count} />
      </Slot>

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
          idle={scene.hospital.idle}
        />
      </Slot>

      <Slot on={scene.big.on} at={scene.big.at} scale={scene.big.scale} z={4} feel={feel}>
        <BigNumber value={scene.big.value} caption={scene.big.caption} />
      </Slot>

      <Slot on={scene.desk.on} at={scene.desk.at} scale={scene.desk.scale} z={4} feel={feel}>
        <FrontDesk named={scene.desk.named} ringed={scene.desk.ringed} />
      </Slot>

      <Slot on={scene.word.on} at={scene.word.at} scale={scene.word.scale} z={5} feel={feel}>
        <WordCard label={scene.word.label} />
      </Slot>
      <Slot on={scene.word2.on} at={scene.word2.at} scale={scene.word2.scale} z={5} feel={feel}>
        <WordCard label={scene.word2.label} />
      </Slot>
      <Slot on={scene.word3.on} at={scene.word3.at} scale={scene.word3.scale} z={5} feel={feel}>
        <WordCard label={scene.word3.label} />
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
