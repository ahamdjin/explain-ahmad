# Section 01 — Storyboard Frames 1–14

Status: **APPROVED visual storyboard for Section 01.** This is the frame-level source of truth.

Reference sheets (authoritative for style, character design and layout):

- `frames-01-04.png` — Why 320B but only 18B active?
- `frames-05-08.png` — From 18B active to a team of experts
- `frames-09-12.png` — From experts to the memory question
- `frames-13-14.png` — The unresolved mystery and the move inside

Narration source: `../../video-script/01-the-claim.md`
Art direction: `../../art-direction/GLM_PAPER_WORLD.md`
Implementation: `src/videos/glm-320b/section-01/` — route `/section-01`, `?frame=N` to jump
Review: `npm run frames:s1` writes `frames/section-01/index.html`

---

## Cast

Established by these sheets and reused for the rest of the video.

| Actor | Design | Role |
| --- | --- | --- |
| **Narrator** | Simple white round head, two dot eyes, thin stick body/arms, no color | The viewer's proxy. Asks every question. Never explains. |
| **Experts** | Rounded paper square, two dot eyes, small smile, pastel fill (orange/blue/green/purple/yellow/pink/teal), tiny feet | Learned feed-forward blocks. Identical construction, color varies. |
| **Router** | Boxy robot, antenna with a bead, screen face, two side arms, body labelled `Router` | Reads the current representation, selects experts. Dispatcher, not a boss. |
| **Shared expert** | Same as expert but grey/neutral with a dashed outline | Always participates. |
| **The word** | Kraft-paper card, slight rotation, reading `"scared"` | The persistent actor for all of Section 01. |
| **Weight shelf** | Drawn shelving unit, experts sitting on shelves, `···` to imply more | Stored checkpoint. Labelled in GB. |
| **RAM tray** | Small drawn box/tray labelled `RAM / VRAM (Working Memory)` | Active working space. Physically much smaller than the shelf. |
| **Blocker** | Yellow/black hazard pole + red warning triangle | The unexplained bottleneck. Appears once, frame 13. |

## Persistent objects

`"scared"` card, the parameter grid, the expert population, the Router, the weight shelf, and the RAM tray are the same objects throughout. They reconfigure; they do not get replaced.

---

## Frame 1 — Meet the model

- **VO:** "So, GLM-5.3-Flash has 320 billion parameters and only 18 billion are active."
- **On screen:** Model info card, taped at the corner, slightly rotated. Rows: Architecture / Total Parameters / Active Parameters / Experts / Layers / Purpose. `320 Billion` highlighted orange, `18 Billion` highlighted blue. Two callout notes point at them: `320B total parameters`, `18B active parameters`. Narrator stands left with a raised hand: "This is the model we'll look at!"
- **Goal:** Introduce the real model and the two numbers.
- **Note:** This is the §14 information-screen exception — no grid, no router, no experts yet.

## Frame 2 — A word comes in

- **VO:** "For any one word, only about 18 billion parameters are active."
- **On screen:** Header `MODEL PARAMETERS (320,000,000,000)`. Large grid of grey rounded squares fills the frame. The `"scared"` card enters from the left with an arrow. A **contiguous** orange block lights up inside the grid, braced below: `~18B ACTIVE`. Narrator, lower left: "A word goes in…"
- **Goal:** Show scale — most of the model is not active for one word.

## Frame 3 — A tiny part is used

- **VO:** "Which basically means the model owns 320 billion parameters… but only uses a small fraction of them to process that word."
- **On screen:** Same grid, now braced across the top: `320B TOTAL PARAMETERS`. The orange block keeps its lower brace, now reading `~18B ACTIVE (about 5.6%)`. Narrator: "Just a small part?"
- **Goal:** Make the contrast obvious. Both braces visible in one frame.

## Frame 4 — The obvious question

