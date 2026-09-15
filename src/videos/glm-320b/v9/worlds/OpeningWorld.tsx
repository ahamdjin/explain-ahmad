import { motion } from 'motion/react'
import { type CSSProperties } from 'react'
import { MODEL, SELECTED_EXPERTS } from '../data'

const PARAMETER_MARKS = Array.from({ length: 160 }, (_, index) => index)
const EXPERTS = Array.from({ length: MODEL.routedExperts }, (_, index) => index + 1)

const ROUTES = {
  dog: [...SELECTED_EXPERTS],
  ball: [12, 48, 75, 104, 153, 197, 241, 284],
  it: [7, 35, 82, 119, 166, 203, 250, 279],
} as const

const confusedMarks = new Set([21, 44, 73, 101, 132, 151])

function ModelProfile() {
  const rows = [
    ['Architecture', 'Mixture of Experts'],
    ['Routed experts', `${MODEL.routedExperts}`],
    ['Experts used / word', `${MODEL.expertsPerToken}`],
    ['Shared expert', `${MODEL.sharedExperts}`],
    ['Transformer layers', `${MODEL.layers}`],
    ['Hidden size', `${MODEL.hiddenSize}`],
  ]

  return (
    <motion.div className="opening3-profile-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="opening3-profile-sheet">
        <header>
          <div>
            <small>Z.ai · MODEL PROFILE</small>
            <h1>{MODEL.name}</h1>
            <p>Fast Mixture-of-Experts language model</p>
          </div>
          <div className="opening3-profile-badge">MoE</div>
        </header>

        <div className="opening3-hero-stats">
          <motion.div className="opening3-stat opening3-stat-total" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span>TOTAL PARAMETERS</span>
            <strong>{MODEL.totalParamsB}B</strong>
            <small>parameters in the model</small>
          </motion.div>
          <motion.div className="opening3-stat opening3-stat-active" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 }}>
            <span>ACTIVE PARAMETERS</span>
            <strong>{MODEL.activeParamsB}B</strong>
            <small>used for one token / word</small>
          </motion.div>
        </div>

        <div className="opening3-profile-rows">
          {rows.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>

        <footer>
          <span>320B exists</span>
          <i />
          <span>18B participates at a time</span>
        </footer>
      </div>
    </motion.div>
  )
}

function WordChip({ word = 'dog', className = '' }: { word?: string; className?: string }) {
  return (
    <div className={`opening3-word ${className}`}>
      <small>WORD</small>
      <strong>{word}</strong>
    </div>
  )
}

function ParameterScene({ beat }: { beat: number }) {
  const contrast = beat >= 3
  const react = beat >= 4

  return (
    <motion.div className="opening3-parameter-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="opening3-scene-kicker">MODEL PARAMETERS</div>
      <WordChip word="dog" className="opening3-parameter-word" />

      <div className="opening3-param-summary">
        <div><span>TOTAL</span><strong>{MODEL.totalParamsB}B</strong></div>
        <i />
        <div className="active"><span>ACTIVE FOR THIS WORD</span><strong>~{MODEL.activeParamsB}B</strong></div>
      </div>

      <div className="opening3-param-field">
        {PARAMETER_MARKS.map((mark) => {
          const active = mark < 9
          const confused = react && !active && confusedMarks.has(mark)
          return (
            <motion.div
              key={mark}
              className="opening3-param-cell"
              data-active={active ? 'true' : undefined}
              data-confused={confused ? 'true' : undefined}
              animate={{
                opacity: active ? 1 : contrast ? 0.28 : 0.52,
                scale: active ? 1.04 : confused ? 1.08 : 1,
              }}
            >
              {confused ? <span className="opening3-cell-face"><i /><i /><b>?</b></span> : <i />}
            </motion.div>
          )
        })}
        <motion.div className="opening3-active-bracket" animate={{ opacity: 1, scaleY: 1 }}>
          <span>~5.6%</span>
        </motion.div>
      </div>

      {react ? (
        <motion.div className="opening3-idle-note" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <span>the rest are still part of the model</span>
          <i />
        </motion.div>
      ) : null}
    </motion.div>
  )
}

