/**
 * Turns the silent recordings and the voice tracks into deliverable video.
 *
 * ## Why this exists
 *
 * `npm run record` drives /watch in a real browser and saves what Playwright
 * captured -- and **Playwright does not capture audio**. So the webm is silent
 * whether or not `VO` is wired into the section, which is a quiet trap: the
 * page plays the voice-over, you hear it while it records, and the file has
 * nothing in it. Nothing in the repo said so, and nothing joined the two
 * halves back together.
 *
 * So: video from `output/recordings/section-NN.webm`, audio from
 * `public/vo/NN.mp3`, muxed to `output/video/section-NN.mp4`, then optionally
 * concatenated into one file.
 *
 *   node scripts/render.mjs                 # every section that has both halves
 *   node scripts/render.mjs --section=01    # one
 *   node scripts/render.mjs --join          # also write the whole video
 *
 * A section with no voice track is still rendered, silent, and reported as
 * such -- a missing take should be visible in the output list, not silently
 * skipped.
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
const OUT = path.resolve(args.get('out') ?? 'output/video')

function run(cmd, argv) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, argv, { stdio: ['ignore', 'ignore', 'pipe'] })
    let err = ''
    child.stderr.on('data', (c) => (err += c.toString()))
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(err.slice(-800)))))
    child.on('error', reject)
  })
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

const done = []
for (const n of takes) {
  const video = path.join(IN, `section-${n}.webm`)
  const voice = path.join(VO, `${n}.mp3`)
  const out = path.join(OUT, `section-${n}.mp4`)
  const hasVoice = existsSync(voice)

  /*
   * `-shortest` so a take that over-runs its voice (or under-runs it) ends at
   * the shorter of the two rather than holding on a frozen last frame or
   * running out of picture. If those two lengths differ by much, the `secs`
   * need editing -- see `docs/VOICE_OVER.md`, "Then fix the timing".
   */
  const argv = hasVoice
    ? ['-y', '-i', video, '-i', voice, '-map', '0:v:0', '-map', '1:a:0',
       '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow',
       '-c:a', 'aac', '-b:a', '192k', '-shortest', out]
    : ['-y', '-i', video, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', out]

  process.stdout.write(`  §${n} ${hasVoice ? 'with voice' : 'SILENT — no public/vo/' + n + '.mp3'} … `)
  await run('ffmpeg', argv)
  console.log('ok')
  done.push({ n, out, hasVoice })
}

console.log(`\n${done.length} section(s) → ${OUT}`)
const silent = done.filter((d) => !d.hasVoice).map((d) => d.n)
if (silent.length) console.log(`\n${silent.length} still silent: ${silent.join(', ')}`)

if (args.has('join')) {
  /* Concat demuxer rather than a filter graph: every part was encoded here,
   * with the same codec and pixel format, so they can be joined without a
   * re-encode and without a generation of quality loss. */
  const list = path.join(OUT, 'parts.txt')
  await writeFile(list, done.map((d) => `file '${d.out}'`).join('\n') + '\n', 'utf8')
  const whole = path.join(OUT, 'video-1.mp4')
  process.stdout.write('\njoining … ')
  await run('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', whole])
  console.log(`ok\n${whole}`)
  if (silent.length) console.log(`\nNote: the joined file is silent through §${silent.join(', §')}.`)
}
