/**
 * Finds beats that do not use their frame.
 *
 * ## Why this exists
 *
 * `check:overlap` catches things drawn on top of each other. Nothing catches
 * the opposite fault: a beat whose objects are all small, all bunched into one
 * corner, with half the frame empty cream. Every one of those reads on a
 * screen as "there is nothing here", and the whole film was built that way
 * before anyone shot a full-frame still of it.
 *
 * It also catches type that is too small to read at all. §1 beat 1 rendered
 * the evaluation transcript at roughly 4px of line height -- real content,
 * real component, physically unreadable.
 *
 * ## What it measures
 *
 * The same leaf ink `check:overlap` measures, then three things about it:
 *
 *   fill      union bounding box of all ink, as a share of the frame
 *   ink       sum of leaf areas, as a share of the frame -- fill can be high
 *             because two small things sit in opposite corners
 *   smallest  the smallest painted text on screen, in px
 *
 * A beat is reported when its ink sits under `--min-ink`, its union box under
 * `--min-fill`, or it paints text below `--min-text`. Those are framing
 * smells, not proofs: a single held word is a legitimate frame. Read the
 * report as a worklist, shot in descending badness.
 *
 *   node scripts/check-framing.mjs
 *   VIDEO=apollo-o1/video-2 node scripts/check-framing.mjs --section=05
 */
import { spawn } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const VIDEO = process.env.VIDEO ?? 'glm-320b/video-1'
const ROUTE = process.env.ROUTE ?? (VIDEO.startsWith('glm-320b') ? '' : `/${VIDEO.split('/').pop()}`)

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const WIDTH = Number(args.get('width') ?? 1600)
const HEIGHT = Number(args.get('height') ?? 900)
/** Share of the frame the union box must reach. */
const MIN_FILL = Number(args.get('min-fill') ?? 0.34)
/** Share of the frame actual ink must reach. */
const MIN_INK = Number(args.get('min-ink') ?? 0.045)
/** Text below this cannot be read on a phone at 1080p. */
const MIN_TEXT = Number(args.get('min-text') ?? 11)
const MIN_SIDE = 8

const ALL = (await readdir(path.resolve(`src/videos/${VIDEO}`)))
  .filter((d) => /^section-\d\d$/.test(d))
  .map((d) => d.slice(-2))
  .sort()
const SECTIONS = args.has('section')
  ? [String(args.get('section')).replace(/^section-/, '').padStart(2, '0')]
  : ALL

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
      settle: Math.max(3400, (offsets.length ? Math.max(...offsets) : 0) + 2600),
    })
  }
  return beats
}

async function startServer() {
  if (args.has('url')) return { url: args.get('url').replace(/\/$/, ''), stop: async () => {} }
  const host = '127.0.0.1'
  const port = Number(args.get('port') ?? 4176)
  const url = `http://${host}:${port}`
  const child = spawn('npx', ['vite', '--host', host, '--port', String(port), '--strictPort'], {
    stdio: ['ignore', 'ignore', 'pipe'],
    env: { ...process.env, NO_COLOR: '1' },
  })
  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`vite exited with ${child.exitCode}`)
    try {
      const response = await fetch(url, { redirect: 'manual' })
      if (response.status >= 200 && response.status < 500) {
        return { url, stop: async () => void child.kill('SIGTERM') }
      }
    } catch {
      // not listening yet
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  child.kill('SIGTERM')
  throw new Error(`vite did not answer ${url} within 30s`)
}

