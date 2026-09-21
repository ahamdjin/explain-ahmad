/**
 * Does every section's last frame match the next section's first?
 *
 * `storyboard/video-2/README.md` makes that the project's build rule, and
 * nothing checked it for nine sections. Two real breaks were sitting there:
 * §2's two carried objects teleported into §3's corner instead of travelling
 * there, and §7's face camera vanished at §8 beat 1 so the question and its
 * answer looked like different films.
 *
 * ## Play the beats, do not scrub them
 *
 * `director.tsx` rebuilds the scene from `initial` on every render, applying
 * every earlier beat's commands *and* its staged commands, then the current
 * beat's, then whichever of its stages are due at `elapsed`. So a beat that is
 * skipped through faster than its stages is genuinely in a different state
 * from one that played.
 *
 * A first version of this check pressed through at 340ms a beat and reported
 * three hand-offs broken. All three were fine; the stages had not fired. Hence
 * HOLD below, which must stay above the longest `at` in any beat.
 */
import { chromium } from 'playwright'

const PORT = process.env.PORT ?? 4180
const HOLD = 3400
const SECTIONS = [
  ['01', 15], ['02', 13], ['03', 11], ['04', 9], ['05', 12],
  ['06', 14], ['07', 12], ['08', 11], ['09', 10],
]
/** §5 -> §6 is the film's one permitted hard cut: the publisher changes. */
const CUTS = new Set(['05->06'])

const browser = await chromium.launch()

async function frameAt(sec, beat) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  await page.goto(`http://localhost:${PORT}/video-2/section-${sec}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  for (let i = 1; i < beat; i++) {
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(HOLD)
  }
  await page.waitForTimeout(HOLD)
  const shot = await page.evaluate(() =>
    [...document.querySelectorAll('.s1-slot')]
      .filter((el) => getComputedStyle(el).opacity !== '0' && el.getBoundingClientRect().width)
      .map((el) => {
        const r = el.getBoundingClientRect()
        return {
          t: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 40) || '(art)',
          x: Math.round(r.x + r.width / 2),
          y: Math.round(r.y + r.height / 2),
        }
      })
      .sort((a, b) => a.x - b.x || a.y - b.y),
  )
  await page.close()
  return shot
}

let broken = 0
for (let i = 0; i < SECTIONS.length - 1; i++) {
  const [a, n] = SECTIONS[i]
  const [z] = SECTIONS[i + 1]
  const key = `${a}->${z}`
  const out = await frameAt(a, n)
  const into = await frameAt(z, 1)

  if (CUTS.has(key)) {
    console.log(`§${a} -> §${z}   permitted hard cut`)
    continue
  }

  /* Carried objects are matched by their text, and must land within 24px of
     where they left. A jump larger than that reads as a teleport. */
  const bad = []
  for (const o of out) {
    if (o.t === '(art)') continue
    const match = into.find((c) => c.t === o.t)
    if (!match) continue
    const d = Math.hypot(match.x - o.x, match.y - o.y)
    if (d > 24) bad.push(`${o.t} moved ${Math.round(d)}px (${o.x},${o.y} -> ${match.x},${match.y})`)
  }
  const shared = out.filter((o) => into.some((c) => c.t === o.t)).length
  console.log(
    `§${a} -> §${z}   ${shared} object(s) carried` + (bad.length ? `\n   BREAK: ${bad.join('\n   BREAK: ')}` : ''),
  )
  if (bad.length) broken++
}

await browser.close()
console.log(broken ? `\n${broken} hand-off(s) break continuity` : '\nevery hand-off holds')
process.exit(broken ? 1 : 0)
