# GPT — Detailed Storyboard Proposal

Status: **ALTERNATE PROPOSAL — not authoritative unless Ahmad chooses it.**

Narration source: `video-script/GPT.md`

Technical source: `research/glm/GLM_V7_ATTENTION_MOE_RESEARCH.md`

Visual source: `art-direction/GLM_PAPER_WORLD.md`

This storyboard is deliberately more specific than `SECTION_MAP.md`. It defines **what exists, where it exists, what persists from the previous beat, what changes, and why the change teaches something.**

---

# Production coordinate system

All positions below refer to the actual **1920×1080 production frame**, not the 2×2 reference sheet.

- Safe teaching area: `x 110–1810`, `y 80–1000`.
- Frame center: `(960,540)`.
- Top-left small chapter label, when useful: `(135,105)`.
- Bottom teaching note line, when useful: centered around `(960,940)`.
- Current token / current active path: warm orange.
- Router / routing decisions: blue.
- Shared expert: teal.
- Question / prediction: yellow.
- Bottleneck / failed hypothesis: muted red.
- Inactive capacity: paper/graphite, low contrast but still physically visible.

## Reference-image rule

Each reference image contains **four 16:9 storyboard frames in a 2×2 grid**:

- top-left = first beat
- top-right = second beat
- bottom-left = third beat
- bottom-right = fourth beat

Do not design the production scene as four panels. The four-panel sheet is only a reference image for four sequential full-screen beats.

## Factual integrity rule

Do **not invent checkpoint-derived numbers**.

Known factual numbers used directly:

- `320B total parameters`
- `~18B active parameters / token`
- `154,880 vocabulary entries`
- `4,096 hidden size`
- `288 routed experts / sparse layer`
- `top 8 routed experts / token / sparse layer`
- `1 shared expert`
- `45 language layers`
- `first 3 dense FFN layers`
- `remaining 42 sparse-MoE FFN layers`

The repo does **not** contain the verified GLM tokenizer ID for the visible `it` token or real checkpoint attention/router scores. Therefore:

- token-ID placement is specified, but the final numeric ID must be captured from the official tokenizer before final artwork;
- attention weights and router scores use relative bars only, labelled `illustrative`, unless real activations are later measured;
- `rolled` is explicitly a **teaching-example next token**, not claimed as a measured GLM output.

---

# SECTION 01 — THE 320B → 18B MYSTERY

## Reference Image 01 — Beats 001–004

### Beat 001 — Meet the model
**Narration:** “GLM-5.3-Flash has 320 billion parameters.”

**Frame:** One clean paper model sheet occupies `x=220–1700, y=125–915`. `GLM-5.3-Flash` sits centered at `(960,190)`, 62–72 px. Small `Z.ai · Mixture of Experts` sits at `(960,250)`. `320B` is centered at `(610,500)`, 150–175 px, with `TOTAL PARAMETERS` directly below at `(610,610)`. `18B` already exists at `(1310,500)` but at 30% contrast with `ACTIVE / TOKEN` below. Bottom context row at `y=815`: `288 routed experts · top 8 · 1 shared · 45 layers`, small and quiet.

**Continuity:** First frame; establish this exact sheet because it returns at the end.

**Why:** The model itself is the object. No expert cartoons or router yet.

### Beat 002 — Make 320B feel like the default assumption
**Narration:** Hold on the scale of 320B.

**Frame:** Nothing moves except a hand-drawn graphite underline grows under `320B` from `x=490→730` at `y=595`. Right-side `18B` remains dim. A faint field of tiny paper tick marks expands behind the left half of the sheet from `x=340–880, y=360–680`.

**Continuity:** Keep header, model sheet, and every fact in exactly the Beat 001 positions.

**Why:** Viewer first forms the intuitive assumption: “320B model = 320B worth of machinery.”

### Beat 003 — Reveal the contradiction
**Narration:** “But for one token, only about 18 billion parameters are active.”

**Frame:** `18B` at `(1310,500)` changes to orange and full contrast. `ACTIVE / TOKEN` at `(1310,610)` becomes full contrast. `320B` remains black, not dimmed. A thin orange vertical paper token enters at `(1310,720)` and points upward to `18B` with a 2 px orange line.

**Continuity:** Do not replace the sheet or move the numbers. This must read as a contradiction inside the same object.

**Why:** Total and active must be compared spatially, not explained on separate slides.

### Beat 004 — Show the ratio without replacing the numbers
**Narration:** “That is only a small fraction of the total.”

**Frame:** Add a horizontal capacity strip at `x=360–1560, y=730`, width `1200`. Entire strip = paper/graphite `320B`. The first `67.5 px` of the strip is orange because `18/320 = 5.625%`. Directly under orange segment at `(394,800)`: `≈5.6%`. Under full strip centered `(960,800)`: `320B total`. Keep both giant numbers above.

**Continuity:** The orange token from Beat 003 docks against the orange 5.6% strip.

**Why:** Gives physical scale to the contradiction without pretending “5.6%” is a separate model claim.

---

## Reference Image 02 — Beats 005–008

### Beat 005 — Create the headache
**Narration:** “So why have the other 300 billion?”

**Frame:** Capacity strip remains. A graphite bracket begins immediately after the orange 5.6% segment and runs to the strip’s right edge. Above that bracket at `(1050,690)`: `the rest still exists`. A small yellow `?` sits at `(1515,690)`. Do not display `302B` as a precision claim because `18B` is itself approximate.

**Continuity:** Giant `320B` and orange `18B` stay fixed.

**Why:** The viewer sees the inactive-looking mass before receiving MoE terminology.

### Beat 006 — Reveal MoE only as the clue
**Narration:** “The first clue is that this is a Mixture-of-Experts model.”

**Frame:** Bottom context label `Mixture of Experts` lifts from `(960,250)` and settles at `(960,330)`, 46 px. The capacity strip at `y=730` unfolds vertically into many small paper modules filling `x=350–1570, y=410–790`. Do not number them yet; at this distance they read as a large pool.

**Continuity:** Header and 320B/18B numbers remain visible at top, scaled to ~75% and moved only upward to `y=205–295` to make room.

**Why:** Same capacity becomes organized capacity. It does not spawn from nowhere.

### Beat 007 — Show selective compute, not the full mechanism
**Narration:** “Only a few expert networks are selected for a token.”

**Frame:** Keep the expert pool. Light a small eight-module cluster orange near the center-right of the pool around `(1220,600)`; all other modules remain graphite. Do **not** show `288` or explain top-8 yet. The orange token sits at `(960,860)` with a thin line toward the selected cluster.

**Continuity:** This is the same orange token introduced in Beat 003.

**Why:** Opening needs the intuitive answer—selective experts—without spending the later MoE reveal.

### Beat 008 — Turn compute insight into the memory question
**Narration:** “Okay. But the huge weight set still exists.”

**Frame:** Expert pool compresses to the left half `x=230–900`. Behind it, a deeper stack of paper drawers becomes visible, labelled `FULL WEIGHT STORE` at `(560,825)`. On the right, a small empty work tray appears at `x=1240–1700, y=470–710`, labelled `FAST WORKING MEMORY` at `(1470,760)`. Selected orange modules remain in the left pool.

**Continuity:** Do not reset the expert field; physically slide it left to reveal storage depth.

**Why:** Introduces storage vs working memory as different physical spaces before proposing an optimization.

---

## Reference Image 03 — Beats 009–012

### Beat 009 — Introduce the router only as dispatcher
**Narration:** “The model already has a router deciding which experts are needed.”

**Frame:** Blue router/switchboard appears at `(1030,590)`, between the left store and right work tray. Orange token moves from `(960,860)` to `(1030,820)` and feeds upward into router. Eight thin blue/orange route lines extend from router back to the already-orange expert modules.

**Continuity:** Same store at left and same tray at right.

**Why:** Router is shown by function first: receives current token representation and points to expert choices.

