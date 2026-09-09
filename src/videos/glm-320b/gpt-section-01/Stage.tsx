import { motion } from 'motion/react'
import { type ReactNode } from 'react'
import { Narrator, type NarratorPose } from './cast/Narrator'
import { BEATS } from './beats'
import { FEEL } from './motion'
import { INK, expertColor } from './paper'
import { CHOSEN, EXPERTS, expertAt, hospitalAt, selectedIndex, wordAt } from './scene'

const ORANGE = '#c77942'
const BLUE = '#527797'
const TEAL = '#719b8b'
const PAPER = '#fbf8ef'

function Visible({ show, children }: { show: boolean; children: ReactNode }) {
  return <motion.g style={{ transformOrigin: '0px 0px' }} initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.25 }} aria-hidden={!show}>{children}</motion.g>
}
function Label({ x, y, children, size = 25, fill = INK, anchor = 'middle', className = '' }: { x: number; y: number; children: ReactNode; size?: number; fill?: string; anchor?: 'middle' | 'start' | 'end'; className?: string }) {
  return <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} className={className}>{children}</text>
}
function Expert({ id, active, asleep = false, badge = false }: { id: number; active: boolean; asleep?: boolean; badge?: boolean }) {
  return <g stroke={INK} strokeWidth="1.7" strokeLinecap="round">
    <rect x="-2" y="-2" width="28" height="28" rx="9" fill={active ? '#eac496' : '#ebe5d8'} stroke="none" opacity={active ? 0.65 : 0} />
    <path d="M6 20v8m12-8v8" fill="none" />
    <rect width="24" height="22" rx="7" fill={active ? expertColor(id) : '#ddd7c9'} />
    {asleep ? <path d="M5 10h4m6 0h4" fill="none" /> : <g fill={INK} stroke="none"><circle cx="7" cy="9" r="1.7" /><circle cx="17" cy="9" r="1.7" /></g>}
    {badge ? <text x="12" y="39" stroke="none" fill={INK} textAnchor="middle" fontSize="8" >{id + 1}</text> : null}
  </g>
}

