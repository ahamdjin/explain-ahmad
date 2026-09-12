# SFX — what these are, and what was rejected

> **These thirteen are a starting set, not the library.** They came from a
> route that matches loosely on text and states no licence. For a real palette
> use `npm run sfx` — Freesound, filtered to CC0, which fixes both problems at
> once. See "A bigger library" at the bottom.

Thirteen sounds for nine roles. Eleven sourced through the `media-use` skill
(`resolve --type sfx`, provider `heygen.audio.sounds`); two are the skill's own
bundled `typing` and `key-press`. Raw fetches and the full ledger: `.media/`.

**Nothing here was listened to by the agent that fetched it.** Duration, peak
and frequency distribution are measured; *character* is the provider's own
description, which was wrong or duplicated **six times out of seventeen**.
**Audition all thirteen before cutting.**

## Processing

Leading silence trimmed · high-passed (250 Hz; 200 for `knock`/`clack`, 180 for
`thud`/`impact`, 300 for `tear`) · peak-normalised to **−12 dBFS** · 16-bit
44.1 kHz WAV. Every file measures **≤ +3.1 dB** below 250 Hz, which is the
number that matters: the voice owns its fundamentals down there, and a cue
living in that band forces ducking. Peak −12 leaves headroom; target −20 in the
cut.

## Kept

| file | from | job |
| --- | --- | --- |
| `stamp.wav` | `sfx_002` · `bd47806c` | the fact landing — 3 uses only |
| `click.wav` | `sfx_007` · `1872692a` | the common small landing |
| `tick.wav` | `sfx_013` · `168b9981` | a smaller landing, or a connection |
| `snap.wav` | `sfx_017` · `05d5d24f` | a decision settling for good |
| `knock.wav` | `sfx_006` · `5250ecaf` | a hard stop — source was THREE knocks, trimmed to the first |
| `clack.wav` | `sfx_010` · `6e387e4b` | something closing |
| `thud.wav` | `sfx_014` · `66e0480d` | weight, cost, slowness |
| `impact.wav` | `sfx_016` · `3f442c58` | the biggest number — 1 use |
| `ratchet.wav` | `sfx_015` · `ecc8e1b5` | under a count-up — 5 uses |
| `page-turn.wav` | `sfx_003` · `9932004e` | the 12 section seams |
| `tear.wav` | `sfx_009` · `4a30c34d` | destruction — 1 use, +14 dB below 250 Hz before the high-pass |
| `typing.wav` | skill bundle | §1 b1, diegetic |
| `key-press.wav` | skill bundle | §1 b1, diegetic |

## Verified without listening

Every file was checked for **transient count and attack time** — the one thing
measurable that catches a mislabelled sound. It found three:

| file | was | fixed |
| --- | --- | --- |
| `knock` | three knocks | trimmed to the first |
| `click` | two clicks 128 ms apart | trimmed to the first |
| `tick` | peaked 194 ms in — the quiet part was in front | trimmed to the transient |

All single-impact sounds now measure **one** transient with attack under 25 ms.
`ratchet` (7), `typing` (4), `tear` (3) and `page-turn` (2) are multi-transient
by nature and correct.

This does not replace listening. It catches wrong *shape*, never wrong
*character*.

## Rejected — the useful half of the record

| id | asked for | came back as | verdict |
| --- | --- | --- |---|
| `sfx_001` | rubber stamp | "thick paper being crumpled" | wrong sound |
| `sfx_004` | paper settling | byte-identical to `sfx_003` | **duplicate** |
| `sfx_008` | card on wood | byte-identical to `sfx_003` | **duplicate** |
| `sfx_011` | a book closing | byte-identical to `sfx_003` | **duplicate** |
| `sfx_012` | card dealt on a table | byte-identical to `sfx_006` | **duplicate** |
| `sfx_005` | wooden drawer | "clinking rattle, small hard pieces" | not a drawer |

**Four separate intents returned one byte-identical file** — page turn, paper
settle, card slide, book closing. The resolver matches loosely on text, so
asking for four kinds of paper gets the same paper four times. It happened
again with the knock. **Check hashes, never filenames.**

## Licence — split, and one half blocks upload

**`typing` and `key-press` are clear.** They come from the skill's bundled
library, which is Pixabay Content License — commercial use, no attribution
required (`~/.claude/skills/media-use/audio/assets/sfx/CREDITS.md`).

**The other eleven are not.** They were retrieved from HeyGen's audio library
(`/v3/audio/sounds`) over an authenticated account, and neither the ledger nor
the skill's own reference states a licence for that route. Account access is not
a commercial-use grant.

**Confirm the licence covers monetised YouTube before publishing** and record it
in `THIRD_PARTY.md`. If it does not clear, `docs/SOUND.md` still stands — the
cue sheet is a design, not these files — and freesound.org CC0 fills it in an
afternoon.


## A bigger library — `npm run sfx`

Thirteen files is thin, and the reason is the source: HeyGen's audio library
returns one result per query and matched four different paper intents to the
same file. It is also the half of this palette whose licence is unresolved.

**Freesound fixes both.** ~600k sounds, and `license:"Creative Commons 0"` is a
real filter — everything that comes back is commercially safe with no
attribution required, which removes the upload blocker entirely.

    # two minutes: https://freesound.org/apiv2/apply/
    export FREESOUND_KEY=your_key

    npm run sfx -- --list "rubber stamp"        # see candidates first
    npm run sfx -- "rubber stamp" "page turn" "pencil on paper"

Every fetch is filtered to **under 3 seconds**, deduped **by content hash**
(the check that caught the four-way duplicate), high-passed at 250 Hz and
peak-normalised to −12 dBFS — the same spec as the thirteen above. Provenance,
author and licence land in `assets/sfx/freesound.jsonl`, which is what
`THIRD_PARTY.md` should cite once the palette settles.

Worth pulling: stamp · page turn · book close · drawer · pencil · pen scratch ·
paper slide · card deal · switch click · typewriter key · ratchet · dial click ·
wood knock · box close · paper crumple · file drawer · stapler.