### Beat 010 — State the tempting hypothesis visually
**Narration:** “So why not load only the experts it selects?”

**Frame:** Eight selected expert modules physically lift out of the left drawers and line up on a transfer rail from `x=760→1240, y=590`. Above rail, handwritten yellow note at `(1030,505)`: `load only selected?`. Right tray remains empty, ready to receive them.

**Continuity:** Router remains centered; route lines now terminate at moving modules rather than disappearing.

**Why:** Viewer sees the proposed solution as a mechanism they could believe.

### Beat 011 — Let the hypothesis almost work
**Narration:** “Then maybe the 320B model could behave like a much smaller machine.”

**Frame:** Eight modules dock into the right tray in two rows of four, centered around `(1470,585)`. A small green/graphite check appears at `(1690,500)`. The left drawer bank is still huge but dim. A paper outline around the right tray contracts slightly from `500 px` wide to `420 px`.

**Continuity:** Router and storage stay exactly where they were.

**Why:** Let the viewer emotionally commit to the obvious solution before revealing the catch.

### Beat 012 — End the hook on the unresolved catch
**Narration:** “So what exactly stops this from being easy?”

**Frame:** Freeze the exact storage → router → fast-memory arrangement. Add one muted-red stop tab on the transfer rail at `(1110,590)`. Small question text, not a giant title: `WHAT CHANGES NEXT?` at `(960,185)`. The eight loaded experts remain visible in the tray; the full store remains visible at left.

**Continuity:** This entire layout is bookmarked and must return **pixel-for-pixel in Section 09**.

**Why:** Hook ends with a concrete machine whose failure has not yet been explained.

---

# SECTION 02 — FOLLOW ONE PROMPT

## Reference Image 04 — Beats 013–016

### Beat 013 — Replace architecture with a concrete sentence
**Narration:** “To see the catch, follow one token.”

**Frame:** Opening mechanism slides down and out. A single warm paper sentence strip enters from left and stops at `x=275–1645, y=430–610`. Text centered at `(960,520)`: `The dog dropped the ball, and it` in 58–64 px. Nothing else except small chapter label `ONE PROMPT` at `(135,105)`.

**Continuity:** Orange from the active path becomes the accent color available for the chosen token; no hard visual cut.

**Why:** Reduce cognitive load immediately after the hook.

### Beat 014 — Choose `it`
**Narration:** “We are going to follow `it`.”

**Frame:** Text remains in the same sentence strip. Only `it`, located near `(1485,520)`, receives an orange paper backing `110×82 px`. Other words remain black on warm paper. A thin orange underline continues 45 px past the word’s right edge.

**Continuity:** Do not move or duplicate `it` yet.

**Why:** Establish persistent actor identity before any transformation.

### Beat 015 — Explain why this token is useful
**Narration:** “By itself, `it` does not tell us what it refers to or what comes next.”

**Frame:** Keep sentence. Add two tiny yellow question marks: one curved back toward `ball` at `(1320,420)`, one pointing into empty space after `it` at `(1630,520)`. No explanatory paragraph.

**Continuity:** `it` remains orange and physically part of the sentence.

**Why:** Plants both future prediction questions: context and next-token generation.

### Beat 016 — Turn sentence into the entrance to the model
**Narration:** “So what happens after this text enters the model?”

**Frame:** Sentence strip slides upward to `x=275–1645, y=185–330`. Beneath it, an empty work area opens from `y=360–900`. A narrow paper intake slot appears at `(960,830)`. A faint dashed vertical guide connects `it` at `(1485,255)` down toward the workspace.

**Continuity:** Same sentence object; only its position changes.

**Why:** Creates room for tokenization without changing worlds abruptly.

---

# SECTION 03 — TEXT → TOKENS

## Reference Image 05 — Beats 017–020

### Beat 017 — Reveal tokenizer boundaries
**Narration:** “The tokenizer breaks text into pieces from its vocabulary.”

**Frame:** Sentence remains at `y=255`. Boundary marks descend 24 px between the tokenizer’s **verified** pieces. For reference art, labels may read human-friendly pieces, but final boundaries must follow official tokenizer output. `it` stays orange. Small label `TOKENIZER` at `(960,405)`.

**Continuity:** No letters move yet.

**Why:** Boundary first, movement second; viewer understands what causes the separation.

### Beat 018 — Separate the pieces
**Narration:** “Those pieces are tokens.”

**Frame:** Each verified piece drops from the original sentence into individual paper chips centered along `y=565`. Preserve left-to-right order. Target span `x=270–1650`. Each chip retains the exact visible text it came from; `it` chip keeps orange backing.

**Continuity:** Ghosted original sentence remains at `y=255` at 20% opacity for one beat.

**Why:** Makes tokenization a transformation of the same text, not a new diagram.

### Beat 019 — Show what ‘token’ can mean
**Narration:** “A token can be a word, part of a word, or punctuation.”

**Frame:** Real prompt chips stay at `y=565`. Along bottom `y=825`, show three tiny examples only: whole-word chip at `(680,825)`, split-word pair at `(960,825)`, punctuation chip at `(1240,825)`. Labels above each: `whole`, `piece`, `punctuation` in 24 px.

**Continuity:** `it` remains the only orange object in the main row.

**Why:** Gives generality without abandoning the concrete prompt.

### Beat 020 — Commit to one token
**Narration:** “Keep your eye on `it`.”

**Frame:** Bottom examples fold away. Camera/focus narrows around `it` chip at its current row position near `(1500,565)`. Other chips drop to 35% contrast but remain visible. Orange `it` lifts 12 px and casts a slightly stronger paper shadow.

**Continuity:** All token chips stay in place.

**Why:** The learner now has one actor to follow through every later mechanism.

---

# SECTION 04 — TOKEN → TOKEN ID

## Reference Image 06 — Beats 021–024

### Beat 021 — Introduce IDs as numbers attached to tokens
**Narration:** “A neural network needs numbers, so each token maps to an integer ID.”

**Frame:** Small mono ID tabs slide beneath each token chip at `y=665`. For `it`, the tab center is directly under it at approximately `(1500,665)`. **Do not invent the numeric value**; final artwork must insert the verified official-tokenizer ID. Until measured, write `ID: VERIFY` in storyboard/reference only.

**Continuity:** Every ID tab is physically connected to its token with a 1 px vertical graphite line.

**Why:** Prevents the common false idea that ID is a separate representation floating elsewhere.

### Beat 022 — Make the address idea explicit
**Narration:** “That number is not the meaning of `it`; it is a lookup address.”

**Frame:** Other token/ID pairs dim. Move `it` and its ID together to `(960,520)`. To its right at `(1190,520)`, add a tiny paper index-tab icon. Under them at `(960,690)`: `ID = lookup address`, 32 px. Below that, faint crossed text `not a definition`.

**Continuity:** Keep the orange token physically attached to its ID.

**Why:** Address/key metaphor is stated only after the viewer has seen the mapping.

### Beat 023 — Reveal vocabulary scale
**Narration:** “GLM’s vocabulary has 154,880 entries.”

**Frame:** Pull back. An enormous paper index wall fills `x=260–1660, y=175–900` with tightly spaced horizontal rows. At `(960,125)`, exact mono label: `154,880 VOCABULARY ENTRIES`. `it + verified ID` stay pinned at `(960,520)` above the moving rows.

**Continuity:** Same ID tab becomes the locator; it does not get recreated.

**Why:** `154,880` appears where it explains what the ID is indexing.

### Beat 024 — Use the ID to locate one entry
**Narration:** “The ID points to one exact entry.”

**Frame:** Index rows scroll vertically behind stationary `it + ID` until a target row stops at `y=590`. A vertical orange guide drops from the ID tab at `(960,560)` to the row. Target row gets orange left-edge tab; all surrounding rows remain graphite.

**Continuity:** Keep `154,880 VOCABULARY ENTRIES` at top.

**Why:** Viewer sees address → location causally.

---

