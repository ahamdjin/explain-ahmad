import { motion } from 'motion/react'
import { type CSSProperties, type ReactNode } from 'react'
import { Expert, SharedExpert } from './cast/Expert'
import { Narrator } from './cast/Narrator'
import { Router } from './cast/Router'
import { Archway, Blocker, ModelInfoCard, RamTray, SmallMachine, WeightShelf, WordCard } from './cast/Objects'
import { ExpertField } from './ExpertField'
import { type SceneState } from './scene'

/**
 * Every actor in Section 01 is mounted here exactly once and stays mounted for
 * the whole section. Beats only change the props it animates toward, so objects
 * move and reconfigure instead of being destroyed and rebuilt.
 *
 * Nothing in this file may be wrapped in AnimatePresence keyed on the beat.
 */

function Slot({
  on,
  at,
  scale = 1,
  z = 1,
  children,
  className = '',
}: {
  on: boolean
  at: { x: number; y: number }
  scale?: number
  z?: number
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`s1-slot ${className}`.trim()}
      style={{ zIndex: z } as CSSProperties}
      // See ExpertField: centring must be animated, not set in CSS, because
      // Motion's inline transform replaces any CSS transform.
      animate={{ left: `${at.x}%`, top: `${at.y}%`, x: '-50%', y: '-50%', scale, opacity: on ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 78, damping: 20 }}
      aria-hidden={!on}
      // Keeps hidden actors from swallowing clicks meant for the stage.
      inert={!on || undefined}
    >
      {children}
    </motion.div>
  )
}

export function Stage({ scene, selected }: { scene: SceneState; selected: readonly number[] }) {
  return (
    <>
      <ExpertField
        on={scene.grid.on}
        at={scene.grid.at}
        scale={scene.grid.scale}
        slice={scene.grid.slice}
        reacting={scene.grid.reacting}
        asExperts={scene.grid.asExperts}
        dim={scene.grid.dim}
        selected={selected}
      />

      <Slot on={scene.card.on} at={scene.card.at} scale={scene.card.scale} z={3}>
        <ModelInfoCard highlight={scene.card.highlight} />
      </Slot>

      <Slot on={scene.word.on} at={scene.word.at} scale={scene.word.scale} z={4}>
        <WordCard />
      </Slot>

      <Slot on={scene.router.on} at={scene.router.at} scale={scene.router.scale} z={3}>
        <Router gesturing={scene.router.gesturing} />
      </Slot>

      <Slot on={scene.team.on} at={scene.team.at} z={3}>
        <TeamGroup size={scene.team.size} label={scene.team.label} sub={scene.team.sub} />
      </Slot>

      <Slot on={scene.picked.on} at={scene.picked.at} z={3}>
        <PickedGroup />
      </Slot>

      <Slot on={scene.ram.on} at={scene.ram.at} z={3}>
        <RamTray count={scene.ram.count} note={scene.ram.note} />
      </Slot>

      <Slot on={scene.shelf.on} at={scene.shelf.at} scale={scene.shelf.scale} z={2}>
        <WeightShelf
          title={scene.shelf.title}
          size={scene.shelf.size}
          shelves={scene.shelf.shelves}
          dimmed={scene.shelf.dim}
        />
      </Slot>

      <Slot on={scene.blocker.on} at={scene.blocker.at} z={4}>
        <Blocker scale={0.86} />
      </Slot>

      <Slot on={scene.machine.on} at={scene.machine.at} z={3}>
        <SmallMachine scale={0.86} />
      </Slot>

      <Slot on={scene.arch.on} at={scene.arch.at} z={2}>
        <Archway />
      </Slot>

      <Slot on={scene.sheet.on} at={scene.sheet.at} z={3}>
        <ArchitectureSheet pushed={scene.sheet.pushed} />
      </Slot>

      <Slot on={scene.narrator.on} at={scene.narrator.at} z={5}>
        <Narrator pose={scene.narrator.pose} flip={scene.narrator.flip} scale={scene.narrator.scale} />
      </Slot>
    </>
  )
}

function TeamGroup({ size, label, sub }: { size: number; label: string; sub: string }) {
  return (
    <div className="s1-team-group">
      <div className="s1-team-grid" style={{ '--team-cols': size > 40 ? 5 : 5 } as CSSProperties}>
        {Array.from({ length: 8 }, (_, index) => (
          <Expert key={index} index={index} size={size} mood="happy" />
        ))}
        <SharedExpert size={size} label="shared (always on)" />
      </div>
      {label ? (
        <span className="s1-team-caption">
          {label}
          {sub ? <em>{sub}</em> : null}
        </span>
      ) : null}
    </div>
  )
}

function PickedGroup() {
  return (
    <div className="s1-picked">
      <span className="s1-picked-title">Selected experts</span>
      <div className="s1-picked-row">
        {[0, 1, 2, 3].map((index) => (
          <Expert key={index} index={index} size={42} mood="happy" />
        ))}
      </div>
    </div>
  )
}

function ArchitectureSheet({ pushed }: { pushed: boolean }) {
  return (
    <motion.div
      className="s1-arch-sheet"
      animate={{ rotate: pushed ? -4.5 : -1.5, x: pushed ? -60 : 0, opacity: pushed ? 0.85 : 1 }}
      transition={{ type: 'spring', stiffness: 90, damping: 20 }}
    >
      <h3>Full model architecture</h3>
      <div className="s1-arch-body">
        <ul>
          <li>Layers</li>
          <li>Attention</li>
          <li>MoE routing</li>
          <li>Experts</li>
          <li>KV cache</li>
          <li>Training</li>
          <li>&hellip;</li>
        </ul>
        <div className="s1-arch-diagram" aria-hidden="true">
          {Array.from({ length: 24 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
      </div>
      <span className="s1-arch-more">(and much more&hellip;)</span>
    </motion.div>
  )
}
