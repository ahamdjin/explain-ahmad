/**
 * Does every section open where the previous one left off?
 *
 * `storyboard/video-2/README.md` makes that the project's build rule, and
 * nothing checked it for nine sections.
 *
 * ## What to compare, and what not to
 *
 * Not "§A's last frame against §B's first rendered frame". Beat 1 is *allowed*
 * to move things — that is the travel into the next section's layout — and a
 * standalone section route has no earlier position to animate from, so React
 * mounts the actor wherever beat 1 puts it. Comparing rendered frames reports
 * every planned move as a teleport. A first version did exactly that and
 * called three good hand-offs broken.
 *
 * The rule is about the **entry state**: the `INITIAL` in §B's `scene.ts` must
 * hold §A's exit positions. That is what an assembled film would animate from,
 * and it is a static fact, so this reads it out of the source rather than out
 * of the DOM.
 *
 * So: play §A to its last beat in a browser, read §B's `INITIAL` from disk,
 * and compare the actors that appear in both.
 *
 * Playing matters. `director.tsx` rebuilds the scene from `initial` on every
 * render and applies only the staged commands due at `elapsed`, so a section
 * scrubbed faster than its stages is genuinely in a different state. HOLD must
 * stay above the largest `at` in any beat.
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'

const PORT = process.env.PORT ?? 4180
/* Above the largest staged offset in any beat. */
const HOLD = 9600
const SECTIONS = [
  ['01', 15], ['02', 13], ['03', 11], ['04', 9], ['05', 12],
  ['06', 14], ['07', 12], ['08', 11], ['09', 10],
]
/** §5 -> §6 is the film's one permitted hard cut: the publisher changes. */
const CUTS = new Set(['05->06'])
const DIR = 'src/videos/apollo-o1/video-2'

/** Actor -> {on, x, y, scale} out of a section's INITIAL. */
function initialOf(sec) {
  const src = readFileSync(`${DIR}/section-${sec}/scene.ts`, 'utf8')
  const block = src.slice(src.indexOf('export const INITIAL'), src.indexOf('\n}\n', src.indexOf('export const INITIAL')))
  const out = {}
  const re = /^\s*(\w+):\s*\{\s*on:\s*(true|false),\s*at:\s*\{\s*x:\s*([\d.]+),\s*y:\s*([\d.]+)\s*\},\s*scale:\s*([\d.]+)/gm
  for (const m of block.matchAll(re)) {
    out[m[1]] = { on: m[2] === 'true', x: +m[3], y: +m[4], scale: +m[5] }
  }
  return out
}

const browser = await chromium.launch()

/** Actor -> {x, y, scale} as §A actually leaves them, read off its own scene. */
async function exitOf(sec, beats) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  /*
   * `?beat=N`, like `capture-frames.mjs` and `check-overlap.mjs`.
   *
   * Not ArrowRight: the director holds a lock so a fast press cannot skip a
   * staged reveal, and with the offsets in real milliseconds that lock
   * swallows presses -- sixteen of them landed on beat nine.
   */
  await page.goto(`http://localhost:${PORT}/video-2/section-${sec}?beat=${beats}`, { waitUntil: 'load' })
  await page.waitForTimeout(HOLD)
  const shot = await page.evaluate(() =>
    [...document.querySelectorAll('.s1-slot')].map((el) => {
      const r = el.getBoundingClientRect()
      return {
        on: getComputedStyle(el).opacity !== '0' && r.width > 0,
        x: +((r.x + r.width / 2) / window.innerWidth * 100).toFixed(1),
        y: +((r.y + r.height / 2) / window.innerHeight * 100).toFixed(1),
        t: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 40) || '(art)',
      }
    }),
  )
  await page.close()
  return shot.filter((s) => s.on)
}

let broken = 0
for (let i = 0; i < SECTIONS.length - 1; i++) {
  const [a, n] = SECTIONS[i]
  const [z] = SECTIONS[i + 1]
  const key = `${a}->${z}`
  if (CUTS.has(key)) { console.log(`§${a} -> §${z}   permitted hard cut`); continue }

  const exit = await exitOf(a, n)
  const enter = initialOf(z)
  const carried = Object.entries(enter).filter(([, v]) => v.on)

  /* Match each carried actor to the nearest thing §A actually left on screen.
     Within 2% of the frame in both axes is the same place. */
  const bad = []
  for (const [name, v] of carried) {
    const near = exit.find((e) => Math.abs(e.x - v.x) < 2 && Math.abs(e.y - v.y) < 2)
    if (!near) bad.push(`${name} enters at ${v.x},${v.y} — nothing is there when §${a} ends`)
  }
  console.log(
    `§${a} -> §${z}   ${carried.length} actor(s) on at entry` +
    (bad.length ? `\n   BREAK: ${bad.join('\n   BREAK: ')}` : ''),
  )
  if (bad.length) broken++
}

await browser.close()
console.log(broken ? `\n${broken} hand-off(s) break continuity` : '\nevery hand-off holds')
process.exit(broken ? 1 : 0)
