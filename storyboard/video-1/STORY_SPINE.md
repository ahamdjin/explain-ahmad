# Story spine — v5

Status: **v5 — the intro asks, §11 answers, and every section is a chapter with
a wall at each end.** All thirteen sections built; §01 rewritten to v9 script,
§§02–13 need their open/close lines set (§5 below).

v4's note is kept below because the decision it records was reversed by the
person watching it. v4 chose to **tell the viewer the answer in the first
ninety seconds** and spend the rest proving it. Ahmad watched the built thing
and reported: *"The whole story feels disconnected on what, when, how it is
happening. I dont know when was the intro. When we jumped to Token and Token ID
and Embedding and then attention."* Two separate faults, and v4 caused one of
them and failed to prevent the other:

1. **The answer arrived before the machine did.** §01 beat 13 said *"That's the
   answer. That's the whole thing."* at 1:20, and §11 re-asked the same question
   fifteen minutes later. Nothing was at stake in between. **v5: the intro
   asks, §11 answers.**
2. **No section ever names itself.** "Attention" is spoken ten times, always in
   passing, never as *"this part is called attention, and it starts now."*
   Sections chain their *questions* but never bank their *answers*, so nothing
   accumulates and 21 minutes reads as one run-on. **v5: §5 below.**

v4's other decision — teach the whole machine rather than theorise about it —
was right and stands.

---

