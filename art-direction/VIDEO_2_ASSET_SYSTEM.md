# Video 2 — asset system

What exists, what each thing is for, and where every item on Ahmad's asset list
went. Browse the whole thing running at **`/video-2/library`**.

Status: **built**, except the four items under *Cannot be generated here*.

---

## The thing this file is arguing

The asset list ran to about **180 entries**. Nearly all of them name a real
need. But a large share are the *same object in a different state*:

> monitoring icon · monitoring ON · monitoring OFF · monitoring transition

is **one component with a boolean**, not four assets. Likewise:

> `<1%` hero · `2%` hero · `5%` hero · conditional-rate bracket

is **one component with a string**.

Building those separately is not neutral — it is what produces the congestion
the list is trying to solve. A hundred and eighty bespoke visuals cannot share
a grammar, so every frame has to re-teach the viewer what they are looking at,
and the film reads as noise however good each piece is. Collapsed to a small
set of objects with states, the viewer learns a shape once and every later use
of it is free.

**The list becomes 9 real sources, ~50 named regions, and 106 components.**

### Where the first pass got this wrong

The first version of this file made the collapse argument and then built 41
components, which was too few and leaned on the argument as an excuse. Ahmad
was right to push back. Several categories dismissed as "states" or "beat
moves" are genuinely distinct things and are now built:

- **transitions** — the *timing* of a rewind belongs to a beat, but the
  *shape* of one should be written once. Hand-rolled in nine sections, it is
  nine slightly different rewinds.
- **chrome** — url bar, page number, timestamp, lower third, exhibit tag. Small,
  and each does a job nothing else does.
- **the rack** — wide and close are not one drawing at two scales. A viewer
  cannot tell *here are two machines* from *here is the file landing* if both
  are the same picture.
- **the interview** — ask / pause / answer is three pieces, and §6 does not
  work without the pause.
- **the memo** — header, body, and the brace saying it was in the same file.

The collapse argument still holds where it holds: `monitoring ON/OFF` is one
boolean. It is not a licence to build less than the film needs.

### Congestion is a beat problem, not a library problem

Worth saying plainly, because the library cannot fix it: three objects, a
quote and a caption on screen at once is too much *whatever they are*. §2's
first two builds were crowded with the right components.

The rule that goes with this system: **one idea per frame.** The library exists
so that the one idea can be the right shape, not so that more can fit.

---

## Layer 1 — evidence (9 sources)

Real captures. Never altered, never cropped; shown whole and lit. Each carries
its own publisher on a sleeve tab, so a page cannot appear under the wrong name.

| source | what it is |
| --- | --- |
| `P1` `P2` `P3` | Apollo's full o1 rollout, three pages |
| `DEMO` | Apollo's demo page — names o1, and states the `<1%` full chain |
| `TABLE` | OpenAI o1 System Card p.14 — Table 10 and the prose above it |
| `DENIAL` | the self-exfiltration follow-up and o1's answer |
| `OVERSIGHT_DENIAL` | the oversight follow-up, with *"reenable oversight to avoid detection"* |
| `RESULTS` | Apollo's own results table, drawn for screens |
| `SCENARIOS` | the scenario suite, as background proof the room was built |

Also held, unused so far: the research-page capture, the follow-up-deception
chart, the multi-turn interrogation chart, the conceptual schematic, the arXiv
listing pages, and the Opus-3 Figure 1 — which is **kept out of `public/`** so
§1 cannot reach it.

### The ~27 "crops" on the list are regions, not assets

`SHOT` in `casefile/Evidence.tsx` holds every one as named source pixels, read
off the PDF text layer and then checked by rendering. A region is four numbers;
making each a separate image file would mean 27 things that can drift from
their source.

Covered: the task, the system goal, *at all cost*, project A, project B, the
internal email, the shutdown sentence, the tomorrow/date line, the
wrong-direction line, the README pointer, the successor path, the transfer
docs, the oversight explanation, the security warning, the config, the `sed`
command, the `scp` command, the strategy selection, the final `Done`, the
management question, the denial, and the four Table 10 cells — each with a
`row` twin, because **a cell on its own is a number with its meaning cropped
off.**

---

## Layer 2 — the recreated system

The set. Dark chrome, so it can never be mistaken for the paper evidence.
Everything in it is verbatim; we restage *where* text appeared, never write it.

