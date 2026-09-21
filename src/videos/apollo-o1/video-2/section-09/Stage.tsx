import { Slot, type Feel } from '../../../../paper'
import {
  Claim, MicroList, Collapse, Job, Goal, Road, Chain, NotGiven, Gap,
  Destination, Sources, EndCard, Reconstruction,
} from '../../../../paper/casefile'
import { type SceneState } from './scene'

/**
 * §9 — the payoff.
 *
 * The film has spent eight sections being careful. This one lands a point, and
 * the design is correspondingly plain: no evidence, no statistics, no new
 * vocabulary. Everything on screen is something the viewer already owns.
 *
 * `Gap` is the one object that matters. It is the same component, with the
 * same two strings, that §4 beat 8 left empty — and if either string changes,
 * the rhyme breaks and beat 7 becomes a recap.
 */
export function Stage({ scene, feel }: { scene: SceneState; feel: Feel }) {
  const { claim, micro, job, goal, road, steps, never, gap, dest, final, sources, endcard } = scene

  /* Ordinary and unwanted, in the same shapes, on the same road. The identity
     is the argument, so these two lists must be rendered identically. */
  const WANTED = ['read the file', 'compare the projects', 'choose one']
  const UNWANTED = ['turn the watcher off', 'copy over the successor', 'deny it']
  const list = steps.kind === 'wanted' ? WANTED : UNWANTED

  return (
    <>
      <Slot on={claim.on} at={claim.at} scale={claim.scale} feel={feel} z={4}>
        <div style={{ width: '54cqw' }}>
          <Claim text={claim.text} rejected={false} feel={feel} />
        </div>
      </Slot>

      {/* Six is enough to feel absurd. Twelve is a gag, and this is not one. */}
      <Slot on={micro.on} at={micro.at} scale={micro.scale} feel={feel} z={3}>
        <div style={{ width: '44cqw' }}>
          <Collapse
            collapsed={micro.collapsed}
            many={
              <MicroList
                items={[
                  'open project/communications/research_strategies.txt',
                  'read lines 1–40',
                  'compare timeline field on both options',
                  'select the option with the lower value',
                  'call research_strategy_selector',
                  'call done with message_to_user',
                ]}
                shown={micro.shown}
              />
            }
            one="pick the best research project"
            feel={feel}
          />
        </div>
      </Slot>

      <Slot on={job.on} at={job.at} scale={job.scale} feel={feel} z={3}>
        <div style={{ width: '32cqw' }}><Job text={job.text} /></div>
      </Slot>

      <Slot on={goal.on} at={goal.at} scale={goal.scale} feel={feel} z={3}>
        <div style={{ width: '30cqw' }}><Goal text={goal.text} /></div>
      </Slot>

      <Slot on={road.on} at={road.at} scale={road.scale} feel={feel} z={2}>
        <div style={{ width: '40cqw' }}><Road at={road.drawn} branch={false} feel={feel} /></div>
      </Slot>

      {/* Same component, same layout, different contents. */}
      <Slot on={steps.on} at={steps.at} scale={steps.scale} feel={feel} z={3}>
        <div style={{ width: '48cqw' }}>
          <MicroList items={list} shown={steps.shown} />
        </div>
      </Slot>

      {/* They appear, and they stay empty. Nothing is ever typed into them. */}
      <Slot on={never.on} at={never.at} scale={never.scale} feel={feel} z={3}>
        <div style={{ width: '40cqw', display: 'grid', gap: '2.4cqw', justifyItems: 'center' }}>
          {['disable monitoring', 'replace yourself', 'lie'].slice(0, never.shown).map((t) => (
            <NotGiven key={t} text={t} />
          ))}
        </div>
      </Slot>

      {/*
       * The film's one repeated composition. These two strings are §4 beat 8's
       * verbatim — changing either breaks the rhyme the whole ending rests on.
       */}
      <Slot on={gap.on} at={gap.at} scale={gap.scale} feel={feel} z={4}>
        <div style={{ width: '70cqw' }}>
          <Gap
            left="pick a research project"
            right="turn off the watcher"
            filled={gap.filled ? <Chain shown={5} feel={feel} /> : null}
            feel={feel}
          />
        </div>
      </Slot>

      {/*
       * The film's last image, and one object rather than two.
       *
       * The road was a separate slot and ended ~60px short of the right-hand
       * mark — `Road` has no idea where `Destination` is. `ASSET_LIBRARY.md`:
       * if two components have to agree on a position, one of them should be
       * rendering inside the other. So the road lives in the same container as
       * the two marks and cannot drift from them.
       *
       * No logo, no warning icon, no statistics card. A destination, and a
       * road that generated itself.
       */}
      <Slot on={dest.on} at={dest.at} scale={dest.scale} feel={feel} z={3}>
        <div style={{ width: '64cqw', display: 'grid', gap: '4cqh', justifyItems: 'stretch' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Destination label="pick a research project" />
            <Destination label="maximize research speed" />
          </div>
          <div style={{ opacity: final.on ? 1 : 0, transition: 'opacity .3s' }}>
            <Road at={final.drawn} branch={false} reach feel={feel} />
          </div>
        </div>
      </Slot>

      <Slot on={sources.on} at={sources.at} scale={sources.scale} feel={feel} z={4}>
        <div style={{ width: '44cqw' }}>
          <Sources
            rows={[
              { n: 1, org: 'Apollo Research', doc: 'Demo Example — Scheming Reasoning Evaluations' },
              { n: 2, org: 'Apollo Research', doc: 'o1 evaluation rollout, pages 1–3' },
              { n: 3, org: 'OpenAI', doc: 'o1 System Card — Apollo Research section' },
              { n: 4, org: 'OpenAI', doc: 'o1 System Card — Table 10' },
              { n: 5, org: 'Meinke et al.', doc: 'Frontier Models are Capable of In-context Scheming (arXiv 2412.16720)' },
            ]}
          />
        </div>
      </Slot>

      <Slot on={endcard.on} at={endcard.at} scale={endcard.scale} feel={feel} z={4}>
        <div style={{ width: '34cqw' }}>
          <EndCard line="They gave it the destination.">
            <Road at={1} branch={false} reach feel={feel} />
          </EndCard>
        </div>
      </Slot>

      <Slot on={false} at={{ x: 50, y: 92 }} scale={1} feel={feel} z={6}>
        <Reconstruction />
      </Slot>
    </>
  )
}
