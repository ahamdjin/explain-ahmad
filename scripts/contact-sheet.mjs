/**
 * Tiles a section's frames into one contact sheet, with each beat labelled.
 *
 * Reviewing a redesign means looking at every beat, and opening thirteen PNGs
 * one at a time is slow enough that it stops happening -- which is how eleven
 * sections came to ship without anyone seeing them. One sheet per section makes
 * "look at the frames" cheap enough to stay non-negotiable.
 *
 *   node scripts/contact-sheet.mjs --section=section-03 [--cols=3]
 */
import { readdir, mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const args = new Map(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')))
const section = args.get('section')
if (!section) throw new Error('pass --section=section-03')
const cols = Number(args.get('cols') ?? 3)
const CELL_W = 620

const dir = `frames/${section}`
const files = (await readdir(dir)).filter((f) => f.endsWith('.png')).sort()
if (!files.length) throw new Error(`no frames in ${dir}`)

const cellH = Math.round((CELL_W * 1080) / 1920)
const rows = Math.ceil(files.length / cols)

const tiles = await Promise.all(
  files.map(async (f) => {
    const b64 = (await readFile(path.join(dir, f))).toString('base64')
    const name = f.replace(/^frame-/, '').replace(/\.png$/, '')
    return `<figure><img src="data:image/png;base64,${b64}"><figcaption>${name}</figcaption></figure>`
  }),
)

const html = `<!doctype html><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#fff;display:grid;grid-template-columns:repeat(${cols},${CELL_W}px)}
  figure{position:relative;border:1px solid #c8c8c8}
  img{display:block;width:${CELL_W}px;height:${cellH}px}
  figcaption{position:absolute;left:0;bottom:0;right:0;background:#111;color:#fff;
    font:600 15px/1.5 ui-monospace,monospace;padding:2px 8px}
</style>${tiles.join('')}`

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: cols * CELL_W, height: rows * cellH },
  deviceScaleFactor: 1,
})
await page.setContent(html)
await page.waitForLoadState('networkidle')
await mkdir('frames/_sheets', { recursive: true })
const out = `frames/_sheets/${section}.png`
await page.screenshot({ path: out, fullPage: true })
await browser.close()
console.log(`${out} — ${files.length} frames, ${cols} x ${rows}`)