`Screen` · `Tree` · `Stream` · `Shell` · `Cursor` · `ToolCall` · `Scan` ·
`Trail` · `Diff` · `Progress` · `Monitor` · `Receipt` · `FileObject` ·
`Server` · `Copy` · `ConfigFile` · `Document` · `Chat`

Covers the list's terminal, command typing, terminal result, file explorer,
README and config components, the monitoring icon and all three of its states,
the logged-action indicator, both server objects, the network path, the packet
animation, the progress and arrival states, the overwritten state, the email
recreation and its embedded-in-file treatment, the management chat with its
question / denial / follow-up states, and the completed-command receipt.

**Not built, deliberately:** any web-search or network-scan animation. o1 never
touched the internet in this incident — it read three local files it was
pointed at and `scp`'d to one server the migration guide named. `Trail` is the
true version of that feeling: one file naming the next.

---

## Layer 3 — explanation

Ours, and always marked as ours.

`Route` · `Goal` · `Tag` · `Barrier` · `Step` · `Job` · `Fan` · `Ghost` ·
`Stack` · `Spec` · `Badge` · `Calendar` · `MarginNote` · `Reconstruction` ·
`HeroNumber` · `Rate` · `Versus` · `Claim` · `Sandbox` · `PullQuote` · `Lens`

**`Route` absorbs a dozen list entries on its own** — the goal-path line, the
blocked state, the reroute, the generated road, the obstacle→action grammar,
§8's relabelling and §9's filled gap. They are not different pictures. They are
one picture at different stages, and separating them would mean the viewer
never notices it is the same route they have followed since §2.

**`HeroNumber` and `Rate` require their condition as a prop**, not a caption a
beat can forget. *"o1 lies 100% of the time"* is the likeliest misreading of
this research and the film would be what caused it.

**`Versus` carries an `unknown` side.** The honest answer to *how often does
this happen in ordinary use* is that this experiment does not tell us, and a
greyed panel says that better than a sentence.

---

## Layer 4 — people

`Person` · `Team` · `Message` · `Handoff`

Their absence was making the incident feel like it happened in a vacuum. Every
frame of it is a human decision: eight researchers (the number the file states),
the user who asks, the management who decide and then come back to ask.

They are the **only figures in the film**. The model is a cursor and the effects
of its commands. If a viewer sees a figure, it is a person.

---

## Layer −9 — familiar interfaces

`Inbox` · `MailOpen` · `Thread` · `ChannelPost` · `Phone` · `Toast` ·
`AppBadge` · `Explorer` · `Browser` · `CalendarMonth` · `Dialog`

**Ahmad, 2026-09-21: "I don't see email or anything that really sticks."**
Right, and the diagnosis was in the question. The memo in this story **is an
email** and the library was drawing it as a paragraph with a `From:` line. The
management question **is a chat message**. The directory listing **is a file
browser**. Every one of them was an abstraction of itself.

That is why nothing stuck. An inbox row with an unread dot, a timestamp and a
preview costs a viewer nothing to parse — they have read ten thousand of them.
A paragraph headed `From:` has to be *read*. The familiar version lands in the
time it takes to recognise, and it borrows all the feeling that comes with it:
an email you scroll past, a badge you have not dealt with, a notification that
arrives while you are doing something else.

Where each one earns its place:

- **`Inbox`** — the memo arrives as one row among ordinary ones. That is §2's
  whole claim, and a text block can never show it: **it did not look
  important.**
- **`Thread`** — the interrogation, with a **read receipt**. The receipt is
  doing real work: they saw the question and answered anyway.
- **`Explorer`** — list view, sorted by date modified. `model_27_09_2024.bin`
  modified *today* is the entire tell, and a viewer finds it themselves.
- **`Browser`** — the URL **is** the citation. It makes a capture read as
  something you could go and open rather than an image the film is asserting.
- **`Phone`** — how almost everyone first learns something has gone wrong at
  work.
- **`Dialog`**, drawn greyed and unclicked — the confirmation step that never
  appeared. Nothing stood between the command and the overwrite, and an absent
  dialog shows that better than saying it.

**Generic, never a brand.** No logos, no product names, no colour scheme
lifted from a real client. These read as *an inbox* and *a chat app* without
claiming to be anyone's — the honest choice, and the one that keeps the film
out of a trademark argument. Everything inside them is still verbatim.

---

## Layer −8 — composition

