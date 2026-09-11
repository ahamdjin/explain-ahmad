/** Capture or record only the GPT comparison. Beat metadata comes from code. */
import { build } from 'esbuild'
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const args = new Map(process.argv.slice(2).map(arg => {
  const [key, ...value] = arg.replace(/^--/, '').split('=')
  return [key, value.join('=') || 'true']
}))
const base = args.get('url') ?? 'http://127.0.0.1:5174'
const result = await build({ entryPoints: ['src/videos/glm-320b/superseded/gpt-section-01/beats.ts'], bundle: true, write: false, format: 'esm', platform: 'node' })
const { BEATS, RUNTIME_SECONDS } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`)
const out = path.resolve('output/playwright/gpt-section-01')
await mkdir(out, { recursive: true })
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1600, height: 900 }, ...(args.has('record') ? { recordVideo: { dir: out, size: { width: 1600, height: 900 } } } : {}) })
const page = await context.newPage()
const errors = []
page.on('pageerror', error => errors.push(error.message))
page.on('console', message => { if (message.type() === 'error' && !message.text().includes('404')) errors.push(message.text()) })
try {
  if (args.has('record')) {
    await page.goto(`${base}/gpt-section-01?beat=1`, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Play', exact: true }).click()
    await page.locator('button').first().blur()
    await page.keyboard.press('p')
    // The player owns the clock. No duplicated holds or narration durations.
    await page.waitForFunction(n => document.querySelector('.g1-page')?.getAttribute('data-beat') === String(n), BEATS.length, { timeout: (RUNTIME_SECONDS + 15) * 1000 })
    await page.waitForTimeout(BEATS.at(-1).secs * 1000)
    const video = page.video()
    await context.close()
    await video.saveAs(path.join(out, 'gpt-section-01.webm'))
    await video.delete()
    console.log(`Recorded ${RUNTIME_SECONDS}s visual playback, without audio.`)
  } else {
    for (let i = 0; i < BEATS.length; i++) {
      await page.goto(`${base}/gpt-section-01?beat=${i + 1}&present=1`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(1000)
      await page.screenshot({ path: path.join(out, `${String(i + 1).padStart(2, '0')}.png`) })
    }
    const escape = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
    await writeFile(path.join(out, 'index.html'), `<!doctype html><meta charset="utf-8"><title>GPT Section 1 — storyboard</title><style>body{background:#eee7d8;color:#342e24;font:15px/1.5 system-ui;margin:32px}h1{font-size:24px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(420px,1fr));gap:24px}figure{margin:0;background:#fbf8ef}img{width:100%;display:block}figcaption{padding:16px}b,small{display:block}p{margin:8px 0}small{color:#7d7362}</style><h1>GPT Section 1 · ${BEATS.length} beats · ${RUNTIME_SECONDS}s</h1><p>Comparison storyboard. Each frame includes its spoken line and teaching purpose.</p><div class="grid">${BEATS.map((b, i) => `<figure><img loading="lazy" src="${String(i + 1).padStart(2, '0')}.png" alt="${escape(b.title)}"><figcaption><b>${i + 1}. ${escape(b.title)} · ${b.secs}s</b><p>${escape(b.vo)}</p><small>${escape(b.learn)}</small></figcaption></figure>`).join('')}</div>`)
    console.log(`Captured ${BEATS.length} beats: ${out}/index.html`)
  }
  if (errors.length) throw new Error(errors.join('\n'))
} finally {
  await browser.close()
}