## Reference Image 07 — Beats 025–028

### Beat 025 — Inspect the chosen row
**Narration:** “The ID tells us where to look.”

**Frame:** Camera pushes to target row, now `x=430–1490, y=430–660`. Left cell contains human-readable token label `it` at `(650,545)`. Center cell contains `[VERIFIED ID]` at `(960,545)`. Right edge has an orange paper tab extending to `(1410,545)`.

**Continuity:** This is the same highlighted row from Beat 024.

**Why:** Keeps token and ID adjacent so the number cannot be mistaken for meaning.

### Beat 026 — Separate address from meaning
**Narration:** “The number itself contains no dictionary definition.”

**Frame:** Under the row at `(960,760)`, draw `ID → ADDRESS` with a graphite arrow. Beside it at `(1240,760)`, crossed-out `ID → MEANING`. No other new objects.

**Continuity:** Row remains unchanged.

**Why:** One explicit misconception check before embedding.

### Beat 027 — Turn the ID into a persistent lookup tab
**Narration:** “Now use that address for the next lookup.”

**Frame:** Token letters `it` remain as a small orange tag at `(650,545)`. The verified ID card detaches from the center cell and slides to `(1120,545)`, rotating +2°. Give it a visible tab shape on its right edge.

**Continuity:** The target row stays behind at 40% opacity.

**Why:** The ID physically changes role from label to lookup key without becoming ‘meaning’.

### Beat 028 — Morph index into embedding book
**Narration:** Transition into embedding.

**Frame:** Horizontal index rows fold inward from both sides and become page edges of a large book centered `x=420–1500, y=250–850`. The ID tab remains untouched at `(1120,545)` and becomes lodged in the book’s right edge.

**Continuity:** Same paper material, same ID object.

**Why:** Makes vocabulary lookup → embedding lookup a continuous physical operation.

---

# SECTION 05 — TOKEN ID → EMBEDDING

## Reference Image 08 — Beats 029–032

### Beat 029 — Establish the embedding book
**Narration:** “The ID now looks up a learned numerical representation.”

**Frame:** Book opens flat. Left page occupies `x=430–930`; right page `x=990–1490`. Verified ID tab sits on right page edge at `(1490,520)`. Tiny header at `(960,180)`: `LEARNED EMBEDDING TABLE`, 32 px. `it` orange label is pinned just above the tab.

**Continuity:** The book is the folded index from Beat 028.

**Why:** No new unrelated ‘embedding table’ diagram.

### Beat 030 — Perform the lookup
**Narration:** “The address takes us to one learned row.”

**Frame:** Pages flip from right to left around spine `(960,550)`, slowing as they approach the tab. The ID tab stays visually fixed at `x=1490`, so pages move relative to it.

**Continuity:** `it` label and ID tab stay together.

**Why:** The tab causes the lookup rather than narration merely stating it.

### Beat 031 — Reveal the row without fake vector values
**Narration:** “What is stored there is a long learned vector.”

**Frame:** Book stops. Across right page at `y=535`, draw one orange-edged row showing `v₁  v₂  v₃  …  v₄₀₉₆`. Do **not** fabricate checkpoint values. Small label `embedding for this token` sits directly above row at `(1240,455)`.

**Continuity:** ID tab aligns exactly with this row.

**Why:** Shows structure truthfully without pretending to know weights we have not measured.

### Beat 032 — State the dimension exactly where it matters
**Narration:** “GLM carries 4,096 values in this representation.”

**Frame:** Under the vector row, a graphite bracket grows from `x=1040→1440` at `y=640`. Center label at `(1240,690)`: `4,096 VALUES`. The `4096` is mono, larger than `VALUES`.

**Continuity:** Book, ID tab, and row remain fixed.

**Why:** Number appears attached to the vector, not in a random fact box.

---

## Reference Image 09 — Beats 033–036

### Beat 033 — Make 4,096 feel physically large
**Narration:** Hold on the scale.

**Frame:** Right page unfolds sideways like an accordion from `x=1490` toward `x=1740`; vector strip stretches across `x=880–1740`. Only first 6 symbolic values, ellipsis, and final `v₄₀₉₆` remain readable. `4,096 VALUES` moves with the bracket to `(1310,740)`.

**Continuity:** `it` orange tab remains attached at the strip’s left start.

**Why:** Scale comes from spatial expansion, not giant typography alone.

### Beat 034 — Kill the dictionary misconception
**Narration:** “This is not a definition of the word. It is a learned numerical starting representation.”

**Frame:** At left `x=270–700`, add a small paper dictionary card labelled `it = ...`, then cross it once with graphite. A curved arrow from that card points instead to the 4,096-value strip labelled `learned starting representation` at `(1240,420)`.

**Continuity:** Vector remains dominant; dictionary card is secondary.

**Why:** Clarifies what embedding is without a lecture.

### Beat 035 — Show every token gets one, then return focus
**Narration:** “Every token gets a representation; we only follow this one.”

**Frame:** Briefly restore the token row at top `y=200`. Under every token, show a short collapsed graphite vector strip. Under `it`, keep the long orange-highlighted strip descending to `y=620`. Other strips stay 30% contrast.

**Continuity:** `it` vector is the same book row folded into a carryable strip.

**Why:** Prevents viewer from thinking only `it` becomes an embedding.

### Beat 036 — Carry the same representation into a layer
**Narration:** “Now it can travel through the model.”

**Frame:** All other token vectors fold back into the background. `it` token + orange vector move from `(1500,200/420)` along a curved path to `(420,560)`. Ahead, one large Transformer floor appears `x=300–1680, y=260–850`, split into `ATTENTION` left and `FEED-FORWARD` right.

**Continuity:** The orange tab labelled `it` stays attached to the leading edge of the vector.

**Why:** Same actor survives the world transition.

---

# SECTION 06 — ATTENTION

## Reference Image 10 — Beats 037–040

### Beat 037 — Establish one Transformer floor
**Narration:** “Attention and the feed-forward stage live inside a Transformer layer.”

**Frame:** Floor boundary `x=260–1690, y=235–870`. Left room `x=320–1000`, label `ATTENTION` at `(660,300)`. Right room `x=1080–1630`, label `FEED-FORWARD` at `(1355,300)`. `it` vector enters left room at `(405,570)`. Right room stays 25% contrast.

**Continuity:** Vector arrives from Beat 036 at same y-position.

**Why:** Prevents Attention and MoE becoming disconnected slides.

### Beat 038 — Create the attention headache before Q/K/V
**Narration:** “The starting vector alone does not tell us what matters in this sentence.”

**Frame:** Sentence returns along top inside floor at `y=390`: `The dog dropped the ball, and it`. `it` remains orange at approximately `(1420,390)`. Its vector sits directly below at `(1420,500)`, connected by a vertical orange guide. A yellow `?` appears between `it` and earlier words at `(1110,455)`.

**Continuity:** Feed-forward room stays faint at right edge; do not cut it away.

**Why:** Viewer feels the context problem before mechanism vocabulary.

### Beat 039 — Prediction: which context should matter?
**Narration:** “Which earlier part would you expect to matter strongly for `it`?”

**Frame:** Draw faint dotted arcs from `it` at `(1420,390)` to `dog` around `(530,390)`, `dropped` around `(760,390)`, and `ball` around `(1120,390)`. Small yellow note centered `(960,790)`: `PLACE YOUR BET`. No answer highlighted yet.

**Continuity:** Sentence and vector remain fixed.

**Why:** Makes viewer form a model before explanation.

### Beat 040 — Let `ball` become the viewer’s candidate, not “the model’s truth”
**Narration:** Short hold before mechanism.

**Frame:** The dotted arc to `ball` becomes slightly darker yellow than the other arcs, as a **viewer hypothesis**, with tiny label `your guess?` above `ball` at `(1120,325)`. No attention score yet.

**Continuity:** Do not color `ball` orange; orange still belongs to current token `it`.