- **VO:** "Okay. So why have the other 300 billion?"
- **On screen:** Same grid and same orange block. Roughly seven of the **grey** squares grow narrator-style faces and speak: "What about us?", "Why are we here?", "Do we ever get to work?", "Are we just extra?" Small motion ticks beside them.
- **Goal:** Create the question that leads into Mixture of Experts.
- **Note:** The reaction comes from the inactive parameters themselves — not from added text.

## Frame 5 — The inactive part isn't useless

- **VO:** "The rest of the parameters aren't wasted. They are organized into 288 experts. They stay inactive until they are needed."
- **On screen:** Left: the braced grid, `320B TOTAL PARAMETERS` above, orange block braced `~18B ACTIVE`. Right: the grey majority has become a loose crowd of pastel expert characters on a soft panel, braced `288 EXPERTS (inactive until needed)`. Annotation: "They are Experts!" Narrator, far left: "So where do the other 300B go?"
- **Goal:** Establish Mixture of Experts by transforming the existing mass — the boxes become the experts, they are not spawned from nowhere.

## Frame 6 — Meet the router

- **VO:** "A router analyzes the word and quickly selects the most relevant experts."
- **On screen:** `"scared"` card → arrow → the Router robot, centered. Speech bubble: "The router is a smart dispatcher. It looks at the word and picks the best experts." Five dashed arrows fan right to five labelled experts. Annotation top-right: "Experts with relevant skills get selected." Narrator, left: "How does it choose the right experts?"
- **Goal:** Introduce the router as the decision maker.
- **⚠ Accuracy conflict — see Accuracy Notes below.**

## Frame 7 — One word, a small team

- **VO:** "For the word 'scared', the router selects 8 specialized experts plus 1 shared expert that's always active."
- **On screen:** `"scared"` → Router (left). Right: a rounded orange-outlined panel headed `8 EXPERTS + 1 SHARED`, holding 9 expert characters in two rows — 8 pastel + 1 grey dashed `Shared Expert (always on)`. Annotation: "The router picks a small team for this word."
- **Goal:** Only a small team is active, not the whole model.
- **⚠ Accuracy conflict — see Accuracy Notes below.**

## Frame 8 — Different words, different experts

- **VO:** "Different words need different knowledge, so the router selects different experts every time."
- **On screen:** Split frame, thin divider. Left: `"scared"` card, down arrow, a row of 5 experts, caption `Team for "scared"`. Right: `"calculate"` card, down arrow, a **different** row of experts, caption `Team for "calculate"`. Annotation between: "A different word activates a different team." Narrator, right, arms up: "Same model. Different experts. That's the power of MoE!"
- **Goal:** Routing is per token.
- **Note:** The expert *field* must stay in the same place across both halves — only the selection changes.

## Frame 9 — A new question

- **VO:** "But then I had another question."
- **On screen:** Left: `"scared"` → Router, with 9 selected experts in a row beneath, braced `8 EXPERTS + 1 SHARED (active now)`. A vertical divider. Right: the weight shelf, four shelves of experts, `···` continuing, labelled `MODEL WEIGHTS (STORED)` and `Hundreds of GB`. Narrator, center, hand to chin, thought dots: "If only a few are working…"
- **Goal:** The viewer begins wondering about memory.

## Frame 10 — The memory problem

- **VO:** "If only a few experts are being used, why deal with hundreds of gigabytes of weights?"
- **On screen:** Same left group. Center: a new small box, `RAM / VRAM (Working Memory)`, holding the 9 active experts, labelled `~ a few GB`. Right: the shelf, now `MODEL WEIGHTS (ON DISK / STORAGE)`, `Hundreds of GB (e.g. 200–400GB)`. Annotation with a leader line: "…but a huge amount of weights!"
- **Goal:** Make the contradiction visual — tiny active compute beside massive stored weights.
- **Note:** The size difference between RAM tray and shelf must read without labels.

## Frame 11 — Keep only the small part?

