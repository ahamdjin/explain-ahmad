# Story spine — v3

Status: **v3 — plain, and answered as it goes.**

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
hold.** Nobody has made that video.

## 3. What the viewer thinks they already know

This decides everything, because the audience for an MoE video believes it
understands MoE:

> *"Only a few parts run, so you only need to load a few parts. That's the
> whole point. It's cheaper."*

They are **right about the compute and wrong about the memory**, and they will
not be moved by being told. They have to watch the reasonable version of their
own idea get built, work, and then fail for a reason they can see. That is what
Sections 6 and 7 are for, and it is why they get 27% of the runtime.

## 4. The chain — 8 sections, plain

Every section: **answers its own question**, and the answer creates the next
one. Read the *Therefore / But* column downward — it should read as one
sentence with no "and then" in it.

| # | Section | Teaches | Answers, in plain words | Therefore / But |
| --- | --- | --- | --- | --- |
| 1 | **What "18 billion active" means** | parameter, expert, active | it uses a **different** 18 billion for every word, and it does not choose until the last moment | **Therefore** we need to watch it choose |
| 2 | **Your words become numbers** | token, embedding | your text is cut into pieces, and each piece becomes a long row of numbers | **Therefore** the machine never sees your words, only numbers |
| 3 | **The numbers change on the way** | attention, context | each piece looks at the pieces around it and its numbers change — "dog" in *the dog barked* is not "dog" in *hot dog* | **Therefore** the numbers are never the same twice |
| 4 | **Who picks the experts** | router, top-8, 288 | a router scores all 288 experts against the numbers *as they are right now* and keeps the best 8 | **But** those numbers just changed — so the choice changes with them |
| 5 | **It happens 42 times per word** | layer, sparse vs dense | 42 sparse layers × 8 experts = **336 expert visits for one word** | **Therefore** there are 336 choices per word and none can be known ahead |
| 6 | **What if you only stored the 18 billion?** | memory vs storage | you would fetch about 8 GB per word — around a second and a half, against milliseconds of actual work | **Therefore** the fetching costs more than the thinking |
| 7 | **How people actually run these** | caching, the trade | experts do repeat, so you keep the frequent ones close — and it genuinely works, up to a point | **But** with 12,096 expert slots the exchange rate is brutal: no setting is both small and fast |
| 8 | **What the number actually bought** | — | **compute, not memory** — and the finer the experts, the wider the gap | *(the end)* |

### Read as one sentence

> A model uses a different 18 billion for every word, **therefore** we watch it
> choose. Your words become numbers, **therefore** the machine works on numbers.
> The numbers change as they travel, **therefore** they are never the same twice.
> The router reads those numbers, **but** they just changed — so the choice
> changes too. That happens 42 times per word, **therefore** there are 336
> choices nobody can predict. **Therefore** storing only the active part means
> fetching 8 GB per word. People do it anyway with caching, **but** the exchange
> rate is brutal. **Therefore** "active parameters" saved you compute, not
> memory.

No "and then" anywhere. That is the test.

### What each section may NOT do

- **No cliffhanger.** A section that ends on a question it does not answer is
  the v2 bug. A section ends on an answer that has a consequence.
- **No withholding for a reveal.** The answer is given in §1. Everything after
  is evidence, and evidence is more convincing when the claim is already known.
- **No theory without the thing.** Show the numbers, the row, the desk, the
  floors. "Representation" is a word; a row of 4096 values is a picture.

## 5. Style — plain, and out loud

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

## 6. What changed from v1, and why

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

## 7. Two things we may not claim

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

## 8. Foundation files

| File | Holds |
| --- | --- |
| `skills/STORY_STRUCTURE.md` | the five gates, run before any art |
| `skills/PRODUCTION_ORDER.md` | script → frames → animation, and line jobs |
| `research/RETENTION_AND_ANGLE.md` | why anyone stays; the competitive field |
| `research/glm/OFFLOADING_AND_LOCALITY.md` | **the correction that produced v2** |
| `research/glm/GROUND_TRUTH.md` | every on-screen number about this model |
| `storyboard/VOCABULARY_LEDGER.md` | what the viewer owns per section |
| `storyboard/SECTION_MAP.md` | per-section detail |