function ExpertUnit({ selected, shared = false, faded = false, index }: { selected?: boolean; shared?: boolean; faded?: boolean; index?: number }) {
  return (
    <motion.div
      className="opening3-expert-unit"
      data-selected={selected ? 'true' : undefined}
      data-shared={shared ? 'true' : undefined}
      animate={{ opacity: faded ? 0.2 : 1, scale: selected || shared ? 1.12 : 1 }}
      transition={{ duration: 0.18 }}
    >
      <span className="opening3-expert-head"><i /><i /><b /></span>
      <span className="opening3-expert-body"><i /><i /></span>
      {index ? <small>E{index}</small> : null}
    </motion.div>
  )
}

function RouterDesk({ word = 'dog', compact = false }: { word?: string; compact?: boolean }) {
  return (
    <motion.div className="opening3-router" data-compact={compact ? 'true' : undefined}>
      <WordChip word={word} className="opening3-router-word" />
      <div className="opening3-router-person">
        <span><i /><i /><b /></span>
        <strong>ROUTER</strong>
        <small>dispatcher</small>
      </div>
      <div className="opening3-router-desk"><i /><i /><i /></div>
    </motion.div>
  )
}

function RouteReceipt({ word, route }: { word: string; route: readonly number[] }) {
  return (
    <div className="opening3-route-receipt">
      <WordChip word={word} />
      <div className="opening3-receipt-team">
        {route.map((expert) => <i key={expert}><b /></i>)}
        <i className="shared"><b /></i>
      </div>
    </div>
  )
}

