import { ModelSheet, Plan, ShareBar } from '../../../paper/cast/Boards'
import { ChosenTeam, Hospital } from '../../../paper/cast/Hospital'
import { Narrator } from '../../../paper/cast/Narrator'
import { ArchSheet, FrontDesk, SmallMachine, WordCard } from '../../../paper/cast/Props'
import { WordLoop } from '../../../paper/cast/WordLoop'
import { Slot } from '../../../paper'
import { type Feel } from '../../../paper/motion'
import { type SceneState } from './scene'

/**
 * Every actor in Section 01 is mounted here exactly once and stays mounted for
 * the whole section. Beats only change the props it animates toward, so objects
 * move and reconfigure instead of being destroyed and rebuilt.
 *
 * Nothing in this file may be wrapped in AnimatePresence keyed on the beat.
 * That was the original mistake: it made every beat a slide replacement, and no
 * amount of easing work can make a slideshow feel like one continuous world.
 */

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? (
        <div className="s1-ground" style={{ top: `${scene.ground.y}%` }} aria-hidden="true" />
      ) : null}

      <Slot on={scene.loop.on} at={scene.loop.at} scale={scene.loop.scale} z={2} feel={feel}>
        <WordLoop showOut={scene.loop.showOut} inWord={scene.loop.inWord} outWord={scene.loop.outWord} />
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
        />
      </Slot>

      <Slot on={scene.bar.on} at={scene.bar.at} scale={scene.bar.scale} z={2} feel={feel}>
        <ShareBar mode={scene.bar.mode} lit={scene.bar.lit} caption={scene.bar.caption} dark={scene.bar.dark} />
      </Slot>

      <Slot on={scene.sheet.on} at={scene.sheet.at} scale={scene.sheet.scale} z={3} feel={feel}>
        <ModelSheet lit={scene.sheet.lit} />
      </Slot>

      <Slot on={scene.team.on} at={scene.team.at} scale={scene.team.scale} z={4} feel={feel}>
        <ChosenTeam lit={scene.hospital.lit} boxed={scene.team.boxed} />
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

      <Slot on={scene.plan.on} at={scene.plan.at} scale={scene.plan.scale} z={3} feel={feel}>
        <Plan />
      </Slot>

      <Slot on={scene.machine.on} at={scene.machine.at} scale={scene.machine.scale} z={4} feel={feel}>
        <SmallMachine filled={scene.machine.filled} />
      </Slot>

      <Slot on={scene.archSheet.on} at={scene.archSheet.at} scale={scene.archSheet.scale} z={6} feel={feel}>
        <ArchSheet pushed={scene.archSheet.pushed} />
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={7} feel={feel}>
        <Narrator pose={scene.narrator.pose} flip={scene.narrator.flip} scale={scene.narrator.scale} />
      </Slot>
    </>
  )
}
