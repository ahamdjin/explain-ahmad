# Strategy ledger — every technique, its teacher, and how good the evidence is

Researched 2026-09-11. Ahmad's rule, which created this file:

> *"Tell me from which teacher you read that this will work? The strategy name
> that is used in the video. or in the section or in the beat."*

So: **no beat gets a technique that is not named here.** A beat cites a
strategy ID, and this file says who taught it and how well it is evidenced.

## Evidence tiers — read these before trusting a row

| tier | means |
| --- | --- |
| **A** | Primary source read directly. Verbatim text, a paper's own abstract, or the artefact's own source code. Quotable. |
| **B** | Trade press, marketing blog, or content-industry aggregate. Plausible and directionally useful. **No study behind it that I have seen.** Do not put a B number on screen. |
| **C** | **My inference.** No source. Reasonable, untested, and labelled so nobody later mistakes it for research. |

Nothing here is tier A unless I opened the source myself on 2026-09-11. Four
rows that looked like research when I first wrote them have been demoted to B
or C.

---

## The strategies

### S-01 · Concrete contradiction open · **tier A**

**Teacher:** Nicky Case, *The Evolution of Trust* — `words.html` from
`github.com/ncase/trust@gh-pages`, CC0, read directly.

Opens: **"During World War I, peace broke out."** Six words, a contradiction on
its own terms. No topic sentence, no subject name, no number.

**Rule:** the first sentence is a contradiction, not a subject.

### S-02 · Invert onto the viewer's present · **tier A**

**Teacher:** same source, third move.

> *"Meanwhile: it's 2017, the West has been at peace for decades, and wow, we
> suck at trust."*

The historical fact was the setup. The payload is *you are worse at this than
soldiers in a trench.* Without this move the opening is an anecdote.

**Rule:** every cold open needs the turn that makes it the viewer's problem.

**Ours, unused:** another model, also ~5% active, fits one card where GLM needs
four. Full table and sources in `STORY_SPINE.md` §1.

### S-03 · State the outcome early · **tier A**

**Teachers, two independent:**

1. Grant Sanderson, Summer of Math Exposition judging criteria,
   3blue1brown.com/blog/some1 — verbatim: **"Motivation: It should be clear to
   the reader/viewer within the first 30 seconds why they should care."**
2. Case, Trust, fifth move: *"I think game theory can help explain our epidemic
   of distrust – and how we can fix it!"* — stated **before** the first
   interaction.

**Rule:** the promise is explicit and early. Withhold the *mechanism*, never
the *promise*. A withheld promise is not a hook, it is an unlabelled video.

**This corrects my own draft.** Spine v5 said "the intro asks, §11 answers" and
I built §01 v9 to ask without promising. Ahmad's call — intro asks, §11
answers — stands for the **mechanism**. The *promise* has to be in the first
thirty seconds regardless, and v9 beat 10 was too late and too vague.

### S-04 · Concrete before abstract · **tier A**

**Teacher:** Grant Sanderson, *Concrete before Abstract*, ODSC India 2019.
Abstract: *"resist the temptation to open a topic by describing a general
result or definition"*; instead *"let examples precede generality"*, finding
the example that *"guides the audience to rediscover the general results for
themselves."*

Corroborated by Trust, which never introduces a payoff matrix — it assembles
one from a coin machine the reader has already operated.

**Rule:** no definition before the thing it names has been seen behaving.

**Ours, broken:** §01 v8 defined *parameter*, *expert* and *active* inside
twenty seconds.

### S-05 · Place Your Bets · **tier A**, and **scarce**

**Teachers:**
- Name and design pattern: Nicky Case, *Explorable Explanations: 4 More Design
  Patterns* — and its own warning, *"do not mistake clicking for thinking."*
- Mechanism: **Richland, L. E., Kornell, N., & Kao, S. L. (2009). The
  pretesting effect: Do unsuccessful retrieval attempts enhance learning?
  *Journal of Experimental Psychology: Applied, 15*(3), 243–257.** Attempting
  an answer before instruction improves later retention **even for items the
  learner got wrong** — a desirable difficulty.