**Why:** Distinguishes human prediction from later illustrative model mechanism.

---

## Reference Image 11 — Beats 041–044

### Beat 041 — Create Q/K/V from the representation
**Narration:** “For the intuition, use the familiar Query, Key, Value picture.”

**Frame:** From the `it` vector at `(1420,520)`, three narrow paper strips fan downward to `(1210,650)` `Q`, `(1420,650)` `K`, `(1600,650)` `V`. Use graphite outlines with orange source tab. A tiny note at top-right `(1660,255)`: `teaching lens`.

**Continuity:** Sentence remains at `y=390`.

**Why:** Q/K/V visibly come from learned transformations of a representation; they are not English questions/facts.

### Beat 042 — Teach Query first
**Narration:** “Query is what this position uses to look for useful matches.”

**Frame:** Q strip moves to `(1420,650)` directly under `it`; K and V dim to 25% without moving. Label immediately below Q at `(1420,725)`: `used to match`.

**Continuity:** Vertical guide from `it` through its source vector to Q stays visible.

**Why:** One concept at a time.

### Beat 043 — Give allowed positions Keys and Values
**Narration:** “Earlier positions provide Keys for matching and Values carrying information.”

**Frame:** Under each available token from `The` through `and`, add a small K tab at `y=500` and V strip at `y=560`, vertically aligned to its token. No future token exists to the right of `it`; leave that region blank. Q(`it`) stays at `(1420,650)`.

**Continuity:** `it`’s own K/V may remain present but secondary; Q is dominant.

**Why:** Spatially binds Key/Value to source positions.

### Beat 044 — Teach Key vs Value in-place
**Narration:** “Keys are for matching; Values are the information that can be carried forward.”

**Frame:** Add `match` label beside the K row at `(245,500)` and `carry` beside V row at `(245,560)`. Brief pencil arrows point to one K/V pair under `ball`. Do not add a paragraph.

**Continuity:** All K/V pieces remain exactly aligned with their words.

**Why:** Viewer can later see why Keys disappear and Values remain.

---

## Reference Image 12 — Beats 045–048

### Beat 045 — Anchor the Query to `it`
**Narration:** “The Query comes from the current `it` representation.”

**Frame:** Q strip slides from `(1420,650)` up to `(1420,615)` and gets a small orange tab `Q(it)`. A solid orange vertical guide joins `it → representation → Q`. K/V rows remain across the sentence.

**Continuity:** No other object moves.

**Why:** Makes it impossible to misread Query as a free-floating search box.

### Beat 046 — Compare Q with Keys sequentially
**Narration:** “That Query is compared with the allowed Keys.”

**Frame:** A small blue comparison bracket travels left-to-right under K tabs. As it leaves each K, a short vertical graphite score bar remains at `y=690`. Do not write numbers; bars are illustrative.

**Continuity:** Q stays anchored under `it` while the comparison device moves.

**Why:** Movement shows repeated operation, not magic fan-out.

### Beat 047 — Finish the illustrative score row
**Narration:** “Some matches are stronger than others.”

**Frame:** Comparison bracket reaches final allowed Key. Score bars now form one aligned row from `x≈330–1300`. Add tiny `illustrative` label at `(1620,735)`. All bars graphite; no winner yet.

**Continuity:** Viewer can trace each score vertically to its word/K.

**Why:** Preserves causal mapping from source position to score.

### Beat 048 — Reveal the teaching-view strong `ball` connection
**Narration:** “For our illustration, make `ball` the strongest connection.”

**Frame:** Only the score bar under `ball` at approximately `(1120,690)` grows 35% taller and receives an orange outline. Above it, small text `stronger in this teaching view`. The earlier yellow viewer-hypothesis arc fades out.

**Continuity:** Do not claim measured GLM activation; `illustrative` label remains visible.

**Why:** Pays off the prediction without pretending attention proves coreference.

---

## Reference Image 13 — Beats 049–052

### Beat 049 — Gather scores without losing word alignment
**Narration:** “Those comparison scores are gathered together.”

**Frame:** Each score bar slides straight down—never sideways—into a score rail at `y=770`, preserving x-position under its token. K/V rows remain above. Label left of rail `(245,770)`: `scores`.

**Continuity:** `ball` remains visually strongest in the illustrative row.

**Why:** Viewer never has to mentally remap scores to words.

### Beat 050 — Turn scores into attention weights
**Narration:** “The scores become attention weights.”

**Frame:** Score rail morphs into proportional weight gates at the same x-positions, `y=770`. Label changes to `weights`. Do not display exact percentages unless later measured; keep `illustrative` at `(1620,815)`.

**Continuity:** Same geometry; only semantic representation changes.

**Why:** Teaches score → weight as one transformation, not a new chart.

### Beat 051 — Interpret the weight visually
**Narration:** “A stronger weight means more of that position can contribute in this teaching picture.”

**Frame:** `ball`’s V strip at `(1120,560)` becomes high contrast and lifts 8 px. Other V strips remain visible but quieter. The `ball` word itself stays black; only its Value and weight are emphasized.

**Continuity:** Query and all weights remain visible.

**Why:** Avoids misleadingly saying the model literally ‘reads the word ball’ directly.

### Beat 052 — Keys step back after matching
**Narration:** “Keys did the matching. Values are what get read.”

**Frame:** All K tabs fold upward into their token chips and disappear. V strips stay at `y=560`; weight gates stay at `y=770`; Q dims to 30% but remains anchored under `it`.

**Continuity:** Nothing relocates horizontally.

**Why:** Physical disappearance encodes the role difference.

---

## Reference Image 14 — Beats 053–056

### Beat 053 — Apply weights to Values
**Narration:** “Each Value is scaled by its weight.”

**Frame:** Thin vertical channels connect each weight gate at `y=770` up to its V strip at `y=560`. Channel width follows the illustrative weight; `ball` is visibly thickest. Use orange only for currently dominant teaching path, graphite for others.

**Continuity:** Values remain attached to source positions.

**Why:** Makes the weight act on Value, not on word text.

### Beat 054 — Mix the weighted information
**Narration:** “The weighted Values are mixed together.”

**Frame:** Channels bend inward toward one paper `Σ` mixer centered `(960,805)`. Streams terminate visibly inside the mixer; no stream teleports. The sentence stays at `y=390` as context.

**Continuity:** Source V strips remain visible until their streams reach Σ.

**Why:** Cause → combination is explicit.

### Beat 055 — Return context to the same `it` position
**Narration:** “The mixture changes the representation at `it`.”

**Frame:** One orange output strip leaves Σ and curves up to `it` vector at `(1420,520)`. The vector gains a second layered paper strip behind it, showing it has changed. `it` token itself does not move.

**Continuity:** Same token position and same orange identity.

**Why:** Attention updates representation; it does not replace the token.

### Beat 056 — State the caveat and preserve the lesson
**Narration:** “This Q/K/V view teaches the job; GLM itself uses a hybrid attention architecture.”

**Frame:** Zoom back to whole Transformer floor. At bottom-right `(1550,900)`, small technical note: `Q/K/V teaching lens · GLM-5.3-Flash uses hybrid attention`. Keep the changed `it` vector at the doorway between Attention and Feed-Forward around `(1030,570)`.

**Continuity:** Feed-forward room regains contrast, ready for the next section.

**Why:** Accuracy caveat is visible but does not hijack the beginner path.

---

# SECTION 07 — DENSE BASELINE → MIXTURE OF EXPERTS

## Reference Image 15 — Beats 057–060

### Beat 057 — Move into the neighboring feed-forward room
**Narration:** “Attention is not the whole layer. The representation still needs a feed-forward transformation.”

**Frame:** Camera pans right; Attention remains partially visible at `x=150–520` at 25% contrast. Changed `it` vector crosses doorway and stops at `(910,570)`. Feed-forward room fills `x=720–1690`.

**Continuity:** Same floor; no cut.

**Why:** MoE is shown as replacing the layer’s feed-forward stage, not as a separate model.

