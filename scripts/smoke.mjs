/**
 * Production browser smoke test.
 *
 * It proves three things:
 * 1. every public/QA route mounts without console, page or request errors;
 * 2. the title route and legacy redirects resolve;
 * 3. the guided UI actually works: Home → Open video → Chapters → §13.
 *
 * Screenshots are opt-in (`--out=...`) so CI verifies behavior instead of
 * spending most of its time writing disposable PNGs.
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
const SETTLE = Number(args.get('settle') ?? 700)
const OUT = args.has('out') ? path.resolve(args.get('out')) : null
const HOST = '127.0.0.1'
const PORT = Number(args.get('port') ?? 4173)
const BASE = `http://${HOST}:${PORT}`

async function productionRoutes() {
  const registry = await readFile('src/videos/registry.tsx', 'utf8')
  const titleSlug = registry.match(/VIDEO_SLUG = '([^']+)'/)?.[1]
  if (!titleSlug) throw new Error('VIDEO_SLUG is missing from src/videos/registry.tsx')
  const sectionSlugs = [...registry.matchAll(/slug: 'section-(\d+)'/g)].map((m) => `/section-${m[1]}`)
  return {
    titleSlug,
    routes: ['/', `/${titleSlug}`, `/${titleSlug}?section=13`, '/watch', '/video-1', ...sectionSlugs],
  }
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

const { titleSlug, routes } = await productionRoutes()
const server = await startServer()
if (OUT) {
  await rm(OUT, { recursive: true, force: true })
  await mkdir(OUT, { recursive: true })
}

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

async function open(route) {
  current = route
  const response = await page.goto(server.url + route, { waitUntil: 'domcontentloaded', timeout: 15_000 })
  if (!response || !response.ok()) failures.push(`${current}  HTTP ${response?.status() ?? 'no response'}`)
  await page.waitForTimeout(SETTLE)
  const mounted = await page.locator('#root > *').count()
  if (!mounted) failures.push(`${current}  React root is empty`)

  if (OUT) {
    await page.evaluate(() => document.fonts.ready)
    const file = `${route.replace(/^\/$/, 'home').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}.png`
    await page.screenshot({ path: path.join(OUT, file) })
  }
  console.log(`  ok  ${route}`)
}

try {
  for (const route of routes) await open(route)

  /* Verify the actual guided path the producer/viewer will use. */
  current = 'guided navigation'
  await open('/')
  await page.getByRole('link', { name: 'Open video' }).click()
  await page.waitForURL((url) => url.pathname === `/${titleSlug}`, { timeout: 10_000 })

  await page.getByRole('button', { name: /chapters/i }).click()
  const chapter13 = page.getByRole('button', { name: /13.*what 18b active actually buys/i })
  await chapter13.waitFor({ state: 'visible', timeout: 5_000 })
  await chapter13.click()
  await page.waitForFunction(() => new URL(window.location.href).searchParams.get('section') === '13', null, {
    timeout: 10_000,
  })
  console.log('  ok  guided navigation → title route → chapter 13')
} finally {
  await browser.close()
  server.stop()
}

console.log(`\n${routes.length} routes + guided navigation checked${OUT ? ` → ${OUT}` : ''}.`)
if (failures.length) {
  console.error(`\n${failures.length} problem(s):`)
  for (const line of [...new Set(failures)]) console.error(`  ! ${line}`)
  process.exit(1)
}
console.log('no console errors, no page errors, no failed requests, guided navigation works.')
