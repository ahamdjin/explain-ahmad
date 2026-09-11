/**
 * Can the voice line actually be said in the time the beat gives it?
 *
 *   npm run timing               # the built beats -- what the viewer hears
 *   npm run timing -- --scripts  # the script markdown -- BEFORE anything is built
 *
 *
 * `skills/PRODUCTION_ORDER.md` §1: runtime is decided in the script, not
 * discovered in the edit. Word count / 145 wpm is the spoken length; a beat
 * whose line needs more seconds than it has is not a pacing problem to fix
 * later, it is a script that cannot be read aloud.
 *
 *   npm run timing              # per section, plus every beat that does not fit
 *   npm run timing -- --wpm=130 # a slower delivery
 *
 * Read out of beats.ts rather than the scripts, because beats.ts is what the
 * viewer actually hears and what carries the `secs`.
 */
import { readFile } from 'node:fs/promises'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

/** A measured explainer delivery. Faster than conversation, slower than ads. */
const WPM = Number(args.get('wpm') ?? 145)
const WPS = WPM / 60
/** Below this, the line is being raced. */
const MIN_SLACK = Number(args.get('slack') ?? 0.35)
const FROM_SCRIPTS = args.has('scripts')

/**
 * Whichever sections are actually built, rather than a hard-coded list.
 *
 * This read the superseded eight for one commit after the rebuild started,
 * and reported the old video's timings as if they were the new one's. A tool
 * that silently describes the wrong thing is worse than one that is missing.
 */
const { readdir: readDir } = await import('node:fs/promises')
const SECTIONS = (await readDir('src/videos/glm-320b', { withFileTypes: true }))
  .filter((e) => e.isDirectory() && /^section-\d\d$/.test(e.name))
  .map((e) => e.name.slice(-2))
  .sort()

/**
 * A script beat looks like:  > **12.** Some line. *(a stage direction)*
 *
 * Stage directions in italic parens are not spoken, so they do not count
 * toward the time. Neither does bold or emphasis markup.
 */
