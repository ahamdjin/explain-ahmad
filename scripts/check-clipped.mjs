/**
 * Finds content cut off by its own container.
 *
 * ## Why this exists
 *
 * §2's terminal rendered the source file with every long line sliced off
 * mid-word -- "1-2 technical repor", "algorithm on exi". The cause was two
 * unrelated components sharing the class `.cf-tree`: the terminal's file
 * listing asked for 15cqw and the rate diagram's rule, declared later, gave
 * it 34. The file pane was left 448px for lines needing 676.
 *
 * Nothing caught it. `check:overlap` looks for things drawn *on top of* each
 * other and is blind to a thing quietly drawn *inside too small a box*. It
 * shipped in every frame of the section and was found by a human looking at
 * the screen, which is the one review method that does not scale.
 *
 * ## What it measures
 *
 * Every element that hides its overflow, compared against the content inside
 * it. A box whose `scrollWidth` exceeds its `clientWidth` is cutting text off
 * the right; `scrollHeight` over `clientHeight` is cutting it off the bottom.
 *
 * ## What it deliberately ignores
 *
 * Some things are *meant* to overflow a window, and they are the whole reason
 * `check:overlap` needed its clipping helper:
 *
 *   - a terminal streaming a long file through a fixed viewport, which is
 *     scrolled by the beat rather than by the reader
 *   - the evidence page inside its own frame
 *
 * Those are listed in SCROLLERS. Everything else is a fault: a box that was
 * sized for content it no longer holds.
 *
 *   node scripts/check-clipped.mjs
 *   VIDEO=apollo-o1/video-2 node scripts/check-clipped.mjs --section=02
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

/** Ignore a few px of rounding; chase real cuts. */
const SLACK = Number(args.get('slack') ?? 6)

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
  const port = Number(args.get('port') ?? 4240)
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
  /*
   * Windows that are supposed to show a slice of something longer, and
   * wrappers whose box is not a frame at all.
   *
   * `s1-camera` is the second kind: it scales the drawn world, so at any zoom
   * above 1 its own box is larger than the stage by construction and the
   * excess is what the zoom pushed out of shot. Measuring it reported every
   * push-in as a clipping fault.
   */
  const SCROLLERS = [
    'cf-stream', 'cf-evidence', 'cf-screen-body', 'cf-loupe-glass', 'cf-plate-shot',
    's1-camera', 's1-stage',
  ]
  const IGNORE_CHILD = ['s1-camera', 's1-stage']
  const out = []
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el)
    if (cs.overflow === 'visible' && cs.overflowX === 'visible' && cs.overflowY === 'visible') continue
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.06) continue
    if (SCROLLERS.some((c) => el.classList.contains(c))) continue
    const r = el.getBoundingClientRect()
    if (r.width < 24 || r.height < 12) continue
    const right = el.scrollWidth - el.clientWidth
    const bottom = el.scrollHeight - el.clientHeight
    if (right <= slack && bottom <= slack) continue
    const cls = [...el.classList].find((c) => c.startsWith('cf-') || c.startsWith('s1-')) ?? el.tagName.toLowerCase()
    /*
     * Name the child that is actually sticking out, not the box doing the
     * clipping. Reporting the container says "something inside .s1-page
     * overflows", which for a full-frame container is every fault in the
     * film and tells nobody which object to move.
     */
    const box = el.getBoundingClientRect()
    let worst = null
    for (const kid of el.querySelectorAll('*')) {
      const k = kid.getBoundingClientRect()
      if (k.width < 8 || k.height < 8) continue
      const over = Math.max(k.right - box.right, box.left - k.left, k.bottom - box.bottom, box.top - k.top)
      if (IGNORE_CHILD.some((c) => kid.classList.contains(c))) continue
      if (over > slack && (!worst || over > worst.over)) {
        worst = {
          over: Math.round(over),
          who: [...kid.classList].find((c) => c.startsWith('cf-') || c.startsWith('s1-')) ?? kid.tagName.toLowerCase(),
          text: (kid.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 40),
        }
      }
    }
    const text = worst ? worst.text : (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 40)
    out.push({
      cls: worst ? `${worst.who} out of ${cls}` : cls,
      right: right > slack ? right : 0,
      bottom: bottom > slack ? bottom : 0,
      text,
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
  console.log(`Nothing is cut off by its own box. ${checked} beat(s) checked.`)
  process.exit(0)
}

/* One line per distinct box, not per beat -- the same component clipped in
   nine beats is one fault to fix, not nine. */
const byBox = new Map()
for (const f of found) {
  const key = `${f.cls}|${f.right}|${f.bottom}`
  if (!byBox.has(key)) byBox.set(key, { ...f, beats: [] })
  byBox.get(key).beats.push(`§${f.section} b${f.n}`)
}
for (const b of [...byBox.values()].sort((x, y) => y.right + y.bottom - (x.right + x.bottom))) {
  const cut = [b.right ? `${b.right}px off the right` : null, b.bottom ? `${b.bottom}px off the bottom` : null]
    .filter(Boolean)
    .join(', ')
  console.log(`${b.cls}  ${cut}`)
  console.log(`     “${b.text}”`)
  console.log(`     in ${b.beats.slice(0, 6).join(', ')}${b.beats.length > 6 ? ` +${b.beats.length - 6} more` : ''}`)
}
console.log(`\n${byBox.size} box(es) cutting their own content, across ${checked} beat(s).`)
process.exit(1)
