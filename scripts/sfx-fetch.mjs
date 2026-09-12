/**
 * Pulls CC0 sound effects from Freesound, and processes them to this film's spec.
 *
 * ## Why not the media-use skill
 *
 * That route retrieves from HeyGen's audio library, and it has two problems for
 * this video. It matches loosely on text, so **four separate intents returned
 * one byte-identical file** (page turn, paper settle, card slide, book closing).
 * And its licence is unstated -- account access is not a commercial-use grant,
 * which blocks upload. See `assets/sfx/MANIFEST.md`.
 *
 * Freesound fixes both: ~600k sounds, and `license:"Creative Commons 0"` is a
 * real filter, so everything that comes back is commercially safe with no
 * attribution required.
 *
 *   FREESOUND_KEY=... node scripts/sfx-fetch.mjs "rubber stamp" "page turn" ...
 *   FREESOUND_KEY=... node scripts/sfx-fetch.mjs --list "paper tear"   # just look
 *
 * Get a key in two minutes: https://freesound.org/apiv2/apply/
 *
 * Everything is deduped **by content hash, not by id or filename** -- that is
 * the check that caught the four-way duplicate, and it is cheap.
 */
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'

const KEY = process.env.FREESOUND_KEY
if (!KEY) {
  console.error('FREESOUND_KEY is not set.\nGet one free at https://freesound.org/apiv2/apply/ then:\n  export FREESOUND_KEY=your_key')
  process.exit(1)
}

const args = process.argv.slice(2)
const LIST = args.includes('--list')
const queries = args.filter((a) => !a.startsWith('--'))
if (!queries.length) { console.error('Give at least one query.'); process.exit(1) }

const RAW = 'assets/sfx/raw'
const OUT = 'assets/sfx'
const LEDGER = 'assets/sfx/freesound.jsonl'

/** Short, dry, and not a sub-bass rumble. The film's rules, as a query. */
const FILTER = 'license:"Creative Commons 0" duration:[0.05 TO 3.0]'

const run = (cmd, argv) => new Promise((res, rej) => {
  const c = spawn(cmd, argv, { stdio: ['ignore', 'ignore', 'pipe'] })
  let e = ''; c.stderr.on('data', (d) => (e += d))
  c.on('exit', (code) => (code === 0 ? res() : rej(new Error(e.slice(-400)))))
})

const sh = (cmd, argv) => new Promise((res, rej) => {
  const c = spawn(cmd, argv, { stdio: ['ignore', 'pipe', 'pipe'] })
  let o = ''; c.stdout.on('data', (d) => (o += d))
  c.on('exit', (code) => (code === 0 ? res(o.trim()) : rej(new Error('failed: ' + cmd))))
})

await mkdir(RAW, { recursive: true })

/** Content hashes of everything already here, so a re-run cannot duplicate. */
const seen = new Map()
for (const dir of [RAW, OUT]) {
  if (!existsSync(dir)) continue
  for (const f of await readdir(dir)) {
    if (!/\.(wav|mp3)$/.test(f)) continue
    seen.set(createHash('md5').update(await readFile(path.join(dir, f))).digest('hex'), f)
  }
}

for (const q of queries) {
  const url = `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(q)}`
    + `&filter=${encodeURIComponent(FILTER)}&sort=score&page_size=8`
    + `&fields=id,name,duration,license,previews,username&token=${KEY}`
  const res = await fetch(url)
  if (!res.ok) { console.error(`  ${q}: HTTP ${res.status}`); continue }
  const { results = [] } = await res.json()
  if (!results.length) { console.log(`  ${q}: nothing under 3s at CC0`); continue }

  if (LIST) {
    console.log(`\n${q}`)
    for (const r of results) console.log(`   ${String(r.duration).padStart(5)}s  ${r.name}  (#${r.id} by ${r.username})`)
    continue
  }

  let took = 0
  for (const r of results) {
    if (took >= 2) break                       // two candidates per query, not eight
    const mp3 = r.previews?.['preview-hq-mp3']
    if (!mp3) continue
    const buf = Buffer.from(await (await fetch(mp3)).arrayBuffer())
    const hash = createHash('md5').update(buf).digest('hex')
    if (seen.has(hash)) { console.log(`   dup of ${seen.get(hash)} — skipped`); continue }
    seen.set(hash, `fs_${r.id}`)

    const slug = `${q.replace(/\W+/g, '-')}-${r.id}`
    const raw = path.join(RAW, `${slug}.mp3`)
    await writeFile(raw, buf)

    /*
     * The same processing every file in this palette gets: trim the leading
     * silence, high-pass out of the voice's fundamentals, peak-normalise to
     * -12 so the editor has headroom. `assets/sfx/MANIFEST.md`.
     */
    const wav = path.join(OUT, `${slug}.wav`)
    const tmp = path.join(RAW, `_${slug}.wav`)
    await run('ffmpeg', ['-y', '-v', 'error', '-i', raw, '-af',
      'silenceremove=start_periods=1:start_threshold=-50dB,highpass=f=250', tmp])
    const pk = parseFloat((await sh('bash', ['-c',
      `ffmpeg -hide_banner -nostats -i "${tmp}" -af astats -f null - 2>&1 | awk '/Peak level dB/{print $NF; exit}'`])) || '-12')
    await run('ffmpeg', ['-y', '-v', 'error', '-i', tmp, '-af',
      `volume=${(-12 - pk).toFixed(2)}dB,aformat=s16:44100`, wav])

    await writeFile(LEDGER, JSON.stringify({
      file: wav, query: q, freesound_id: r.id, name: r.name,
      author: r.username, license: r.license, duration: r.duration,
    }) + '\n', { flag: 'a' })
    console.log(`   ${wav}  ${r.duration}s  "${r.name}" by ${r.username}`)
    took += 1
  }
}
console.log(LIST ? '' : `\nLedger: ${LEDGER}`)
