/**
 * Finds beats that leave most of the frame empty.
 *
 * ## Why this exists
 *
 * Every existing check asks whether something is *wrong* -- drawn on top of
 * another thing, cut off, off the edge. None of them asks whether there is
 * enough on screen to be worth looking at, so a beat can pass all of them by
 * putting one small object in the middle of an empty page.
 *
 * Looking at the 23 still beats as a contact sheet, that is most of what is
 * wrong with them. §3 beat 1 is two labels in a corner. §8 beat 11 is a line
 * with a dot on it. §5 beat 2 is a single drive icon in the lower right. They
 * are not broken; they are empty, and emptiness reads as nothing happening.
 *
 * ## What it measures
 *
 * Two numbers, because they catch different faults:
 *
 *   **span**  the bounding box of everything visible, as a share of the frame.
 *             Low span means the content huddles in one part of the picture.
 *   **cover** the share of a 40x24 grid whose cells any object covers. Low
 *             cover with high span means a few small things flung wide apart.
 *
 * A frame is called thin when either is under its floor. The floors are set
 * where the contact sheet says they belong, not at an ideal: plenty of good
 * beats are deliberately sparse, and the point is to find the ones nobody
 * would call composed.
 *
 *   node scripts/check-fill.mjs
 *   VIDEO=apollo-o1/video-2 node scripts/check-fill.mjs --section=05
 */
import { spawn } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const VIDEO = process.env.VIDEO ?? 'apollo-o1/video-2'
const ROUTE = process.env.ROUTE ?? (VIDEO.startsWith('glm-320b') ? '' : `/${VIDEO.split('/').pop()}`)

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const SPAN_FLOOR = Number(args.get('span') ?? 34)
const COVER_FLOOR = Number(args.get('cover') ?? 9)

const dir = path.resolve(`src/videos/${VIDEO}`)
const ALL = (await readdir(dir)).filter((d) => /^section-\d\d$/.test(d)).map((d) => d.slice(-2)).sort()
const SECTIONS = args.has('section')
  ? [String(args.get('section')).replace(/^section-/, '').padStart(2, '0')]
  : ALL

async function beatsOf(section) {
  const src = await readFile(path.join(dir, `section-${section}`, 'beats.ts'), 'utf8')
  const beats = []
  for (const block of src.split('\n  {\n').slice(1)) {
    const n = block.match(/^ {4}n: (\d+),/)
    const id = block.match(/\n {4}id: '([^']*)',/)
    if (!n) continue
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
  const port = Number(args.get('port') ?? 4252)
  const url = `http://${host}:${port}`
  const child = spawn('npx', ['vite', '--host', host, '--port', String(port), '--strictPort'], { stdio: 'ignore' })
  const deadline = Date.now() + 30_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`vite exited with ${child.exitCode}`)
    try {
      const r = await fetch(url, { redirect: 'manual' })
      if (r.status >= 200 && r.status < 500) return { url, stop: async () => void child.kill('SIGTERM') }
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  child.kill('SIGTERM')
  throw new Error('vite did not start')
}

function collect() {
  const frame = document.querySelector('.s1-frame')
  if (!frame) return null
  const f = frame.getBoundingClientRect()

  /* Only leaves. A Slot's own box is its child's, and counting wrappers as
     well would credit the same ink twice. */
  const boxes = []
  for (const el of document.querySelectorAll('.s1-slot, .cf-plate, .s1-holder')) {
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.06) continue
    const r = el.getBoundingClientRect()
    if (r.width < 10 || r.height < 8) continue
    boxes.push({
      x: (r.left - f.left) / f.width,
      y: (r.top - f.top) / f.height,
      w: r.width / f.width,
      h: r.height / f.height,
    })
  }
  if (!boxes.length) return { span: 0, cover: 0, count: 0 }

  const left = Math.max(0, Math.min(...boxes.map((b) => b.x)))
  const top = Math.max(0, Math.min(...boxes.map((b) => b.y)))
  const right = Math.min(1, Math.max(...boxes.map((b) => b.x + b.w)))
  const bottom = Math.min(1, Math.max(...boxes.map((b) => b.y + b.h)))
  const span = Math.max(0, (right - left)) * Math.max(0, (bottom - top))

  const COLS = 40
  const ROWS = 24
  let hit = 0
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const cx = (c + 0.5) / COLS
      const cy = (r + 0.5) / ROWS
      if (boxes.some((b) => cx >= b.x && cx <= b.x + b.w && cy >= b.y && cy <= b.y + b.h)) hit += 1
    }
  }
  return { span: Math.round(span * 100), cover: Math.round((hit / (COLS * ROWS)) * 100), count: boxes.length }
}

const server = await startServer()
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })

const rows = []
try {
  for (const section of SECTIONS) {
    for (const beat of await beatsOf(section)) {
      await page.goto(`${server.url}${ROUTE}/section-${section}?beat=${beat.n}&chrome=0`, { waitUntil: 'load' })
      await page.waitForTimeout(beat.settle)
      rows.push({ section, ...beat, ...(await page.evaluate(collect)) })
    }
    process.stdout.write(`  §${section} `)
  }
} finally {
  await browser.close()
  await server.stop()
}

console.log('\n')
const thin = rows.filter((r) => r.span < SPAN_FLOOR || r.cover < COVER_FLOOR)
thin.sort((a, b) => a.span + a.cover - (b.span + b.cover))
for (const r of thin) {
  console.log(
    `§${r.section} b${String(r.n).padStart(2)} ${r.id.padEnd(26)}` +
      `  span ${String(r.span).padStart(3)}%  cover ${String(r.cover).padStart(2)}%  ${r.count} object(s)`,
  )
}
const avgSpan = Math.round(rows.reduce((s, r) => s + r.span, 0) / rows.length)
const avgCover = Math.round(rows.reduce((s, r) => s + r.cover, 0) / rows.length)
console.log(`\n${thin.length} thin frame(s) of ${rows.length}.  film average: span ${avgSpan}%  cover ${avgCover}%`)
process.exit(thin.length ? 1 : 0)
