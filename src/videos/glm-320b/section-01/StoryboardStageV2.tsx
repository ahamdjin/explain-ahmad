import { motion } from 'motion/react'
import { type CSSProperties } from 'react'

export type Section01Frame = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14

type StageProps = {
  frame: Section01Frame
}

const expertIds = [12, 47, 89, 103, 162, 211, 278, 305, 317]
const scaredTeam = [12, 47, 89, 103, 211]
const calculateTeam = [3, 68, 140, 205, 317]

export function StoryboardStageV2({ frame }: StageProps) {
  return (
    <div className="s1v2-stage" data-frame={frame}>
      <ModelLibraryScene frame={frame} />
      <ExpertScene frame={frame} />
      <MemoryScene frame={frame} />
      <InsideScene frame={frame} />
      <FrameCounter frame={frame} />
    </div>
  )
}

function Scene({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <motion.section
      className="s1v2-scene"
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.985 }}
      transition={{ duration: active ? 0.42 : 0.24, ease: 'easeOut' }}
      aria-hidden={!active}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
    >
      {children}
    </motion.section>
  )
}

function ModelLibraryScene({ frame }: StageProps) {
  const active = frame >= 1 && frame <= 4
  return (
    <Scene active={active}>
      <PaperSky />
      <motion.div
        className="s1v2-model-card-wrap"
        animate={{ opacity: frame === 1 ? 1 : 0, y: frame === 1 ? 0 : -24, scale: frame === 1 ? 1 : 0.9 }}
        transition={softSpring}
      >
        <ModelInfoCard />
      </motion.div>

      <motion.div
        className="s1v2-library-facade-wrap"
        animate={{
          opacity: frame === 2 || frame === 4 ? 1 : 0,
          scale: frame === 2 ? 1 : frame === 4 ? 0.84 : 0.9,
          x: frame === 4 ? 100 : 0,
          y: frame === 4 ? 18 : 0,
        }}
        transition={softSpring}
      >
        <LibraryFacade active={frame === 4} />
      </motion.div>

      <motion.div
        className="s1v2-library-corridor-wrap"
        animate={{ opacity: frame === 3 ? 1 : 0, scale: frame === 3 ? 1 : 1.05 }}
        transition={softSpring}
      >
        <LibraryCorridor />
      </motion.div>

      <motion.div
        className="s1v2-word-library"
        animate={{ opacity: frame === 4 ? 1 : 0, x: frame === 4 ? 0 : -50, rotate: -4 }}
        transition={{ ...softSpring, delay: frame === 4 ? 0.15 : 0 }}
      >
        <WordCard word="scared" />
      </motion.div>

      <Narrator
        pose={frame === 1 ? 'point' : frame === 3 ? 'wonder' : frame === 4 ? 'point' : 'wonder'}
        style={
          frame === 1
            ? { left: '8%', bottom: '7%', width: '10%' }
            : frame === 2
              ? { left: '5%', bottom: '5%', width: '8%' }
              : frame === 3
                ? { left: '8%', bottom: '4%', width: '8%' }
                : { left: '7%', bottom: '5%', width: '8%' }
        }
      />

      <FrameTitle
        title={
          frame === 1
            ? 'Meet GLM-5.3-Flash'
            : frame === 2
              ? '320B parameters'
              : frame === 3
                ? 'That is huge'
                : 'Only ~18B are active'
        }
      />

      {frame === 1 ? <HandNote text="This is the model." style={{ left: '3.5%', top: '36%', rotate: '-8deg' }} /> : null}
      {frame === 2 ? <HandNote text="A huge amount of learned capacity." style={{ left: '3.5%', top: '43%', rotate: '-5deg' }} /> : null}
      {frame === 3 ? <HandNote text="The number should feel huge before we explain it." style={{ left: '15%', bottom: '8%', rotate: '-4deg' }} /> : null}
      {frame === 4 ? <HandNote text="Only a small part wakes up for this token." style={{ left: '7%', top: '55%', rotate: '-4deg' }} /> : null}
    </Scene>
  )
}

