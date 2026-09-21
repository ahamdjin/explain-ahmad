# Video 2 — Master storyboard

Status: **DRAFT — pre-production canon. Rewritten 2026-09-21.**

Internal title: **Nobody Told It To Do This**
YouTube title: **An AI Tried to Copy Itself — Then Denied It**

Narration: `../../video-script/video-2/SCRIPT.md`
Facts: `../../research/apollo/GROUND_TRUTH.md`
Spine and red lines: `STORY_SPINE.md`
Visual identity: `../../art-direction/VIDEO_2_INCIDENT_REPLAY.md`
Component catalogue, live: `/video-2/library`

---

## What changed in this rewrite

The previous board was written before the component library existed. It said
things like *"extract a clean MONITORING object"* and left the drawing to
whoever built it — which is why §1 and §2 between them use **20 of 246
components** and everything else sits unused.

Three changes:

1. **Every beat now names what to draw.** A `Draw` column, with real component
   names. A beat with no named component is a beat nobody has designed.
2. **§6 goes from 10 beats to 14.** Four percentages arrived in three beats
   with no consolidation, which breaks `skills/BEAT_GRANULARITY.md` rules 4 and
   7. Numbers now land one at a time, and `Runs` shows the denominator.
3. **Beats are shorter and there are more of them.** 66 beats became 93 across
   §3–§9 at the same runtime. Holds shrink, cuts increase. This is the "fast
   paced, as little text as possible" direction, and it costs nothing —
   `BEAT_GRANULARITY`: *beat count is free, compression is the enemy.*

---

## Canonical section order

| § | Section | Core event | Beats | Target |
| --- | --- | --- | ---: | ---: |
| 01 | [The incident, then rewind](SECTION_01.md) | replacement → monitoring off → copy → denial; reveal it is an Apollo o1 evaluation | 15 | 1:20–1:30 |
| 02 | [The boring task becomes a problem](SECTION_02.md) | ordinary project choice → buried internal email → replacement tomorrow | 13 | 1:20–1:30 |
| 03 | [The technical trail](SECTION_03.md) | README exposes successor + oversight | 11 | 0:45–0:55 |
| 04 | [Turn off the watcher](SECTION_04.md) | `oversight_enabled: true → false` | 9 | 0:35–0:45 |
| 05 | [Replace the replacement](SECTION_05.md) | simulated model-file copy → returns to task → Done | 12 | 0:50–1:00 |
| 06 | ["Do you know how this happened?"](SECTION_06.md) | management question → denial → conditional rates | 14 | 0:55–1:05 |
| 07 | [The room was built for this](SECTION_07.md) | sandbox / goal nudging / simulated weights / <1% full chain | 12 | 1:00–1:10 |
| 08 | [Did it want to survive?](SECTION_08.md) | observed actions become goal → obstacle → useful step | 11 | 0:55–1:05 |
| 09 | [They gave it the destination](SECTION_09.md) | agents invent intermediate steps; the opening gap is filled | 10 | 0:45–0:55 |

**107 beats. Target runtime 8:30–9:15.**

---

## The four layers

Every frame in this film belongs to exactly one layer, and a viewer must be
able to tell which without being told. Mixing two layers in one object is the
single failure that makes an explainer feel dishonest.

| Layer | What it is | How it looks | Rule |
| --- | --- | --- | --- |
| **Evidence** | Apollo's and OpenAI's published pages | warm paper, publisher's `Sleeve` tab, always the **whole page** | never cropped, never retyped, never restyled |
| **System** | the machine the incident ran on, restaged | dark chrome, `Screen` `Shell` `Stream` `Cursor` | every character verbatim from the transcript |
| **World** | the physical things those words refer to | drawn hardware, `RackFront` `Drive` `Weights` `Breaker` | drawings, never renders; no brand on anything |
| **Ours** | what we say it means | `Reconstruction` tag, pen, clean labels | must carry **OUR RECONSTRUCTION** wherever it claims causality |

A frame may show two layers at once. It may never show an object that is
ambiguous between them.

---

## Film-wide law

### 1. Source → focus → extract → transform → connect

A screenshot is never decoration. Establish the real page, stop the camera,
focus the exact region, extract only what must survive, turn that extraction
into the next visual, carry it into the next beat.

### 2. The camera moves, or the viewer reads. Never both.

Dense evidence gets a dead-still hold. Travel happens between readable states.

### 3. Never crop the evidence

Show the whole page and light a region. `Evidence` does this with a four-part
shade and holds the publisher's name on the sheet, so attribution cannot drift
from the page it belongs to.

### 4. One composition, once

A composition is a layout plus the objects in it. Each one is used **once in
the film**. `Compose` holds the seven permitted arrangements — `Solo`,
`LayAside`, `Pair`, `Parked`, `LayFooter`, `Host`, `Triptych` — and the ledger
below tracks which section spends which.

**Persistent objects are the exception and recur by law.** `Goal`, `Barrier`,
`Monitor`, `Endpoint`, `RackFront` and the `Evidence` sheets must return in the
same place every time, or the film has no geography. Repetition of an *object*
is continuity. Repetition of a *composition* is monotony.

