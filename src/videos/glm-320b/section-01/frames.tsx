import { AnimatePresence, motion } from 'motion/react'
import { type ReactNode } from 'react'
import { Expert, SharedExpert } from './cast/Expert'
import { Narrator } from './cast/Narrator'
import { Router } from './cast/Router'
import {
  Archway,
  ExpertCrowd,
  ModelInfoCard,
  RamTray,
  SmallMachine,
  WeightShelf,
  WordCard,
  Blocker,
} from './cast/Objects'
import { Arrow, Bubble, Brace, Cross, Note, Panel, Sparks } from './marks'
import { ParameterGrid, braceBox } from './ParameterGrid'

/** Grid placement shared by frames 2-4, and the brace geometry that matches it. */
const GRID_X = 56
const GRID = braceBox(GRID_X)

/** Frame 5 shrinks the same grid to make room for the expert crowd. */
const SMALL_GRID_X = 30
const SMALL_GRID_SCALE = 0.5
const SMALL_GRID = braceBox(SMALL_GRID_X, SMALL_GRID_SCALE)

export type Frame = {
  n: number
  id: string
  title: string
  vo: string
  render: () => ReactNode
}

/** Positions an actor on the 1920x1080 stage. */
function At({
  x,
  y,
  children,
  z = 1,
  origin = 'center',
}: {
  x: string
  y: string
  children: ReactNode
  z?: number
  origin?: 'center' | 'left' | 'right'
}) {
  return (
    <div className="s1-at" data-origin={origin} style={{ left: x, top: y, zIndex: z }}>
      {children}
    </div>
  )
}

/** A row of experts with an optional brace beneath. */
function ExpertRow({ count, from = 0, size = 44 }: { count: number; from?: number; size?: number }) {
  return (
    <div className="s1-expert-row">
      {Array.from({ length: count }, (_, index) => (
        <Expert key={index} index={from + index} size={size} mood="happy" />
      ))}
    </div>
  )
}

const NEUTRAL_IDS = ['12', '47', '103', '188', '241']

/**
 * Vertical centre of each row in .s1-router-fan on a 1080-tall stage. The fan
 * is a centred 5-row grid, so rows sit at 64px intervals around the midline.
 */
const FAN_ROW_Y = [412, 476, 540, 604, 668]

