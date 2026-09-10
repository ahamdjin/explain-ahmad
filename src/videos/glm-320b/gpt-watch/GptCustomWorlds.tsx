import { motion } from 'motion/react'
import { MODEL, SENTENCE } from '../v9/data'
import { HeroVector, VectorStrip } from '../v9/shared'

export function PromptWorld({ beat }: { beat: number }) {
  const focusIt = beat >= 14
  const questions = beat >= 15
  const entrance = beat >= 16
  const words = SENTENCE.split(' ')

  return (
    <motion.section className="gpt-world gpt-prompt-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <small className="gpt-kicker">ONE PROMPT</small>
      <motion.div className="gpt-sentence-strip" animate={{ y: entrance ? '-22cqh' : 0, scale: entrance ? 0.9 : 1 }} transition={{ type: 'spring', stiffness: 90, damping: 22 }}>
        {words.map((word, index) => {
          const isIt = index === words.length - 1
          return <motion.span key={`${word}-${index}`} data-it={focusIt && isIt ? 'true' : undefined} animate={{ opacity: focusIt && !isIt ? 0.72 : 1 }}>{word}</motion.span>
        })}
      </motion.div>
      {questions ? (
        <motion.div className="gpt-prompt-questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="is-back">what does “it” refer to?</span>
          <span className="is-forward">what comes next?</span>
        </motion.div>
      ) : null}
      {entrance ? (
        <motion.div className="gpt-model-intake" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
          <i /><strong>FOLLOW “it” INSIDE</strong><span>same actor · no architecture dump</span>
        </motion.div>
      ) : null}
    </motion.section>
  )
}

const ROUTE_A = new Set([2, 11, 19, 27, 38, 46, 57, 66])
const ROUTE_B = new Set([5, 14, 21, 33, 42, 51, 61, 70])
const ROUTE_C = new Set([1, 14, 23, 32, 44, 53, 64, 71])

function RouteField({ route, dim = false }: { route: Set<number>; dim?: boolean }) {
  return (
    <div className="gpt-memory-expert-field" data-dim={dim ? 'true' : undefined}>
      {Array.from({ length: 72 }, (_, i) => <i key={i} data-on={route.has(i) ? 'true' : undefined} />)}
      <span>288 routed experts</span>
    </div>
  )
}

function LoadedTray({ route, misses = 0 }: { route: Set<number>; misses?: number }) {
  return (
    <div className="gpt-loaded-tray">
      <small>FAST WORKING MEMORY</small>
      <div>{Array.from(route).slice(0, 8).map((id, index) => <i key={id} data-miss={index >= 8 - misses ? 'true' : undefined}><b>E{id + 1}</b></i>)}</div>
    </div>
  )
}

