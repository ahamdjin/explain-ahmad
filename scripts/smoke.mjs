/**
 * Visits every route, screenshots it, and fails on any console or page error.
 *
 * This exists because a route can be completely broken and still typecheck --
 * a missing stylesheet, a null in a lazy chunk, an SVG with a NaN in a path.
 * The only reliable way to know is to open all of them.
 *
 *   npm run smoke                 # every route, fail on error
 *   npm run smoke -- --out=shots  # keep the screenshots
 *
 * Video routes are read out of the registry rather than duplicated here, so a
 * new section is covered the moment it is registered.
 */
import { spawn } from 'node:child_process'
import { mkdir, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const WIDTH = Number(args.get('width') ?? 1440)
const HEIGHT = Number(args.get('height') ?? 900)
const SETTLE = Number(args.get('settle') ?? 2000)
const OUT = path.resolve(args.get('out') ?? 'output/smoke')

async function routes() {
  const registry = await readFile('src/videos/registry.tsx', 'utf8')
  const slugs = [...registry.matchAll(/slug: '([^']+)'/g)].map((m) => `/${m[1]}`)
  return ['/', '/watch', '/paper', '/styles', '/lab/trust', '/lab/navigation', '/lab/flow', '/lab/drag', '/lab/reveal', ...slugs]
}

async function startServer() {
  const child = spawn('npx', ['vite', '--port', '0'], { stdio: ['ignore', 'pipe', 'inherit'], env: process.env })
  const url = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('vite did not report a URL within 60s')), 60_000)
    let buffer = ''
    child.stdout.on('data', (chunk) => {
      buffer += chunk.toString()
      const match = buffer.match(/http:\/\/localhost:(\d+)/)
      if (match) {
        clearTimeout(timer)
        resolve(match[0])
      }
    })
    child.on('exit', (code) => reject(new Error(`vite exited early with code ${code}`)))
  })
  return { url, stop: () => void child.kill('SIGTERM') }
}

const list = await routes()
const server = await startServer()
await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })

const failures = []
let current = ''
page.on('console', (message) => {
  if (message.type() === 'error') failures.push(`${current}  console: ${message.text()}`)
})
page.on('pageerror', (error) => failures.push(`${current}  threw: ${error.message}`))
page.on('requestfailed', (request) => {
  if (request.resourceType() !== 'websocket') failures.push(`${current}  failed: ${request.url()}`)
})

try {
  for (const route of list) {
    current = route
    await page.goto(server.url + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(SETTLE)
    await page.evaluate(() => document.fonts.ready)
    const file = `${route.replace(/^\/$/, 'home').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}.png`
    await page.screenshot({ path: path.join(OUT, file) })
    console.log(`  ok  ${route}`)
  }
} finally {
  await browser.close()
  server.stop()
}

console.log(`\n${list.length} routes → ${OUT}`)
if (failures.length) {
  console.error(`\n${failures.length} problem(s):`)
  for (const line of [...new Set(failures)]) console.error(`  ! ${line}`)
  process.exit(1)
}
console.log('no console errors, no page errors, no failed requests.')