/** Permanent actors in a single coordinate space: no beat-keyed world replacement. */
export function Stage({ beat: b, reduced }: { beat: number; reduced: boolean }) {
  const h = hospitalAt(b)
  const word = wordAt(b)
  const plan = b >= 18 && b <= 24
  const selected = b >= 10 && b < 25
  const pose: NarratorPose = b >= 25 ? 'push' : b === 21 ? 'cheer' : b >= 22 ? 'think' : [5, 13, 14].includes(b) ? 'think' : b >= 15 ? 'hopeful' : b >= 6 ? 'wonder' : 'point'
  const spring = reduced ? { duration: 0 } : { ...FEEL[BEATS[b - 1].relation], restDelta: 0.05 }
  const desk = plan ? { x: 817, y: 270, scale: 0.8 } : { x: 440, y: b >= 11 ? 720 : 580, scale: 1 }
  const heading = b <= 5 ? 'The 320B / 18B puzzle' : b <= 12 ? 'A small team inside a very large model' : b <= 17 ? 'Then why keep so much?' : b <= 23 ? 'Suppose we only loaded what we need…' : 'Let’s follow one word inside.'
  return <>
    <svg className="g1-stage" viewBox="0 0 1600 900" role="img" aria-label={`${BEATS[b - 1].title}. ${BEATS[b - 1].learn}`}>
      <defs>
        <marker id="g1-arrow-head" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto"><path d="m2 2 8 4-8 4" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" /></marker>
        <pattern id="g1-paper-grain" width="150" height="150" patternUnits="userSpaceOnUse"><rect width="150" height="150" fill="#f4efe3" /><path d="M8 21h1m29 74h1m48-63h1m35 85h1M22 135h1m75-51h1" stroke="#8d826b" opacity=".2" /></pattern>
      </defs>
      <rect width="1600" height="900" fill="url(#g1-paper-grain)" />
      <Label x={105} y={78} anchor="start" size={17} fill="#8b806e" className="g1-mono">01 / THE QUESTION</Label>
      <Label x={105} y={132} anchor="start" size={42}>{heading}</Label>

      {/* Opening: measured numbers, then one honest share bar. */}
      <Visible show={b <= 3}>
        <path d="M505 239 1235 230l5 346-733 7Z" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <path d="m552 225 88-2 2 28-88 1Z" fill="#d8cfab" opacity=".65" />
        <Label x={865} y={297} size={31}>GLM-5.3-Flash</Label>
        <path d="M548 324h640" stroke={INK} strokeWidth="1.4" opacity=".25" />
        <Label x={565} y={380} anchor="start" size={23} fill="#817664">TOTAL PARAMETERS</Label>
        <Label x={1158} y={395} anchor="end" size={65} fill={INK}>320B</Label>
        <Visible show={b >= 2}><Label x={565} y={427} anchor="start" size={22} fill="#817664">numbers learned during training</Label></Visible>
        <Visible show={b >= 3}>
          <path d="M548 453h640" stroke={INK} strokeWidth="1.4" opacity=".25" />
          <Label x={565} y={507} anchor="start" size={23} fill={ORANGE}>ACTIVE FOR ONE WORD</Label>
          <Label x={1158} y={522} anchor="end" size={65} fill={ORANGE}>~18B</Label>
          <path d="M1020 535q75 7 150-2" stroke={ORANGE} strokeWidth="3" fill="none" />
        </Visible>
      </Visible>
      <Visible show={b >= 4 && b <= 5}>
        <Label x={885} y={320} size={32}>320 billion parameters</Label>
        <path d="M380 348v16h1010v-16" stroke={INK} strokeWidth="2" fill="none" />
        <rect x="380" y="387" width="1010" height="103" rx="3" fill="#e3ddcf" stroke={INK} strokeWidth="2.5" />
        <rect x="380" y="387" width={1010 * 18 / 320} height="103" rx="3" fill="#dfa573" stroke={INK} strokeWidth="2.5" />
        <path d="M380 512v12h57v-12" stroke={ORANGE} strokeWidth="2" fill="none" />
        <Label x={458} y={535} anchor="start" size={29} fill={ORANGE}>18B active · about 5.6%</Label>
        <Visible show={b === 5}><Label x={935} y={451} size={55} fill="#a58a38">?</Label><Label x={935} y={557} size={31}>So what is the rest for?</Label></Visible>
      </Visible>

      {/* One department is shown inside the model; other machinery remains explicit. */}
      <motion.g style={{ transformOrigin: '0px 0px' }} initial={false} animate={{ x: h.x, y: h.y, scale: h.scale, opacity: b >= 6 ? 1 : 0 }} transition={spring}>
        <path d="M12 101 450 17l438 84" fill="#e4ddce" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="30" y="101" width="840" height="337" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <rect x="271" y="44" width="358" height="48" rx="3" fill={PAPER} stroke={INK} strokeWidth="2" />
        <Label x={450} y={78} size={30}>{plan ? 'FULL MODEL WEIGHTS' : 'MIXTURE OF EXPERTS'}</Label>
        <Label x={450} y={128} size={21} fill="#817664">one expert department shown · 288 routed networks</Label>
        {Array.from({ length: 12 }, (_, row) => <path key={row} d={`M53 ${169 + row * 21}h789`} stroke={INK} opacity=".13" />)}
        <path d="M30 400h840" stroke={INK} strokeWidth="2" />
        <rect x="46" y="409" width="262" height="19" rx="2" fill="#d2e0d7" />
        <Label x={177} y={424} size={15} fill="#486e60">shared machinery + other departments</Label>
        <rect x="392" y="401" width="116" height="37" fill={b >= 25 ? '#eed19b' : '#e5ddcc'} stroke={INK} strokeWidth="2" />
        <motion.path d="M450 402v35" stroke={INK} strokeWidth="2" initial={false} animate={{ opacity: b >= 25 ? 0 : 1 }} />
        <Visible show={b >= 25}><path d="m394 438-73 87h259l-73-87" fill="#eed19b" opacity=".3" /></Visible>
        <path d="M8 443h884" stroke={INK} strokeWidth="2" opacity=".3" />
        <Visible show={b >= 20 && b <= 24}>
          {[0, 1, 2, 3].map(i => <Label key={i} x={165 + i * 170} y={194 + (i % 2) * 96} size={23} fill="#998d78">z z</Label>)}
        </Visible>
        <Visible show={b >= 13 && b <= 24}>
          <path d="M44 467h812" stroke="#b38762" strokeWidth="7" opacity=".45" />
          <Label x={450} y={516} size={34} fill={INK}>hundreds of gigabytes</Label>
          <Label x={450} y={548} size={21} fill="#817664">the full model, not just this department</Label>
        </Visible>
        <Visible show={plan}><Label x={450} y={-24} size={31}>Keep the full weights in storage</Label></Visible>
      </motion.g>

      {/* The proposed working space appears before any experts enter it. */}
      <Visible show={b >= 18 && b <= 24}>
        <path d="M1035 309h387a7 7 0 0 1 7 7v275h-401V316a7 7 0 0 1 7-7Z" fill={PAPER} stroke={INK} strokeWidth="3" />
        <path d="M1028 591h401l33 24h-468Z" fill="#e3dac8" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <Label x={1228} y={282} size={30}>A smaller machine?</Label>
        <Label x={1228} y={347} size={22} fill={BLUE}>PROPOSED WORKING MEMORY</Label>
        <rect x="1064" y="533" width="329" height="34" rx="3" fill="#d2e0d7" stroke="#7e9d8d" strokeWidth="1.5" />
        <Label x={1228} y={556} size={20} fill="#486e60">+ the machinery that always works</Label>
        <Visible show={b >= 19}><Label x={1228} y={655} size={26} fill={ORANGE}>Load only what this step needs</Label></Visible>
        <Visible show={b === 21}><path d="m1450 325 20-9m-26-5 11-17m-30 9 3-19" stroke="#a58a38" strokeWidth="3" strokeLinecap="round" /></Visible>
      </Visible>

      <Visible show={b >= 15 && b <= 18}>
        <motion.rect initial={false} animate={{ x: b === 18 ? 740 : 170, y: b === 18 ? 376 : 304, width: b === 18 ? 212 : 292, height: b === 18 ? 167 : 225 }} transition={spring} rx="14" fill="none" stroke={BLUE} strokeWidth="2" strokeDasharray="8 6" />
      </Visible>
      {/* Paths show the desk's function before its name. */}
      <Visible show={b === 10}>
        {CHOSEN.map(id => {
          const p = expertAt(id, b)
          return <motion.path key={id} d={`M484 549Q535 ${p.y} ${p.x + 7} ${p.y + 7}`} fill="none" stroke={ORANGE} strokeWidth="1.5" opacity=".65" initial={false} animate={{ pathLength: b === 10 || reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.65 }} />
        })}
      </Visible>
      <Visible show={b === 17}>
        <path d="M476 683Q550 520 428 439" fill="none" stroke={ORANGE} strokeWidth="2.5" markerEnd="url(#g1-arrow-head)" />
        <Label x={550} y={612} size={23} fill={ORANGE}>chooses</Label>
      </Visible>
      <Visible show={b >= 18 && b <= 23}>
        <path d="M711 490Q866 610 1012 488" fill="none" stroke={ORANGE} strokeWidth="2.5" strokeDasharray="7 5" markerEnd="url(#g1-arrow-head)" />
        <Label x={845} y={601} size={24} fill={ORANGE}>load the selected weights</Label>
      </Visible>

      {/* All 288 experts stay mounted; selected identities move, not copies. */}
      {EXPERTS.map(id => {
        const p = expertAt(id, b)
        const chosen = selectedIndex(id) >= 0
        return <motion.g style={{ transformOrigin: '0px 0px' }} key={id} data-expert={id} data-selected={chosen && selected ? 'true' : undefined}
          initial={false} animate={{ ...p, opacity: b >= 7 ? (selected && !chosen ? 0.52 : 1) : 0 }} transition={spring}>
          <Expert id={id} active={chosen && selected} asleep={b >= 20 && b <= 24 && !chosen} badge={chosen && b >= 11 && b <= 24} />
        </motion.g>
      })}
      <Visible show={b >= 11 && b <= 17}>
        <Label x={324} y={558} size={28} fill={ORANGE}>the same eight</Label>
        <Visible show={b >= 12}><Label x={324} y={594} size={20} fill="#817664">one routing step · not the whole 18B</Label></Visible>
      </Visible>
      <Visible show={b === 11 || b === 12}>
        <Label x={1000} y={711} size={25} fill="#817664">280 not selected for this step</Label>
      </Visible>
      <Visible show={b === 14}><Label x={505} y={383} size={74} fill="#a58a38">?</Label></Visible>

      {/* The front desk is the same actor when we finally label it ROUTER. */}
      <motion.g style={{ transformOrigin: '0px 0px' }} initial={false} animate={{ ...desk, opacity: b >= 8 && b <= 24 ? 1 : 0 }} transition={spring}>
        <circle cy="-57" r="25" fill={PAPER} stroke={INK} strokeWidth="2.2" />
        <circle cx="-8" cy="-59" r="2.5" fill={INK} /><circle cx="8" cy="-59" r="2.5" fill={INK} />
        <path d="M-13-28h26l8 39h-42Z" fill="#bfd0db" stroke={INK} strokeWidth="2" />
        <motion.path initial={false} animate={{ d: b >= 9 ? 'M-13-15-30 3M13-15 45-37' : 'M-13-15-31-1M13-15 31-1' }} transition={spring} stroke={INK} strokeWidth="2.5" fill="none" />
        <path d="M-55 12H55v46H-55Z M-44 58v17M44 58v17" fill="#d5dfe3" stroke={INK} strokeWidth="2.5" />
        <Label x={0} y={43} size={21} fill={BLUE}>{b >= 16 ? 'ROUTER' : 'FRONT DESK'}</Label>
        <Visible show={b === 16}><ellipse cy="-3" rx="76" ry="88" fill="none" stroke={BLUE} strokeWidth="2" strokeDasharray="6 5" /></Visible>
      </motion.g>

      {/* Same word from arrival to the entrance, including the proposal. */}
      <motion.g style={{ transformOrigin: '0px 0px' }} data-word="persistent" initial={false} animate={{ ...word, opacity: b >= 8 && b < 26 ? 1 : 0 }} transition={b === 26 ? { duration: reduced ? 0 : 1.2, ease: 'easeInOut' } : spring}>
        <path d="M-79-29 78-33l4 65-160 2Z" fill="#ead4ac" stroke={INK} strokeWidth="2" />
        <Label x={0} y={9} size={29}>“scared”</Label>
      </motion.g>

      <Visible show={b === 9}><Label x={350} y={461} size={26} fill={BLUE}>reads the current representation</Label></Visible>
      <Visible show={b === 15}><Label x={320} y={695} size={34} fill={BLUE}>Why not keep just this part?</Label></Visible>
      <Visible show={b === 21}><Label x={849} y={716} size={39} fill="#a58a38">That sounds like it should work…</Label></Visible>
      <Visible show={b === 22}><Label x={849} y={731} size={37}>And if not…</Label></Visible>
      <Visible show={b === 23}>
        <Label x={902} y={746} size={43}>If we only load what we need,</Label>
        <Label x={902} y={799} size={43}>why can’t we use far less memory?</Label>
        <path d="M781 813q179 8 381-2" stroke="#a58a38" strokeWidth="3" fill="none" />
      </Visible>

      {/* The sheet is pushed across the stage, not simply switched off. */}
      <motion.g style={{ transformOrigin: '0px 0px' }} data-architecture-sheet="true" initial={false} animate={{ x: b >= 25 ? 1730 : 680, y: b >= 25 ? 335 : 218, rotate: b >= 25 ? 13 : -3, opacity: b >= 24 ? 1 : 0 }} transition={b >= 25 ? { duration: reduced ? 0 : 0.95, ease: 'easeInOut' } : spring}>
        <rect x="0" y="0" width="590" height="497" fill={PAPER} stroke={INK} strokeWidth="3" />
        <Label x={295} y={51} size={28}>The full architecture</Label>
        {Array.from({ length: 48 }, (_, i) => <g key={i} transform={`translate(${40 + (i % 6) * 87} ${90 + Math.floor(i / 6) * 45})`}><rect width="69" height="27" fill={i % 4 ? '#deddd3' : '#cfddd7'} stroke="#8b8578" /><path d="M35 27v18m34-32h18" stroke="#8b8578" /></g>)}
        <Label x={295} y={475} size={20} fill="#8b8578">A map of the parts. We need to see the process.</Label>
      </motion.g>
      <Visible show={b >= 25}><Label x={1020} y={775} size={39}>One word. From the beginning.</Label></Visible>
    </svg>
    <motion.div className="g1-narrator-slot" initial={false}
      animate={{ left: b === 24 ? '36%' : b === 25 ? '91%' : '9%', top: b <= 5 ? '49%' : '69%', scale: b <= 5 ? 1.15 : 0.75 }}
      transition={b === 25 ? { duration: reduced ? 0 : 0.95, ease: 'easeInOut' } : spring}>
      <Narrator pose={pose} />
    </motion.div>
  </>
}