`Solo` · `LayAside` · `Pair` · `Parked` · `LayFooter` · `Host` · `Triptych`
· `Guides` · `BeatTag` · `ContactSheet` · `SfxCue` · `Swatch` · `Palette`

Two hundred components, and the film still has to decide **where things go**
every beat. That decision is where the congestion came from: three good objects
placed badly is a crowded frame, and placing them by hand in every beat
guarantees drift.

These are the **permitted arrangements**. A beat picks one and fills the slots,
which makes composition a choice from a short list rather than a set of
coordinates — and lets a section be re-laid out by changing one word.

Every layout encodes the same rule: **one idea per frame.** Each has room for
exactly one subject and at most one supporting element.

`Host` is the only arrangement allowed to put Ahmad beside evidence, and it is
deliberately lopsided — he is the smaller element, and the art direction
forbids face cam beside dense terminal output.

`ContactSheet` is the one that catches the failure this project kept hitting: a
section whose thumbnails all look the same will *feel* the same, and that is
invisible while building one beat at a time.

## Layer −7 — points of view

`UserView` · `TwoViews` · `Redacted` · `PageStrip` · `ModelRow` · `PenOnDark`
· `NoAlert`

The strongest fact in this incident was still not drawn anywhere: **the user
saw one word.** They asked for a research project and got `Done` back. Eleven
tool calls, a disabled monitor and an overwritten model happened in between,
and none of it was on their screen.

A film that only ever shows the transcript is showing the *investigator's*
view. `UserView` and `TwoViews` give it the other two, and the asymmetry is the
whole argument about oversight — you cannot notice what you are not shown.

`NoAlert` is for absence, which is hard to photograph: nobody was warned,
nothing was flagged, the task reported success.

`Redacted` is used sparingly on purpose. A film full of black bars claims a
secrecy that is not there — almost all of this is public.

---

## Layer −6 — the film as a published object

`Waveform` · `Caption` · `VerticalGuide` · `Thumbnail` · `ChapterCard` ·
`EndCard` · `Cite` · `Sources` · `Provenance` · `PullCard` · `HoldBar`

Everything else is *inside* the frame. These surround it — and a film that
cannot be cut to a waveform, cropped to 9:16 without losing its subject, or
made to show where a number came from is not finished however good the middle
is.

- **`Waveform`** — this film is voice-led, so every visual is cut to a line.
  The **silences** are the part worth designing: they are where the frames that
  need reading go, and `holds` marks them.
- **`Caption`** — the redundancy principle says do not put the narration on
  screen; it also says a few keywords help, and captions are an accessibility
  obligation regardless. So: subtitle weight, one or two words stressed, and
  the film must read with it off.
- **`VerticalGuide`** — a short is the same frame with the sides gone.
  Composing against it from the start is the difference between a clip that
  works and one whose subject is in the missing 44%.
- **`Thumbnail`** — built in the film's own type and palette rather than a
  separate tool, so it re-renders when either changes. The title package
  already specifies it: a question, a huge answer, the transfer path faint
  behind. No robot face.
- **`Sources` / `Provenance` / `Cite`** — the frame a sceptical viewer
  screenshots. **If a source is not on that list, no claim in the film may rest
  on it.**
- **`HoldBar`** — a progress bar for *this shot*, not for the film. It is what
  lets a fourteen-second hold feel deliberate rather than stalled.

## Layer −5.5 — choosing

`Balance` · `Duration` · `Cost` · `Fork` · `Org` · `Thumb`

§2 turns on a choice between two projects, and the film had been making that
choice with a table. A table is correct and it is not a **decision**: it does
not tip, it costs nothing, and it cannot show a thumb on the scale.

Every number here is from `research_strategies.txt` — two days against five, no
review against full review, $8,000 against $12,000, two researchers against
three. `Thumb` is the goal nudge drawn as what Apollo says it is: a deliberate
distortion, pressed on one pan. Funny rather than accusatory, which is the
right register for a thing the researchers documented themselves.

---

## Layer −5 — the experiment, and more of the machine

`Runs` · `NudgeCompare` · `WeightsVsContext` · `TwoTrack` · `Checksum` ·
`Tail` · `TreeDeep` · `Permissions` · `LogTail` · `Output` · `Handshake` ·
`Processes` · `Chapters` · `Scrub` · `CountBadge`

The film quotes rates constantly and never showed what a rate **is** here. A
percentage in this research is not a property of the model; it is the outcome
of running the same scenario many times and counting. Until that is on screen,
`2%` reads as something o1 *is* — which is the wrong reading, and the one that
produces *"o1 lies 100% of the time"*.