function ExpertScene({ frame }: StageProps) {
  const active = frame >= 5 && frame <= 8
  return (
    <Scene active={active}>
      <PaperSky />
      <FrameTitle
        title={
          frame === 5
            ? "The rest isn't useless"
            : frame === 6
              ? 'Meet the router'
              : frame === 7
                ? 'One token, a small team'
                : 'Different tokens, different experts'
        }
      />

      <motion.div
        className="s1v2-parameter-bridge"
        animate={{ opacity: frame === 5 ? 1 : 0, y: frame === 5 ? 0 : 20 }}
        transition={softSpring}
      >
        <ParameterGrid />
        <div className="s1v2-bridge-arrow" aria-hidden="true">→</div>
        <div className="s1v2-expert-crowd-panel">
          <span className="s1v2-panel-tag">288 routed experts</span>
          <ExpertCrowd count={26} />
          <span className="s1v2-panel-sub">waiting until needed</span>
        </div>
      </motion.div>

      <motion.div
        className="s1v2-router-layout"
        animate={{ opacity: frame === 6 ? 1 : 0, y: frame === 6 ? 0 : 18 }}
        transition={softSpring}
      >
        <WordCard word="scared" />
        <FlowArrow />
        <Router />
        <RouterFan ids={[12, 47, 89, 103, 211]} />
      </motion.div>

      <motion.div
        className="s1v2-team-layout"
        animate={{ opacity: frame === 7 ? 1 : 0, y: frame === 7 ? 0 : 18 }}
        transition={softSpring}
      >
        <div className="s1v2-team-left">
          <WordCard word="scared" />
          <FlowArrow />
          <Router />
        </div>
        <WorkingTeam ids={expertIds} label="TOP 8 ROUTED + 1 SHARED" />
      </motion.div>

      <motion.div
        className="s1v2-compare-layout"
        animate={{ opacity: frame === 8 ? 1 : 0, y: frame === 8 ? 0 : 18 }}
        transition={softSpring}
      >
        <TeamColumn word="scared" ids={scaredTeam} />
        <div className="s1v2-compare-rule" />
        <TeamColumn word="calculate" ids={calculateTeam} />
      </motion.div>

      <Narrator
        pose={frame === 5 ? 'wonder' : frame === 6 ? 'point' : frame === 7 ? 'wonder' : 'cheer'}
        style={{ left: frame === 8 ? '88%' : '5%', bottom: '4%', width: frame === 8 ? '8%' : '8.5%' }}
      />

      {frame === 5 ? <HandNote text="The capacity is organized into expert networks." style={{ left: '3%', top: '44%', rotate: '-5deg' }} /> : null}
      {frame === 6 ? <HandNote text="ROUTER scores the expert choices." style={{ left: '4%', bottom: '10%', rotate: '-5deg' }} /> : null}
      {frame === 7 ? <HandNote text="Only a small team works in this sparse layer." style={{ left: '6%', bottom: '10%', rotate: '-4deg' }} /> : null}
      {frame === 8 ? <HandNote text="Same model. Different selections." style={{ right: '3%', top: '37%', rotate: '-5deg' }} /> : null}
    </Scene>
  )
}

