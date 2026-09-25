/**
 * Writes the narration script from the beats, so what gets recorded is what
 * the film actually says.
 *
 * ## Why
 *
 * `video-script/video-2/SCRIPT.md` is marked "canonical narration" and the
 * storyboards call it the script authority. It is not what the film says any
 * more: 25 of 106 beat narrations do not appear in it. §4 has seven sentences
 * in the script and nine beats in the build, and three of those beat lines --
 * "Nobody approved it.", "Nothing asked it whether it was sure.", "Nothing
 * alerted. Nothing stopped." -- exist only in the build.
 *
 * The beats are the thing that was refined, so they are the source of truth
 * for what to read. Recording from the old script would leave 25 beats with
 * no matching audio.
 *
 * This does not touch SCRIPT.md, which stays as the authored intent. It emits
 * a separate recording script, in beat order, with the time each line has to
 * land in -- the number the reader actually needs.
 *
 *   VIDEO=apollo-o1/video-2 node scripts/recording-script.mjs
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const VIDEO = process.env.VIDEO ?? 'apollo-o1/video-2'
/*
 * 140, the same rate `retime --fit` sized every hold at. It was 150 here and
 * 140 there, so the `reads` column and the `hold` beside it were quoting two
 * different readers and a beat cut exactly to its line looked short.
 */
const WPM = Number(process.env.WPM ?? 165)
const dir = path.resolve(`src/videos/${VIDEO}`)
const sections = (await readdir(dir)).filter((d) => /^section-\d\d$/.test(d)).sort()

const out = []
let words = 0
let hold = 0

out.push('# Video 2 — narration, as the film says it')
out.push('')
out.push('**Generated from `beats.ts` by `scripts/recording-script.mjs`. Do not hand-edit.**')
out.push('')
out.push('`video-script/video-2/SCRIPT.md` is the authored intent and stays that way.')
out.push('This is what the built film actually says, which drifted from it: 25 of 106')
out.push('lines here are not in that script. Read from this one, or the picture and the')
out.push('voice will not match.')
out.push('')
out.push('**hold** is how long the beat stays on screen, and it is now set from the')
out.push(`line beside it: every beat holds its own read at ${WPM}wpm plus a short breath,`)
out.push(`and every animation lands inside that read. If you read near ${WPM}wpm, the`)
out.push('picture will turn where you stop. The rate is printed at the foot of this file.')
out.push('')

for (const sec of sections) {
  const src = await readFile(path.join(dir, sec, 'beats.ts'), 'utf8')
  const label = src.match(/\n \* Section \d+ — ([^\n]*)/)?.[1] ?? ''
  const lines = []
  let secWords = 0
  let secHold = 0

  for (const b of src.split('\n  {\n').slice(1)) {
    const n = b.match(/^ {4}n: (\d+),/)
    const vo = b.match(/\n {4}vo: (['"])([\s\S]*?)\1,\n/)
    const secs = b.match(/\n {4}secs: ([\d.]+),/)
    if (!n) continue
    const text = vo ? vo[2].replace(/\\'/g, "'").replace(/\\n/g, ' ') : ''
    const w = text.trim() ? text.split(/\s+/).length : 0
    const said = w / (WPM / 60)
    const h = secs ? Number(secs[1]) : 0
    secWords += w
    secHold += h
    lines.push(
      `| ${n[1]} | ${h.toFixed(1)}s | ${said.toFixed(1)}s | ${text.trim() ? text.trim() : '*(silent)*'} |`,
    )
  }

  words += secWords
  hold += secHold
  out.push(`## §${sec.slice(-2)} — ${label}`)
  out.push('')
  out.push(`${secWords} words · reads ${(secWords / (WPM / 60)).toFixed(0)}s · holds ${secHold.toFixed(0)}s`)
  out.push('')
  out.push('| beat | hold | reads | line |')
  out.push('| --- | --- | --- | --- |')
  out.push(...lines)
  out.push('')
}

const mm = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`
out.push('---')
out.push('')
out.push(`**${words} words.** At 150wpm that is ${mm(words / (WPM / 60))} of speech against`)
out.push(`${mm(hold)} of picture.`)

const file = path.resolve(`video-script/${VIDEO.split('/').pop()}/NARRATION.md`)
await writeFile(file, out.join('\n') + '\n')
console.log(`wrote ${path.relative(process.cwd(), file)} — ${words} words, ${mm(words / (WPM / 60))} of speech, ${mm(hold)} of picture`)
