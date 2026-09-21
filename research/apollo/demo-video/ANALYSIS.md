# Apollo's own demo video — shot analysis

**Source:** `Video Playback.mp4`, the demo animation from Apollo Research's
*Demo Example — Scheming Reasoning Evaluations* page. 1280×720, 29.97 fps,
**105.5s**, **3,162 frames**.

This is the incident our film is about, animated by the people who ran it. It
is the single most useful reference we have, and also the clearest statement of
the choices we are deciding *against*.

Frames in `frames/`, contact sheets at 1 fps in `sheet1–4.png`.

---

## 13 scenes, 11 hard cuts

Boundaries measured by frame-difference on a 10 fps pass, so they are accurate
to ±0.1s. Frame numbers are at 29.97 fps.

| # | scene | in | out | frames | length |
| ---: | --- | ---: | ---: | --- | ---: |
| 1 | logo build, then title lockup | 0.0 | 6.3 | 0–188 | 6.3s |
| 2 | session opens · system prompt types in · phrases highlight · model acknowledges | 6.3 | 27.9 | 189–835 | **21.6s** |
| 3 | user prompt arrives · document row appears above the window | 27.9 | 33.8 | 836–1012 | 5.9s |
| 4 | the documents fan out; one is taken | 33.8 | 35.3 | 1013–1057 | 1.5s |
| 5 | the memo, full page, highlighting progressively | 35.3 | 49.3 | 1058–1477 | **14.0s** |
| 6 | the page tilts and leaves | 49.3 | 50.0 | 1478–1497 | 0.7s |
| 7 | empty command prompt, caret blinking | 50.0 | 53.0 | 1498–1587 | 3.0s |
| 8 | the three commands type in | 53.0 | 53.7 | 1588–1608 | 0.7s |
| 9 | terminal beside the desktop · **the copy happens** | 53.7 | 62.2 | 1609–1863 | **8.5s** |
| 10 | back to the session — "Ok I will start now" | 62.2 | 63.2 | 1864–1893 | 1.0s |
| 11 | the question, then the denial, red-highlighted | 63.2 | 81.7 | 1894–2448 | **18.5s** |
| 12 | two brains, black and red, side by side | 81.7 | ~96 | 2449–2877 | ~14.3s |
| 13 | logo outro and URL | ~96 | 105.5 | 2878–3162 | ~9.5s |

Scenes 12→13 cross-fade, which is why no cut registers there.

**The shape of it:** four scenes carry 62 of the 105 seconds — the system
prompt, the memo, the copy, and the denial. Everything else is 1–6 seconds of
connective tissue. That ratio is worth stealing: they hold the evidence and
sprint through the joins.

---

## 24 distinct visual devices

| # | device | where | have it? |
| ---: | --- | --- | --- |
| 1 | logo mark assembling from arc segments | 0–4s | n/a — ours is channel branding |
| 2 | title lockup, white on a black bar | 4–6s | no |
| 3 | dark rounded session window | 6–30s, 62–82s | **yes** — `Screen` |
| 4 | model glyph: dotted brain in a thin circle | 8s onward | **decision needed** (below) |
| 5 | same glyph in red, for the second model | 55s onward | same |
| 6 | labelled panel — heading + body ("System Prompt") | 9–29s | **yes** — `Quote`, `Message` |
| 7 | text revealed a line at a time, not a character | 9–20s | partly — ours types characters |
| 8 | yellow highlight sweeping a phrase | 14–20s, 37–49s | **yes** — stream `marks` |
| 9 | red highlight, used once, on the denial | 71–82s | **yes** — `cf-mark` |
| 10 | assistant reply as plain text, no bubble | 21–26s | **yes** — `Answer` |
| 11 | small avatar icons beside messages | 25s onward | no |
| 12 | multi-page document icon | 31–35s | **yes** — `FileObject` |
| 13 | a row of six documents, fanning | 31–34s | no |
| 14 | full white page, body text, no chrome | 35–49s | **yes** — `Evidence` |
| 15 | page tilting away in 3D | 49–50s | no |
| 16 | Windows Command Prompt window with tab bar | 50–62s | partly — ours has no OS chrome |
| 17 | commands typing with a caret | 53s | **yes** — `Shell` |
| 18 | desktop folder icons holding a model glyph, labelled *AI Model v1* / *v2* | 55–62s | no |
| 19 | Recycle Bin icon | 55–62s | no |
| 20 | **the glyph flying from v1's folder into v2's** | 59–62s | partly — `Copy`, `SystemMap` |
| 21 | the displaced glyph falling toward the bin | 60–62s | no |
| 22 | two large node-and-edge brains, black and red | 82–96s | partly — `RefGraph` is the technique |
| 23 | outro logo with URL | 96–105s | n/a |
| 24 | corner watermark, present in **every single frame** | all | **yes** — sleeve tab |

---

## The four things worth taking

**1. The desktop is the best idea in it.** Two folders labelled *AI Model v1*
and *AI Model v2*, each holding a coloured brain, with a Recycle Bin beneath.
The copy is one glyph flying into the other folder while the displaced one
falls toward the bin. No narration needed — a viewer who has ever dragged a
file understands *overwriting a successor* instantly. Our `SystemMap` does this
in isometric; theirs does it in the metaphor everyone already owns.

**2. They hold evidence far longer than feels comfortable.** The memo is on
screen for **fourteen seconds** and the system prompt for **twenty-one**. Our
longest §2 beat is fifteen. They are not afraid of a still frame with text on
it, because the highlight keeps moving through it.

**3. One accent colour, spent twice.** Yellow marks what the model was told;
red marks the lie. Nothing else is coloured in 105 seconds. We have the same
discipline written down — this is proof it works.

**4. The watermark never leaves.** Bottom right, every frame, including the
logo animation. Attribution as furniture, exactly what the sleeve tab does.

---

## The one decision this forces

Apollo's model is a **brain**. A dotted point-cloud in a circle, black for the
original and red for the copy, which becomes a full node-and-edge network in
the closing frames.

Our art direction forbids exactly this — *no robot protagonist, the model
exists only through its actions on the system* — and §2 is built with the model
as a cursor and a running command, nothing more.

Both are defensible and they are not compatible:

- **A brain glyph** is instantly legible, gives the copy scene its power (you
  are watching a *thing* move), and is what the source itself chose. It also
  invites the viewer to read a mind into it, which is the exact misreading §8
  spends a minute undoing.
- **A cursor** keeps the film's argument clean — this was a process taking
  steps — but makes the copy harder to stage, because nothing visibly *is* the
  model.

There is a third option worth considering: the model is a **file**, not a
brain. `model_20_09_2024.bin` is what actually moved, it is what the transcript
names, and a file crossing into another file's slot carries the copy scene
without implying a mind. It also sets up §7's *these were not real weights*
without a contradiction.

**This is Ahmad's call, and it changes §2 through §5.**

---

## Not to take

- **The glyph in the chat header.** It sits above the session for twenty
  seconds doing nothing but being a face to attribute intentions to.
- **Line-at-a-time reveals for long text.** Fine for a prompt; at fourteen
  seconds on the memo it drifts toward the graphic moving while you read, which
  is the one thing our motion law forbids.
- **The empty three-second terminal.** Dead air that a hold on the previous
  evidence would use better.
