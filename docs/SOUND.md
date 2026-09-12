# Sound

Sound is **post-production, not a React feature**. The browser build stays
silent and deterministic; sound is cut against the real voice track after the
beat timings are locked.

That separation is deliberate. Browser audio creates autoplay/capture problems,
and provisional `secs` drift the moment the real VO is recorded. The visual
beat **id** is the stable anchor; the absolute timecode is not.

## Production status

- Thirteen selected masters live in `assets/sfx/`.
- Every selected master is **CC0**; provenance is in `assets/sfx/MANIFEST.md`
  and `THIRD_PARTY.md`.
- Human audition page: **`/sfx/index.html`** on the dev server.
- `npm run sfx:cues` resolves the cue plan below against the **current built
  beat timings** and writes `output/sfx/cues.csv` + `cues.json`.
- The editor exports each completed **VO + SFX** section mix to
  `public/mix/NN.wav` (mp3/m4a also accepted).
- `npm run render` may make a VO-only review cut.
- **`npm run render:final` refuses to make the release video if any section is
  missing its final mix.** A polished MP4 can no longer silently ship without
  the sound-design pass.

### Final sound workflow

1. Record VO.
2. Restamp beats from the real VO timing.
3. Run `npm run sfx:cues`.
4. Import the cue CSV/JSON and the thirteen masters into the editor.
5. Place/nudge cues by eye and ear against the actual visual landings.
6. Export the full VO+SFX audio for each section as **48 kHz**
   `public/mix/01.wav` … `public/mix/13.wav`.
7. Run `npm run render:final`.

`render.mjs` normalises every audio input to 48 kHz stereo AAC before joining,
so a stray mono or 44.1 kHz export cannot make the section concat fail.

**Do not copy timecodes out of this document.** This file specifies *which beat*
earns a sound. The generated cue sheet specifies *when that beat currently is*.

## The one decision

**Sound marks a change of state, never ordinary motion.** A thirty-minute film
with sound on every animation becomes a UI demo. Sparse repeated motifs are the
point.

The build already says what a beat is through its `relation`. In general,
`wall`/decisive landings can earn a cue; ordinary `so` motion does not. The
explicit cue plan below is the final authority where that rule has deliberate
exceptions.

## Craft rules

| | |
| --- | --- |
| **Length** | Short and dry. Anything with a tail must earn it. |
| **Pitch** | No musical whooshes, risers or pads. Paper, wood, rubber, mechanism. |
| **Master level** | Selected WAVs are source masters at about **−12 dBFS peak**. |
| **Final cue level** | Start around **−20 dBFS peak** against VO around −14 dBFS; ordinary masters therefore begin about **−8 dB** down in the edit. Adjust by ear. |
| **Frequency** | Masters are high-passed at **250 Hz** by `scripts/sfx-fetch.mjs`. Do not blindly high-pass them a second time. |
| **Ducking** | None. If a cue needs voice ducking, it is too loud or the wrong cue. |
| **Placement** | On the visual landing, normally one or two frames before the object fully settles. |
| **Layering** | One functional cue per landing. Count-up + landing is the deliberate exception. |
| **Repeats** | Vary tiny incidental repeats when useful; do **not** vary repeats whose sameness is itself the argument. |

## The palette — thirteen sounds

Files, measurements and provenance: `assets/sfx/MANIFEST.md`.
**Audition before cutting.** Measurement can reject bad shape; it cannot tell a
stamp from a stapler reliably enough for final taste.

| role | file | use |
| --- | --- | --- |
| the fact landing | `stamp.wav` | **3 uses only** — one recurring character |
| small placement | `click.wav` | common precise landing |
| smaller connection | `tick.wav` | quiet connection / second-order landing |
| decision | `snap.wav` | something settling for good |
| hard stop | `knock.wav` | a limit being met |
| closing | `clack.wav` | something shutting/locking into place |
| weight | `thud.wav` | cost/slowness |
| largest number | `impact.wav` | **one use** — 12,096 |
| counting | `ratchet.wav` | under the five authored count-ups |
| chapter seam | `page-turn.wav` | §§2–13 |
| destruction | `tear.wav` | **one use** — §2 token split |
| diegetic | `typing.wav` | §1 chat opening only |
| final key | `key-press.wav` | §1 chat opening only |

