/**
 * Finds actors that hang over the edge of the frame.
 *
 * ## Why this exists
 *
 * `check-clipped` exempts everything inside `.s1-camera`, and it is right to:
 * a push-in pushes the world's edges out of shot, and calling that a fault
 * reported every zoom in the film. But the exemption is total, so the one
 * thing it hides is the fault a viewer actually notices -- a card authored a
 * few percent too wide or too far over, with a corner off the screen.
 *
 * ## What it measures
 *
 * Each visible `.s1-slot` against the frame, after the camera transform has
 * been applied -- `getBoundingClientRect` already reports screen space, so a
 * slot's rect is where it truly lands.
 *
 * ## The zoom rule
 *
 * At zoom 1 nothing may leave the frame: the stage is the shot.
 *
 * Above zoom 1 the frame is deliberately smaller than the world, so a slot
 * leaving it is only a fault when it is the slot being *looked at* -- one
 * partly in shot and partly out. A slot pushed entirely out of frame is
 * offscreen, which is a composition choice, not a cut edge. So above zoom 1
 * this reports only slots that straddle an edge.
 *
 *   node scripts/check-inframe.mjs
 *   VIDEO=apollo-o1/video-2 node scripts/check-inframe.mjs --section=07
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

/** A couple of px is rounding and antialiasing, not a fault. */
const SLACK = Number(args.get('slack') ?? 4)

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
  const port = Number(args.get('port') ?? 4243)
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

function collect({ slack }) {
  const frame = document.querySelector('.s1-frame')
  if (!frame) return []
  const f = frame.getBoundingClientRect()

  const cam = document.querySelector('.s1-camera')
  const zoom = cam ? (new DOMMatrixReadOnly(getComputedStyle(cam).transform)).a : 1

  const out = []
  for (const el of document.querySelectorAll('.s1-slot, .cf-plate, .s1-holder')) {
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.06) continue
    const r = el.getBoundingClientRect()
    if (r.width < 16 || r.height < 12) continue

    const over = {
      left: f.left - r.left,
      right: r.right - f.right,
      top: f.top - r.top,
      bottom: r.bottom - f.bottom,
    }
    const worst = Math.max(over.left, over.right, over.top, over.bottom)
    if (worst <= slack) continue

    /* Above zoom 1, a slot fully outside the frame is offscreen by choice. */
    const straddles = r.right > f.left && r.left < f.right && r.bottom > f.top && r.top < f.bottom
    if (zoom > 1.02 && !straddles) continue

    const side = Object.entries(over).sort((a, b) => b[1] - a[1])[0][0]
    const span = side === 'top' || side === 'bottom' ? r.height : r.width

    out.push({
      zoom: Math.round(zoom * 100) / 100,
      over: Math.round(worst),
      side,
      /* How much of the object is actually missing, which is what reads. */
      lost: Math.round((worst / span) * 100) || 0,
      w: Math.round(r.width),
      h: Math.round(r.height),
      text: (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 34),
    })
  }
  return out
}

const server = await startServer()
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })

const found = []
let checked = 0
try {
  for (const section of SECTIONS) {
    for (const beat of await beatsOf(section)) {
      await page.goto(`${server.url}${ROUTE}/section-${section}?beat=${beat.n}`, { waitUntil: 'load' })
      await page.waitForTimeout(beat.settle)
      checked += 1
      for (const hit of await page.evaluate(collect, { slack: SLACK })) {
        found.push({ section, ...beat, ...hit })
      }
    }
    process.stdout.write(`  §${section} `)
  }
} finally {
  await browser.close()
  await server.stop()
}

console.log('\n')
if (!found.length) {
  console.log(`Everything sits inside the frame. ${checked} beat(s) checked.`)
  process.exit(0)
}

found.sort((a, b) => b.over - a.over)
let where = ''
for (const hit of found) {
  const head = `§${hit.section} beat ${hit.n} — ${hit.id}`
  if (head !== where) console.log(`\n${head}`)
  where = head
  console.log(
    `  ${String(hit.over).padStart(4)}px off the ${hit.side}` +
      `  (${hit.lost}% of it)  zoom ${hit.zoom}  ${hit.w}x${hit.h}` +
      (hit.text ? `  “${hit.text}”` : ''),
  )
}
console.log(`\n${found.length} overhang(s) across ${checked} beat(s).`)
process.exit(1)