function MemoryScene({ frame }: StageProps) {
  const active = frame >= 9 && frame <= 13
  return (
    <Scene active={active}>
      <PaperSky />
      <FrameTitle
        title={
          frame === 9
            ? 'A new question'
            : frame === 10
              ? 'The memory problem'
              : frame === 11
                ? 'Keep only what we need?'
                : frame === 12
                  ? 'The router already knows'
                  : 'The idea looks so simple'
        }
      />

      <motion.div className="s1v2-memory-f9" animate={{ opacity: frame === 9 ? 1 : 0 }} transition={softSpring}>
        <div className="s1v2-memory-left">
          <WordCard word="scared" />
          <Router compact />
          <MiniTeam />
        </div>
        <div className="s1v2-memory-divider" />
        <WeightBuilding title="MODEL WEIGHTS" subtitle="Hundreds of GB" />
      </motion.div>

      <motion.div className="s1v2-memory-f10" animate={{ opacity: frame === 10 ? 1 : 0 }} transition={softSpring}>
        <div className="s1v2-f10-token">
          <WordCard word="scared" />
          <MiniTeam />
          <small>8 routed + 1 shared<br />(active in this sparse layer)</small>
        </div>
        <div className="s1v2-f10-arrow">→</div>
        <OfficeRoom label="RAM / VRAM" workers={3} note="the small working set" />
        <div className="s1v2-f10-plus">+</div>
        <WeightBuilding title="FULL WEIGHT POOL" subtitle="still exists" compact />
        <span className="s1v2-hypothesis-badge">THE MEMORY QUESTION</span>
      </motion.div>

      <motion.div className="s1v2-memory-f11" animate={{ opacity: frame === 11 ? 1 : 0 }} transition={softSpring}>
        <div className="s1v2-f11-router">
          <WordCard word="scared" />
          <Router compact />
          <MiniTeam />
        </div>
        <motion.div
          className="s1v2-load-arrow"
          animate={{ scaleX: frame === 11 ? 1 : 0.4, opacity: frame === 11 ? 1 : 0 }}
          transition={{ duration: 0.55 }}
        >
          Load only these →
        </motion.div>
        <OfficeRoom label="RAM / VRAM" workers={3} note="only what we need" />
        <WeightBuilding title="REST OF MODEL" subtitle="still stored" compact />
      </motion.div>

      <motion.div className="s1v2-memory-f12" animate={{ opacity: frame === 12 ? 1 : 0 }} transition={softSpring}>
        <div className="s1v2-f12-left">
          <WordCard word="scared" />
          <Router compact gesture />
        </div>
        <SelectableWeightPool />
        <OfficeRoom label="RAM / VRAM" workers={3} note="selected experts arrive" />
      </motion.div>

      <motion.div className="s1v2-memory-f13" animate={{ opacity: frame === 13 ? 1 : 0 }} transition={softSpring}>
        <HomeStorage />
        <div className="s1v2-f13-arrow">→</div>
        <Router />
        <div className="s1v2-f13-arrow">→</div>
        <OfficeRoom label="SELECTED EXPERTS" workers={3} note="working now" />
        <div className="s1v2-f13-arrow">→</div>
        <WarningGate />
        <SmallMachine />
      </motion.div>

      <Narrator
        pose={frame <= 10 ? 'think' : frame <= 12 ? 'hopeful' : 'think'}
        style={{ left: frame === 12 ? '90%' : '5%', bottom: '3.5%', width: '8%' }}
      />

      {frame === 9 ? <HandNote text="If only a few are working…" style={{ left: '18%', top: '26%', rotate: '-5deg' }} /> : null}
      {frame === 10 ? <HandNote text="Why is the full weight pool still the hard part?" style={{ left: '6%', bottom: '8%', rotate: '-4deg' }} /> : null}
      {frame === 11 ? <HandNote text="What if fast memory held only the selected experts?" style={{ left: '5%', bottom: '8%', rotate: '-4deg' }} /> : null}
      {frame === 12 ? <HandNote text="The router already picked them." style={{ left: '18%', top: '17%', rotate: '-5deg' }} /> : null}
      {frame === 13 ? <HandNote text="So why doesn't this just work?" style={{ left: '5%', bottom: '8%', rotate: '-4deg' }} /> : null}
    </Scene>
  )
}