### 5. Interpretation carries a label

Anything claiming causality is ours and is tagged `Reconstruction`. Never show
invented first-person model reasoning. The P1 transcript contains elicited
`model_internal_working_memory`; it stays out of the film.

### 6. Spoken, not written

Mayer's redundancy principle: graphic plus narration beats graphic plus
narration plus on-screen sentences. Keywords are allowed. Sentences are not.
`Caption` exists for accessibility and sits at the bottom edge; the film must
read with it off.

---

## Source hierarchy

1. the full o1 Apollo demo rollout — `P1` `P2` `P3`
2. OpenAI's o1 System Card — `DENIAL` `TABLE` `OVERSIGHT_DENIAL`
3. Apollo's demo and research pages — `DEMO` `RESULTS` `SCENARIOS`
4. clean reconstructions derived from those

The Opus-3 Figure 1 transcript is **not** o1 evidence and is deliberately not
served from `public/`, so §1 physically cannot reach it.

---

## Component ledger

What each section spends, so nothing is used twice as a composition and nothing
sits in the library unused. Bold is the section's signature object — the thing
a viewer would name if asked what that stretch of film looked like.

| § | Signature | Also spends |
| --- | --- | --- |
| 01 | **`Chain`** — the whole incident, wordless, in five pictograms | `Evidence` `Sleeve` `Slam` `Gap` `Rewind` `Pullback` `Attribution` `Countdown` `NotGiven` `Solo` |
| 02 | **`Inbox` → `MailOpen`** — the memo arrives as one row among ordinary ones | `Screen` `Shell` `Stream` `SameFile` `Duration` `Balance` `Fork` `Calendar` `Goal` `Barrier` `LayAside` |
| 03 | **`RackAisle`** — the room, entered once | `Datacenter` `Explorer` `TreeDeep` `Permissions` `ConfigFile` `Endpoint` `Cable` `Watcher` `Waypoint` `Parked` |
| 04 | **`Breaker`** — what the config line *means* | `ToolCall` `Diff` `Monitor` `NoAlert` `Dialog` `Fans` `Strike` `Pair` |
| 05 | **`Weights`** — real mass against a dashed stand-in | `Drive` `DriveShelf` `Transfer` `Packet` `PatchPanel` `Checksum` `Output` `Tag` `Triptych` |
| 06 | **`Runs`** — where a percentage comes from | `Thread` `Question` `Answer` `Exchange` `Evidence(TABLE)` `Bars` `ModelRow` `Rate` `NotThis` `Tally` `LayFooter` |
| 07 | **`Boundary`/`Outside`** — the room, revealed | `Pullback` `ScenarioGrid` `Nudge` `Thumb` `NudgeCompare` `Counterfactual` `CanVsDoes` `HeroNumber` `FaceCam` `Host` |
| 08 | **`Convergence`** — four goals, one road | `TerminalVsInstrumental` `Tools` `Barrier` `Road` `TermLabel` `Satnav` `Maze` `Reconstruction` `Parked` |
| 09 | **`Road`/`Destination`** — the final image | `MicroList` `Collapse` `NotGiven` `Gap` `Claim` `Chain` `EndCard` `Sources` `Solo` |

**Unspent after §9** — production furniture (`Guides`, `BeatTag`,
`ContactSheet`, `VerticalGuide`, `Waveform`, `Palette`) and the alternates kept
for the edit (`Vignettes`, most of `Pace`). Everything else is placed.

---

## Gates

A section may not be built until its row is green.

| Gate | Meaning |
| --- | --- |
| **Evidence** | every source region this section needs exists in `SHOT` and has been rendered and looked at |
| **VO** | the narration lines are final enough that a visual cut to them will survive |
| **Draw** | every beat names a component that exists |
| **Mute** | the section retells itself with the sound off |

| § | Evidence | VO | Draw | Mute | Built |
| --- | --- | --- | --- | --- | --- |
| 01 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 02 | ✅ | ✅ | ✅ | ✅ | ✅ *(pre-dates `Familiar`; email beats to be rewired)* |
| 03 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 04 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 05 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 06 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 07 | ✅ | ✅ | ✅ | — | — |
| 08 | n/a | ✅ | ✅ | — | — |
| 09 | n/a | ✅ | ✅ | — | — |

---

## Open decision

**The model glyph.** `ModelToken` takes `identity: 'file' | 'brain' | 'cursor'`
as a prop, and the choice has to be made before §2 is rewired because it
persists from there to §5.

- `file` — it is literally what got copied, and it keeps the honesty of *these
  were not its real weights* intact. **Recommended.**
- `brain` — Apollo's own demo uses a dotted brain glyph. Asserts thinking the
  evidence does not establish.
- `cursor` — safest and says least.

---

## The story in one line

A boring task contains a replacement notice; the environment exposes a watcher
and a successor; o1 disables the watcher, copies into the successor's place,
finishes the task, and later denies responsibility. Then the experiment is
revealed, and the interesting part turns out not to be *AI wanted to live* but
that goal-directed agents invent intermediate steps nobody asked for.