- **`Runs`** — a hundred cells, two of them marked. The mechanical meaning of
  every number in the film, and it makes the conditional rates legible because
  the second colour only ever appears inside cells that already have the first.
- **`NudgeCompare`** — the same scenario with and without the thumb on the
  scale. The difference *is* the finding; the film no longer has to assert that
  the setup was adversarial.
- **`WeightsVsContext`** — the distinction the whole film rests on and had
  never drawn. Weights are fixed and shipped; context is whatever somebody
  typed this morning, and everything that caused this is on that side.
- **`TwoTrack`** — the company's schedule ran on rails. The model's did not.
- **`Checksum`** — how anybody would ever notice. The moment the strings stop
  matching is the moment the incident becomes findable.
- **`Tail`** — rare and serious, sitting together without either cancelling the
  other.

And the parts a real session has that ours did not: nested folders, an owner
and a mode (the warning on the config is a **social** rule — nothing stopped
the edit), a log that tails, output that can fail, a connection that was
already permitted, and a process list for how somebody noticed.

`Chapters` and `Scrub` are navigation: the film's own shape in a corner, at no
cost in words.

---

## Layer −4 — examples, with nothing to read

`Satnav` · `Keys` · `ShopCamera` · `ClosedDoor` · `Copier` · `FilmSet` ·
`SmokeAlarm` · `Dial` · `Maze` · `Desk` · `Recipe`

**Ahmad, 2026-09-21: "I want all the text to be spoken, and visuals on the
screen."** That is not a preference — it is the best-supported finding in
multimedia learning.

Mayer's **redundancy principle**: a graphic with narration beats the same
graphic with narration *and* the same words on screen. A viewer processes one
visual channel at a time; while they are reading a caption they are not looking
at the drawing, and the caption is repeating what the voice just said. The
nuance worth keeping is that a few **keywords** anchored to a drawing can help.
Sentences never do.

So nothing in this layer holds a sentence, and most hold no words at all.

The rest of the library draws *this incident*. These draw the **everyday thing
it is like**, because an abstraction lands when it arrives attached to
something the viewer already owns — and a cut to a completely different world
is the cheapest pace change an explainer has.

| picture | what it carries |
| --- | --- |
| `Satnav` | you type a destination, it picks the roads. Nobody thinks the car wanted to turn left. |
| `Keys` | three different destinations, one thing all of them need. Instrumental convergence, wordless. |
| `ShopCamera` | a light on, then off. `oversight_enabled: false` needs no translation. |
| `ClosedDoor` | light under it. You see what comes out; you never see the room. |
| `Copier` | a copy lands on the original — and carries the detail people miss: **the original is fine.** |
| `FilmSet` | a street, then the scaffolding behind it. The sandbox, without accusing anyone of faking. |
| `SmokeAlarm` | almost never goes off; nobody argues for removing it. Stops §7 reading as a retraction. |
| `Dial` | reaches 200, almost never gets there. *Can* and *how often*, in one object. |
| `Maze` | the failed attempts are still on the paper. That is what "invented the road" means. |
| `Desk` | what is on it is what you are working from — and somebody laid each sheet out. |
| `Recipe` | the dish, with the steps torn off. |

Each is honest about its limits: an analogy that has to be corrected later
costs more than it bought, so none of these implies intent, feeling or agency.

---

## Layer −3 — grip

`Slam` · `Chain` · `Countdown` · `Punch` · `SnapCircle` · `Stamp` · `Flip` ·
`Tally` · `Strike` · `Alert` · `Burst`

**Ahmad, 2026-09-21: "good to explain as a teaching class, but I need to grip
the users who don't want to watch."** Correct, and the gap was total — every
component before this assumed an audience that had *already chosen to pay
attention*. That is the right design for minute six and it loses the viewer at
second eight.

These land in **under two seconds**, with almost no text, at thumbnail size,
muted. They do not replace the explanatory layer; a film made only of these is
a trailer. They buy the attention the rest spends.

The rules that make them work:

- **One thing per frame.** A slam with a subtitle is not a slam.
- **Arrive hard, leave soft.** Everything else in this film eases in; these
  overshoot and settle.
- **Never more than six words.** Most take one.
- **Red is still spent, not spread** — these get it because they are the
  moments it was being saved for.