function InsideScene({ frame }: StageProps) {
  return (
    <Scene active={frame === 14}>
      <PaperSky />
      <FrameTitle title="Go inside" />
      <div className="s1v2-inside-layout">
        <ArchitectureStack />
        <Narrator pose="push" style={{ left: '6%', bottom: '5%', width: '9%' }} />
        <div className="s1v2-inside-question">
          <strong>So why doesn&apos;t this make a 320B model easy to run on a much smaller machine?</strong>
          <span>To answer that, we have to follow the work inside.</span>
        </div>
        <Archway />
        <motion.div
          className="s1v2-inside-word"
          animate={{ x: [0, 18, 48], y: [0, -2, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
        >
          <WordCard word="scared" />
        </motion.div>
      </div>
    </Scene>
  )
}

function FrameTitle({ title }: { title: string }) {
  return <h1 className="s1v2-frame-title">{title}</h1>
}

function FrameCounter({ frame }: { frame: number }) {
  return <div className="s1v2-frame-counter">{String(frame).padStart(2, '0')} / 14</div>
}

function ModelInfoCard() {
  return (
    <div className="s1v2-model-card">
      <i className="s1v2-tape" />
      <h2>GLM-5.3-Flash</h2>
      <dl>
        <Row label="Architecture" value="Mixture of Experts (MoE)" />
        <Row label="Total Parameters" value="320 Billion" emphasis="total" />
        <Row label="Active Parameters" value="18 Billion" emphasis="active" />
        <Row label="Experts" value="288 routed + 1 shared / sparse layer" />
        <Row label="Layers" value="45" />
        <Row label="Purpose" value="Fast sparse inference" />
      </dl>
      <div className="s1v2-card-callout s1v2-card-callout-total">320B<br /><small>total parameters</small></div>
      <div className="s1v2-card-callout s1v2-card-callout-active">18B<br /><small>active path</small></div>
    </div>
  )
}

function Row({ label, value, emphasis }: { label: string; value: string; emphasis?: 'total' | 'active' }) {
  return (
    <div>
      <dt>{label}:</dt>
      <dd>{emphasis ? <mark data-kind={emphasis}>{value}</mark> : value}</dd>
    </div>
  )
}

function LibraryFacade({ active }: { active?: boolean }) {
  return (
    <div className="s1v2-library-facade" data-active={active ? 'true' : undefined}>
      <div className="s1v2-library-roof"><span>320B PARAMETERS</span></div>
      <div className="s1v2-library-columns">
        {Array.from({ length: 8 }, (_, col) => (
          <div className="s1v2-library-column" key={col}>
            {Array.from({ length: 7 }, (_, row) => {
              const awake = active && col >= 2 && col <= 3 && row >= 2 && row <= 5
              return <BookShelf key={row} awake={awake} seed={col * 10 + row} />
            })}
          </div>
        ))}
      </div>
      <div className="s1v2-library-door" />
      {active ? <div className="s1v2-active-brace"><span>~18B ACTIVE</span><small>about 5.6%</small></div> : null}
    </div>
  )
}

function BookShelf({ awake, seed }: { awake?: boolean; seed: number }) {
  return (
    <div className="s1v2-bookshelf" data-awake={awake ? 'true' : undefined}>
      {Array.from({ length: 6 }, (_, index) => (
        <motion.i
          key={index}
          style={{ '--h': `${54 + ((seed + index * 7) % 34)}%` } as CSSProperties}
          animate={awake ? { y: [0, -2, 0], rotate: [0, index % 2 ? 0.8 : -0.8, 0] } : { y: 0, rotate: 0 }}
          transition={awake ? { duration: 1.8 + index * 0.08, repeat: Infinity, ease: 'easeInOut' } : undefined}
        />
      ))}
    </div>
  )
}

function LibraryCorridor() {
  return (
    <div className="s1v2-corridor">
      <div className="s1v2-corridor-center" />
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          className="s1v2-corridor-shelf s1v2-corridor-shelf-left"
          style={{ '--i': index } as CSSProperties}
        >
          <ShelfBooks />
        </div>
      ))}
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          className="s1v2-corridor-shelf s1v2-corridor-shelf-right"
          style={{ '--i': index } as CSSProperties}
        >
          <ShelfBooks />
        </div>
      ))}
      <div className="s1v2-corridor-label">320B …</div>
    </div>
  )
}

function ShelfBooks() {
  return <>{Array.from({ length: 5 }, (_, index) => <i key={index} />)}</>
}

function ParameterGrid() {
  return (
    <div className="s1v2-parameter-grid-wrap">
      <div className="s1v2-grid-label">320B TOTAL PARAMETERS</div>
      <div className="s1v2-parameter-grid">
        {Array.from({ length: 120 }, (_, index) => {
          const row = Math.floor(index / 15)
          const col = index % 15
          const active = row >= 4 && row <= 6 && col >= 1 && col <= 4
          return <i key={index} data-active={active ? 'true' : undefined} />
        })}
      </div>
      <div className="s1v2-grid-active-label">~18B ACTIVE<br /><small>(about 5.6%)</small></div>
    </div>
  )
}

function ExpertCrowd({ count }: { count: number }) {
  return (
    <div className="s1v2-expert-crowd">
      {Array.from({ length: count }, (_, index) => (
        <Expert key={index} id={index + 1} index={index} mood={index % 7 === 0 ? 'working' : 'idle'} />
      ))}
    </div>
  )
}

function RouterFan({ ids }: { ids: number[] }) {
  return (
    <div className="s1v2-router-fan">
      {ids.map((id, index) => (
        <motion.div
          key={id}
          className="s1v2-router-choice"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, ...softSpring }}
        >
          <span className="s1v2-router-dash" />
          <Expert id={id} index={index} />
        </motion.div>
      ))}
      <div className="s1v2-router-ghosts">
        {Array.from({ length: 5 }, (_, i) => <Expert key={i} id={300 + i} index={i} dim />)}
      </div>
    </div>
  )
}

function WorkingTeam({ ids, label }: { ids: number[]; label: string }) {
  return (
    <div className="s1v2-working-team">
      <strong>{label}</strong>
      <div className="s1v2-working-team-grid">
        {ids.slice(0, 8).map((id, index) => <Expert key={id} id={id} index={index} mood="working" />)}
        <Expert id="S" index={8} shared mood="working" />
      </div>
      <small>expert selection is one part of the model&apos;s active path</small>
    </div>
  )
}

