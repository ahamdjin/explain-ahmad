import { spawn } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'
import { BEATS } from './beats.mjs'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const SLUG = args.get('slug') ?? 'why-320b-uses-18b'
const WIDTH = Number(args.get('width') ?? 1920)
const HEIGHT = Number(args.get('height') ?? 1080)
const SETTLE = Number(args.get('settle') ?? 1400)
const SCALE = Number(args.get('scale') ?? 1)
const DEBUG = args.get('debug') === 'true'
const OUT = path.resolve(args.get('out') ?? 'frames')

function parseBeats(spec) {
  if (!spec) return BEATS.map((beat) => beat.n)
  const wanted = new Set()
  for (const part of spec.split(',')) {
    const range = part.match(/^(\d+)-(\d+)$/)
    if (range) {
      for (let n = Number(range[1]); n <= Number(range[2]); n += 1) wanted.add(n)
    } else if (part.trim()) {
      wanted.add(Number(part))
    }
  }
  return BEATS.map((beat) => beat.n).filter((n) => wanted.has(n))
}

const targets = parseBeats(args.get('beats'))
if (!targets.length) {
  console.error('No matching beats. Use --beats=1-14 or --beats=1,7,12')
  process.exit(1)
}

async function startServer() {
  if (args.has('url')) return { url: args.get('url').replace(/\/$/, ''), stop: async () => {} }

  const child = spawn('npx', ['vite', '--port', '0', '--strictPort=false'], {
    stdio: ['ignore', 'pipe', 'inherit'],
    env: process.env,
  })

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

  return {
    url,
    stop: async () => {
      child.kill('SIGTERM')
    },
  }
}

const server = await startServer()
console.log(`server: ${server.url}`)

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: SCALE,
})

const captured = []

try {
  for (const n of targets) {
    const beat = BEATS.find((item) => item.n === n)
    const query = `beat=${n}${DEBUG ? '&debug=1' : ''}`
    await page.goto(`${server.url}/${SLUG}?${query}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(SETTLE)

    const file = `beat-${String(n).padStart(3, '0')}-${beat.id}.png`
    await page.screenshot({ path: path.join(OUT, file) })
    captured.push({ ...beat, file })
    console.log(`  ${String(n).padStart(3)}  ${beat.id}`)
  }

  await writeFile(path.join(OUT, 'index.html'), contactSheet(captured), 'utf8')
  console.log(`\n${captured.length} frames → ${OUT}`)
  console.log(`review: open ${path.join(OUT, 'index.html')}`)
} finally {
  await browser.close()
  await server.stop()
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]))
}

function contactSheet(frames) {
  const cards = frames
    .map(
      (frame) => `
    <figure>
      <img src="${frame.file}" alt="Beat ${frame.n}" loading="lazy" />
      <figcaption>
        <b>${frame.n} · ${escapeHtml(frame.chapter)} · ${escapeHtml(frame.id)}</b>
        <span><em>learn</em> ${escapeHtml(frame.learn)}</span>
        <span><em>cue</em> ${escapeHtml(frame.cue)}</span>
      </figcaption>
    </figure>`,
    )
    .join('\n')

  return `<!doctype html>
<meta charset="utf-8" />
<title>Beat contact sheet</title>
<style>
  :root { color-scheme: light; }
  body { margin: 0; padding: 32px; background: #E8E2D6; font: 14px/1.5 ui-sans-serif, system-ui, sans-serif; color: #2B2926; }
  h1 { font-size: 18px; margin: 0 0 24px; }
  .grid { display: grid; gap: 28px; grid-template-columns: repeat(auto-fill, minmax(520px, 1fr)); }
  figure { margin: 0; background: #FBF8F1; border: 1px solid rgba(43,41,38,.18); border-radius: 4px; overflow: hidden; }
  img { display: block; width: 100%; height: auto; border-bottom: 1px solid rgba(43,41,38,.12); }
  figcaption { display: grid; gap: 4px; padding: 12px 14px; }
  figcaption b { font: 600 12px/1.4 ui-monospace, monospace; letter-spacing: .04em; }
  figcaption span { font-size: 12px; color: #5F5A53; }
  em { font-style: normal; font-weight: 600; color: #807A72; margin-right: 6px; text-transform: uppercase; font-size: 10px; letter-spacing: .06em; }
</style>
<h1>Beat contact sheet — ${frames.length} frames at ${WIDTH}x${HEIGHT}</h1>
<div class="grid">
${cards}
</div>
`
}