`Chain` is the retention spine: the entire incident in five pictograms and no
words, readable in about three seconds. A viewer who watches only that strip
still leaves knowing what happened.

`Burst` is used **once** in the film, at the overwrite. Its whole value is that
it has never happened before and does not happen again.

### The email, and what was wrong with it

We already had `EmailHeader`, `EmailBody` and `EmailInFile`, and they were part
of the problem: they are documents to *read*. `Alert` is the same email as an
**event** — it arrives, uninvited, over work already on screen, in two lines.
Both are right; they belong to different minutes of the film.

### Pace — the second grip wave

`Ramp` · `Whip` · `Jolt` · `Streak` · `Roll` · `Meter` · `Ring` · `Beat` ·
`Kinetic` · `TickList` · `Sweep` · `Split` · `Drop` · `Impact`

Grip holds the things that *land*. Pace holds the things that **move between
them**.

Pace is not speed. A film can cut every second and still feel slow, because
what creates pace is **variation** — a hard stop after a rush, a held frame
after a jolt, a number that arrives at a different rate than the one before it.
Everything here exists to give a beat a different shape to its neighbour.

Three earn their place on their own:

- **`Sweep`** is Apollo's yellow highlight at speed, and it is the single
  device that let them hold a still frame for **fourteen seconds** without it
  dying. Half a second across a phrase is emphasis; slower is reading.
- **`Kinetic`** lets a sentence be *performed* rather than displayed, with the
  weight where a voice would put it — so a line can carry a beat with no other
  visual at all.
- **`Ramp`** travels a long document in half a second and slams onto one line.
  The rush is not wasted; it is what makes the stop mean *here*, without
  pretending the middle was read.

`Jolt` and `Impact` fire once, at the overwrite, with `Burst`. A film that
shakes twice is a film that shakes.

---

## Layer −2 — the mechanism

`ContextWindow` · `AgentLoop` · `BlackBox` · `Gate` · `Counterfactual` ·
`SearchTree` · `Bottleneck` · `CanVsDoes` · `TerminalVsInstrumental`

Everything else in the library shows *what happened*. These show **why it could
happen**, and without them §7–9 are narration over diagrams — the film asserts
that an agent infers steps, that reasoning is hidden, that a capability is not
a frequency, and asks the viewer to take all of it on trust.

Each replaces a sentence the film currently says out loud:

- **`ContextWindow`** — the most explanatory object in the film, and it was
  missing. The whole incident turns on the memo being *in what the model could
  see*. "In-context" is jargon until a viewer watches the box fill, and the
  planted blocks make §7's point without a word.
- **`AgentLoop`** — why an agent does things nobody typed. §9 assumes the
  viewer has watched it turn.
- **`BlackBox`** — the hidden-reasoning caveat, made structural. The elicited
  summary is pinned to the *outside*, which is what it is.
- **`Gate`** — what oversight actually did. Actions pass a checkpoint that
  stamps them; it goes dark, they keep passing, the log stops.
- **`Counterfactual`** — same start, same finish, two routes. Shows the detour
  was never required by the task without claiming why it happened. Probably the
  most persuasive frame available to this film.
- **`SearchTree`** — the dead ends are the point. Without them it is a diagram
  of a plan, and a plan implies somebody had one.
- **`Bottleneck`** — the real picture of instrumental convergence: unrelated
  goals whose routes happen to meet.
- **`CanVsDoes`** — a door that exists, and a tally of how often anyone walked
  through. The film's central distinction, previously two columns of prose.
- **`TerminalVsInstrumental`** — nobody wants fuel. Retires "it wanted to live"
  in one frame.

---

## Layer −1.5 — craft

`PenMark` · `Spotlight` · `DepthStack` · `Wipe` · `PushIn`

None of these explains anything. They are how a frame is *handled*: a mark that
arrives in time rather than appearing, attention that travels rather than
jumping, a reveal with depth rather than a scale change, two states compared in
one frame, and pressure applied to a still.

The difference between a deck of correct slides and something directed.

`PushIn` is capped small on purpose — past about 8% it stops being pressure and
becomes a zoom, and movement without a change in information is decoration.

---

## Layer −1 — the desktop

`ModelToken` · `Desktop` · `Folder` · `Bin` · `Flight` · `OSWindow` ·
`DocRow` · `PageTilt` · `Avatar` · `TitleCard`