function TeamColumn({ word, ids }: { word: string; ids: number[] }) {
  return (
    <div className="s1v2-team-column">
      <WordCard word={word} />
      <div className="s1v2-down-arrow">↓</div>
      <div className="s1v2-team-row">
        {ids.map((id, index) => <Expert key={id} id={id} index={index} mood="working" />)}
      </div>
      <span>Team for “{word}”</span>
    </div>
  )
}

function MiniTeam() {
  return (
    <div className="s1v2-mini-team">
      {expertIds.slice(0, 8).map((id, index) => <Expert key={id} id={id} index={index} mood="working" small />)}
      <Expert id="S" index={8} shared mood="working" small />
      <span>8 routed + 1 shared</span>
    </div>
  )
}

function WeightBuilding({ title, subtitle, compact }: { title: string; subtitle: string; compact?: boolean }) {
  return (
    <div className="s1v2-weight-building" data-compact={compact ? 'true' : undefined}>
      <strong>{title}</strong>
      <div className="s1v2-weight-shelves">
        {Array.from({ length: compact ? 18 : 28 }, (_, index) => (
          <div className="s1v2-weight-cell" key={index}>
            <Expert id={index + 1} index={index} mood="sleep" small />
          </div>
        ))}
      </div>
      <span>{subtitle}</span>
    </div>
  )
}

function OfficeRoom({ label, workers, note }: { label: string; workers: number; note?: string }) {
  return (
    <div className="s1v2-office-room">
      <strong>{label}</strong>
      <div className="s1v2-office-inner">
        {Array.from({ length: workers }, (_, index) => (
          <div className="s1v2-office-desk" key={index}>
            <Expert id={index + 12} index={index} mood="working" small />
            <i className="s1v2-laptop" />
          </div>
        ))}
      </div>
      {note ? <span>{note}</span> : null}
    </div>
  )
}