### Beat 058 — Establish dense baseline
**Narration:** “A dense Transformer can use one feed-forward network for every token.”

**Frame:** One paper machine labelled `DENSE FFN` occupies `x=1110–1480, y=430–700`, center `(1295,565)`. `it` vector enters at `(1010,565)`, exits changed at `(1570,565)`. One clean arrow in, one out.

**Continuity:** Attention room stays faint on far left.

**Why:** Viewer needs the simple baseline before understanding why MoE exists.

### Beat 059 — Create the scaling problem
**Narration:** “If we want much more feed-forward capacity, we could make that one network enormous.”

**Frame:** Dense FFN expands from `370×270` to roughly `650×470`, center still `(1295,565)`. Its internal weight marks multiply. `it` input remains same size, making machine feel disproportionately large.

**Continuity:** Input/output arrows remain attached to same sides.

**Why:** More capacity visibly means more machinery used for every token in the dense baseline.

### Beat 060 — State the real MoE headache
**Narration:** “How do we add much more capacity without running all of it for every token?”

**Frame:** Giant dense machine remains. Small yellow question strip sits at `(1295,830)`: `MORE CAPACITY — WITHOUT USING ALL OF IT?`. Do not introduce experts yet.

**Continuity:** Keep `it` waiting at machine entrance.

**Why:** Mechanism is now needed.

---

## Reference Image 16 — Beats 061–064

### Beat 061 — One machine unfolds into many alternatives
**Narration:** “Mixture of Experts changes that tradeoff.”

**Frame:** Giant dense machine physically unfolds into a tiled field of small same-family feed-forward modules across `x=820–1580, y=360–760`. Use 12–20 readable modules plus repeated rows fading into depth to communicate scale; no number yet.

**Continuity:** The original machine’s paper pieces become the expert field; no pop-in.

**Why:** Many experts are alternative feed-forward blocks, not a new type of magical component.

### Beat 062 — Reveal the exact routed-expert count
**Narration:** “A sparse GLM layer has 288 routed experts available.”

**Frame:** Expert field pulls back to show full grid/crowd filling `x=650–1640, y=300–820`. Exact label centered above at `(1145,245)`: `288 ROUTED EXPERTS`. `288` 68 px mono; descriptor 28 px. `it` vector waits at `(520,560)`.

**Continuity:** Same expert family, simply more scale revealed.

**Why:** `288` appears attached to the expert pool it counts.

### Beat 063 — Define one expert accurately
**Narration:** “An expert here is a learned feed-forward neural-network block.”

**Frame:** Pull one expert from grid to foreground at `(1160,560)`, size `330×270`. Inside show `input → learned FFN → output`, not a topic label. At `(1160,760)`: `expert = learned feed-forward block`.

**Continuity:** Remaining 287 read as faded crowd behind it.

**Why:** Blocks “math expert / coding expert” misconception before characters get playful.

### Beat 064 — Introduce the shared expert separately
**Narration:** “GLM also has one shared expert.”

**Frame:** Foreground expert returns to grid. A teal module appears outside the routed grid at `(1710,565)`, label directly above `(1710,400)`: `1 SHARED EXPERT`. Keep `288 ROUTED EXPERTS` label over the main grid.

**Continuity:** It is spatially separate from 288 so 288+shared cannot be misread as 288 total including shared.

**Why:** Exact architecture relationship is visible.

---

## Reference Image 17 — Beats 065–068

### Beat 065 — Bring the contextual representation to the router
**Narration:** “The current contextual representation reaches a learned router.”

**Frame:** Blue router station appears at `(520,560)`, just in front of expert field. `it` vector arrives from left and docks into router input at `(400,560)`. Expert grid starts at `x=760`.

**Continuity:** Same `it` vector from Attention; do not revert to token ID.

**Why:** Router input is visibly the current hidden representation.

### Beat 066 — Explicitly show what router reads
**Narration:** “The router reads the current representation, not the token ID.”

**Frame:** Above router at `(520,390)`, label `ROUTER`. Under input vector at `(360,660)`: `current 4,096-value representation`. At `(300,760)`, a small crossed-out ID tab says `not token ID`.

**Continuity:** `4,096` recalls embedding dimension but is attached to the evolved vector, not the old book.

**Why:** Corrects a common intuitive error.

### Beat 067 — Teach scoring with one expert first
**Narration:** “The router scores how suitable an expert is for this current representation.”

**Frame:** One blue line leaves router to a single routed expert at `(970,430)`. Beside that expert, show one small horizontal score bar, no numeric value. Label `routing score` directly above bar.

**Continuity:** Other experts remain present but dim.

**Why:** One operation is understood before scaling it to 288.

### Beat 068 — Repeat scoring across the pool
**Narration:** “It does that across the routed expert pool.”

**Frame:** Blue scoring pulse fans from router through the 288 field. Each visible module gets a tiny adjacent score bar of varying length. Teal shared expert remains outside this scoring field and does not receive a routed score display.

**Continuity:** Same router and same expert positions.

**Why:** Distinguishes routed experts from shared expert.

---

## Reference Image 18 — Beats 069–072

### Beat 069 — Freeze the ranked field
**Narration:** “Some routed experts score higher than others.”

**Frame:** Scoring pulse stops. Score bars stay visible. Eight candidates are subtly darker than the rest but not orange yet. `288 ROUTED EXPERTS` remains at top; router remains blue at `(520,560)`.

**Continuity:** No selection lines yet.

**Why:** Gives viewer evidence before the top-k reveal.

### Beat 070 — Prediction moment
**Narration:** “288 are available. How many do you think actually run for this token?”

**Frame:** Add yellow note at bottom center `(1120,900)`: `288 AVAILABLE → HOW MANY RUN?`. Everything else freezes. Do not highlight the eight candidates further during the hold.

**Continuity:** Same ranking field.

**Why:** Makes top-8 memorable through prediction.

### Beat 071 — Reveal top 8
**Narration:** “Eight.”

**Frame:** Exactly eight routed experts become orange with stronger outline/lift. All other routed experts drop to 22% contrast but stay physically present. At `(520,780)`, beside router: `TOP 8 SELECTED`. `8` 64 px mono.

**Continuity:** Candidate positions from Beat 069 become the selected positions; do not reshuffle the grid.

**Why:** Selection is a consequence of the scores the viewer already saw.

### Beat 072 — Add shared path without confusing the count
**Narration:** “Plus the one shared expert.”

**Frame:** Teal shared expert at `(1710,565)` brightens. Beside routed label near `(1120,220)`: `8 / 288 ROUTED`. Beside teal expert: `+ 1 SHARED`. Keep these two labels spatially separate.

**Continuity:** Eight selected experts remain orange.

**Why:** Makes architecture count unambiguous: top-8 routed + one shared path.

---

## Reference Image 19 — Beats 073–076

### Beat 073 — Dispatch only to active paths
**Narration:** “The representation is sent to the selected experts.”

**Frame:** Draw exactly **8 orange routes** from router to the eight selected routed experts. Draw one separate teal path from input junction to shared expert. Paths must terminate at actual selected modules; no generic spaghetti lines.

**Continuity:** Unselected 280 remain visible but receive no active path.

**Why:** Selective compute becomes physically countable.

### Beat 074 — Duplicate the current input only after routing
**Narration:** “Each selected expert transforms the same current representation.”

**Frame:** At router output, the `it` vector splits into eight small orange copies following routed lines plus one teal-edged copy following shared path. Original token label stays attached to router-side source; copies are unlabeled mini-vectors.

**Continuity:** Split happens after selection, not before.

**Why:** Shows experts receive the current representation rather than different word fragments.

### Beat 075 — Open one expert
**Narration:** “Each expert applies its own learned transformation.”

**Frame:** Zoom into one selected expert while retaining a mini-map of the field in top-left. Large expert center `(1050,560)`: incoming vector at `x=760`, learned FFN body `x=900–1200`, outgoing changed vector `x=1320`. No semantic specialty name.

