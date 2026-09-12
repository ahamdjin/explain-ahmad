/**
 * Renders the SFX cues into one audio track per section.
 *
 * Same `output/sfx/cues.json` the running app plays, so what you hear while
 * scrubbing is what lands in the file. Nothing is placed on a timeline by hand,
 * and a `secs` restamp costs one re-run rather than an afternoon of re-placing.
 *
 *   npm run sfx:cues && npm run sfx:track
 *   → output/sfx/section-NN.wav   (picked up automatically by `npm run render`)
 *
 * Every cue is `adelay`ed to its section-relative time and mixed over silence
 * of the section's exact length, so the track is always the right duration even
 * when the last cue is early.
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import path from 'node:path'

const OUT = 'output/sfx'
const SOUNDS = 'assets/sfx'

const run = (argv) => new Promise((res, rej) => {
  const c = spawn('ffmpeg', argv, { stdio: ['ignore', 'ignore', 'pipe'] })
  let e = ''
  c.stderr.on('data', (d) => (e += d))
  c.on('exit', (code) => (code === 0 ? res() : rej(new Error(e.slice(-600)))))
})

const cues = JSON.parse(await readFile(path.join(OUT, 'cues.json'), 'utf8'))

/** Section runtimes, from the built beats -- never guessed. */
const ROOT = 'src/videos/glm-320b/video-1'
const runtime = new Map()
for (const dir of (await readdir(ROOT, { withFileTypes: true }))
  .filter((e) => e.isDirectory() && /^section-\d\d$/.test(e.name)).map((e) => e.name)) {
  const src = await readFile(path.join(ROOT, dir, 'beats.ts'), 'utf8')
  runtime.set(Number(dir.slice(-2)),
    [...src.matchAll(/\n {4}secs: ([0-9.]+),/g)].reduce((t, m) => t + Number(m[1]), 0))
}

await mkdir(OUT, { recursive: true })
const bySection = new Map()
for (const c of cues) bySection.set(c.section, [...(bySection.get(c.section) ?? []), c])

let made = 0
for (const [section, list] of [...bySection.entries()].sort((a, b) => a[0] - b[0])) {
  const dur = runtime.get(section)
  if (!dur) { console.log(`  §${String(section).padStart(2, '0')}  no runtime — skipped`); continue }

  const inputs = []
  const chains = []
  list.forEach((c, i) => {
    inputs.push('-i', path.join(SOUNDS, c.sound))
    const ms = Math.max(0, Math.round((c.sectionTime ?? c.offset) * 1000))
    /* `all=1` so the delay applies to both channels; without it one side of a
     * stereo file plays early and the cue smears. */
    chains.push(`[${i}]adelay=${ms}:all=1,volume=${c.gainDb ?? -8}dB[c${i}]`)
  })
  const mix = list.map((_, i) => `[c${i}]`).join('')
  const file = path.join(OUT, `section-${String(section).padStart(2, '0')}.wav`)

  await run([
    '-y', '-v', 'error',
    '-f', 'lavfi', '-t', String(dur), '-i', 'anullsrc=r=44100:cl=stereo',
    ...inputs,
    '-filter_complex',
    `${chains.map((c) => c.replace(/^\[(\d+)\]/, (_, n) => `[${Number(n) + 1}]`)).join(';')};` +
    `[0]${mix}amix=inputs=${list.length + 1}:normalize=0:duration=first[out]`,
    '-map', '[out]', '-t', String(dur), '-c:a', 'pcm_s16le', file,
  ])
  console.log(`  §${String(section).padStart(2, '0')}  ${list.length} cue(s) over ${dur}s → ${file}`)
  made += 1
}
console.log(`\n${made} SFX track(s). \`npm run render\` mixes them under the voice.`)

/* -- and the VO+SFX master, where a voice take exists ----------------------
 *
 * `render --require-mix` refuses to make a final cut without `public/mix/NN.*`,
 * and that used to mean exporting one per section from an editor. It does not
 * have to: the voice is a file, the cues are data, and ffmpeg can mix them.
 *
 * Hand-mixing stays available -- anything already in `public/mix/` is left
 * alone, so a real pass in a DAW always wins over this.
 */
{
  const { existsSync } = await import('node:fs')
  const VO = 'public/vo'
  const MIX = 'public/mix'
  await mkdir(MIX, { recursive: true })
  const take = (dir, n) => ['wav', 'mp3', 'm4a'].map((e) => path.join(dir, `${n}.${e}`)).find(existsSync) ?? null

  let mixed = 0, kept = 0
  for (const section of [...runtime.keys()].sort((a, b) => a - b)) {
    const n = String(section).padStart(2, '0')
    const voice = take(VO, n)
    if (!voice) continue
    if (take(MIX, n)) { kept += 1; continue }
    const sfx = path.join(OUT, `section-${n}.wav`)
    if (!existsSync(sfx)) continue
    /*
     * `duration=first` so the master is exactly as long as the voice. The SFX
     * track is cut to the *authored* runtime, and once a real take exists the
     * voice is the truth -- a mix that outlives it would pad the section with
     * cues playing over nothing.
     */
    await run(['-y', '-v', 'error', '-i', voice, '-i', sfx,
      '-filter_complex', '[0:a]aformat=fltp:44100:stereo[v];[1:a]aformat=fltp:44100:stereo[s];' +
        '[v][s]amix=inputs=2:normalize=0:duration=first[out]',
      '-map', '[out]', '-c:a', 'pcm_s16le', path.join(MIX, `${n}.wav`)])
    mixed += 1
  }
  if (mixed) console.log(`${mixed} VO+SFX master(s) → ${MIX}/  — \`npm run render:final\` is unblocked`)
  if (kept) console.log(`${kept} left alone (a hand mix already exists)`)
  if (!mixed && !kept) console.log('No voice takes yet, so no masters. Drop one at public/vo/01.wav and re-run.')
}