## Cue plan — use beat ids, not typed timecodes

`npm run sfx:cues` contains the machine-readable mapping and verifies that each
named beat still exists. If a beat is renamed or removed, cue generation fails
instead of silently placing a sound on the wrong moment. It also rejects a cue
offset that falls outside the beat it names.

### Diegetic opening

| beat | cue | why |
| --- | --- | --- |
| §01 `you-ask-it-something` | `typing` + `key-press` | the only diegetic sound in the film; the prompt now genuinely reveals character-by-character |

### Count-ups

| beat | cue |
| --- | --- |
| §01 `three-thirty-six-for-one-word` | `ratchet` → `stamp` |
| §07 `three-hundred-and-thirty-six` | `ratchet` → `click` |
| §08 `two-thousand-six-eighty-eight` | `ratchet` → `snap` |
| §11 `how-much-did-we-carry` | `ratchet` → `click` |
| §12 `twelve-thousand-and-ninety-six` | `ratchet` → `impact` |

The ratchet follows the actual visual count. The §1 count starts after its
promise phrase, when the VO reaches *"Across that climb…"*. Count landings use
the `Counter` component's real ~1.4-second animation rather than a guessed one.

### Discrete landings

| beat | cue | why |
| --- | --- | --- |
| §01 `eight-cards` | `click` → `snap` | hardware comparison lands in two gestures; never eight separate hits |
| §02 `it-gets-cut-up` | `tear` | only tear in the film |
| §03 `now-tuesday` | `click` | third point placed |
| §03 `same-word-same-row` | `click` ×3 | sameness is the argument; same sample, even spacing |
| §04 `only-backwards` | `knock` | a hard causal limit |
| §04 `nothing-like-each-other` | quiet `tick` | contrast reveal without weight |
| §05 `no-dog-expert` | `click` ×3 | plates land; third is clipped short so correction sounds wrong |
| §05 `look-what-the-scores-came-from` | `tick` | connection back to scores |
| §07 `picks-again` | `stamp` | same fact returning |
| §10 `it-never-stops-choosing` | `stamp` | third and final stamp |
| §11 `a-second-and-a-half` | `thud` | weight of the fetch delay |
| §13 `all-of-it-in-reach` | `clack` | the memory requirement closes into place |

§7's first beat deliberately has **no knock**. The page-turn seam already lands
there; adding a knock 120 ms later was two cues fighting for one transition.

### Section seams

`page-turn.wav` lands at the first frame of §§2–13. These are generated from
section starts automatically; do not maintain twelve absolute timecodes by
hand.

## Deliberate silence / exceptions

**§10 treadmill.** The repeated generation cycle may use one repeating dry tick
matched to each climb if it genuinely improves the cut. This is the only place
where monotony can be the message. Decide it against the real VO; it is not
hard-coded into the cue exporter because the number and spacing of repetitions
are editorial, not structural.

**§11 `forty-two-times`.** No extra landing. The surrounding repeated mechanism
already carries it.

**§12 `keep-less-and-it-crawls`.** No mercy cue. Let the machine crawl.

**§12 `nobody-knows-where`.** Silence. A missing expected cue is stronger here
than another impact.

**The stamp is a character.** Exactly three authored uses: §1 336, §7 picks
again, §10 never stops choosing. Same sample each time.

## Audition gate

The assets have been checked mechanically for licence, format, duration,
transients and preprocessing. That is **not the same as hearing artistic
character**. Before calling the mix final, listen to all thirteen at
`/sfx/index.html`, then listen again at their real final levels under the VO.
A sound can be technically perfect and still be the wrong sound.
