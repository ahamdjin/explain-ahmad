/**
 * Finds actors that are drawn on top of each other.
 *
 * ## Why this exists
 *
 * Every actor is placed by a stage percentage, and nothing in the type system
 * relates one placement to another. So a beat that moves the row to 52/74 and a
 * beat that put the desk at 62/74 collide, and the only thing that ever notices
 * is a human looking at a picture. Four such collisions shipped into the contact
 * sheets before anyone saw them -- §2's list over the sentence, §5's building on
 * the row, §5's brace through the doors, §11's counter on the desk.
 *
 * `check:flow` compares *adjacent* frames and so cannot see this: a beat that
 * collides with itself looks like a perfectly good change from the beat before.
 *
 * ## What it measures
 *
 * Not actor bounding boxes -- those are mostly empty padding, and every honest
 * composition would fail. It measures **leaf ink**: the smallest elements that
 * actually paint something. Two leaves from different actors that overlap by
 * more than `--threshold` of the smaller one is a collision.
 *
 * ## The allowlist
 *
 * Overlap is not always a fault. A label belongs *on* the thing it labels, and
 * §5 beat 10's whole event is name-plates landing on experts. Those pairs live
 * in `scripts/accepted-overlaps.json` with a reason each, and the reason is the
 * point: an entry with no argument behind it is a bug someone silenced.
 *
 *   node scripts/check-overlap.mjs                 # every section
 *   node scripts/check-overlap.mjs --section=05    # one
 *   node scripts/check-overlap.mjs --beats=9,11    # with --section
 */
import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const WIDTH = Number(args.get('width') ?? 1920)
const HEIGHT = Number(args.get('height') ?? 1080)
/** Fraction of the *smaller* leaf that must be covered before it is a collision. */
const THRESHOLD = Number(args.get('threshold') ?? 0.34)
/** Ignore hairlines and single glyphs; they overlap harmlessly all the time. */
const MIN_SIDE = 8

const ALL = ['01','02','03','04','05','06','07','08','09','10','11','12','13']
const SECTIONS = args.has('section')
  ? [String(args.get('section')).replace(/^section-/, '').padStart(2, '0')]
  : ALL

const ALLOW_FILE = path.resolve('scripts/accepted-overlaps.json')
const allow = existsSync(ALLOW_FILE) ? JSON.parse(await readFile(ALLOW_FILE, 'utf8')) : { accepted: [] }
const accepted = new Set((allow.accepted ?? []).map((row) => `${row.section}/${row.beat}/${row.pair}`))

async function beatsOf(section) {
  const source = await readFile(path.resolve(`src/videos/glm-320b/video-1/section-${section}/beats.ts`), 'utf8')
  const blocks = source.split(/\n {2}\{\n/).slice(1)
  const beats = []
  for (const block of blocks) {
    const n = block.match(/^ {4}n: (\d+),/)
    if (!n) continue
    const id = block.match(/\n {4}id: '([^']*)',/)
    const offsets = [...block.matchAll(/\bat: (\d+)\b/g)].map((m) => Number(m[1]))
    beats.push({
      n: Number(n[1]),
      id: id?.[1] ?? `beat-${n[1]}`,
      /* Same rule as capture-frames: the beat's last staged reveal plus settle.
       * Shooting earlier photographs a frame the beat never rests on. */
      settle: Math.max(3400, (offsets.length ? Math.max(...offsets) : 0) + 1200),
    })
  }
  return beats
}

async function startServer() {
  if (args.has('url')) return { url: args.get('url').replace(/\/$/, ''), stop: async () => {} }
  const child = spawn('npx', ['vite', '--port', '0'], { stdio: ['ignore', 'pipe', 'inherit'], env: process.env })
  const url = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('vite did not report a URL within 60s')), 60_000)
    let buffer = ''
    child.stdout.on('data', (chunk) => {
      buffer += chunk.toString()
      const match = buffer.match(/http:\/\/localhost:(\d+)/)
      if (match) { clearTimeout(timer); resolve(`http://localhost:${match[1]}`) }
    })
    child.on('exit', (code) => reject(new Error(`vite exited early with code ${code}`)))
  })
  return { url, stop: async () => void child.kill('SIGTERM') }
}

