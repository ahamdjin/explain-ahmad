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
 * ## Surfaces
 *
 * Some actors are a **backdrop**: the room in §6-§7 is a paper sheet with walls,
 * drawn precisely so that other actors can stand on it. Everything inside it
 * overlaps it by construction, and that is the composition working rather than
 * a fault -- so it is reported once per beat per occupant and drowns out real
 * collisions. Nor is trimming it to its strokes enough: a wall is a long thin
 * path whose *bounding rect* still spans the room.
 *
 * An actor marked `data-surface` is therefore not measured at all. Use it only
 * for something whose job is to have other things on top of it.
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
import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

/*
 * Which film. Defaults to Video 1, so every existing invocation is unchanged.
 *
 *   VIDEO=apollo-o1/video-2 npm run check:overlap
 */
const VIDEO = process.env.VIDEO ?? 'glm-320b/video-1'
/*
 * Route prefix for that film. Video 1's sections are served at /section-NN;
 * Video 2's at /video-2/section-NN. Derived from VIDEO so callers pass one
 * thing, and overridable for anything that does not follow the pattern.
 */
const ROUTE = process.env.ROUTE ?? (VIDEO.startsWith('glm-320b') ? '' : `/${VIDEO.split('/').pop()}`)

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

/* Whatever sections the chosen film actually has, so this is not pinned to
   Video 1's count of thirteen. */
const ALL = (await readdir(path.resolve(`src/videos/${VIDEO}`)))
  .filter((d) => /^section-\d\d$/.test(d))
  .map((d) => d.slice(-2))
  .sort()
const SECTIONS = args.has('section')
  ? [String(args.get('section')).replace(/^section-/, '').padStart(2, '0')]
  : ALL

const ALLOW_FILE = path.resolve('scripts/accepted-overlaps.json')
const allow = existsSync(ALLOW_FILE) ? JSON.parse(await readFile(ALLOW_FILE, 'utf8')) : { accepted: [] }
const accepted = new Set((allow.accepted ?? []).map((row) => `${row.section}/${row.beat}/${row.pair}`))

async function beatsOf(section) {
  const source = await readFile(path.resolve(`src/videos/${VIDEO}/section-${section}/beats.ts`), 'utf8')
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
      /*
       * +2600, not +1200. `Counter` counts up, and a frame shot 1200ms after
       * the stage that starts it was photographed mid-count -- §12 beat 11
       * captured as `12,094` against a true 288 x 42 = 12,096.
       *
       * 2600 and not 1900 because the default 1.4s is not the longest: §12
       * passes `seconds={1.8}`, which left 1900 with 100ms of slack and still
       * caught the count in motion. A mid-count frame is also unstable *text*,
       * so `accepted-overlaps.json` could never key a pair against it.
       *
       * The margin has to clear the longest settling animation, not the
       * shortest, with enough slack to survive render jitter.
       */
      settle: Math.max(3400, (offsets.length ? Math.max(...offsets) : 0) + 2600),
    })
  }
  return beats
}

async function startServer() {
  if (args.has('url')) return { url: args.get('url').replace(/\/$/, ''), stop: async () => {} }

  const host = '127.0.0.1'
  const port = Number(args.get('port') ?? 4174)
  const url = `http://${host}:${port}`
  const child = spawn('npx', ['vite', '--host', host, '--port', String(port), '--strictPort'], {
    stdio: ['ignore', 'ignore', 'pipe'],
    env: { ...process.env, NO_COLOR: '1' },
  })
  let stderr = ''
  child.stderr?.on('data', (chunk) => {
    stderr += chunk.toString()
  })

  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`vite exited early with code ${child.exitCode}${stderr ? `\n${stderr}` : ''}`)
    }
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.status >= 200 && response.status < 500) {
        return { url, stop: async () => void child.kill('SIGTERM') }
      }
    } catch {
      // Server is not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  child.kill('SIGTERM')
  throw new Error(`vite did not answer ${url} within 30s${stderr ? `\n${stderr}` : ''}`)
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

  /**
   * A leaf's rect, clipped by every ancestor that hides its overflow.
   *
   * Without this the checker measures elements that are mostly *not on
   * screen*. §2's terminal streams a whole file through a fixed window: the
   * list element is 1450px tall, the window shows 520px of it, and the rest is
   * clipped by `overflow: hidden`. Measured unclipped it reached the goal
   * strip at the bottom of the frame and reported an 83% collision that a
   * screenshot plainly does not contain.
   *
   * Any scrolling or masked surface has the same shape, so this is a class of
   * false positive rather than one case.
   */
  const clipped = (node) => {
    let r = node.getBoundingClientRect()
    for (let p = node.parentElement; p; p = p.parentElement) {
      const o = getComputedStyle(p)
      if (o.overflowX === 'visible' && o.overflowY === 'visible') continue
      const c = p.getBoundingClientRect()
      const left = Math.max(r.left, c.left)
      const top = Math.max(r.top, c.top)
      const right = Math.min(r.right, c.right)
      const bottom = Math.min(r.bottom, c.bottom)
      if (right <= left || bottom <= top) return null
      r = { left, top, right, bottom, width: right - left, height: bottom - top }
    }
    return r
  }

  const name = (el) => {
    const cls = [...el.classList].find((c) => c.startsWith('s1-')) ?? el.tagName.toLowerCase()
    const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 28)
    return text ? `${cls} “${text}”` : cls
  }

  const roots = [...document.querySelectorAll(ROOTS)].filter(shown)
  /* Drop roots nested inside another root: the outer one owns that ink. And
     drop backdrops entirely -- see "Surfaces" above. */
  const tops = roots.filter(
    (el) =>
      !roots.some((other) => other !== el && other.contains(el)) &&
      !(el.matches('[data-surface]') || el.querySelector('[data-surface]')),
  )

  const actors = tops.map((el, index) => {
    const leaves = []
    const walk = (node) => {
      const kids = [...node.children]
      /* SVG shapes are leaves even when they have children (<g>). */
      const isShape = node instanceof SVGGraphicsElement && node.tagName !== 'svg' && node.tagName !== 'g'
      if (!kids.length || isShape) {
        if (!visible(node)) return
        const r = clipped(node)
        if (r && r.width >= minSide && r.height >= minSide) leaves.push(r)
        return
      }
      for (const kid of kids) if (visible(kid)) walk(kid)
    }
    walk(el)
    /* An element with no qualifying leaves still paints (a bare label). */
    if (!leaves.length) {
      const r = clipped(el)
      if (r && r.width >= minSide && r.height >= minSide) leaves.push(r)
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
      await page.goto(`${server.url}${ROUTE}/section-${section}?beat=${beat.n}`, { waitUntil: 'load' })
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

/*
 * Print the rows ready to paste.
 *
 * The allow list is keyed on `section/beat/pair`, and `pair` carries the
 * actors' own text including curly quotes. Hand-transcribing that from the
 * report above does not work -- five entries written by eye in one sitting all
 * failed to match, silently, and the collisions kept being reported as new.
 * Emit the exact keys instead.
 */
if (args.has('accept')) {
  console.log(`\n--- paste into scripts/accepted-overlaps.json, and write a real "why" ---`)
  console.log(JSON.stringify(
    found.map((h) => ({ section: h.section, beat: h.beat, pair: h.pair, why: 'TODO' })),
    null, 2,
  ))
}
process.exit(1)