**Continuity:** The expert’s orange outline matches its position in the mini-map.

**Why:** “Expert” becomes an actual neural block rather than character metaphor.

### Beat 076 — Run selected experts in parallel
**Narration:** “The selected experts run in parallel, and the shared expert participates too.”

**Frame:** Zoom back. Animate only eight orange expert mechanisms and the one teal shared mechanism. Unselected expert crowd remains still. Each active expert produces a small output strip directly beneath itself.

**Continuity:** Keep route lines connected during processing.

**Why:** Active/inactive distinction is behavioral, not just color.

---

## Reference Image 20 — Beats 077–080

### Beat 077 — Expose the nine outputs
**Narration:** “Now we have several transformed outputs.”

**Frame:** Eight orange output strips slide 60 px out from selected modules toward center. Teal output leaves shared expert toward center. Inputs and route lines dim to 35% so outputs become focal.

**Continuity:** Every output remains traceable to its expert.

**Why:** Creates need for combining them.

### Beat 078 — Represent routing weights without fake numbers
**Narration:** “The routed outputs do not have to contribute equally.”

**Frame:** Routed output lines toward center vary in thickness according to illustrative routing weights. Add `illustrative routing weights` at `(1260,875)`. Do not print percentages. Shared path remains teal and visually separate.

**Continuity:** Same eight selected expert positions.

**Why:** Teaches weighting while avoiding fabricated checkpoint values.

### Beat 079 — Combine back into one representation
**Narration:** “They combine back into one updated representation.”

**Frame:** Eight routed lines enter a `Σ` paper mixer centered `(1050,720)`. Teal shared line joins through a distinct side port. One orange layered vector exits mixer at `(650,720)` moving leftward toward the floor’s exit.

**Continuity:** Many → one happens visibly; do not cut directly to final vector.

**Why:** Explains how multiple experts do not produce multiple next tokens.

### Beat 080 — Different token, different route
**Narration:** “Another token can get a different route.”

**Frame:** Keep router and 288-expert grid absolutely fixed. Replace input label `it` with `ball` on a graphite/orange token chip at router. Previous top-8 set becomes faint dotted orange ghosts; a visibly different eight-module set lights orange.

**Continuity:** Only input representation and selection fingerprint change.

**Why:** Routing is per representation/token, not a permanent expert team.

---

## Reference Image 21 — Beats 081–084

### Beat 081 — Return to the same `it`, now changed
**Narration:** “Even `it` itself can route differently later.”

**Frame:** Restore `it`, but use the layered/changed vector that exited Beat 079. Place a small ghost of the earlier `it` vector behind it at 20% contrast. Router remains fixed.

**Continuity:** Expert field still fixed; only representation state changes.

**Why:** Separates ‘same token text’ from ‘same hidden representation’.

### Beat 082 — Fresh layer, fresh top-8 decision
**Narration:** “Because the representation changed, the next sparse layer can select a different eight.”

**Frame:** Duplicate the router/expert field as a second floor 220 px above the first. Lower floor shows old top-8 ghost pattern; `it` vector rises to upper router; upper grid lights a different eight-module pattern.

**Continuity:** Same token actor physically travels upward.

**Why:** This dynamic routing fact is the key setup for the later memory payoff.

### Beat 083 — Reconnect to 320B vs 18B
**Narration:** “Now the opening number starts to make sense.”

**Frame:** On left `x=180–620`, bring back compact model sheet showing `320B TOTAL`. On right `x=720–1720`, keep two-layer routing scene. Overlay one orange path through selected components. At bottom `(460,790)`: `~18B ACTIVE / TOKEN` with arrow to whole orange path, not to one layer.

**Continuity:** Router scene remains unchanged.

**Why:** 18B is associated with broader active path, not eight experts in one layer.

### Beat 084 — Explicit misconception guard
**Narration:** “Eighteen billion is not ‘eight experts equals eighteen billion.’”

**Frame:** Under model sheet, show `18B ≠ 8 experts in one layer` at `(460,875)`. On right, bracket several always-used/shared components plus selected expert paths across the two shown layers.

**Continuity:** Keep `320B TOTAL` and `~18B ACTIVE / TOKEN` visible together.

**Why:** Stops the headline simplification from becoming a false equation.

---

# SECTION 08 — ONE LAYER BECOMES 45

## Reference Image 22 — Beats 085–088

### Beat 085 — Make the MoE room one floor
**Narration:** “The expert room we studied is only part of one layer.”

**Frame:** Current router/expert scene shrinks continuously to fit inside one floor rectangle `x=760–1450, y=500–680`. Attention room reappears to its left within same floor. Label on floor edge: `LAYER 4`.

**Continuity:** The selected-expert pattern remains visible as tiny lights during shrink.

**Why:** Viewer knows exactly where MoE sits in the larger model.

### Beat 086 — Reveal all 45 layers
**Narration:** “GLM-5.3-Flash has 45 language layers.”

**Frame:** Camera pulls back; floor copies stack vertically into a paper building occupying `x=610–1320, y=120–930`. Exact label to right at `(1480,260)`: `45 LANGUAGE LAYERS`. Keep Layer 4 slightly orange so viewer can find the room they just studied.

**Continuity:** Layer 4 is the original floor; other floors grow around it.

**Why:** `45` is spatially attached to the thing it counts.

### Beat 087 — Mark first 3 dense layers
**Narration:** “The first three use dense feed-forward blocks.”

**Frame:** Bottom three floors receive a left-side graphite bracket from `y=820→930`, label at `(470,875)`: `LAYERS 1–3 · DENSE FFN`. Their FFN room icons show one block, not expert grids.

**Continuity:** Building and Layer 4 marker remain.

**Why:** Exact architectural exception is shown before sparse majority.

### Beat 088 — Mark 42 sparse-MoE layers
**Narration:** “The remaining 42 use sparse MoE feed-forward blocks.”

**Frame:** A longer right-side bracket runs from Layer 4 to Layer 45, `y≈130→800`, label at `(1510,520)`: `LAYERS 4–45 · 42 SPARSE-MoE FFN LAYERS`. Tiny expert-grid icon appears in each bracketed floor.

**Continuity:** Dense bracket stays on left so the split is simultaneous.

**Why:** Viewer can reconcile `45 = 3 dense + 42 sparse` visually.

---

## Reference Image 23 — Beats 089–092

### Beat 089 — Enter Layer 1
**Narration:** “Our representation enters Layer 1.”

**Frame:** `it` vector enters bottom floor from left at `(520,910)`. Inside Layer 1, Attention room flashes orange first, then dense FFN room flashes orange. Output vector exits upward at `(960,825)` with one added paper layer.

**Continuity:** Dense/MoE brackets remain faint at sides.

**Why:** Shows sequence through a dense layer without re-teaching mechanism.

### Beat 090 — Layer 2 gets an already-changed vector
**Narration:** “Layer 2 receives the changed version.”

**Frame:** Same vector rises to Layer 2. Leave a faint ghost of prior vector at Layer 1 exit. Vector gains another subtle stripe after Layer 2.

**Continuity:** Same orange `it` tab remains at leading edge.

**Why:** Depth = repeated transformation, not identical copies of the same operation on the same state.

### Beat 091 — Layer 3 remains dense
**Narration:** “Layer 3 is still dense on the feed-forward side.”

**Frame:** `it` rises through Layer 3. Briefly highlight its single dense FFN block, matching the left bracket `LAYERS 1–3 · DENSE FFN`.

**Continuity:** No expert lights yet in Layers 1–3.

**Why:** Reinforces the boundary before Layer 4 changes mechanism.

### Beat 092 — Layer 4 activates sparse experts
**Narration:** “At Layer 4, sparse MoE begins.”

**Frame:** `it` enters Layer 4, Attention flashes, then router icon flashes blue, exactly eight tiny expert lights flash orange plus one teal shared light. A small `8 routed + 1 shared` label sits directly right of Layer 4 at `(1390,770)`.

