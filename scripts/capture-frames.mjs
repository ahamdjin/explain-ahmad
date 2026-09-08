/**
 * Captures Section 01 storyboard frames.
 *
 * Separate from capture-beats.mjs because Section 01 is authored as 14 frames
 * against storyboard/section-01/FRAMES.md, not as beats in story.ts.
 */
import { spawn } from 'node:child_process'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'
import { transform } from 'esbuild'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const WIDTH = Number(args.get('width') ?? 1920)
const HEIGHT = Number(args.get('height') ?? 1080)
const SETTLE = Number(args.get('settle') ?? 1500)
const DEBUG = args.get('debug') === 'true'
const OUT = path.resolve(args.get('out') ?? 'frames/section-01')

async function loadFrameMeta() {
  const source = await readFile(path.resolve('src/videos/glm-320b/section-01/frames.tsx'), 'utf8')
  const table = source.match(/export const FRAMES[\s\S]*?\n\]/)
  if (!table) throw new Error('Could not locate the FRAMES table')

  // Keep only the serialisable metadata; render() pulls in React components.
  const stripped = table[0].replace(/render: \(\) => \([\s\S]*?\n {4}\),\n/g, '')
  const { code } = await transform(`${stripped}\nexport default FRAMES`, { loader: 'ts', format: 'esm' })
  const module = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)
  return module.default
}

function parseRange(spec, all) {
  if (!spec) return all.map((frame) => frame.n)
  const wanted = new Set()
  for (const part of spec.split(',')) {
    const range = part.match(/^(\d+)-(\d+)$/)
    if (range) {
      for (let n = Number(range[1]); n <= Number(range[2]); n += 1) wanted.add(n)
    } else if (part.trim()) {
      wanted.add(Number(part))
    }
  }
  return all.map((frame) => frame.n).filter((n) => wanted.has(n))
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

const frames = await loadFrameMeta()
const targets = parseRange(args.get('frames'), frames)
const server = await startServer()
console.log(`server: ${server.url}`)

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text())
})
page.on('pageerror', (error) => errors.push(error.message))

const captured = []

try {
  for (const n of targets) {
    const frame = frames.find((item) => item.n === n)
    await page.goto(`${server.url}/section-01?frame=${n}${DEBUG ? '&debug=1' : ''}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(SETTLE)
    const file = `frame-${String(n).padStart(2, '0')}-${frame.id}.png`
    await page.screenshot({ path: path.join(OUT, file) })
    captured.push({ ...frame, file })
    console.log(`  ${String(n).padStart(2)}  ${frame.title}`)
  }

  await writeFile(path.join(OUT, 'index.html'), sheet(captured), 'utf8')
  console.log(`\n${captured.length} frames → ${OUT}`)
  if (errors.length) {
    console.log(`\n${errors.length} console error(s):`)
    for (const error of [...new Set(errors)].slice(0, 10)) console.log(`  ! ${error}`)
  }
} finally {
  await browser.close()
  await server.stop()
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}

function sheet(list) {
  return `<!doctype html>
<meta charset="utf-8" />
<title>Section 01 — frames</title>
<style>
  body { margin:0; padding:32px; background:#E8E2D6; font:14px/1.5 ui-sans-serif,system-ui,sans-serif; color:#2B2926; }
  h1 { font-size:18px; margin:0 0 6px; }
  p.sub { margin:0 0 24px; color:#5F5A53; font-size:13px; }
  .grid { display:grid; gap:28px; grid-template-columns:repeat(auto-fill,minmax(560px,1fr)); }
  figure { margin:0; background:#FBF8F1; border:1px solid rgba(43,41,38,.18); border-radius:4px; overflow:hidden; }
  img { display:block; width:100%; height:auto; border-bottom:1px solid rgba(43,41,38,.12); }
  figcaption { display:grid; gap:4px; padding:12px 14px; }
  b { font:600 12px/1.4 ui-monospace,monospace; letter-spacing:.04em; }
  span { font-size:12px; color:#5F5A53; }
</style>
<h1>Section 01 — ${list.length} frames at ${WIDTH}x${HEIGHT}</h1>
<p class="sub">Compare against storyboard/section-01/*.png</p>
<div class="grid">
${list
  .map(
    (frame) => `  <figure>
    <img src="${frame.file}" alt="Frame ${frame.n}" loading="lazy" />
    <figcaption><b>${frame.n} · ${escapeHtml(frame.title)}</b><span>${escapeHtml(frame.vo)}</span></figcaption>
  </figure>`,
  )
  .join('\n')}
</div>
`
}