- **VO:** "Why can't I keep just the small part I need?"
- **On screen:** Router with its 9-expert row, braced `8 EXPERTS + 1 SHARED (the ones we need)`. A curved arrow labelled "Load into memory?" sweeps right into the RAM box, now holding 4 experts, `~ a few GB (only what we need)`. Far right: the shelf, `REST OF MODEL (STILL STORED)`, `Hundreds of GB (still there)`. Narrator, hands clasped hopefully, sparkle marks: "That would be so much simpler!"
- **Goal:** Make the obvious hypothesis visible — as a hypothesis, not an answer.

## Frame 12 — The router already knows

- **VO:** "The router already knows which experts this word should go to."
- **On screen:** `"scared"` → Router (left), gesturing, with emphasis ticks and a speech bubble: "I already know which experts to use!" A curved arrow runs right to a dashed orange selection box around 4 experts pulled from the shelf, annotated "Pick these experts from the full model…". Four orange dashed arrows drop from those experts into the RAM box below, labelled "Load into memory". Narrator, far right, sparkles: "Makes sense!"
- **Goal:** Set up the idea of loading only the selected experts.

## Frame 13 — Something is stopping this

- **VO:** "Could this make the model fit on a smaller machine? And if not, what is stopping us?"
- **On screen:** Left-to-right mechanism in one line: `Stored experts (on disk / CPU)` panel of 9 experts → arrow → Router ("Pick the right experts for this word") → arrow → dashed orange `Selected experts (load to VRAM)` column → **red ✗** → hazard pole with red warning triangle → a small sad grey machine, "A smaller machine?". Annotation top-left with a curved arrow: "We only load the experts we need!" Annotation top-right: "But something is blocking it…" Narrator, lower left, hand to chin: "So… why doesn't this just work?"
- **Goal:** Crystallize the mystery **without** answering it.
- **Note:** This is the hook the whole video hangs on. The question must be legible on screen, and the blockage must be the highest-contrast object in the frame.

## Frame 14 — Follow one word inside

- **VO:** "To answer that, staring at the final architecture isn't enough. Let's see what happens inside the model."
- **On screen:** Left: a stack of paper sheets, top one headed `Full model architecture` — a dense grey block diagram with a side list (Layers, Attention, MoE routing, Experts, KV cache, Training, …) and "(and much more…)". The narrator physically pushes the sheet aside: "That's a lot for now…" / "Let's look inside instead." Right: a lit stone archway with steps, `Inside the model` above it, and the `"scared"` card moving into it with an arrow.
- **Goal:** Transition cleanly into Section 02.

---

## Accuracy Notes — must be resolved before frames 6–8 are built

Frames 6, 7 and 8 label experts with human-readable specialties: *Emotions & Human Behavior, Common Sense, World Knowledge, Language & Writing, Safety & Alignment, Reasoning, Social Context, Commonsense, Instructions, Creativity.*

This contradicts two existing sources of truth:

- `art-direction/GLM_PAPER_WORLD.md` §7: "the explanation must state that an expert is a learned feed-forward neural-network block, not a human-labelled specialty such as 'math expert'."
- `storyboard/SECTION_MAP.md` Section 07: same requirement.

Real MoE experts are not interpretable specialists. Nothing in GLM-5.3-Flash assigns "Safety & Alignment" to expert 47. Shipping these labels as fact is the single most likely thing in this video to be picked apart in the comments.

Two further wording issues in frame 6:

- "It looks at the **word**" — the router reads the current hidden representation, which has already been changed by attention. Not the word.
- "picks the **best** experts" — implies a quality judgement. The router scores and takes top-k.

**Recommended fix**, keeping the visual composition exactly as drawn:

- Give experts neutral identities — `Expert 12`, `Expert 47`, a badge or symbol — instead of skill names.
- If a "different experts for different words" idea is still needed in frame 8, show *different sets of numbered experts*, which is both true and just as readable.
- Reword frame 6's bubble to: "I read what this word has become, score every expert, and take the top 8."
- Optionally add one quiet margin note when experts first appear: "An expert is a learned network block — not a labelled specialist."

The composition, characters, staging and beat structure of frames 6–8 are approved as drawn. Only the labels and that one bubble need changing.