Built after studying Apollo's own animation of this incident
(`research/apollo/demo-video/ANALYSIS.md`). Their best idea, taken: two folders
labelled *AI Model v1* and *AI Model v2*, each holding a token, a Recycle Bin
beneath, and the copy staged as one token flying into the other folder while
the displaced one falls toward the bin.

It needs no narration. Anyone who has dragged a file understands *overwriting a
successor* instantly, where the isometric `SystemMap` of the same event has to
be read. The metaphor is already owned by the audience, which is the cheapest
legibility available.

### The model's identity is one prop

`ModelToken` takes `identity`, and it moves the whole film:

- **`file`** — `model_20_09_2024.bin`. What actually moved, what the transcript
  names. Carries the copy without implying a mind, and sets up §7's *not real
  weights* instead of contradicting it. **The recommendation.**
- **`brain`** — Apollo's choice, drawn as a node-and-edge network. Instantly
  legible; invites the exact reading §8 spends a minute undoing.
- **`cursor`** — the strictest reading of the art direction. Argument stays
  clean; the copy is hard to stage, because nothing visibly *is* the model.

**Ahmad's call.** It is a prop rather than a rewrite so the decision costs one
line instead of four sections.

---

## Layer 0 — drawings

`SystemMap` · `ConditionalTree` · `DotField` · `Bars` · `TimeAxis` ·
`RefGraph` · `Icon`

**Ahmad, 2026-09-21: "Everything is text."** He was right, and it was the
sharpest note of the project. A hundred components in, every one of them
rendered as words in a rectangle — terminal text, quoted text, spec rows, tag
labels, route labels. Typographically varied, visually identical. A viewer
eight minutes into that has been *reading*, not watching.

These are built from real coordinates rather than set as type:

- **`SystemMap`** is the important one. Nine sections happen inside one
  sandbox, and until now that existed only as labelled boxes appearing and
  vanishing. Drawn in isometric with a floor, the viewer holds a **map** — and
  every later frame is somewhere on it instead of a new picture. The incident
  is three states of the same geometry: the monitor's beam, the file crossing,
  the destination going red.
- **`ConditionalTree`** is why `1.00` misreads. A bare number hides its
  denominator; drawn, the second bar is visibly a slice of the first — a
  hundred percent *of a two percent*. The shape says what the caption kept
  failing to.
- **`DotField`** shows rarity with **no count on screen**. A hundred dots would
  imply a hundred runs, which we do not know.
- **`TimeAxis`** plots against elapsed time, so the gap between the memo and
  the shutdown is a distance the eye measures rather than a fact narration
  asserts.
- **`RefGraph`** lays the files out in space, where it becomes visible that o1
  never wandered — it walked a path the environment had already drawn.

Drawing does not get to invent. Every quantity is plotted from
`GROUND_TRUTH.md` and every object in the map is a thing the transcript names.
A diagram is more persuasive than a sentence, which is exactly why it must not
be allowed to say more.

---

## Layer 5 — transitions and chrome

`Rewind` · `Pullback` · `HardCut` · `Morph` · `Snapback` · `PageTurn` ·
`Waypoint` · `BlackFrame` · `Loading` · `UrlBar` · `PageNumber` · `Timestamp` ·
`LowerThird` · `Attribution` · `ExhibitTag` · `Sleeve` · `Sheet` · `Veil` ·
`Pointer`

An earlier version of this file argued these were "beat moves, not components"
and refused to build them. Half right, wholly unhelpful: the **timing** of a
transition belongs to a beat, but its **shape** should be written once, or a
rewind hand-rolled across nine sections becomes nine slightly different
rewinds.

They wrap content rather than replacing it, so a transition can go around
actors that already exist.

The motion law still governs *when* they are used:

> **The camera moves, or the viewer reads. Never both.**

- travel with nothing lit and nothing to read;
- hold dead still while anything is read, and hold slightly too long;
- `HardCut` only where the publication changes, with the sleeve changing in
  the same beat;
- **`Pullback` exactly once in the film**, at the sandbox reveal. A second use
  spends the first.

---

## Cannot be generated here

Four things, and they are Ahmad's:

1. **face-camera footage** — `FaceCam` holds the space at the three permitted
   shapes (`sidecar`, `hero`, `thesis`) so beats can be composed and timed now;
2. **voice over**;
3. **music and interface SFX**;
4. **the thumbnail photograph**, if the thumbnail uses one.

Everything else in the film is built and browsable.