**Continuity:** This is the same Layer 4 that originated from the detailed MoE room.

**Why:** Calls back to learned mechanism at building scale.

---

## Reference Image 24 — Beats 093–096

### Beat 093 — Show rerouting immediately on next sparse layer
**Narration:** “The next layer can choose a different set.”

**Frame:** `it` rises to Layer 5. Layer 4 top-8 pattern remains as faint orange ghost; Layer 5 lights a visibly different eight positions. A short arrow beside building reads `representation changed → route again`.

**Continuity:** Same building and token.

**Why:** Dynamic routing is not postponed or stated abstractly.

### Beat 094 — Time-lapse remaining layers
**Narration:** “That repeats as the representation is refined.”

**Frame:** Token moves upward through Layers 6–44 in controlled time-lapse. Each sparse floor briefly flashes a different small selection fingerprint. Do not display `336 expert visits`; focus on fresh decisions rather than a misleading aggregate count.

**Continuity:** Brackets remain faint, building never changes orientation.

**Why:** Viewer sees repeated routing without learning an unimportant arithmetic headline.

### Beat 095 — Exit Layer 45
**Narration:** “Eventually the representation reaches the end of the stack.”

**Frame:** `it` vector exits top floor at `(960,105)`, now visibly layered/complex but still a readable paper strip. Building below remains full height. Add tiny `LAYER 45` tag at top floor edge.

**Continuity:** Orange `it` identity stays attached.

**Why:** Completes the forward path before output prediction.

### Beat 096 — Pause on what the building taught us
**Narration:** “The router never had one permanent expert set for `it`.”

**Frame:** Freeze building. Overlay a single orange path from bottom to top; at sparse floors, small route forks visibly differ. Bottom note centered `(960,980)`: `routing is decided from the current representation at each sparse layer`.

**Continuity:** Keep final vector parked above building.

**Why:** This is the exact fact needed to solve the opening memory question.

---

# SECTION 09 — RETURN TO THE LOAD-ONLY-SELECTED HYPOTHESIS

## Reference Image 25 — Beats 097–100

### Beat 097 — Return to the exact opening machine
**Narration:** “Now go back to our original idea.”

**Frame:** Building folds down and reveals the **same coordinates as Beat 012**: full weight drawers `x=230–900`, blue router `(1030,590)`, fast working-memory tray `x=1240–1700, y=470–710`. Eight old orange modules are still shown inside tray, like the paused hypothesis resumed.

**Continuity:** Layout should match Beat 012 closely enough for an obvious visual callback.

**Why:** Payoff happens in the world where the question was asked.

### Beat 098 — Show when the selection becomes known
**Narration:** “The router can only choose after the current representation reaches that layer.”

**Frame:** Numbered causal markers appear, attached to objects: `1 CURRENT REPRESENTATION` at `(820,820)` moving into router; `2 ROUTER SELECTS` at `(1030,430)`; `3 REQUIRED EXPERT WEIGHTS` above highlighted drawers at `(610,360)`. The numbers are step numbers, not parameter counts.

**Continuity:** Existing tray remains visible on right.

**Why:** Makes timing of knowledge—the real catch—explicit.

### Beat 099 — Let on-demand loading work once
**Narration:** “For this layer, selected experts could be moved into fast memory.”

**Frame:** Eight newly selected drawers flash orange. Their modules travel along a rail `x=820→1240, y=590` and dock into tray. Add a small graphite check at `(1680,500)`. No red warning yet.

**Continuity:** Router choice visibly precedes transfer.

**Why:** The strategy is not impossible; it can work.

### Beat 100 — Change the representation and break the fixed working set
**Narration:** “But the next sparse layer can ask for a different set.”

**Frame:** A changed `it` vector enters router. Different drawers light orange. Experts currently in tray fade to graphite and receive small mismatch ticks. New selected drawers remain in storage waiting to move.

**Continuity:** Same store/router/tray; only representation and selected set change.

**Why:** Shows why “load one 18B chunk once” is the wrong mental model.

---

## Reference Image 26 — Beats 101–104

### Beat 101 — Show repeated weight movement
**Narration:** “If needed weights are outside fast memory, they may have to move.”

**Frame:** Old tray modules slide out toward storage while new selected modules slide toward tray on two parallel rails. Transfer arrows are thick enough to see. Add small muted-red friction marks only on rails, not everywhere.

**Continuity:** Router stays blue and calm; the bottleneck is movement, not router ‘thinking slowly’.

**Why:** Correctly locates the potential cost in weight transfer/access.

### Beat 102 — Name the bottleneck without fake benchmark numbers
**Narration:** “Now bandwidth and latency can become the bottleneck.”

**Frame:** Above transfer rail at `(1060,430)`, exact text: `WEIGHT TRANSFER`. Beneath at `(1060,760)`: `bandwidth + latency`. A red constriction physically narrows the rail at `(1110,590)`. Do not display `26 MB`, `8 GB`, or `1.5 s` without a pinned hardware/precision setup.

**Continuity:** Moving modules queue behind the narrow point.

**Why:** Explains the general mechanism instead of presenting one implementation as universal.

### Beat 103 — Show token-to-token change too
**Narration:** “And another generated token can create another routing pattern.”

**Frame:** Split only the left storage face into two temporal rows: top label `token t`, bottom `token t+1`. Each row highlights different drawer addresses. Router/tray remain single shared objects on right, making changing demand visible over time.

**Continuity:** Same store; no new model copy.

**Why:** Dynamic access happens across layers and tokens.

### Beat 104 — Summarize the changing working set as a routing map
**Narration:** “There is no one permanent little expert bundle.”

**Frame:** A compact matrix appears above the storage bank at `x=260–850, y=175–350`: rows = `token t`, `token t+1`; columns = `L4, L5, L6, …`. Orange dots differ by row/column. Keep store/router/tray still visible underneath.

**Continuity:** Matrix is a summary of selections already shown, not a new unexplained abstraction.

**Why:** Compresses dynamic routing into one readable proof.

---

## Reference Image 27 — Beats 105–108

### Beat 105 — State the causal answer
**Narration:** “The choice is dynamic because it depends on the current hidden representation.”

**Frame:** Remove matrix. Keep three numbered causal objects from Beat 098 permanently aligned left-to-right: `(730,540)` current representation → `(1030,540)` router → `(1370,540)` expert access. Under them: `representation changes → selection changes → required weights can change`.

**Continuity:** Storage drawers remain faint behind expert-access stage.

**Why:** Gives one sentence the viewer can carry away.

### Beat 106 — Show the real systems tradeoff
**Narration:** “Serving systems can trade memory against movement.”

**Frame:** Split right half vertically. Upper tray at `(1420,390)` labelled `KEEP MORE WEIGHTS FAST` with larger tray silhouette. Lower rail/tray at `(1420,690)` labelled `MOVE / FETCH ON DEMAND` with longer transfer path. Router at `(960,540)` feeds both alternatives.

**Continuity:** This is a comparison of strategies, not two simultaneous model steps.

**Why:** Avoids false binary ‘all weights in VRAM or impossible’ framing.

### Beat 107 — Mention real techniques as supporting details
**Narration:** “Real systems can shard, quantize, cache, and offload.”

**Frame:** Along bottom edge `y=930`, four small paper tabs appear left-to-right: `SHARD`, `QUANTIZE`, `CACHE`, `OFFLOAD`, centered around x=`650,860,1070,1280`. They are 26–30 px, secondary. Main tradeoff graphic stays dominant.

**Continuity:** Do not animate these tabs as magic fixes.

**Why:** Accurate nuance without turning the video into a serving-engine tutorial.

### Beat 108 — Pay off the opening question
**Narration:** “Sparse compute does not automatically mean tiny memory.”

