/**
 * Records Section 01 playing through, so motion can actually be judged.
 *
 * Screenshots show settled end states, which is the one thing motion isn't.
 * This drives the real beat timing and writes a video.
 */
import { spawn } from 'node:child_process'
import { mkdir, readFile, readdir, rename, rm } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const WIDTH = Number(args.get('width') ?? 1920)
const HEIGHT = Number(args.get('height') ?? 1080)
/** Extra dwell on top of each beat's own hold, mimicking narration time. */
const DWELL = Number(args.get('dwell') ?? 1600)
const OUT = path.resolve(args.get('out') ?? 'frames/section-01-video')
const FROM = Number(args.get('from') ?? 1)
const TO = Number(args.get('to') ?? 0)

async function beatTimings() {
  const source = await readFile(path.resolve('src/videos/glm-320b/section-01/beats.ts'), 'utf8')
  // Mirrors HOLD in src/videos/glm-320b/section-01/motion.ts
  const holds = { want: 420, wall: 900, hope: 820, 'and-yet': 1100, so: 560, therefore: 620 }
  const blocks = source.split(/\n {2}\{\n/).slice(1)
  const beats = []

  for (const block of blocks) {
    const n = block.match(/^ {4}n: (\d+),/)
    if (!n) continue
    const id = block.match(/\n {4}id: '([^']*)',/)
    const relation = block.match(/\n {4}relation: '([^']*)',/)?.[1] ?? 'so'
    // Longest stage offset inside the beat, so recording waits for staged reveals.
    const stageOffsets = [...block.matchAll(/\bat: (\d+)\b/g)].map((match) => Number(match[1]))
    const longestStage = stageOffsets.length ? Math.max(...stageOffsets) : 0
    beats.push({
      n: Number(n[1]),
      id: id?.[1] ?? `beat-${n[1]}`,
      relation,
      hold: holds[relation] ?? holds.so,
      longestStage,
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
      if (match) {
        clearTimeout(timer)
        resolve(`http://localhost:${match[1]}`)
      }
    })
    child.on('exit', (code) => reject(new Error(`vite exited early with code ${code}`)))
  })
  return { url, stop: async () => void child.kill('SIGTERM') }
}

const beats = await beatTimings()
const last = TO || beats.length
const server = await startServer()
console.log(`server: ${server.url}`)

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  recordVideo: { dir: OUT, size: { width: WIDTH, height: HEIGHT } },
})
const page = await context.newPage()

try {
  await page.goto(`${server.url}/section-01?frame=${FROM}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  for (const beat of beats.filter((item) => item.n >= FROM && item.n <= last)) {
    const wait = beat.hold + beat.longestStage + DWELL
    console.log(`  ${String(beat.n).padStart(2)}  ${beat.id.padEnd(24)} ${beat.relation.padEnd(9)} ${wait}ms`)
    await page.waitForTimeout(wait)
    if (beat.n < last) await page.keyboard.press('ArrowRight')
  }

  await page.waitForTimeout(1400)
} finally {
  await context.close()
  await browser.close()
  await server.stop()
}

// Playwright names videos by an internal id; give it something findable.
const files = await readdir(OUT)
const video = files.find((file) => file.endsWith('.webm'))
if (video) {
  const named = `section-01-beats-${FROM}-${last}.webm`
  await rename(path.join(OUT, video), path.join(OUT, named))
  console.log(`\nvideo → ${path.join(OUT, named)}`)
  console.log('open it in Chrome (QuickTime will not play webm)')
} else {
  console.log('\nno video produced')
}