/** Runs in the page. Same leaf-ink walk as check:overlap, measured instead of paired. */
function measure({ minSide }) {
  const ROOTS = '.s1-slot, .s1-note, .s1-brace, .s1-bubble, .s1-arrow, .s1-tick'

  const visible = (el) => {
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none') return false
    if (Number(cs.opacity) < 0.06) return false
    return true
  }
  const shown = (el) => {
    for (let node = el; node && node !== document.body; node = node.parentElement) {
      if (!visible(node)) return false
      if (node.getAttribute?.('aria-hidden') === 'true') return false
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
   *
   * Two ancestors must be left out of it, or this silently measures nothing:
   *
   * - **`body` and `html`.** This app positions everything fixed or absolute,
   *   so `body` lays out at zero height while computing `overflow: hidden`.
   *   Intersecting with it collapsed every rect to nothing, every actor
   *   became invisible to the checker, and `check:overlap` reported all 107
   *   beats of Video 2 and all 173 of Video 1 clean while measuring not one
   *   pixel. A green run that inspected nothing is worse than a red one.
   *
   * - **Any ancestor with a zero-area rect**, for the same reason: a box with
   *   no layout height is not clipping anything, whatever its overflow says.
   */
  const clipped = (node) => {
    let r = node.getBoundingClientRect()
    for (let p = node.parentElement; p && p !== document.body; p = p.parentElement) {
      const o = getComputedStyle(p)
      if (o.overflowX === 'visible' && o.overflowY === 'visible') continue
      const c = p.getBoundingClientRect()
      if (c.width === 0 || c.height === 0) continue
      const left = Math.max(r.left, c.left)
      const top = Math.max(r.top, c.top)
      const right = Math.min(r.right, c.right)
      const bottom = Math.min(r.bottom, c.bottom)
      if (right <= left || bottom <= top) return null
      r = { left, top, right, bottom, width: right - left, height: bottom - top }
    }
    return r
  }

  const roots = [...document.querySelectorAll(ROOTS)].filter(shown)
  const tops = roots.filter((el) => !roots.some((other) => other !== el && other.contains(el)))

  const leaves = []
  let smallest = Infinity
  let smallestText = ''
  const walk = (node) => {
    const kids = [...node.children]
    const isShape = node instanceof SVGGraphicsElement && node.tagName !== 'svg' && node.tagName !== 'g'
    if (!kids.length || isShape) {
      if (!visible(node)) return
      const r = clipped(node)
      if (!r || r.width < minSide || r.height < minSide) return
      leaves.push(r)
      /* Only measure type that is actually a text run, not an icon glyph. */
      const text = (node.textContent ?? '').trim()
      if (text.length >= 6) {
        const size = Number.parseFloat(getComputedStyle(node).fontSize)
        if (Number.isFinite(size) && size < smallest) {
          smallest = size
          smallestText = text.replace(/\s+/g, ' ').slice(0, 34)
        }
      }
      return
    }
    for (const kid of kids) if (visible(kid)) walk(kid)
  }
  for (const el of tops) {
    const before = leaves.length
    walk(el)
    if (leaves.length === before) {
      const r = clipped(el)
      if (r && r.width >= minSide && r.height >= minSide) leaves.push(r)
    }
  }

  if (!leaves.length) return { empty: true }

  const box = leaves.reduce(
    (acc, r) => ({
      left: Math.min(acc.left, r.left),
      top: Math.min(acc.top, r.top),
      right: Math.max(acc.right, r.right),
      bottom: Math.max(acc.bottom, r.bottom),
    }),
    { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity },
  )

  const frame = window.innerWidth * window.innerHeight
  return {
    empty: false,
    actors: tops.length,
    fill: ((box.right - box.left) * (box.bottom - box.top)) / frame,
    ink: leaves.reduce((sum, r) => sum + r.width * r.height, 0) / frame,
    box: {
      left: Math.round(box.left),
      top: Math.round(box.top),
      right: Math.round(box.right),
      bottom: Math.round(box.bottom),
    },
    smallest: Number.isFinite(smallest) ? Math.round(smallest * 10) / 10 : null,
    smallestText,
  }
}

const server = await startServer()
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })

const rows = []
let checked = 0

try {
  for (const section of SECTIONS) {
    const all = await beatsOf(section)
    const wanted = args.has('beats') ? new Set(String(args.get('beats')).split(',').map(Number)) : null
    for (const beat of wanted ? all.filter((b) => wanted.has(b.n)) : all) {
      await page.goto(`${server.url}${ROUTE}/section-${section}?beat=${beat.n}`, { waitUntil: 'load' })
      await page.waitForTimeout(beat.settle)
      const m = await page.evaluate(measure, { minSide: MIN_SIDE })
      checked += 1
      rows.push({ section, ...beat, ...m })
    }
    process.stdout.write(`  §${section} `)
  }
} finally {
  await browser.close()
  await server.stop()
}

console.log('\n')

const faults = rows.filter(
  (r) => r.empty || r.fill < MIN_FILL || r.ink < MIN_INK || (r.smallest !== null && r.smallest < MIN_TEXT),
)

/* Worst first: a beat failing on ink *and* text is a worse shot than one
   failing narrowly on fill. */
const badness = (r) =>
  (r.empty ? 10 : 0) +
  Math.max(0, MIN_INK - (r.ink ?? 0)) / MIN_INK +
  Math.max(0, MIN_FILL - (r.fill ?? 0)) / MIN_FILL +
  (r.smallest !== null && r.smallest < MIN_TEXT ? (MIN_TEXT - r.smallest) / MIN_TEXT : 0)

for (const r of faults.sort((a, b) => badness(b) - badness(a))) {
  if (r.empty) {
    console.log(`§${r.section} beat ${String(r.n).padStart(2)} — ${r.id}\n     nothing painted`)
    continue
  }
  const why = []
  if (r.ink < MIN_INK) why.push(`ink ${(r.ink * 100).toFixed(1)}%`)
  if (r.fill < MIN_FILL) why.push(`fill ${(r.fill * 100).toFixed(0)}%`)
  if (r.smallest !== null && r.smallest < MIN_TEXT) why.push(`text ${r.smallest}px “${r.smallestText}”`)
  console.log(`§${r.section} beat ${String(r.n).padStart(2)} — ${r.id}`)
  console.log(
    `     ${why.join(' · ')}` +
      `\n     ${r.actors} actor(s) inside ${r.box.left},${r.box.top} → ${r.box.right},${r.box.bottom}` +
      ` of ${WIDTH}×${HEIGHT}`,
  )
}

const median = (list) => {
  const sorted = [...list].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)] ?? 0
}
const live = rows.filter((r) => !r.empty)
console.log(
  `\n${faults.length} of ${checked} beat(s) under-use the frame.` +
    `\nmedian ink ${(median(live.map((r) => r.ink)) * 100).toFixed(1)}%` +
    ` · median fill ${(median(live.map((r) => r.fill)) * 100).toFixed(0)}%`,
)
process.exit(faults.length ? 1 : 0)