export function MemoryWorld({ beat }: { beat: number }) {
  const local = beat - 76
  const secondLayer = local >= 3
  const transfer = local >= 5
  const nextToken = local >= 7
  const cache = local >= 8
  const miss = local >= 9
  const tools = local >= 10
  const conclusion = local >= 11
  const exit = local >= 12
  const route = nextToken ? ROUTE_C : secondLayer ? ROUTE_B : ROUTE_A

  return (
    <motion.section className="gpt-world gpt-memory-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: exit ? 0 : 1 }}>
      <div className="gpt-memory-heading">
        <small>THE OPENING QUESTION RETURNS</small>
        <h2>{conclusion ? <>Sparse compute is not the same as a tiny model.</> : <>Why not keep only the experts we need?</>}</h2>
      </div>

      <div className="gpt-memory-stage">
        <motion.div className="gpt-weight-store" animate={{ opacity: conclusion ? 0.55 : 1 }}>
          <header><strong>FULL WEIGHT STORE</strong><span>all expert capacity still exists</span></header>
          <RouteField route={route} dim={transfer} />
        </motion.div>

        <div className="gpt-memory-router">
          <HeroVector label={nextToken ? 'next token' : 'it'} note={secondLayer ? 'changed representation' : 'current representation'} changed={secondLayer} compact />
          <motion.div className="gpt-router-node" animate={{ scale: local === 2 || local === 4 || local === 7 ? [1, 1.08, 1] : 1 }}><small>ROUTER</small><strong>choose now</strong></motion.div>
          <div className="gpt-route-name"><b>{nextToken ? 'token N+1' : secondLayer ? 'layer N+1' : 'layer N'}</b><span>{secondLayer || nextToken ? 'new representation → new scores' : 'first routing decision'}</span></div>
        </div>

        <LoadedTray route={route} misses={miss ? 3 : cache ? 1 : 0} />

        {transfer ? (
          <div className="gpt-transfer-lanes" data-jam={miss ? 'true' : undefined}>
            {Array.from({ length: 8 }, (_, i) => <motion.i key={i} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: i * 0.045 }} />)}
            <span>{miss ? 'cache miss → weights must move' : 'selected weights must be available to compute'}</span>
          </div>
        ) : null}
      </div>

      {local === 1 ? <div className="gpt-memory-note is-yellow">This is the exact tempting machine from the opening.</div> : null}
      {local === 2 ? <div className="gpt-memory-note">Routing happens from the <b>current hidden representation</b>, not once at startup.</div> : null}
      {local === 3 ? <div className="gpt-memory-note is-yellow">After one layer changes the representation, the next sparse layer can want a different team.</div> : null}
      {local === 4 ? <div className="gpt-memory-note">So “the eight experts” are not one permanent mini-model.</div> : null}
      {local === 5 ? <div className="gpt-memory-note">If an expert is outside fast memory, using it means making its weights available to the compute device.</div> : null}
      {local === 6 ? <div className="gpt-memory-note is-red">Move weights too often and transfer bandwidth / latency can become the bottleneck.</div> : null}
      {local === 7 ? <div className="gpt-memory-note is-yellow">Then the next generated token can ask for another routing pattern again.</div> : null}
      {cache ? <div className="gpt-cache-shelf"><strong>CACHE</strong><i /><i /><i /><span>keep recently useful experts close</span></div> : null}
      {miss ? <div className="gpt-memory-note is-red">Caching helps when routes overlap. It does not guarantee every next expert is already resident.</div> : null}
      {tools ? <div className="gpt-memory-tools"><span>quantize</span><span>shard</span><span>cache</span><span>offload</span><b>engineering tools — not magic disappearance</b></div> : null}
      {conclusion ? <div className="gpt-memory-equation"><span><b>320B</b> total capacity</span><i>≠</i><span className="is-active"><b>~18B</b> active path</span><i>≠</i><span><b>18B</b> total storage needed</span></div> : null}
      {exit ? <motion.div className="gpt-memory-exit" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Now put that changing route back inside the full 45-layer stack.</motion.div> : null}
    </motion.section>
  )
}

export function FinalWorld({ beat }: { beat: number }) {
  const local = beat - 112
  const showActive = local >= 2
  const route = local >= 3
  const store = local >= 4
  const memory = local >= 5
  const answer = local >= 6
  const final = local >= 8

  return (
    <motion.section className="gpt-world gpt-final-world" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="gpt-final-sheet" animate={{ scale: final ? 0.96 : 1 }}>
        <header><small>{MODEL.maker}</small><h1>{MODEL.name}</h1><span>Mixture of Experts</span></header>
        <div className="gpt-final-pair">
          <div><small>TOTAL MODEL CAPACITY</small><strong>{MODEL.totalParamsB}B</strong><span>all learned parameters exist</span></div>
          <i>→</i>
          <motion.div className="is-active" animate={{ opacity: showActive ? 1 : 0.2, scale: showActive ? 1 : 0.88 }}><small>APPROX. ACTIVE PATH / TOKEN</small><strong>~{MODEL.activeParamsB}B</strong><span>selective computation</span></motion.div>
        </div>
        {route ? <div className="gpt-final-route"><span>current representation</span><i>→</i><span>router</span><i>→</i><span>top-8 + shared</span><i>→</i><span>new representation</span><b>↺ next sparse layer</b></div> : null}
        {store ? <div className="gpt-final-store"><strong>THE BIG EXPERT POOL STILL EXISTS</strong><RouteField route={ROUTE_B} dim /></div> : null}
        {memory ? <div className="gpt-final-memory"><span>cache</span><span>quantize</span><span>shard</span><span>offload</span><b>change how the model is served — not how many learned parameters exist</b></div> : null}
        {answer ? <h2>Huge capacity. <mark>Selective compute.</mark> Large pool still accessible.</h2> : null}
        {final ? <p className="gpt-final-question">The interesting next question is no longer “where did the other 300B go?” — it is <b>how do serving systems keep the right experts close enough, fast enough?</b></p> : null}
      </motion.div>
    </motion.section>
  )
}

export function PredictionOverlay({ kicker, question, answer }: { kicker: string; question: string; answer?: string }) {
  return (
    <motion.aside className="gpt-prediction" initial={{ opacity: 0, y: -12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}>
      <small>{kicker}</small><strong>{question}</strong>{answer ? <span>{answer}</span> : null}
    </motion.aside>
  )
}