function ExpertScene({ beat }: { beat: number }) {
  const selected = beat >= 6
  const compareWords = beat >= 7
  const selectedSet = new Set<number>(ROUTES.dog)

  return (
    <motion.div className="opening3-expert-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="opening3-expert-title">
        <small>MIXTURE OF EXPERTS · MoE</small>
        <strong>{MODEL.routedExperts} routed experts</strong>
        <span>many specialist networks inside one model</span>
      </header>

      {!compareWords ? (
        <>
          <div className="opening3-expert-grid">
            {EXPERTS.map((expert) => (
              <ExpertUnit
                key={expert}
                index={expert % 24 === 0 || selectedSet.has(expert) ? expert : undefined}
                selected={selected && selectedSet.has(expert)}
                faded={selected && !selectedSet.has(expert)}
              />
            ))}
          </div>

          <div className="opening3-shared-expert">
            <span>SHARED EXPERT</span>
            <ExpertUnit shared />
            <small>always joins the team</small>
          </div>

          {selected ? (
            <>
              <RouterDesk word="dog" />
              <div className="opening3-selection-label">
                <b>8</b> routed experts <i /> <b>1</b> shared
              </div>
            </>
          ) : null}
        </>
      ) : (
        <div className="opening3-word-routing-board">
          <div className="opening3-routing-mini-grid" aria-hidden="true">
            {Array.from({ length: 72 }, (_, index) => <i key={index} />)}
          </div>
          <div className="opening3-route-receipts">
            <RouteReceipt word="dog" route={ROUTES.dog} />
            <RouteReceipt word="ball" route={ROUTES.ball} />
            <RouteReceipt word="it" route={ROUTES.it} />
          </div>
          <div className="opening3-routing-caption">
            <span>different word</span><i /> <span>different expert team</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

function ExpertFile({ selected = false, shared = false, label }: { selected?: boolean; shared?: boolean; label?: string }) {
  return (
    <motion.div className="opening3-expert-file" data-selected={selected ? 'true' : undefined} data-shared={shared ? 'true' : undefined}>
      <i className="tab" />
      <span><i /><i /><b /></span>
      {label ? <small>{label}</small> : null}
    </motion.div>
  )
}

function MemoryScene({ beat }: { beat: number }) {
  const moveSelected = beat >= 9
  const separateFiles = beat >= 10
  const routeLoad = beat >= 11
  const smallMachine = beat >= 12
  const hold = beat >= 13

  return (
    <motion.div className="opening3-memory-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="opening3-memory-heading">
        <small>RUNNING THE MODEL</small>
        <strong>where do all those expert weights live?</strong>
      </header>

      <motion.div className="opening3-full-memory" animate={{ opacity: smallMachine ? 0.48 : 1, scale: smallMachine ? 0.9 : 1 }}>
        <div className="opening3-memory-label">
          <span>RUNNING MEMORY</span>
          <strong>RAM / VRAM</strong>
          <small>space holding model weights while they are used</small>
        </div>
        <div className="opening3-memory-bank">
          {Array.from({ length: 72 }, (_, index) => {
            const selected = index < 8
            return <ExpertFile key={index} selected={selected && moveSelected} shared={index === 8 && moveSelected} />
          })}
        </div>
        <div className="opening3-memory-scale"><span>large memory footprint</span><i /></div>
      </motion.div>

      {moveSelected ? (
        <motion.div className="opening3-small-ram" initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: smallMachine ? 0.92 : 1 }}>
          <header><span>RAM / VRAM</span><strong>only what we need now?</strong></header>
          <div className="opening3-small-ram-slots">
            {Array.from({ length: 8 }, (_, index) => <ExpertFile key={index} selected label={index === 0 ? '8 routed' : undefined} />)}
            <ExpertFile shared label="shared" />
          </div>
        </motion.div>
      ) : null}

      {separateFiles ? (
        <motion.div className="opening3-storage" initial={{ opacity: 0, x: '-5cqw' }} animate={{ opacity: 1, x: 0, scale: smallMachine ? 0.82 : 1 }}>
          <header><span>MODEL FILES / STORAGE</span><small>experts kept separately</small></header>
          <div className="opening3-storage-shelves">
            {Array.from({ length: 48 }, (_, index) => (
              <ExpertFile key={index} selected={routeLoad && index < 8} />
            ))}
          </div>
        </motion.div>
      ) : null}

      {routeLoad ? (
        <>
          <RouterDesk word="dog" compact />
          <div className="opening3-load-path" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => (
              <motion.i
                key={index}
                style={{ '--load': index } as CSSProperties}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: index * 0.035 }}
              />
            ))}
          </div>
          <div className="opening3-load-badge"><b>8</b><span>LOAD</span></div>
        </>
      ) : null}

      {smallMachine ? (
        <motion.div className="opening3-small-machine" initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="opening3-machine-shell">
            <header>SMALL MACHINE</header>
            <div className="opening3-machine-screen"><WordChip word="dog" /></div>
            <div className="opening3-machine-ram"><span>RAM</span>{Array.from({ length: 9 }, (_, i) => <i key={i} data-shared={i === 8 ? 'true' : undefined} />)}</div>
          </div>
          <div className="opening3-machine-cable" />
        </motion.div>
      ) : null}

      {hold ? (
        <motion.div className="opening3-hypothesis-hold" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}>
          <span>320B model</span>
          <i />
          <span>small machine</span>
          <b>?</b>
        </motion.div>
      ) : null}
    </motion.div>
  )
}

function DiveScene() {
  return (
    <motion.div className="opening3-dive-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="opening3-dive-architecture">
        <small>FINAL ARCHITECTURE</small>
        {Array.from({ length: 14 }, (_, i) => <i key={i} />)}
      </div>
      <motion.div className="opening3-dive-word" initial={{ x: '-8cqw', opacity: 0 }} animate={{ x: '12cqw', opacity: 1 }}>
        <WordChip word="dog" />
      </motion.div>
      <div className="opening3-model-entrance">
        <span>INSIDE THE MODEL</span>
        <div><i /><i /><i /></div>
      </div>
    </motion.div>
  )
}

export function OpeningWorld({ beat }: { beat: number }) {
  return (
    <motion.section className="v9-world opening-world opening3-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {beat === 1 ? <ModelProfile /> : null}
      {beat >= 2 && beat <= 4 ? <ParameterScene beat={beat} /> : null}
      {beat >= 5 && beat <= 7 ? <ExpertScene beat={beat} /> : null}
      {beat >= 8 && beat <= 13 ? <MemoryScene beat={beat} /> : null}
      {beat >= 14 ? <DiveScene /> : null}
    </motion.section>
  )
}
