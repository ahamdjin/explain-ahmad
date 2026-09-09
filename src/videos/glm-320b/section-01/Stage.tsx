import { motion } from 'motion/react'
import { type CSSProperties, type ReactNode } from 'react'
import { ModelSheet, Plan, ShareBar } from './cast/Boards'
import { ChosenTeam, Hospital } from './cast/Hospital'
import { Narrator } from './cast/Narrator'
import { ArchSheet, FrontDesk, SmallMachine, WordCard } from './cast/Props'
import { type Feel } from './motion'
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

function Slot({
  on,
  at,
  scale = 1,
  z = 1,
  feel,
  children,
  className = '',
}: {
  on: boolean
  at: { x: number; y: number }
  scale?: number
  z?: number
  feel: Feel
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`s1-slot ${className}`.trim()}
      style={{ zIndex: z } as CSSProperties}
      /*
       * Centring is animated, not set in CSS. Motion writes an inline transform
       * and would silently discard a CSS `translate(-50%, -50%)`, which
       * anchored every actor by its top-left corner and pushed the wide ones
       * off frame.
       */
      animate={{ left: `${at.x}%`, top: `${at.y}%`, x: '-50%', y: '-50%', scale, opacity: on ? 1 : 0 }}
      /*
       * Opacity gets its own fast transition. On the underdamped `and-yet`
       * spring it never actually reached 0, so "hidden" actors stayed faintly
       * on screen as ghosts.
       */
      transition={{ ...feel, opacity: { duration: on ? 0.34 : 0.2, ease: 'easeOut' } }}
      aria-hidden={!on}
      inert={!on || undefined}
    >
      {children}
    </motion.div>
  )
}

export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      <Slot on={scene.hospital.on} at={scene.hospital.at} scale={scene.hospital.scale} z={1} feel={feel}>
        <Hospital
          sign={scene.hospital.sign}
          plaque={scene.hospital.plaque}
          staffed={scene.hospital.staffed}
          lit={scene.hospital.lit}
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