**(v4's note, superseded on the two points above)**

Status: **v4 — the whole machine, taught, then the payoff. All thirteen
sections built.** 164 beats, 21:36, 76% talking. `npm run board` for every
beat, `/watch` to see it in order, `npm run timing` for the pacing.

The `secs` in the build come from a 145-words-per-minute estimate and are
placeholders. **Record against `video-script/video-1/READ_ALOUD.md` and set them from
the real audio** — `docs/VOICE_OVER.md`. Until then the runtime is an estimate
and the autoplay preview only approximates the cut.

v3 got the voice right and was still missing most of the machine. Ahmad's
brief: token → token ID → embedding *with an example* → attention, so the model
associates → the router chooses **based on what attention produced** → the
experts do the work and produce an output → *"but that was one word?"* → and
how does it combine into something that understands us — **that is where
transformers come in.** Longer is fine as long as all of it makes sense.

That is correct, and it reverses a decision I defended twice. The memory answer
is only worth anything to someone who has seen the machine. So v4 teaches the
full pipeline and uses the memory question as the **payoff**, not as a mystery
running underneath.

Runtime lands around **21 minutes** as built (16.6 of it speaking). The risk of that shape is a payoff at
minute twelve, and the answer to it is in §4 below: every mechanism section
must add one *reason you could not have known in advance*. The teaching is the
answer being assembled, not a detour before it.

v2 was a mystery: it opened a question and held it for eight minutes. Ahmad
read it and said it was not simple, was not making sense, and *"eventually
answers the same thing it did above"* — which is exactly right. §1 asked why
the machine needs all of it, answered a smaller different question (why the
rest is not waste), and exited by re-asking the first one. That is the
circularity bug from v1 in a new costume.

v3 fixes it by **telling the viewer the answer in the first ninety seconds**
and spending the rest of the video showing that it is true. Nothing is
withheld. Every section answers the question it raises, and the answer is what
raises the next one — therefore, but, therefore. No unsolved puzzle at any
point.

It also **teaches the mechanism** rather than theorising about it:
tokenization, numbers, attention, the router, the layers. Ahmad asked for that
twice and was right both times — the journey is what makes the answer
believable, and a viewer who has seen the machinery does not have to take the
verdict on trust.

Supersedes `archive/STORY_SPINE-claim-on-trial-v1.md` (the claim-on-trial
version, 8 sections, built and shipped as 96 beats / 8:04). What forced the
rewrite is in `research/glm/OFFLOADING_AND_LOCALITY.md`: v1's Section 07 was
about to claim you cannot run this on less memory, and people run large MoE
models on small cards every day. v1 also opened on a product name and reached
its hook at 0:19, against research saying 30–40% of viewers are gone by 0:30
(`research/RETENTION_AND_ANGLE.md`).

---

## 1. The promise

Made in the first fifteen seconds, and it is the whole video:

> **Two models. Both use about five percent of themselves to answer you. One
> runs on a single graphics card. The other needs four.**
>
> So the number everybody quotes — *"only 18 billion active"* — is not telling
> you what you think it is.

| | gpt-oss-120b | GLM-5.3-Flash |
| --- | --- | --- |
| Total | 116.8B | 321B |
| Active per word | 5.1B | 18B |
| **Share active** | **4.4%** | **5.6%** |
| Experts per sparse layer | 128 | **288** |
| Routing | top-4 | **top-8** |
| Footprint as shipped | ~58 GiB (MXFP4, 4.25 bit) | ~306 GiB (FP8) |
| **Fits on** | **one 80 GB GPU** | **four** |
| Squeezed to 4-bit | ~58 GiB | ~153 GiB — still two |

Sources: [gpt-oss model card](https://arxiv.org/pdf/2508.10925) ·
[gpt-oss repo](https://github.com/openai/gpt-oss) · `research/glm/GROUND_TRUTH.md`

The contradiction is honest at either precision, which is what makes it safe to
open on. Say "about five percent" — 4.4 and 5.6 are the same claim.

## 2. The spine

| | |
| --- | --- |
| **The want** | Everybody quotes *"320 billion parameters, only 18 billion active."* I want to know what that number actually buys — because two models with the same number need wildly different machines. |
| **The wall** | Which experts are needed is decided from the word's *current* numbers, and those numbers change at every one of the 42 sparse layers. So the set is unknowable in advance and changes 42 times per word. And the trick that rescues this on other models — cache the ones that keep coming back — has almost nothing to grip when there are **288 experts per layer and 12,096 slots**. |
| **The thesis** | **"Active parameters" is a compute number, not a memory number.** Sparse routing buys compute, not memory — and the finer you slice the experts, the more true that gets. |

### Why the thesis is worth eight minutes

Fine-graining is not a mistake. More experts, smaller each, is *why* modern MoE
models are good — better specialisation, better load balance. It is also
precisely what defeats the caching trick that lets people run Mixtral on a
laptop. **The better these models get at being sparse, the harder they get to
hold.**

**Corrected 2026-09-11** — this used to end "Nobody has made that video."
`research/COMPETITIVE_FIELD.md` checked the field properly, and that is only
half true:

- *"Sparse routing buys compute, not memory"* **has** been made. It is the
  entire description of *The AI Trick Eating the World's Memory* (10:35,
  2026-06-30), which also covers SSD offloading and expert paging with the same
  citations we use. We are **second to that thesis**, and its frame is
  macro-economic — why DRAM got expensive — where ours is personal.
- **The fine-graining argument is still nobody's.** No video in the field
  connects more-and-smaller-experts to *caching stops working*. That, and the
  336 arithmetic, and following one word through the whole machine, are what
  we actually own.

## 3. What the viewer thinks they already know

This decides everything, because the audience for an MoE video believes it
understands MoE:

> *"Only a few parts run, so you only need to load a few parts. That's the
> whole point. It's cheaper."*

They are **right about the compute and wrong about the memory**, and they will
not be moved by being told. They have to watch the reasonable version of their
own idea get built, work, and then fail for a reason they can see. That is what
Sections 6 and 7 are for, and it is why they get 27% of the runtime.

## 4. The chain — 13 sections

Every section answers its own question, and the answer raises the next. The
last column is the load-bearing one: each mechanism section pays a little of
the final answer, so the payoff is assembled in front of the viewer rather than
withheld from them.

| # | Section | Teaches | Answers | → next | Adds to the answer |
| --- | --- | --- | --- | --- | --- |
| 1 | **What "five percent active" actually costs** | parameter, expert, active, Mixture of Experts | **about five percent runs — and that number does not predict the hardware** | **therefore** go and watch it choose | the contradiction: two models, same share, four times the machine |
| 2 | **Your words become tokens** | token, token ID, vocabulary | your text is cut into pieces; each piece has a row number in a list of 154,880 | **but** a row number is a name, not a meaning | — |
| 3 | **From an ID to a meaning** | embedding | the number is looked up in a huge table and comes back as a row of 4096 values | **but** that row is identical every time the word appears | the row is *fixed per token* — the first half of the paradox |
| 4 | **The word looks around** | attention, context | each token reads the others and pulls in what matters, and its row **changes** | **therefore** the same word has different numbers in different sentences | **the numbers depend on the whole sentence** |
| 5 | **The router picks the eight** | router, top-8, shared expert | it scores all 288 against the row *as it is now* and keeps the best 8 | **therefore** the choice is made from numbers that only just existed | **the choice depends on those numbers** |
| 6 | **The experts do the work** | expert output, weighting | each of the 8 transforms the row; the outputs are blended back into one | **therefore** the token leaves changed | — |
| 7 | **That was one layer. There are 45.** | layer, sparse vs dense | 3 dense, 42 sparse; the token climbs, and every floor does attention and routing again | **therefore** 42 × 8 = **336 expert visits for one token** | **336 choices, not one** |
| 8 | **That was one token. Here's the sentence.** | **transformer**, parallel processing | the whole prompt goes through together; attention is the wiring between them; this stack is what "transformer" names | **therefore** it reads your sentence as a whole, not word by word | **every token pays its own 336** |
| 9 | **Where the answer comes out** | logits, next-token prediction | the top of the stack turns the last position into a score for all 154,880 tokens, and one is chosen | **therefore** one word comes out | — |
| 10 | **And then it does the whole thing again** | autoregression | the new word is added to the end and the entire stack runs again | **therefore** every word of the reply pays 336 all over again | **it never stops re-choosing** |
| 11 | **So could you store only the 18 billion?** | memory vs storage | you would fetch ~8 GB per word — about a second and a half, against milliseconds of thinking | **therefore** the fetching costs more than the work | the arithmetic |
| 12 | **How people actually run these** | caching, the trade | experts do repeat, so keep the frequent ones close; it genuinely works | **but** with 12,096 slots there is no setting that is both small and fast | the honest limit |
| 13 | **What that number actually bought** | — | **compute, not memory** — and the finer the experts, the wider the gap | *(the end)* | the verdict |

### Read as one sentence

> A model uses a different 18 billion for every word, **therefore** we watch it
> choose. Your words become tokens with ID numbers, **but** an ID is a name and
> not a meaning, **therefore** each one is looked up as a row of 4096 values.
> That row is the same every time, **but** each token then reads the others and
> its row changes, **therefore** the same word carries different numbers in
> different sentences. The router scores the 288 experts against that row,
> **therefore** the choice depends on numbers that only just existed. The eight
> do their work and hand back a changed row, **therefore** the token leaves
> different from how it arrived — and that is one floor of forty-five, **so**
> one token costs 336 expert choices. The whole sentence climbs together, which
> is what a transformer is, **therefore** every token pays its own 336. The top
> turns the last position into one word, **and then** — no. **Therefore** the
> word is appended and the entire thing runs again. **Therefore** storing only
> the active part means fetching eight gigabytes per word. People do it anyway
> with caching, **but** the exchange rate is brutal. **Therefore** "active
> parameters" bought you compute, and never bought you memory.

The one "and then" is deliberate and is immediately refused. It marks the exact
place a lesser video would coast.

### The running thread

The memory question is asked at 1:20 and answered at the end, which is a long
way. It survives because **§3, §4, §5, §7, §8 and §10 each add one piece of the
answer** — see the last column. Each of those sections carries one short line
that banks it, e.g.:

> *"And notice — nothing about that could have been worked out ahead of time."*

Six deposits, then §11 spends them. A viewer at minute nine should feel the
answer arriving, not waiting.

## 5. The chapter wall — how a section announces and closes itself

This is v5's whole addition, and it exists because Ahmad could not tell where
one part ended and the next began.

Ahmad's call was **handoff only, no title cards** — the narration carries the
structure, nothing is added to the frame. That is also what *The Evolution of
Trust* does: it has no chapter titles either, but **every time its mechanic
changes, the narration says so in a sentence**
(`skills/ncase/NCASE_EVOLUTION_OF_TRUST.md` §6). We removed the corner chrome
and never wrote the sentences. These are the sentences.

Every section gets exactly two load-bearing beats:

| | |
| --- | --- |
| **The opening beat** | **Banks** the previous section's answer as *settled and owned* — "so we now know X" — then adds the **but** that makes this section necessary. Never opens on fresh material. |
| **The closing beat** | **Declares this mechanism finished by name** — "that's attention, done" — states what the viewer now has, and names the one thing still missing. |

The failure v4 had is that openings carried the *question* forward
(*"So — who picks the eight"*) without ever banking the *answer*. A viewer who
never gets to keep anything never accumulates anything, and 21 minutes of open
questions feels like drift. **Bank first, then complicate.**

Two rules that keep this from becoming recap:

- **Bank in one clause, not a summary.** "So the row is now specific to this
  sentence —" is banking. "Let's review what we've learned about attention" is
  a recap, and recaps are where retention dies.
- **Name the mechanism at the close, not the open.** Saying "this next part is
  called attention" before it happens spends the word on nothing. Saying
  "that's attention — that's all attention is" after the viewer has watched it
  work attaches the word to a memory. This is the Trust rule about withholding
  the naming word, at section scale.

### The thirteen walls

`Opens` must bank the previous row's `Closes`. `npm run check:chain` verifies
the pairing; it cannot verify that the sentences are any good.

| # | Chapter | Opens by banking… | …then the **but** | Closes on |
| --- | --- | --- | --- | --- |
| 1 | the question | *(nothing — this is the top)* | you type, and 5% runs | **who picks the eight, and why is that the expensive question?** |
| 2 | tokens | something picks the eight; to see how, follow a word in | it doesn't get words | your text is numbers now — but a row number is a **name**, not a meaning |
| 3 | meaning | each piece has a row number, which is only a name | a name has to become a meaning | that's the lookup done — the word is 4,096 numbers, but **the same 4,096 every time** |
| 4 | attention | the row is fixed per word | so every "dog" starts identical, which can't be right | **that's attention, done** — the row has changed, and it changed because of *this sentence* |
| 5 | the router | the row is now specific to this sentence | something has to read it and choose | **that's the router, done** — eight picked, and they could not have been picked any earlier |
| 6 | the experts | eight are chosen | what do they actually *do*? | **that's one full step, done** — attention, choose, work. So how many steps are there? |
| 7 | the stack | one step changes the word | there are forty-five of them | **336 choices for one word** — every one needing the floor below it first |
| 8 | the sentence | 336 for one word | I've been following one word, and I owe you a correction | **every word pays its own 336** — so what comes out? |
| 9 | the output | all of it happens, for every word | and it produces… one word | **one word, out of all that** |
| 10 | the loop | one word comes out | so how do you get a paragraph? | **it never stops re-choosing** — now we can finally ask the opening question properly |
| 11 | **the answer** | it re-chooses, every word, every floor | so could you store just the 5%? | **no — ~8 GB fetched per word against milliseconds of work** |
| 12 | the honest limit | you can't store only the active part | except people run these on small machines every day | it works — but with 12,096 slots there's **no setting that is both small and fast** |
| 13 | the verdict | small *or* fast, not both | so what did "five percent active" actually buy? | **compute, not memory** — and the finer the experts, the wider the gap |

Row 11 is where v4's answer moved to, and it is now the first time the video
says it.

Row 4 and row 5 are the two Ahmad named as the place he got lost. Both now
open by banking and close by naming.

## 6. Style — plain, and out loud

The reference is Nate Herk: plain conversational delivery, no drama, say what
you are about to do and then do it, explain each step as it happens, never hold
back an answer to build suspense.

| Do | Don't |
| --- | --- |
| "Here's the answer, straight up." | "But there's a problem…" (mystery) |
| "A parameter is just a number the model learned." | "parameters encode learned representations" |
| short sentences, one idea each | one sentence carrying two ideas |
| "Let's follow one word through it." | "Let us now consider the forward pass." |
| name the thing, then use the name plainly | avoid the name to seem clever |
| numbers said out loud: "three hundred and twenty billion" | "320B" as spoken text |

If a line would not survive being said to a friend at a table, it is rewritten.

## 7. What changed from v1, and why

| | v1 | v2 |
| --- | --- | --- |
| Open | *"This is GLM-5.3-Flash."* Hook at 0:19 | the number, the surprise, **and the answer** — all inside 90 seconds |
| Want | the word "efficient" on trial | the number everyone quotes, and what it buys |
| §1 event | "a **completely** different eight" | a different eight, **with the overlap shown** — true, and it seeds §7 |
| Old §2 | 46 s, answered nothing, sat at the most fragile point in the video | **folded into §2** — its event survives, the corridor does not |
| The answer | withheld until §7 | **given in §1**, then proved for seven sections |
| Tokenization | cut as "a different video" | **taught in §2** — Ahmad asked twice; the journey is what makes the answer believable |
| Thesis | compute not memory | compute not memory, **and it worsens with granularity** |
| Honesty | implied you cannot offload | concedes offloading works, then shows where it runs out |

The old §2's reveal — *the router never looks at the word* — was too good to
lose and too thin to carry 46 seconds. It now opens §2 and buys its keep in ten.

## 8. Two things we may not claim

**We may not put a number on expert overlap for this model.** The 44.2%
consecutive-token figure and the LRU hit rates are measured on Mixtral 8×7B —
8 experts, top-2. Nobody has published the equivalent for 288 experts at top-8.
So §1 says *"some of them keep coming back"* and shows a couple staying. It
never says how many, and no on-screen number claims a fraction.

**We may not say the fetch is impossible.** It is a trade with a bad exchange
rate, and §7 must be built as a trade. Anything stronger is contradicted by a
`llama.cpp` flag — see `research/glm/OFFLOADING_AND_LOCALITY.md`.

Both restrictions make the video better. A trade the viewer can operate is more
convincing than a wall they have to accept.

## 9. Foundation files

| File | Holds |
| --- | --- |
| `skills/STORY_STRUCTURE.md` | the five gates, run before any art |
| `skills/PRODUCTION_ORDER.md` | script → frames → animation, and line jobs |
| `research/RETENTION_AND_ANGLE.md` | why anyone stays; the competitive field |
| `research/glm/OFFLOADING_AND_LOCALITY.md` | **the correction that produced v2** |
| `research/glm/GROUND_TRUTH.md` | every on-screen number about this model |
| `storyboard/video-1/VOCABULARY_LEDGER.md` | what the viewer owns per section |
| `storyboard/video-1/SECTION_MAP.md` | per-section detail |
| `storyboard/video-1/BOARD.md` | **generated** — every beat of every section, from the code |
| `skills/SPATIAL_CONTINUITY.md` | where the viewer is, and what may move them |

## 10. Two corrections made during the build

**§13 does not return to a spec sheet.** The board asked beat 2 to pan "back to
the opening sheet, exactly as it was — `ModelSheet`, 320 / 18". §1 as built has
no `ModelSheet`, deliberately: *no spec read* is the first rule of that opening.
So §13 beat 2 returns to what §1 actually opened with — the number, and the
block behind it. A callback to a frame that does not exist is worse than none.

**§8 is eight tokens, and §2's ID is 5562.** Both measured from GLM-5.3-Flash's
own tokenizer on 2026-09-11 — `research/glm/TOKENIZER.md`, reproducible with
`scripts/tokenize-glm.py`. Both used to be invented: the prompt was said to
split as `dropp` + `ed` into nine pieces, and the ID was hedged as *"let's
say 4021"*. The pieces are on screen while the arithmetic happens, so the
count is checkable: 8 × 336 = **2,688**. The hedge on the ID is gone because
the number is now real.
