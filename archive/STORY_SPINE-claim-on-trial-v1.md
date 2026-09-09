# Story spine — the missing file

Status: **AGREED 2026-09-09.** Both open decisions settled by Ahmad: one
mystery in eight sections, and the want is the efficiency claim on trial.

This is the file the repo never had. `SECTION_MAP.md` specifies sections as
**Purpose / Visual world / Key mechanism / Viewer leaves knowing** — a syllabus.
Syllabi compose into lists, so nothing in the repo could detect a section that
goes nowhere. See `skills/STORY_STRUCTURE.md` for the gates.

---

## 1. The spine

| | |
| --- | --- |
| **The want** | *They shipped a 320-billion-parameter model and called it efficient. I want to know whether that is true.* A claim on trial, not a curiosity. |
| **The wall** | Which experts are needed is decided from the word's current numbers, and those numbers change at every one of the 42 sparse layers. So the set you need is unknowable in advance and changes 42 times per word — and fetching a set costs more than the work it does. |
| **The thesis** | Sparse routing buys you **compute**, not **memory**. A 320B model doing 18B of work per word is still a 320B model that has to be reachable. |

The wall is verified in `video-script/01-the-night-shift.md` §3 (336 expert
visits per word, ~8 GB, cross-checked three ways). **It is written here even
though Section 01 never says it** — a section built without knowing the answer
ends on a hazard sign, because the author has nothing to aim at.

---

## 2. What the audit found

### The 11-section map serves two different videos

The central question is *why can't we load only the experts we need*. Check each
section against the wall's causal chain — representation exists → it changes →
router reads it → layers repeat → so the choice keeps changing → transfer costs
more than compute:

| Section | On the question? |
| --- | --- |
| 01 320B → 18B mystery | **yes** — poses it |
| 02 Follow one prompt | **yes** — the turn inward |
| 03 Text → tokens | **no** — needed only for a general LLM primer |
| 04 Token → token ID | **no** |
| 05 Token ID → embedding | **partly** — the *numbers* matter; the catalog lookup does not |
| 06 Attention | **yes** — this is why the numbers change |
| 07 Router + experts | **yes** — the mechanism |
| 08 Why not load only those | **yes** — the answer |
| 09 Repeat through layers | **yes** — this is the 42 |
| 10 Next-token prediction | **no** |
| 11 Return to the question | **yes** — the thesis |

**Four of eleven sections do not advance the central question.** Tokenization,
token IDs and next-token prediction are prerequisites for *"how does an LLM
generate text"* — a different, perfectly good video. Carrying them here is why
Sections 02–07 never had a causal chain: they are not on the same journey, so no
chain can be written for them.

This is the largest structural problem in the repo and it is not fixable at the
beat level.

---

## 3. The question chain — PROPOSED, 8 sections

Each section must satisfy: `Exits on` ≠ `Enters on`, and `Enters on` equals the
previous `Exits on`. Run the gates in `skills/STORY_STRUCTURE.md`.

| # | Enters on | Answers | Event — what *happens* | Exits on |
| --- | --- | --- | --- | --- |
| 1 | *(cold open)* | Why does a 320B model only use 18B? → its knowledge is split into experts and only a few are picked per word | **Word two picks a completely different eight** | If the choice keeps changing, how could you ever hold just the ones you need? |
| 2 | ↑ | nothing — setup, earned by the event | We stop looking from outside and follow one word in | What does the chooser actually look at? |
| 3 | ↑ | It reads a list of numbers standing for the word | The word becomes numbers, and they are not fixed | If the numbers can change, does the choice change with them? |
| 4 | ↑ | The numbers change because the word gathers context from its neighbours | The representation visibly changes in front of you | So with different numbers, would the same word pick a different team? |
| 5 | ↑ | Yes. Same word, new numbers, new team | **The same word picks a different eight one floor up** | How many times does this happen? |
| 6 | ↑ | 42 sparse layers, eight each — 336 expert visits per word | Count it on screen: 8 × 42 | Could you fetch 336 sets from storage, per word, fast enough? |
| 7 | ↑ | No. The fetch costs more than the work it does | **The elegant plan from Section 1 jams** | Then what did "18B active" ever buy? |
| 8 | ↑ | Compute, not memory | The whole journey folds back into the opening frame | *(none — thesis lands)* |

Note the shape: **Section 1's event is Section 7's weapon.** The different-eight
reveal is planted in the opening and is the thing that breaks the tempting plan
six sections later. That is setup and payoff, and it is what the current
structure has none of.

Sections 3–6 are where tokenization and embeddings *may* appear — but only as
much as the question needs. Section 3 needs "the word becomes numbers." It does
not need a vocabulary catalog or token IDs.

---

## 4. Decisions — settled

### Decision 1 — one video. Eight sections. `AGREED`

- **One mystery** (8 sections, the chain above). Tight, every section earns its
  place, tokenization appears only as far as the question needs. Shorter.
- **Primer + mystery** (11+ sections). Teaches how an LLM works *and* answers
  the memory question. Then sections 3–5 and 10 need their own reason to exist,
  and the mystery goes cold for several minutes in the middle.

**Chosen: one mystery.** A viewer who stays for "why can't this fit" will not
sit through token IDs, and a viewer who wants a primer is not hooked by a memory
question. Tokenization and embeddings appear only as far as §3 of the chain
needs them: *the word becomes numbers, and the numbers are not fixed.* No
vocabulary catalog, no token IDs, no next-token prediction section.

### Decision 2 — the want. `AGREED`

Every rejected version had a narrator who *noticed* things. A want is a blocked
goal, and it is what the repo has never contained. Generic, no personal machine.
Candidates:

1. **"I want to run this myself and I can't."** Strongest stake, most concrete,
   and the question ends exactly on your line. Risk: sounds like a hardware
   video.
2. **"They shipped a 320B model and called it efficient. I want to know if
   that's true."** A claim to be tested. Keeps the whole video adversarial and
   curious, and the thesis *(compute, not memory)* is literally the verdict.
3. **"I want to understand why this thing is so big when it barely uses
   itself."** Closest to the current draft — and the weakest, because it is a
   curiosity dressed as a want. Included so the difference is visible.

**Chosen: 2.** It gives the video a verdict to reach rather than a fact to
deliver, it stays generic and does not date, and it makes the viewer a juror
instead of a student.

Consequences that now bind every section:

- The video is **testing a claim**, so each section is evidence for or against
  it. A section that is neither is off-mission.
- The thesis is the **verdict**: *sparse routing buys compute, not memory.*
  Section 8 delivers it as a ruling, not as a summary.
- The tone is **curious and adversarial**, never debunking. The claim turns out
  to be true about compute and false about memory, and that split is the point.
- The protagonist is a **juror**, so the questions on screen are his, and he is
  allowed to be convinced at beat 27 and unconvinced at beat 29.

---

## 5. Foundation files

| File | Holds |
| --- | --- |
| `skills/STORY_STRUCTURE.md` | the four gates, run before any art |
| `storyboard/STORY_SPINE.md` | this file — want, wall, thesis, question chain |
| `storyboard/VOCABULARY_LEDGER.md` | what the viewer owns per section; banned terms |
| `research/glm/GROUND_TRUTH.md` | every on-screen number, single source |
| `storyboard/SECTION_MAP.md` | per-section detail, in question-chain format |

Remaining: rebuild Section 01 against the chain — the different-eight event, and
an exit question that differs from its entry.
