/**
 * Samples ONE beat transition as a strip of stills, so motion can be reviewed
 * frame by frame instead of only as a settled end state.
 *
 * This exists because video is not reviewable by everyone working on the
 * project. A strip is: it shows the arc, the timing, the overshoot, and whether
 * a staged reveal actually arrives in the order it was authored.
 *
 *   node scripts/motion-strip.mjs --beat=5
 *   node scripts/motion-strip.mjs --beat=5 --interval=60 --duration=2600
 */
import { spawn } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const BEAT = Number(args.get('beat') ?? 5)
/** Smaller than 1080p on purpose: strips are for judging arcs, not detail. */
const WIDTH = Number(args.get('width') ?? 960)
const HEIGHT = Number(args.get('height') ?? 540)
const INTERVAL = Number(args.get('interval') ?? 90)
const DURATION = Number(args.get('duration') ?? 2400)
const OUT = path.resolve(args.get('out') ?? `frames/motion-beat-${BEAT}`)

async function startServer() {
  if (args.has('url')) return { url: args.get('url').replace(/\/$/, ''), stop: async () => {} }
  const child = spawn('npx', ['vite', '--port', '0'], { stdio: ['ignore', 'pipe', 'inherit'], env: process.env })
  const url = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('vite did not report a URL within 60s')), 60_000)
    let buffer = ''
    child.stdout.on('data', (chunk) => {
      buffer += chunk.toString()
      const match = buffer.match(/http:\/\/localhost:(\d+)/)
      if (match) {
        clearTimeout(timer)
        resolve(`http://localhost:${match[1]}`)
      }
    })
    child.on('exit', (code) => reject(new Error(`vite exited early with code ${code}`)))
  })
  return { url, stop: async () => void child.kill('SIGTERM') }
}

const server = await startServer()
console.log(`server: ${server.url}`)

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
const shots = []

try {
  // Land on the PREVIOUS beat and let it settle, so we capture the real
  // transition into the beat under test rather than a page load.
  const from = Math.max(1, BEAT - 1)
  await page.goto(`${server.url}/section-01?frame=${from}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1800)

  await page.screenshot({ path: path.join(OUT, 't-0000.png') })
  shots.push({ t: 0, file: 't-0000.png' })

  const started = Date.now()
  await page.keyboard.press('ArrowRight')

  while (Date.now() - started < DURATION) {
    const t = Date.now() - started
    const file = `t-${String(t).padStart(4, '0')}.png`
    await page.screenshot({ path: path.join(OUT, file) })
    shots.push({ t, file })
    const spent = Date.now() - started - t
    await page.waitForTimeout(Math.max(0, INTERVAL - spent))
  }

  await writeFile(path.join(OUT, 'index.html'), sheet(shots), 'utf8')
  console.log(`\n${shots.length} samples of the transition into beat ${BEAT} → ${OUT}`)
  console.log(`review: open ${path.join(OUT, 'index.html')}`)
} finally {
  await browser.close()
  await server.stop()
}

function sheet(list) {
  return `<!doctype html>
<meta charset="utf-8" />
<title>Motion strip — beat ${BEAT}</title>
<style>
  body { margin:0; padding:28px; background:#E8E2D6; font:13px/1.5 ui-monospace,monospace; color:#2B2926; }
  h1 { font:600 15px/1.4 ui-sans-serif,system-ui,sans-serif; margin:0 0 4px; }
  p { margin:0 0 20px; color:#5F5A53; }
  .grid { display:grid; gap:14px; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); }
  figure { margin:0; background:#FBF8F1; border:1px solid rgba(43,41,38,.18); border-radius:3px; overflow:hidden; }
  img { display:block; width:100%; height:auto; }
  figcaption { padding:5px 8px; border-top:1px solid rgba(43,41,38,.12); }
</style>
<h1>Motion strip — transition into beat ${BEAT}</h1>
<p>${list.length} samples, every ${INTERVAL}ms across ${DURATION}ms. t=0 is the previous beat, settled.</p>
<div class="grid">
${list
  .map(
    (shot) =>
      `  <figure><img src="${shot.file}" alt="t=${shot.t}ms" loading="lazy" /><figcaption>t = ${shot.t}ms</figcaption></figure>`,
  )
  .join('\n')}
</div>
`
}