function scriptBeats(markdown) {
  const body = markdown.split('## The script')[1]
  if (!body) return []
  const upToJobs = body.split(/\n## Line jobs/)[0]
  const out = []
  /*
   * The end-of-input lookahead is `(?![\s\S])`, not `\Z`.
   *
   * JavaScript has no `\Z` -- it parses as a literal "Z" -- so the previous
   * version silently dropped the last beat of every script that did not happen
   * to end with a `---` separator. Silent data loss in a counting tool is
   * worse than a crash, which is why the caller now verifies the count.
   */
  const re = /^> \*\*(\d+)\.\*\*([\s\S]*?)(?=^> \*\*\d+\.\*\*|^#|^---|(?![\s\S]))/gm
  for (const m of upToJobs.matchAll(re)) {
    const spoken = m[2]
      .replace(/\*\([\s\S]*?\)\*/g, '')
      .replace(/^>\s?/gm, '')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    out.push({ n: Number(m[1]), words: spoken ? spoken.split(' ').length : 0, line: spoken })
  }

  /* If these disagree, a beat was dropped and every total below is wrong. */
  const written = (upToJobs.match(/^> \*\*\d+\.\*\*/gm) ?? []).length
  if (written !== out.length) {
    throw new Error(`parsed ${out.length} beats but the script has ${written} -- the beat regex is dropping some`)
  }
  return out
}

/** Estimate: what the line needs, plus a beat of air, rounded to a half second. */
function suggest(need) {
  return Math.max(2.5, Math.round((need + 1.0) * 2) / 2)
}

const rows = []
if (FROM_SCRIPTS) {
  const { readdir } = await import('node:fs/promises')
  const files = (await readdir('video-script/video-1')).filter((f) => /^\d\d-/.test(f)).sort()
  const seen = new Set()
  for (const file of files) {
    const sec = file.slice(0, 2)
    /* Two scripts for one section means one is superseded; take the newest only. */
    if (seen.has(sec)) {
      console.log(`  (skipping ${file} -- §${sec} already read from another file)`)
      continue
    }
    const beats = scriptBeats(await readFile(`video-script/video-1/${file}`, 'utf8'))
    if (!beats.length) continue
    seen.add(sec)
    for (const b of beats) {
      const need = b.words / WPS
      rows.push({ sec, n: b.n, id: b.line.slice(0, 30), words: b.words, secs: suggest(need), need })
    }
  }
} else {
  for (const n of SECTIONS) {
    const source = await readFile(`src/videos/glm-320b/section-${n}/beats.ts`, 'utf8')
    for (const block of source.split(/\n {2}\{\n/).slice(1)) {
      const num = block.match(/^ {4}n: (\d+),/)
      if (!num) continue
      const vo = block.match(/\n {4}vo: (['"])([\s\S]*?)\1,\n/)?.[2] ?? ''
      const secs = Number(block.match(/\n {4}secs: ([0-9.]+),/)?.[1] ?? 0)
      const words = vo.trim() ? vo.trim().split(/\s+/).length : 0
      rows.push({ sec: n, n: Number(num[1]), id: block.match(/\n {4}id: '([^']*)',/)?.[1] ?? '', words, secs, need: words / WPS })
    }
  }
}

console.log(`At ${WPM} words per minute, from ${FROM_SCRIPTS ? 'the script markdown' : 'the built beats'}.`)
if (FROM_SCRIPTS) console.log('Seconds are a suggestion: what the line needs, plus a beat of air.')
console.log()
console.log('  §    beats  words   speaking   allotted   talking')
let allWords = 0
let allSecs = 0
for (const n of [...new Set(rows.map((r) => r.sec))].sort()) {
  const list = rows.filter((r) => r.sec === n)
  const words = list.reduce((t, r) => t + r.words, 0)
  const secs = list.reduce((t, r) => t + r.secs, 0)
  allWords += words
  allSecs += secs
  const need = words / WPS
  const share = (100 * need) / secs
  const flag = share > 92 ? '  <- no room to breathe' : ''
  console.log(
    `  ${n}   ${String(list.length).padStart(3)}   ${String(words).padStart(4)}   ${need.toFixed(0).padStart(5)}s   ${secs.toFixed(0).padStart(6)}s   ${share.toFixed(0).padStart(5)}%${flag}`,
  )
}
const total = allWords / WPS
console.log(
  `\n  total  ${rows.length} beats · ${allWords} words · ${(total / 60).toFixed(1)} min speaking in ${(allSecs / 60).toFixed(1)} min · ${((100 * total) / allSecs).toFixed(0)}% talking`,
)

const tight = rows.filter((r) => r.words && r.secs - r.need < MIN_SLACK)
console.log(`\n${tight.length} beat(s) cannot be said in the time given:\n`)
for (const r of tight.sort((a, b) => a.secs - a.need - (b.secs - b.need))) {
  console.log(
    `  §${r.sec} b${String(r.n).padStart(2)}  ${r.id.padEnd(22)} ${String(r.words).padStart(3)}w  needs ${r.need.toFixed(1).padStart(5)}s  has ${r.secs.toFixed(1).padStart(5)}s  ${(r.secs - r.need).toFixed(1).padStart(5)}s`,
  )
}

/* Held beats are deliberate -- an event that is stepped on is not an event. */
const held = rows.filter((r) => r.words && r.secs > 3 && r.need < r.secs * 0.38)
console.log(`\n${held.length} beat(s) are mostly silence, which is usually on purpose:\n`)
for (const r of held) {
  console.log(`  §${r.sec} b${String(r.n).padStart(2)}  ${r.id.padEnd(22)} ${String(r.words).padStart(3)}w  ${r.need.toFixed(1)}s of ${r.secs.toFixed(1)}s`)
}

if (tight.length) {
  console.log('\nFix by cutting words or raising secs -- but cut first. A beat that')
  console.log('needs 14s of talking is a beat with two ideas in it.')
}