**Frame:** Return to one storage/router/tray view. Across top center `(960,170)`: `SPARSE COMPUTE ≠ TINY MODEL MEMORY`, 48 px. Under it, full drawer bank remains physically large while only a few orange modules work in tray. Red transfer bottleneck is subtle, not dramatic.

**Continuity:** Same machine from Beats 008–012 and 097–107.

**Why:** This is the promised answer; the opening machine now makes sense.

---

# SECTION 10 — NEXT-TOKEN PREDICTION

## Reference Image 28 — Beats 109–112

### Beat 109 — Return to the unfinished sentence
**Narration:** “After the final layer, the model still has to choose what comes next.”

**Frame:** Final `it` representation from Beat 095 returns to center `(960,600)`. Sentence sits above at `(960,310)`: `The dog dropped the ball, and it ___`. Blank after `it` is a real paper slot `170×74 px`. Yellow note at `(960,820)`: `WHAT WOULD YOU PUT HERE?`.

**Continuity:** Same `it` token; no completed answer has been shown earlier.

**Why:** Third prediction moment pays off the decision to keep the prompt unfinished.

### Beat 110 — Reveal vocabulary as the output choice space
**Narration:** “The final representation scores the vocabulary.”

**Frame:** Sentence moves to top `y=175`. Large vocabulary wall fills `x=330–1590, y=300–850`. Header directly above wall `(960,265)`: `154,880 TOKEN CHOICES`. Final vector enters wall from left `(250,570)`.

**Continuity:** `154,880` visually recalls the earlier index world.

**Why:** Vocabulary is a callback, not a new concept.

### Beat 111 — Lift only the top candidates
**Narration:** “A few candidates rise above the rest.”

**Frame:** Most rows remain tiny. Four candidate chips lift out near center: `rolled`, `fell`, `bounced`, `stopped` (teaching examples) around `x=650–1270, y=520`. Use bar lengths only, no fake probabilities. Tiny label above set: `illustrative candidate ranking`.

**Continuity:** Vocabulary wall remains behind candidates.

**Why:** Shows selection without claiming measured GLM logits.

### Beat 112 — Select `rolled` as the teaching example
**Narration:** “For our teaching example, suppose `rolled` is selected.”

**Frame:** `rolled` chip turns orange and lifts 16 px. Other candidates drop to 35% contrast. A thin path connects `rolled` to the blank sentence slot at top, but chip has not moved into it yet.

**Continuity:** Keep `illustrative candidate ranking` visible.

**Why:** Clearly distinguishes example output from measured model behavior.

---

## Reference Image 29 — Beats 113–116

### Beat 113 — Append the selected token
**Narration:** “Now the sequence is longer.”

**Frame:** Orange `rolled` chip physically travels along the path and docks after `it`, forming `The dog dropped the ball, and it rolled`. The vocabulary wall folds down and out; sentence returns to center `y=430`.

**Continuity:** Selected chip is the same object from Beat 112.

**Why:** Next-token prediction visibly changes the input context for the next step.

### Beat 114 — Begin the next generation step accurately
**Narration:** “For another token, the model performs another generation step with the longer context.”

**Frame:** Extended sentence bends into a curved path toward a miniature 45-layer building at `(1420,610)`. Under the building, small technical note: `serving systems reuse cached state where supported`. Do not show every previous token starting from zero at Layer 1 as separate full recomputations.

**Continuity:** Orange current-generation focus moves from `it` to the newly appended `rolled` token.

**Why:** Fixes the misleading “everything goes back from the beginning” visual.

### Beat 115 — Generate a short continuation montage
**Narration:** “Then another token. And another.”

**Frame:** Keep sentence at `y=430`. First, `away` chip appears from a compact vocabulary slot and docks after `rolled`; then `.` docks after `away`. One restrained building pulse accompanies each new token. Label `teaching continuation` at `(960,620)`.

**Continuity:** Earlier tokens remain stationary as context.

**Why:** Shows autoregressive repetition without replaying 100 beats.

### Beat 116 — Compress the generation loop
**Narration:** “That is repeated next-token prediction.”

**Frame:** Four-object loop centered on frame: `CONTEXT` `(520,360)` → `MODEL STEP` `(1080,300)` → `VOCABULARY SCORES` `(1390,610)` → `SELECTED TOKEN` `(760,760)` → back to `CONTEXT`. The actual sentence sits small inside Context object.

**Continuity:** Components are callbacks to worlds already learned.

**Why:** Summarizes only after the viewer has experienced one full pass.

---

# SECTION 11 — FINAL PAYOFF

## Reference Image 30 — Beats 117–120

### Beat 117 — Fold the journey back into the opening sheet
**Narration:** “Now the opening numbers mean something different.”

**Frame:** Generation loop folds inward like paper and becomes the original model information sheet at `x=220–1700, y=125–915`, matching Beat 001. `320B` returns to `(610,500)`; `18B` returns to `(1310,500)`.

**Continuity:** Exact callback to first image; viewer should recognize it immediately.

**Why:** Close the same question in the same visual world.

### Beat 118 — Define 320B precisely
**Narration:** “320B is the model’s total learned parameter capacity.”

**Frame:** `320B` remains black and dominant on left. Under it at `(610,650)`, add two-line label: `TOTAL LEARNED PARAMETERS` / `stored + available`. Behind left number, faint full expert/weight field appears.

**Continuity:** Right `18B` remains visible but at 55% contrast.

**Why:** Total capacity gets its final meaning before active path.

### Beat 119 — Define ~18B precisely and show dynamic path
**Narration:** “About 18B is the approximate active parameter path for one token.”

**Frame:** `18B` becomes orange. Under at `(1310,650)`: `APPROX. ACTIVE / TOKEN`. Behind it, a miniature vertical model path shows dense/shared components plus changing selected-expert forks. Small bottom line centered `(1310,780)`: `selection can change by layer + token`.

**Continuity:** Full 320B field remains faint on left; active path does not replace it.

**Why:** Final visual explicitly separates total capacity from dynamic selective compute.

### Beat 120 — Final sentence, no overclaim
**Narration:** “Huge capacity. Selective compute. Dynamic access.”

**Frame:** Model sheet fades to 35% while three phrases occupy center vertically: `HUGE CAPACITY` at `(960,395)`, `SELECTIVE COMPUTE` at `(960,540)` in orange, `DYNAMIC ACCESS` at `(960,685)` with blue underline. At bottom `(960,900)`, tiny callback diagram remains: full store → router → changing selected path. No “better because more experts” claim.

**Continuity:** Keep 320B/18B ghosted in their original positions behind the final line.

**Why:** End on the real distinction the entire explainer proved.

---

# Story logic check

The final causal spine is:

`320B exists`  
**BUT** only `~18B` is active for one token  
**THEREFORE** ask what chooses the active path  
**BUT** if a router chooses it, why not load only that part?  
**THEREFORE** follow one token  
→ tokenization  
→ ID  
→ embedding  
**BUT** embedding lacks current context  
**THEREFORE** Attention gathers context  
**BUT** the layer still needs feed-forward capacity  
**THEREFORE** MoE provides many possible FFNs while selecting top-8 routed + shared  
**BUT** the representation changes  
**THEREFORE** routing changes across layers/tokens  
**THEREFORE** the required expert working set is dynamic  
**SO** sparse compute does not automatically mean a tiny fixed memory footprint  
→ final representation scores vocabulary  
→ next token  
→ repeat  
→ return to `320B total` vs `~18B active`.

# What this GPT version intentionally removes from the old production emphasis

- No universal `26 MB per expert` claim.
- No universal `8 GB per token` claim.
- No universal `1.5 seconds` transfer claim.
- No `42 × 8 = 336` as a major payoff.
- No fake real attention percentages.
- No fake router scores.
- No fake GLM token ID.
- No implication that `it` always has one expert team.
- No implication that all previous tokens are naïvely recomputed from zero for every new token.

Those details can be added later **only if pinned to a real tokenizer/checkpoint/hardware/precision setup and measured.**