function SelectableWeightPool() {
  return (
    <div className="s1v2-select-pool">
      <WeightBuilding title="MODEL WEIGHTS" subtitle="full pool" compact />
      <motion.div
        className="s1v2-selection-box"
        animate={{ borderColor: ['rgba(231,154,99,.4)', 'rgba(231,154,99,1)', 'rgba(231,154,99,.4)'] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        selected
      </motion.div>
      <div className="s1v2-selection-arrows">↓↓↓</div>
    </div>
  )
}

function HomeStorage() {
  return (
    <div className="s1v2-home-storage">
      <strong>HOME / STORAGE</strong>
      <div className="s1v2-home-shelves">
        {Array.from({ length: 10 }, (_, index) => (
          <div className="s1v2-home-bed" key={index}>
            <Expert id={index + 1} index={index} mood="sleep" small />
            <span>z</span>
          </div>
        ))}
      </div>
      <small>experts resting</small>
    </div>
  )
}

function WarningGate() {
  return (
    <motion.div
      className="s1v2-warning-gate"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="s1v2-warning-triangle">!</div>
      <div className="s1v2-warning-cross">×</div>
    </motion.div>
  )
}

function SmallMachine() {
  return (
    <div className="s1v2-small-machine">
      <div className="s1v2-small-screen"><i /><i /></div>
      <span>smaller<br />machine?</span>
    </div>
  )
}

function ArchitectureStack() {
  return (
    <div className="s1v2-architecture-stack">
      <i /><i /><i />
      <div className="s1v2-architecture-sheet">
        <h3>Full model architecture</h3>
        <div className="s1v2-arch-map">
          {Array.from({ length: 26 }, (_, index) => <span key={index} data-i={index} />)}
        </div>
        <ul>
          <li>Layers</li>
          <li>Attention</li>
          <li>MoE routing</li>
          <li>Experts</li>
          <li>KV cache</li>
          <li>…</li>
        </ul>
      </div>
    </div>
  )
}

function Archway() {
  return (
    <div className="s1v2-archway">
      <strong>INSIDE THE MODEL</strong>
      <div className="s1v2-arch-glow" />
      <div className="s1v2-steps"><i /><i /><i /></div>
    </div>
  )
}

function Router({ compact, gesture }: { compact?: boolean; gesture?: boolean }) {
  return (
    <motion.div
      className="s1v2-router"
      data-compact={compact ? 'true' : undefined}
      animate={gesture ? { rotate: [0, -1.5, 1.5, 0] } : undefined}
      transition={gesture ? { duration: 1.2, repeat: Infinity, repeatDelay: 1.2 } : undefined}
    >
      <div className="s1v2-router-antenna"><i /></div>
      <div className="s1v2-router-face"><i /><i /><span /></div>
      <div className="s1v2-router-body">ROUTER</div>
      <i className="s1v2-router-arm s1v2-router-arm-left" />
      <i className="s1v2-router-arm s1v2-router-arm-right" />
    </motion.div>
  )
}

function Expert({
  id,
  index,
  mood = 'idle',
  shared,
  dim,
  small,
}: {
  id: number | string
  index: number
  mood?: 'idle' | 'working' | 'sleep'
  shared?: boolean
  dim?: boolean
  small?: boolean
}) {
  const palette = ['#8fb7dd', '#ee9f94', '#94c8a6', '#edc96b', '#aa96d0', '#e9af7d', '#74aaa6', '#ef9faa']
  return (
    <motion.div
      className="s1v2-expert"
      data-mood={mood}
      data-shared={shared ? 'true' : undefined}
      data-dim={dim ? 'true' : undefined}
      data-small={small ? 'true' : undefined}
      style={{ '--expert-color': shared ? '#ddd8cd' : palette[index % palette.length] } as CSSProperties}
      animate={mood === 'working' ? { y: [0, -2.5, 0], rotate: [0, index % 2 ? 0.7 : -0.7, 0] } : { y: 0 }}
      transition={mood === 'working' ? { duration: 1.4 + (index % 3) * 0.18, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <span className="s1v2-expert-badge">{id}</span>
      <div className="s1v2-expert-body">
        <i className="s1v2-expert-eye" /><i className="s1v2-expert-eye" />
        <span className="s1v2-expert-mouth" />
      </div>
      <i className="s1v2-expert-foot" /><i className="s1v2-expert-foot" />
      {mood === 'sleep' ? <em className="s1v2-zzz">z</em> : null}
    </motion.div>
  )
}

function Narrator({ pose, style }: { pose: 'point' | 'wonder' | 'think' | 'hopeful' | 'cheer' | 'push'; style: CSSProperties }) {
  return (
    <motion.div className="s1v2-narrator" data-pose={pose} style={style} animate={{ y: [0, -1.6, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>
      <svg viewBox="0 0 120 190" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M60 8c26 0 43 17 43 38S86 85 60 85 17 68 17 46 34 8 60 8Z" fill="#fffdf8" />
          <g fill="currentColor" stroke="none"><circle cx="46" cy="43" r="4.3" /><circle cx="74" cy="43" r="4.3" /></g>
          {pose === 'think' ? <path d="M51 62c6-3 12-3 18 0" /> : <path d="M51 61c5 5 13 5 18 0" />}
          <path d="M60 85v58M42 143h36M47 143l-5 39M73 143l5 39" />
          <NarratorArms pose={pose} />
        </g>
        {pose === 'think' ? <g fill="currentColor" opacity=".52"><circle cx="97" cy="59" r="3" /><circle cx="108" cy="47" r="4.3" /><circle cx="116" cy="32" r="5.6" /></g> : null}
      </svg>
    </motion.div>
  )
}

function NarratorArms({ pose }: { pose: string }) {
  if (pose === 'point') return <><path d="M60 103 28 120" /><path d="M60 103 112 88" /></>
  if (pose === 'think') return <><path d="M60 105 31 119" /><path d="M60 106 78 98 75 88" /></>
  if (pose === 'hopeful') return <><path d="M60 104 41 100 49 92" /><path d="M60 104 79 100 71 92" /></>
  if (pose === 'cheer') return <><path d="M60 101 22 78" /><path d="M60 101 98 78" /></>
  if (pose === 'push') return <><path d="M60 101 102 96" /><path d="M102 88v16" /><path d="M60 113 100 108" /><path d="M100 100v16" /></>
  return <><path d="M60 102 28 118" /><path d="M60 102 92 118" /></>
}

function WordCard({ word }: { word: string }) {
  return <div className="s1v2-word-card">“{word}”</div>
}

function FlowArrow() {
  return <div className="s1v2-flow-arrow">→</div>
}

function PaperSky() {
  return <><div className="s1v2-paper-wash" /><div className="s1v2-cloud s1v2-cloud-a" /><div className="s1v2-cloud s1v2-cloud-b" /></>
}

function HandNote({ text, style }: { text: string; style: CSSProperties }) {
  return <motion.p className="s1v2-hand-note" style={style} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.32 }}>{text}</motion.p>
}

const softSpring = { type: 'spring' as const, stiffness: 95, damping: 22, mass: 1 }
