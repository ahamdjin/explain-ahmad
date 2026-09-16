import { BigNumber, Camera, Clock, CostBars, ExpertCache, Ground, INK, PALETTE, Slot, Tower } from '../../../../paper'
import { FetchPath, Store, Counter } from '../../../../paper/cast/Memory'
import { Narrator } from '../../../../paper/cast/Narrator'
import { FrontDesk, SmallMachine } from '../../../../paper/cast/Props'
import { type Feel } from '../../../../paper/motion'
import { type SceneState } from './scene'

/**
 * The plan is assembled from the same pieces §1 used, in the same order:
 * drive, router, path, machine. It has to be recognisably the same object or
 * the callback at beat 2 does no work.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  return (
    <>
      {scene.ground.on ? <Ground y={scene.ground.y} /> : null}

      <Camera at={scene.camera} feel={feel}>
        <Slot on={scene.tower.on} at={scene.tower.at} scale={scene.tower.scale} z={1} feel={feel}>
          <Tower floor={scene.tower.floor} teams={scene.tower.teams} flash={scene.tower.flash} />
        </Slot>

        <Slot on={scene.box.on} at={scene.box.at} scale={scene.box.scale} z={4} feel={feel}>
          <PermanentBox label={scene.box.label} leaking={scene.box.leaking} />
        </Slot>

        <Slot on={scene.numbers.on} at={scene.numbers.at} scale={scene.numbers.scale} z={4} feel={feel}>
          <BigNumber value={scene.numbers.value} caption={scene.numbers.caption} />
        </Slot>

        <Slot on={scene.store.on} at={scene.store.at} scale={scene.store.scale} z={2} feel={feel}>
          <Store label={scene.store.label} />
        </Slot>

        <Slot on={scene.desk.on} at={scene.desk.at} scale={scene.desk.scale} z={3} feel={feel}>
          <FrontDesk named={scene.desk.named} ringed={false} />
        </Slot>

        <Slot on={scene.path.on} at={scene.path.at} scale={scene.path.scale} z={3} feel={feel}>
          <FetchPath items={scene.path.items} jammed={scene.path.jammed} />
        </Slot>

        <Slot on={scene.machine.on} at={scene.machine.at} scale={scene.machine.scale} z={2} feel={feel}>
          <SmallMachine filled={scene.machine.filled} />
        </Slot>

        <Slot on={scene.count.on} at={scene.count.at} scale={scene.count.scale} z={5} feel={feel}>
          <Counter value={scene.count.value} label={scene.count.label} run={scene.count.run} seconds={1.6} />
        </Slot>

        <Slot on={scene.total.on} at={scene.total.at} scale={scene.total.scale} z={5} feel={feel}>
          <BigNumber value={scene.total.value} caption={scene.total.caption} tone="cost" />
        </Slot>

        <Slot on={scene.clock.on} at={scene.clock.at} scale={scene.clock.scale} z={5} feel={feel}>
          <Clock seconds={scene.clock.seconds} running={scene.clock.running} label={scene.clock.label} />
        </Slot>

        <Slot on={scene.bars.on} at={scene.bars.at} scale={scene.bars.scale} z={5} feel={feel}>
          <CostBars show={scene.bars.show} ratio={scene.bars.ratio} inset={scene.bars.inset} />
        </Slot>

        {/*
          Beats 14-15. Drawn, and deliberately empty -- `filled` and `hits` stay
          at zero. The viewer's own idea, given a shape and endorsed, so that
          §12 has a belief of its own making to take apart.
        */}
        <Slot on={scene.shelf.on} at={scene.shelf.at} scale={scene.shelf.scale} z={5} feel={feel}>
          <div style={{ opacity: scene.shelf.outline ? 0.5 : 1, transition: 'opacity .7s' }}>
            <ExpertCache kept={0.35} filled={0} hits={0} label="keep some close" />
          </div>
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

/**
 * The container that cannot be filled. Beat 4.
 *
 * Dashed, because it is a proposal rather than a thing that exists, and open
 * at the top-right corner once `leaking` — the next layer's selection landing
 * outside a boundary drawn before it chose. The box has to be seen failing;
 * a narrator saying "there is no such list" over a tidy box teaches nothing.
 *
 * Section-local on purpose: no other section proposes this object.
 */
function PermanentBox({ label, leaking }: { label: string; leaking: boolean }) {
  const inside = [0, 1, 2, 3, 4, 5]
  const outside = [0, 1, 2]

  return (
    <div style={{ width: '26cqw' }}>
      <svg viewBox="0 0 360 260" aria-hidden="true">
        <path
          d="M30 60h240v150H30z"
          fill={PALETTE.paperLight}
          stroke={INK}
          strokeWidth="3"
          strokeDasharray="12 9"
          strokeLinejoin="round"
        />
        <text x="150" y="44" textAnchor="middle" fill={INK} className="s1-tower-tag">
          {label}
        </text>

        {inside.map((i) => (
          <rect
            key={i}
            x={52 + (i % 3) * 68}
            y={84 + Math.floor(i / 3) * 62}
            width="52"
            height="44"
            rx="4"
            fill={PALETTE.orange}
            stroke={INK}
            strokeWidth="2"
          />
        ))}

        {/* the next layer, selecting outside a boundary drawn before it chose */}
        {leaking
          ? outside.map((i) => (
              <rect
                key={`out-${i}`}
                x={288}
                y={70 + i * 62}
                width="52"
                height="44"
                rx="4"
                fill={PALETTE.orange}
                stroke={INK}
                strokeWidth="2"
                opacity="0.92"
                style={{ transition: 'opacity .5s' }}
              />
            ))
          : null}
      </svg>
    </div>
  )
}
