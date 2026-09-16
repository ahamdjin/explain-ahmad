/**
 * Records the piece as video, at authored beat timing.
 *
 * Runs /watch in autoplay so the timeline drives, then saves whatever
 * Playwright captured. Use it to watch pacing as pacing -- stills cannot show
 * you that a beat is two seconds short.
 *
 *   node scripts/record.mjs                 # the whole thing
 *   node scripts/record.mjs --section=4     # one chapter
 *   node scripts/record.mjs --width=1280    # smaller, faster
 */
import { spawn } from 'node:child_process'
import { mkdir, readdir, readFile, rename, rm } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const WIDTH = Number(args.get('width') ?? 1920)
const HEIGHT = Math.round((WIDTH * 9) / 16)
const ONLY = args.get('section')
const OUT = path.resolve(args.get('out') ?? 'output/recordings')

/** Runtime comes from the beats, so the recorder never guesses. */
async function plannedSeconds() {
  const root = 'src/videos/glm-320b/video-1'
  const dirs = (await readdir(root, { withFileTypes: true }))
    .filter((e) => e.isDirectory() && /^section-\d\d$/.test(e.name))
    .map((e) => e.name)
    .sort()

  let total = 0
  const perSection = new Map()
  for (const dir of dirs) {
    const source = await readFile(path.join(root, dir, 'beats.ts'), 'utf8')
    const secs = [...source.matchAll(/\n {4}secs: ([0-9.]+),/g)].reduce((sum, m) => sum + Number(m[1]), 0)
    perSection.set(dir.slice(-2), secs)
    total += secs
  }
  return { total, perSection }
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

const { total, perSection } = await plannedSeconds()
/* Placeholders hold for 2.6s each in autoplay; none remain, but be honest if
 * one comes back. */
const seconds = ONLY ? (perSection.get(String(ONLY).padStart(2, '0')) ?? 60) : total
const budget = Math.ceil(seconds + 8)

const server = await startServer()
await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

console.log(`recording ${ONLY ? `section ${ONLY}` : 'the whole piece'} — ${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')} at ${WIDTH}x${HEIGHT}`)

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  recordVideo: { dir: OUT, size: { width: WIDTH, height: HEIGHT } },
  reducedMotion: 'no-preference',
})
const page = await context.newPage()
const errors = []
page.on('pageerror', (error) => errors.push(error.message))
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text())
})

const url = `${server.url}/watch?play=1&chrome=0${ONLY ? `&section=${ONLY}` : ''}`
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(budget * 1000)

const video = page.video()
await context.close()
await browser.close()
await server.stop()

if (video) {
  const from = await video.path()
  const name = ONLY ? `section-${String(ONLY).padStart(2, '0')}.webm` : 'whole-piece.webm'
  await rename(from, path.join(OUT, name))
  console.log(`\n${path.join(OUT, name)}`)
}
if (errors.length) {
  console.log(`\n${errors.length} console error(s):`)
  for (const error of [...new Set(errors)].slice(0, 8)) console.log(`  ! ${error}`)
}
