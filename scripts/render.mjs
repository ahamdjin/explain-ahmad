/**
 * Turns silent browser recordings plus mastered audio into deliverable video.
 *
 * Playwright does not capture page audio. `npm run record` therefore produces
 * picture only. Audio comes from one of two places:
 *
 *   public/mix/NN.{wav,mp3,m4a}  preferred: final VO + SFX mix
 *   public/vo/NN.{wav,mp3,m4a}   fallback: voice only, for review cuts
 *
 * Commands:
 *   node scripts/render.mjs                       # review renders; mix if present
 *   node scripts/render.mjs --section=01          # one section
 *   node scripts/render.mjs --join                # join available sections
 *   node scripts/render.mjs --join --require-mix  # FINAL: fail if any mix is missing
 *
 * `npm run render:final` is the last form. It exists so a clean-looking MP4
 * cannot quietly ship with the whole sound-design pass missing.
 */
import { spawn } from 'node:child_process'
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const args = new Map()
for (const raw of process.argv.slice(2)) {
  const [key, value = 'true'] = raw.replace(/^--/, '').split('=')
  args.set(key, value)
}

const IN = path.resolve('output/recordings')
const VO = path.resolve('public/vo')
const MIX = path.resolve('public/mix')
const OUT = path.resolve(args.get('out') ?? 'output/video')
const REQUIRE_MIX = args.has('require-mix')

function run(cmd, argv) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, argv, { stdio: ['ignore', 'ignore', 'pipe'] })
    let err = ''
    child.stderr.on('data', (c) => (err += c.toString()))
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(err.slice(-800)))))
    child.on('error', reject)
  })
}

function audioTake(dir, n) {
  for (const ext of ['wav', 'mp3', 'm4a']) {
    const file = path.join(dir, `${n}.${ext}`)
    if (existsSync(file)) return file
  }
  return null
}

if (!existsSync(IN)) {
  console.error(`No recordings in ${IN}. Run \`npm run record\` first.`)
  process.exit(1)
}

await mkdir(OUT, { recursive: true })

const only = args.get('section')?.padStart(2, '0')
const takes = (await readdir(IN))
  .filter((f) => /^section-\d\d\.webm$/.test(f))
  .map((f) => f.slice(8, 10))
  .filter((n) => !only || n === only)
  .sort()

if (!takes.length) {
  console.error(only ? `No recording for section ${only}.` : 'No recordings found.')
  process.exit(1)
}

if (REQUIRE_MIX) {
  const missing = takes.filter((n) => !audioTake(MIX, n))
  if (missing.length) {
    console.error('Final render refused: these sections have no VO+SFX master in public/mix/:')
    console.error(`  §${missing.join(', §')}`)
    console.error('Export each section mix from the editor, then run `npm run render:final` again.')
    process.exit(1)
  }
}

const done = []
for (const n of takes) {
  const video = path.join(IN, `section-${n}.webm`)
  const mix = audioTake(MIX, n)
  const voice = audioTake(VO, n)
  const audio = mix ?? voice
  const out = path.join(OUT, `section-${n}.mp4`)

  /*
   * `-shortest` prevents a timing mismatch from creating a frozen tail or an
   * audio-only tail. Every audio input is also normalised to the same 48 kHz
   * stereo AAC format, so the final concat is stream-compatible even if one
   * editor export arrived mono or at 44.1 kHz.
   */
  const argv = audio
    ? ['-y', '-i', video, '-i', audio, '-map', '0:v:0', '-map', '1:a:0',
       '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow',
       '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2', '-shortest', out]
    : ['-y', '-i', video, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', out]

  const state = mix
    ? 'FINAL MIX'
    : voice
      ? 'VOICE ONLY — SFX NOT MIXED'
      : 'SILENT — NO AUDIO'
  process.stdout.write(`  §${n} ${state} … `)
  await run('ffmpeg', argv)
  console.log('ok')
  done.push({ n, out, hasMix: Boolean(mix), hasVoice: Boolean(voice), hasAudio: Boolean(audio) })
}

console.log(`\n${done.length} section(s) → ${OUT}`)
const silent = done.filter((d) => !d.hasAudio).map((d) => d.n)
const voiceOnly = done.filter((d) => d.hasAudio && !d.hasMix).map((d) => d.n)
if (silent.length) console.log(`\n${silent.length} silent section(s): §${silent.join(', §')}`)
if (voiceOnly.length) {
  console.log(`\n${voiceOnly.length} VO-only section(s), SFX not in the rendered audio: §${voiceOnly.join(', §')}`)
  console.log('Use `npm run render:final` for a release render; it refuses this state.')
}

if (args.has('join')) {
  /* All parts are encoded here with the same video codec/pixel format and the
   * same AAC sample rate/channel layout, so concat can stream-copy them without
   * another generation of quality loss. */
  const list = path.join(OUT, 'parts.txt')
  await writeFile(list, done.map((d) => `file '${d.out}'`).join('\n') + '\n', 'utf8')
  const whole = path.join(OUT, 'video-1.mp4')
  process.stdout.write('\njoining … ')
  await run('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', whole])
  console.log(`ok\n${whole}`)
  if (silent.length) console.log(`\nWarning: joined file is silent through §${silent.join(', §')}.`)
  if (voiceOnly.length) console.log(`\nWarning: joined file is VO-only through §${voiceOnly.join(', §')}; SFX are missing there.`)
}
