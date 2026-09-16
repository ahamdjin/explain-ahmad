/**
 * Opens every production entry and every direct section route and fails on any
 * console error, page error or failed request.
 *
 *   npm run smoke
 *   npm run smoke -- --out=shots
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
const SETTLE = Number(args.get('settle') ?? 1200)
const OUT = path.resolve(args.get('out') ?? 'output/smoke')
const HOST = '127.0.0.1'
const PORT = Number(args.get('port') ?? 4173)
const BASE = `http://${HOST}:${PORT}`

async function routes() {
  const registry = await readFile('src/videos/registry.tsx', 'utf8')
  const titleSlug = registry.match(/VIDEO_SLUG = '([^']+)'/)?.[1]
  if (!titleSlug) throw new Error('VIDEO_SLUG is missing from src/videos/registry.tsx')
  const sectionSlugs = [...registry.matchAll(/slug: 'section-(\d+)'/g)].map((m) => `/section-${m[1]}`)
  return ['/', `/${titleSlug}`, `/${titleSlug}?section=13`, '/watch', '/video-1', ...sectionSlugs]
}

async function waitForServer(child) {
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
      const response = await fetch(BASE, { redirect: 'manual' })
      if (response.status >= 200 && response.status < 500) return
    } catch {
      // Server is not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  throw new Error(`vite did not answer ${BASE} within 30s${stderr ? `\n${stderr}` : ''}`)
}

async function startServer() {
  const child = spawn('npx', ['vite', '--host', HOST, '--port', String(PORT), '--strictPort'], {
    stdio: ['ignore', 'ignore', 'pipe'],
    env: { ...process.env, NO_COLOR: '1' },
  })
  try {
    await waitForServer(child)
  } catch (error) {
    child.kill('SIGTERM')
    throw error
  }
  return { url: BASE, stop: () => void child.kill('SIGTERM') }
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
    const response = await page.goto(server.url + route, { waitUntil: 'networkidle' })
    if (!response || !response.ok()) {
      failures.push(`${current}  HTTP ${response?.status() ?? 'no response'}`)
    }
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