/** Runs in the page. Returns collisions between leaf ink of different actors. */
function collect({ threshold, minSide }) {
  const ROOTS = '.s1-slot, .s1-note, .s1-brace, .s1-bubble, .s1-arrow, .s1-tick'

  const visible = (el) => {
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none') return false
    if (Number(cs.opacity) < 0.06) return false
    return true
  }

  /* An actor is only present if it and every ancestor are painted. A hidden
   * Slot still lays its children out, so opacity has to be walked upward. */
  const shown = (el) => {
    for (let node = el; node && node !== document.body; node = node.parentElement) {
      if (!visible(node)) return false
      if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') return false
    }
    return true
  }

  const name = (el) => {
    const cls = [...el.classList].find((c) => c.startsWith('s1-')) ?? el.tagName.toLowerCase()
    const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 28)
    return text ? `${cls} “${text}”` : cls
  }

  const roots = [...document.querySelectorAll(ROOTS)].filter(shown)
  /* Drop roots nested inside another root: the outer one owns that ink. */
  const tops = roots.filter((el) => !roots.some((other) => other !== el && other.contains(el)))

  const actors = tops.map((el, index) => {
    const leaves = []
    const walk = (node) => {
      const kids = [...node.children]
      /* SVG shapes are leaves even when they have children (<g>). */
      const isShape = node instanceof SVGGraphicsElement && node.tagName !== 'svg' && node.tagName !== 'g'
      if (!kids.length || isShape) {
        if (!visible(node)) return
        const r = node.getBoundingClientRect()
        if (r.width >= minSide && r.height >= minSide) leaves.push(r)
        return
      }
      for (const kid of kids) if (visible(kid)) walk(kid)
    }
    walk(el)
    /* An element with no qualifying leaves still paints (a bare label). */
    if (!leaves.length) {
      const r = el.getBoundingClientRect()
      if (r.width >= minSide && r.height >= minSide) leaves.push(r)
    }
    return { index, label: name(el), leaves }
  })

  const hits = []
  for (let i = 0; i < actors.length; i += 1) {
    for (let j = i + 1; j < actors.length; j += 1) {
      let worst = 0
      let where = null
      for (const a of actors[i].leaves) {
        for (const b of actors[j].leaves) {
          const w = Math.min(a.right, b.right) - Math.max(a.left, b.left)
          const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
          if (w <= 0 || h <= 0) continue
          const share = (w * h) / Math.min(a.width * a.height, b.width * b.height)
          if (share > worst) {
            worst = share
            where = { x: Math.round(Math.max(a.left, b.left)), y: Math.round(Math.max(a.top, b.top)) }
          }
        }
      }
      if (worst >= threshold) {
        hits.push({ a: actors[i].label, b: actors[j].label, share: Number(worst.toFixed(2)), where })
      }
    }
  }
  return hits.sort((x, y) => y.share - x.share)
}

const server = await startServer()
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })

const found = []
let checked = 0

try {
  for (const section of SECTIONS) {
    const all = await beatsOf(section)
    const wanted = args.has('beats')
      ? new Set(String(args.get('beats')).split(',').map(Number))
      : null
    const beats = wanted ? all.filter((b) => wanted.has(b.n)) : all

    for (const beat of beats) {
      await page.goto(`${server.url}/section-${section}?beat=${beat.n}`, { waitUntil: 'load' })
      await page.waitForTimeout(beat.settle)
      const hits = await page.evaluate(collect, { threshold: THRESHOLD, minSide: MIN_SIDE })
      checked += 1
      for (const hit of hits) {
        const pair = `${hit.a} × ${hit.b}`
        if (accepted.has(`${section}/${beat.n}/${pair}`)) continue
        found.push({ section, beat: beat.n, id: beat.id, ...hit, pair })
      }
    }
    process.stdout.write(`  §${section} `)
  }
} finally {
  await browser.close()
  await server.stop()
}

console.log(`\n`)
if (!found.length) {
  console.log(`Nothing is drawn on top of anything else. ${checked} beat(s) checked.`)
  process.exit(0)
}

let last = ''
for (const hit of found) {
  const where = `§${hit.section} beat ${hit.beat} — ${hit.id}`
  if (where !== last) { console.log(`\n${where}`); last = where }
  console.log(`  ${String(Math.round(hit.share * 100)).padStart(3)}%  ${hit.a}`)
  console.log(`        over  ${hit.b}   at ${hit.where.x},${hit.where.y}`)
}
console.log(
  `\n${found.length} collision(s) across ${checked} beat(s).` +
    `\nIf a pair is meant to overlap, add it to scripts/accepted-overlaps.json with the reason.`,
)
process.exit(1)
