/**
 * Render every beat of a section, at the right moment.
 *
 * ## Do not step with ArrowRight
 *
 * `director.tsx` holds a lock so a fast press cannot skip a staged reveal.
 * While the stage offsets were wrong (seconds where the engine wanted
 * milliseconds) that lock released instantly and stepping at ~1.2s a beat
 * worked. With the offsets fixed it does not: presses are swallowed, and a
 * stepper that assumes one press is one beat silently screenshots the wrong
 * beats.
 *
 * The beat rail carries `data-now` and its ticks call `jump`, which bypasses
 * the lock on purpose. So: click the tick, wait out that beat's own stage
 * span, then shoot.
 *
 *   node scripts/frames.mjs 06          # all beats of §6
 *   node scripts/frames.mjs 06 13       # just beat 13
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const [sec, only] = process.argv.slice(2)
if (!sec) { console.error('usage: frames.mjs <section> [beat]'); process.exit(2) }
const PORT = process.env.PORT ?? 4180

/** Largest staged offset per beat, so each shot waits exactly long enough. */
const src = readFileSync(`src/videos/apollo-o1/video-2/section-${sec}/beats.ts`, 'utf8')
const spans = [...src.matchAll(/n: (\d+),\s*\n\s*id: '([^']+)',([\s\S]*?)(?=\n  \{\n    n: |$)/g)]
  .map(([, n, id, body]) => ({
    n: +n, id,
    span: Math.max(0, ...[...body.matchAll(/at: (\d+),/g)].map((m) => +m[1])),
  }))

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
const errs = []
page.on('pageerror', (e) => errs.push(String(e).slice(0, 140)))
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 140)) })
await page.goto(`http://localhost:${PORT}/video-2/section-${sec}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)

for (const { n, id, span } of spans) {
  if (only && +only !== n) continue
  await page.evaluate((i) => document.querySelectorAll('.s1-rail-tick')[i]?.click(), n - 1)
  await page.waitForTimeout(span + 900)
  const now = await page.evaluate(() =>
    [...document.querySelectorAll('.s1-rail-tick')].findIndex((e) => e.dataset.now === 'true') + 1)
  if (now !== n) { console.log(`  beat ${n}: FAILED TO LAND (on ${now})`); continue }
  await page.screenshot({ path: `/tmp/sh_${sec}_${String(n).padStart(2, '0')}.png` })
  console.log(`  beat ${String(n).padStart(2)} ${id.padEnd(30)} shot after ${span}ms`)
}

console.log(errs.length ? `ERRORS: ${errs.slice(0, 4).join(' | ')}` : 'no console errors')
await browser.close()