export const FRAMES: Frame[] = [
  {
    n: 1,
    id: 'meet-the-model',
    title: 'Meet the model',
    vo: 'So, GLM-5.3-Flash has 320 billion parameters and only 18 billion are active.',
    render: () => (
      <>
        <At x="11%" y="60%">
          <Narrator pose="point" scale={1.05} />
        </At>
        <Note at={{ x: '3%', y: '35%' }} rotate={-3} size="md">
          This is the model
          <br />
          we&rsquo;ll look at!
        </Note>
        <At x="52%" y="50%">
          <ModelInfoCard highlight />
        </At>
        <Note at={{ x: '77%', y: '25%' }} rotate={2} tone="orange" size="lg">
          320B
          <br />
          <em>total parameters</em>
        </Note>
        <Note at={{ x: '77%', y: '58%' }} rotate={-1} size="lg">
          18B
          <br />
          <em>active parameters</em>
        </Note>
        <Arrow from={{ x: 1470, y: 320 }} to={{ x: 1180, y: 400 }} bow={30} />
        <Arrow from={{ x: 1470, y: 660 }} to={{ x: 1180, y: 492 }} bow={-30} />
      </>
    ),
  },
  {
    n: 2,
    id: 'word-comes-in',
    title: 'A word comes in',
    vo: 'For any one word, only about 18 billion parameters are active.',
    render: () => (
      <>
        <span className="s1-grid-header" style={{ left: GRID.total.left }}>
          MODEL PARAMETERS (320,000,000,000)
        </span>
        <At x="10%" y="32%">
          <WordCard />
        </At>
        <Arrow from={{ x: 268, y: 372 }} to={{ x: 432, y: 430 }} bow={-18} />
        <At x={`${GRID_X}%`} y="50%" z={0}>
          <ParameterGrid activeVisible />
        </At>
        <Brace label="~18B ACTIVE" at={{ x: GRID.active.left, y: '77%' }} width={GRID.active.width} tone="orange" />
        <At x="10%" y="72%">
          <Narrator pose="wonder" scale={0.9} />
        </At>
        <Note at={{ x: '2.5%', y: '55%' }} rotate={-2}>
          A word goes in&hellip;
        </Note>
      </>
    ),
  },
  {
    n: 3,
    id: 'tiny-part-used',
    title: 'A tiny part is used',
    vo: 'The model owns 320 billion parameters, but only uses a small fraction of them to process that word.',
    render: () => (
      <>
        <At x="10%" y="32%">
          <WordCard />
        </At>
        <Arrow from={{ x: 268, y: 372 }} to={{ x: 432, y: 430 }} bow={-18} />
        <Brace label="320B TOTAL PARAMETERS" at={{ x: GRID.total.left, y: '16%' }} width={GRID.total.width} side="top" />
        <At x={`${GRID_X}%`} y="50%" z={0}>
          <ParameterGrid activeVisible />
        </At>
        <Brace
          label="~18B ACTIVE"
          sub="(about 5.6%)"
          at={{ x: GRID.active.left, y: '77%' }}
          width={GRID.active.width}
          tone="orange"
        />
        <At x="10%" y="72%">
          <Narrator pose="think" scale={0.9} />
        </At>
        <Note at={{ x: '2.5%', y: '55%' }} rotate={-2}>
          Just a small part?
        </Note>
      </>
    ),
  },
  {
    n: 4,
    id: 'obvious-question',
    title: 'The obvious question',
    vo: 'Okay. So why have the other 300 billion?',
    render: () => (
      <>
        <At x="10%" y="32%">
          <WordCard />
        </At>
        <Brace label="320B TOTAL PARAMETERS" at={{ x: GRID.total.left, y: '16%' }} width={GRID.total.width} side="top" />
        <At x={`${GRID_X}%`} y="50%" z={0}>
          <ParameterGrid activeVisible reacting />
        </At>
        <Brace label="~18B ACTIVE" at={{ x: GRID.active.left, y: '77%' }} width={GRID.active.width} tone="orange" />
        <Note at={{ x: '45%', y: '25%' }} rotate={-2} size="sm" backed>
          What about us?
        </Note>
        <Note at={{ x: '65%', y: '22%' }} rotate={2} size="sm" backed>
          Why are we here?
        </Note>
        <Note at={{ x: '90%', y: '55%' }} rotate={-1} size="sm">
          Do we ever
          <br />
          get to work?
        </Note>
        <Note at={{ x: '47%', y: '66%' }} rotate={2} size="sm" backed>
          Are we
          <br />
          just extra?
        </Note>
      </>
    ),
  },
  {
    n: 5,
    id: 'not-useless',
    title: "The inactive part isn't useless",
    vo: 'The rest of the parameters are organized into 288 experts. They stay inactive until they are needed.',
    render: () => (
      <>
        <At x="7%" y="62%">
          <Narrator pose="wonder" scale={0.8} />
        </At>
        <Note at={{ x: '1.5%', y: '40%' }} rotate={-3} size="sm">
          So where do the
          <br />
          other 300B go?
        </Note>
        <Brace
          label="320B TOTAL PARAMETERS"
          at={{ x: SMALL_GRID.total.left, y: '25%' }}
          width={SMALL_GRID.total.width}
          side="top"
        />
        <At x={`${SMALL_GRID_X}%`} y="50%" z={0}>
          <ParameterGrid activeVisible scale={SMALL_GRID_SCALE} />
        </At>
        <Brace
          label="~18B ACTIVE"
          at={{ x: SMALL_GRID.active.left, y: '64%' }}
          width={SMALL_GRID.active.width}
          tone="orange"
        />
        <At x="72%" y="48%">
          <div className="s1-crowd-host">
            <ExpertCrowd count={22} />
          </div>
        </At>
        <Brace label="288 EXPERTS" sub="(inactive until needed)" at={{ x: '56%', y: '76%' }} width="32%" />
        <Note at={{ x: '68%', y: '13%' }} rotate={3} tone="orange">
          They are Experts!
        </Note>
      </>
    ),
  },
  {
    n: 6,
    id: 'meet-the-router',
    title: 'Meet the router',
    vo: 'A router reads what the word has become, scores every expert, and takes the top few.',
    render: () => (
      <>
        <At x="8%" y="58%">
          <Narrator pose="wonder" scale={0.86} />
        </At>
        <Note at={{ x: '1.5%', y: '36%' }} rotate={-3} size="sm">
          How does it choose
          <br />
          the right experts?
        </Note>
        <At x="26%" y="54%">
          <WordCard />
        </At>
        <Arrow from={{ x: 570, y: 582 }} to={{ x: 676, y: 582 }} bow={0} />
        <At x="43%" y="54%">
          <Router scale={0.92} />
        </At>
        <Bubble at={{ x: '36%', y: '11%' }} width={330} tail="bottom-left">
          I read what this word has become, score every expert, and take the top 8.
        </Bubble>
        <Note at={{ x: '73%', y: '10%' }} rotate={1} size="sm">
          Highest-scoring experts
          <br />
          get selected.
        </Note>
        <div className="s1-router-fan">
          {NEUTRAL_IDS.map((id, index) => (
            <div className="s1-fan-item" key={id}>
              <Expert index={index} size={44} mood="happy" />
              <span className="s1-fan-label">Expert {id}</span>
            </div>
          ))}
        </div>
        {/* One arrow per expert, landing on the row it belongs to. */}
        {NEUTRAL_IDS.map((id, index) => (
          <Arrow
            key={id}
            from={{ x: 970, y: 582 }}
            to={{ x: 1348, y: FAN_ROW_Y[index] }}
            bow={(2 - index) * 14}
            dashed
          />
        ))}
        <Note at={{ x: '38%', y: '86%' }} rotate={-1} size="sm">
          An expert is a learned network block &mdash; not a labelled specialist.
        </Note>
      </>
    ),
  },
  {
    n: 7,
    id: 'small-team',
    title: 'One word, a small team',
    vo: 'For this word, the router selects 8 experts plus 1 shared expert that is always active.',
    render: () => (
      <>
        <At x="12%" y="46%">
          <WordCard />
        </At>
        <Arrow from={{ x: 300, y: 500 }} to={{ x: 420, y: 545 }} bow={-14} />
        <At x="27%" y="56%">
          <Router scale={0.86} />
        </At>
        <Note at={{ x: '5%', y: '70%' }} rotate={-2} size="sm">
          The router picks a small
          <br />
          team for this word.
        </Note>
        <Arrow from={{ x: 700, y: 560 }} to={{ x: 810, y: 545 }} bow={-10} tone="orange" />
        <At x="66%" y="50%">
          <Panel title="8 EXPERTS + 1 SHARED" tone="orange">
            <div className="s1-team-grid">
              {Array.from({ length: 8 }, (_, index) => (
                <div className="s1-team-slot" key={index}>
                  <Expert index={index} size={54} mood="happy" />
                  <span className="s1-team-label">Expert {[12, 47, 103, 188, 241, 19, 76, 260][index]}</span>
                </div>
              ))}
              <div className="s1-team-slot">
                <SharedExpert size={54} label="shared (always on)" />
              </div>
            </div>
          </Panel>
        </At>
      </>
    ),
  },
  {
    n: 8,
    id: 'different-words',
    title: 'Different words, different experts',
    vo: 'A different word is routed to a different set of experts.',
    render: () => (
      <>
        <Note at={{ x: '32%', y: '14%' }} rotate={-1} align="center">
          A different word activates a different team.
        </Note>
        <div className="s1-split" aria-hidden="true" />
        <At x="24%" y="40%">
          <WordCard word="scared" layoutId="s1-word-a" />
        </At>
        <Arrow from={{ x: 460, y: 470 }} to={{ x: 460, y: 552 }} bow={0} />
        <At x="24%" y="58%">
          <ExpertRow count={5} from={0} />
        </At>
        <Note at={{ x: '17%', y: '68%' }} rotate={0} size="sm">
          Team for &ldquo;scared&rdquo;
        </Note>
        <At x="64%" y="40%">
          <WordCard word="calculate" layoutId="s1-word-b" />
        </At>
        <Arrow from={{ x: 1228, y: 470 }} to={{ x: 1228, y: 552 }} bow={0} />
        <At x="64%" y="58%">
          <ExpertRow count={5} from={3} />
        </At>
        <Note at={{ x: '56%', y: '68%' }} rotate={0} size="sm">
          Team for &ldquo;calculate&rdquo;
        </Note>
        <At x="89%" y="56%">
          <Narrator pose="cheer" scale={0.8} />
        </At>
        <Note at={{ x: '82%', y: '28%' }} rotate={3} size="sm">
          Same model.
          <br />
          Different experts.
        </Note>
      </>
    ),
  },
  {
    n: 9,
    id: 'new-question',
    title: 'A new question',
    vo: 'But then I had another question.',
    render: () => (
      <>
        <At x="14%" y="26%">
          <WordCard scale={0.82} />
        </At>
        <Arrow from={{ x: 330, y: 300 }} to={{ x: 372, y: 366 }} bow={12} />
        <At x="19%" y="46%">
          <Router scale={0.66} />
        </At>
        <At x="19%" y="68%">
          <ExpertRow count={9} size={34} />
        </At>
        <Brace label="8 EXPERTS + 1 SHARED" sub="(active now)" at={{ x: '8%', y: '75%' }} width="22%" />
        <div className="s1-divider" aria-hidden="true" />
        <At x="76%" y="50%">
          <WeightShelf title="MODEL WEIGHTS (STORED)" size="Hundreds of GB" shelves={6} scale={1} />
        </At>
        <At x="46%" y="58%">
          <Narrator pose="think" scale={0.92} />
        </At>
        <Note at={{ x: '38%', y: '28%' }} rotate={-2}>
          If only a few
          <br />
          are working&hellip;
        </Note>
      </>
    ),
  },
  {
    n: 10,
    id: 'memory-problem',
    title: 'The memory problem',
    vo: 'If only a few experts are being used, why deal with hundreds of gigabytes of weights?',
    render: () => (
      <>
        <At x="9%" y="26%">
          <WordCard scale={0.78} />
        </At>
        <Arrow from={{ x: 230, y: 300 }} to={{ x: 268, y: 366 }} bow={12} />
        <At x="14%" y="45%">
          <Router scale={0.58} />
        </At>
        <At x="14%" y="66%">
          <ExpertRow count={9} size={30} />
        </At>
        <Brace label="8 EXPERTS + 1 SHARED" sub="(active compute)" at={{ x: '4%', y: '73%' }} width="20%" />
        <At x="42%" y="50%">
          <RamTray count={9} size="~ a few GB" />
        </At>
        <At x="76%" y="50%">
          <WeightShelf
            title="MODEL WEIGHTS (ON DISK / STORAGE)"
            size="Hundreds of GB (e.g. 200-400GB)"
            shelves={6}
            scale={1}
          />
        </At>
        <Note at={{ x: '52%', y: '14%' }} rotate={2} size="sm">
          &hellip;but a huge
          <br />
          amount of weights!
        </Note>
        <Arrow from={{ x: 1090, y: 230 }} to={{ x: 1290, y: 310 }} bow={-24} />
      </>
    ),
  },
  {
    n: 11,
    id: 'keep-small-part',
    title: 'Keep only the small part?',
    vo: "Why can't I keep just the small part I need?",
    render: () => (
      <>
        <At x="14%" y="45%">
          <Router scale={0.62} />
        </At>
        <At x="14%" y="70%">
          <ExpertRow count={9} size={30} />
        </At>
        <Brace label="8 EXPERTS + 1 SHARED" sub="(the ones we need)" at={{ x: '4%', y: '80%' }} width="20%" />
        <Arrow from={{ x: 520, y: 520 }} to={{ x: 760, y: 560 }} bow={70} tone="orange" label="Load into memory?" />
        <At x="47%" y="56%">
          <RamTray count={4} size="~ a few GB" note="(only what we need)" />
        </At>
        <At x="82%" y="47%">
          <WeightShelf title="REST OF MODEL (STILL STORED)" size="Hundreds of GB (still there)" scale={0.88} dimmed />
        </At>
        <At x="63%" y="30%">
          <Narrator pose="hopeful" scale={0.78} />
        </At>
        <Sparks at={{ x: '58%', y: '20%' }} />
        <Note at={{ x: '55%', y: '10%' }} rotate={-2} size="sm">
          That would be
          <br />
          so much simpler!
        </Note>
      </>
    ),
  },
  {
    n: 12,
    id: 'router-already-knows',
    title: 'The router already knows',
    vo: 'The router already knows which experts this word should go to.',
    render: () => (
      <>
        <At x="9%" y="45%">
          <WordCard scale={0.85} />
        </At>
        <At x="21%" y="55%">
          <Router scale={0.78} gesturing />
        </At>
        <Bubble at={{ x: '13%', y: '15%' }} width={280} tail="bottom-center">
          I already know which experts to use!
        </Bubble>
        <At x="66%" y="30%">
          <Panel title="Pick these experts..." dashed tone="orange">
            <div className="s1-pick-row">
              {[12, 47, 103, 188].map((id, index) => (
                <Expert key={id} index={index} size={42} mood="happy" />
              ))}
            </div>
          </Panel>
        </At>
        <Arrow from={{ x: 620, y: 480 }} to={{ x: 1140, y: 330 }} bow={90} />
        {[0, 1, 2, 3].map((index) => (
          <Arrow
            key={index}
            from={{ x: 1230 + index * 62, y: 420 }}
            to={{ x: 1150 + index * 58, y: 640 }}
            bow={-30}
            dashed
            tone="orange"
          />
        ))}
        <Note at={{ x: '82%', y: '46%' }} rotate={-2} tone="orange" size="sm">
          Load into memory
        </Note>
        <At x="66%" y="76%">
          <RamTray count={4} size="~ a few GB" />
        </At>
        <At x="93%" y="72%">
          <Narrator pose="cheer" scale={0.76} />
        </At>
        <Note at={{ x: '87%', y: '58%' }} rotate={2} size="sm">
          Makes sense!
        </Note>
      </>
    ),
  },
  {
    n: 13,
    id: 'something-stops-this',
    title: 'Something is stopping this',
    vo: 'Could this make the model fit on a smaller machine? And if not, what is stopping us?',
    render: () => (
      <>
        <At x="14%" y="42%">
          <Panel title="Stored experts (on disk / CPU)" dashed>
            <div className="s1-store-grid">
              {Array.from({ length: 9 }, (_, index) => (
                <Expert key={index} index={index} size={38} mood="asleep" />
              ))}
            </div>
          </Panel>
        </At>
        <Arrow from={{ x: 430, y: 454 }} to={{ x: 512, y: 454 }} bow={0} />
        <At x="32%" y="42%">
          <Router scale={0.6} />
        </At>
        <Note at={{ x: '26%', y: '58%' }} rotate={-1} size="sm">
          Pick the right
          <br />
          experts for this word
        </Note>
        <Arrow from={{ x: 750, y: 454 }} to={{ x: 830, y: 454 }} bow={0} />
        <At x="49%" y="42%">
          <Panel title="Selected experts (load to VRAM)" dashed tone="orange">
            <div className="s1-selected-column">
              {[0, 1, 2].map((index) => (
                <Expert key={index} index={index} size={38} mood="happy" />
              ))}
              <span className="s1-more-dots">···</span>
            </div>
          </Panel>
        </At>
        <Arrow from={{ x: 1010, y: 454 }} to={{ x: 1094, y: 454 }} bow={0} />
        <Cross at={{ x: '58%', y: '42%' }} />
        {/* Sits below the panel title band so the hazard triangle cannot cover it. */}
        <At x="67%" y="48%">
          <Blocker scale={0.86} />
        </At>
        <At x="81%" y="43%">
          <SmallMachine scale={0.86} />
        </At>
        <Note at={{ x: '76%', y: '56%' }} rotate={-1} size="sm">
          A smaller machine?
        </Note>
        <Note at={{ x: '7%', y: '13%' }} rotate={-2} size="sm">
          We only load the
          <br />
          experts we need!
        </Note>
        <Note at={{ x: '63%', y: '12%' }} rotate={2} tone="red">
          But something
          <br />
          is blocking it&hellip;
        </Note>
        <At x="14%" y="80%">
          <Narrator pose="think" scale={0.78} />
        </At>
        <Note at={{ x: '23%', y: '76%' }} rotate={-2} size="lg">
          So&hellip; why doesn&rsquo;t this just work?
        </Note>
      </>
    ),
  },
  {
    n: 14,
    id: 'follow-word-inside',
    title: 'Follow one word inside',
    vo: "To answer that, staring at the final architecture isn't enough. Let's see what happens inside the model.",
    render: () => (
      <>
        <At x="26%" y="48%">
          <motion.div
            className="s1-arch-sheet"
            initial={{ opacity: 1, rotate: -1.5, x: 0 }}
            animate={{ opacity: 0.85, rotate: -4.5, x: -60 }}
            transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.3 }}
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
        </At>
        {/* Close enough to the sheet that the push pose has something to push. */}
        <At x="45%" y="60%">
          <Narrator pose="push" flip scale={0.84} />
        </At>
        <Note at={{ x: '47%', y: '30%' }} rotate={-2} size="sm">
          That&rsquo;s a lot
          <br />
          for now&hellip;
        </Note>
        <Note at={{ x: '55%', y: '73%' }} rotate={1} size="sm">
          Let&rsquo;s look inside instead.
        </Note>
        <Arrow from={{ x: 1130, y: 760 }} to={{ x: 1420, y: 650 }} bow={70} />
        <Note at={{ x: '78%', y: '14%' }} rotate={0} size="lg">
          Inside the model
        </Note>
        <At x="84%" y="52%">
          <Archway />
        </At>
        <At x="66%" y="52%">
          <WordCard scale={0.82} />
        </At>
        <Arrow from={{ x: 1330, y: 562 }} to={{ x: 1470, y: 562 }} bow={0} />
      </>
    ),
  },
]

export function FrameStage({ frame }: { frame: Frame }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="s1-stage"
        key={frame.n}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      >
        {frame.render()}
      </motion.div>
    </AnimatePresence>
  )
}