**The scarcity rule is countable in Trust's source.** Across the whole ~20
minute piece there are exactly **two** commit-and-branch predictions
(`noise_evo_2_2`, `noise_evo_4_2`; the branch strings are *"You were correct
--"* and *"Your bet was close, but no cigar --"*).

**Rule:** two or three hard predictions in a long piece, placed **only where
the correct answer is genuinely counterintuitive.** A guess the viewer gets
right is worse than none — it confirms a model we want to break.

### S-06 · Interpolated testing · **tier A** — and it is the one that answers Ahmad's doubt

**Teacher:** **Szpunar, K. K., Khan, N. Y., & Schacter, D. L. (2013).
Interpolated memory tests reduce mind wandering and improve learning of online
lectures. *PNAS, 110*(16), 6313–6317.**

Measured, in **video lectures** specifically: mind-wandering probes came back
positive **19%** of the time in the tested group against **39%** (restudy) and
**41%** (no test). Testing also *reduced* reported cognitive load and anxiety.

Ahmad's objection was that ncase's patterns come from games and text, and that
video watch-time behaves differently. This is the study that says the
prediction pattern **does** transfer to video — with the condition that it be
*interpolated*, spread through the runtime, not spent once at the front.

**Rule:** for a 21-minute video, questions belong **throughout**. S-05 governs
how many are *hard commit-and-branch* bets; S-06 says the softer "what do you
think happens next" beat should recur.

### S-07 · Pattern interrupt every 20–40 seconds · **tier B**

**Source:** narrationbox.com/blog/why-viewers-drop-off-after-30-seconds-youtube
— a content-marketing blog. Its five-phase opening is *"Direct statement of the
outcome. Immediate context. Preview of structure. Controlled pacing and tonal
variation. Pattern interrupts every 20 to 40 seconds."*

Directionally consistent with S-06's mechanism, which is why it is kept. **No
study behind the 20–40 number.** Do not quote it as a fact.

### S-08 · Micro open loops · **tier B**

**Source:** same. Teasing a specific thing revealed later. Distinct from
withholding the promise (S-03) — a loop is *"I'll come back to why 288 matters"*,
not an unlabelled video.

### S-09 · Late reversal of a taught belief · **tier A**

**Teacher:** Case, Trust, noise chapter, verbatim: *"As cool as Copycat is, it
has a huge, fatal weakness I haven't mentioned yet."*

Copycat has been winning for several chapters, so the reader holds a belief the
piece itself built. Roughly two-thirds through, the belief is taken away.

**Rule:** one reversal at ~⅔, and it must reverse something **this video
taught them to believe** — not a misconception they arrived with.

**Ours:** §12 (caching works, but not at 12,096 slots) is in the right place
but nothing earlier teaches the viewer to expect caching to save them, so there
is no belief to take back. Fixable in §11.

### S-10 · Close by reusing the opening's nouns figuratively · **tier A**

**Teacher:** Case, Trust outro: *"…we can stop firing at each other, get out of
our own trenches, cross No Man's Land to come together… to live and let live."*

Not merely showing the opening image again — the opening's **literal nouns
return as metaphor**.

### S-11 · Thesis once, one sentence, at the end · **tier A**

**Teacher:** Case, Trust outro: *"What the game is, defines what the players
do."* Said once. At the end.

**Ours:** *"Active parameters is a compute number, not a memory number"* is in
the spine and is never said as one sentence in the script.

### S-12 · Name the mechanism at the close, not the open · **tier C — my inference**

Extrapolated from Trust withholding its own title word ("evolution") until the
mechanism earns it. **I have no source saying this works at section scale.** It
is the pattern I chose for the thirteen chapter walls in `STORY_SPINE.md` §5,
and it is untested. Labelled C so it is not mistaken for S-01–S-11.

### S-13 · Give recurring mechanisms faces and names · **tier A**

**Teacher:** Case, Trust — Copycat, Grudger, Detective, Simpleton, Copykitten.
Cashed in by sentences like *"Simpleton is actually capable of exploiting
Always Cooperate"*, which is only readable because both nouns are characters.

**Ours:** 288 anonymous boxes and a desk.

### S-14 · Bank, then complicate (therefore / but) · **tier A**

**Teachers:** `skills/ncase/NCASE_LEARNING_AND_EXPLANATION_NOTES.md` records
Case's **BUT → THEREFORE** story flow; our own
`skills/STORY_STRUCTURE.md` §2 states the section-level form.

**Rule:** a section opens by banking the previous answer as settled *in one
clause*, then adds the but. One clause, never a recap — recaps are where
retention dies.

### S-15 · Novelty — offer what search cannot · **tier A**

**Teacher:** Sanderson, SoME criteria, verbatim: *"It doesn't necessarily have
to be an original idea or original topic, but it should offer someone an
experience they might otherwise not have by searching around online."*

**Ours:** `research/RETENTION_AND_ANGLE.md` §2 lists three existing MoE videos
covering total-vs-active. The differentiator has to be the thing they get wrong
or never reach — the fine-graining argument in
`research/glm/OFFLOADING_AND_LOCALITY.md`.

---

## Retention numbers — all tier B, and one of them is shakier than I implied

| claim | tier | status |
| --- | --- | --- |
| 20–35% of viewers leave in the first 30 seconds | B | Consistent across several trade sources (vidiq, prepublish, socialrails). `RETENTION_AND_ANGLE.md` inherited "30–40%", which is the high end. |
| Steepest single drop falls between second 10 and second 20, inflecting near 15 | **B, single source** | From one aggregator. I checked a second source for it and **it explicitly declines to give a second-by-second breakdown.** Treat as a hypothesis, not a finding. |
| 0–5s interrupt / 5–15s promise / 15–30s stakes | B | The three-phase frame `RETENTION_AND_ANGLE.md` was built on. A marketing blog, not a study. It agrees with tier-A S-03 on the 30-second deadline, which is the only part I would defend. |

**The honest position:** the *30-second deadline* is tier A, because Sanderson
states it as a judging criterion. Everything finer-grained than that is tier B,
and I built §01 v9's beat timings on the finer-grained version.

## What I could not verify

- **The three competing MoE videos' actual openings.** YouTube transcripts are
  not fetchable with the tools here. `RETENTION_AND_ANGLE.md` §2 asserts our
  angle overlaps the first one; that assertion is still unverified, and it is
  the one thing most worth checking before locking the opening. It needs a
  human to watch 30 seconds of each.
- **"Open with the key exercise; don't put it at the end"** — this surfaced in a
  search summary attributed to Sanderson. I could not find it in a primary
  source and have **not** used it.
