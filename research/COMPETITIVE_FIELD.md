# The competitive field — verified

Checked 2026-09-11. Supersedes the unverified assertions in
`RETENTION_AND_ANGLE.md` §2.

**Method and its limit.** YouTube transcripts are not fetchable here — the
`timedtext` endpoint returns 200 with an empty body, and the third-party
transcript sites are behind Cloudflare. What *is* fetchable is each video's
title, view count, length, description and **chapter list**, read from the watch
page's embedded JSON. Chapter titles with timestamps are strong evidence of
coverage and order; they are not evidence of the exact opening words. Anything
below about the first ten seconds is inference from the 00:00 chapter title and
the description, and is marked so.

---

## The three videos

### A — *Mixture of Experts: The AI Trick Eating the World's Memory*
`youtube.com/watch?v=QCd2k7WWfkI` · 2026-06-30 · **10:35** · 13,289 views

Description, verbatim and load-bearing:

> It lets a model hold a trillion parameters but only run a few billion per
> word, so the compute bill stays small. **The cost lands somewhere else: every
> expert it isn't using still has to sit in memory, waiting to be picked.**
> […] This is the story of how a trick meant to save compute turned memory into
> the scarce resource.

Chapters:

```
00:00  Why memory suddenly got expensive      05:19  Why a Mac beats a 3090 for MoE
00:29  Total vs. active parameters            06:08  The model landscape, as a memory story
01:10  How routing works                      06:49  How DeepSeek stretched memory further
01:58  What an "expert" really is             07:28  The memory wall
02:44  Where MoE came from (1991 - 2017)      08:08  Speeding up the plumbing
03:53  Mixtral makes it concrete              08:50  Running experts from an SSD
04:33  Why the simple router won              09:46  The energy catch
                                              10:26  Newer ways to page experts
                                              11:00  The bet underneath it
```

It also cites the exact papers our §§11–12 rest on, including *SSD Offloading
for MoE Weights Considered Harmful in Energy Efficiency* (2025) and *FlashMoE:
ML-based expert caching* (2026).

**This is closer to us than `RETENTION_AND_ANGLE.md` admitted.** Its thesis
sentence is our thesis. Its 08:50 is our §11. Its 10:26 is our §12. It even has
the Mac.

**Where it is not us:** the frame is **macro-economic** — Micron sold out, DRAM
prices doubled, data centres taking 70% of supply. It answers *"why did memory
get expensive?"*. We answer *"why can't I run this?"*. And in 10:35 it cannot
teach the machine; routing gets 48 seconds and "what an expert really is" gets
46.

### B — *Mixture of Experts Explained Visually: How Trillion-Parameter Models Actually Work*
`youtube.com/watch?v=9pbyKc8SI6w` · 2026-08-19 · **29:06** · **34,262 views**

Opens, verbatim from the description:

> DeepSeek-V3 runs 671 billion parameters. Kimi K3 runs 2.8 trillion. Almost
> none of that runs per token.

Chapters run FFN → router → top-1 → top-K → expert collapse → aux load
balancing → loss-free balancing → quantile biasing → router z-loss → capacity
factor → MegaBlocks → Expert-Choice → SoftMoE → HetroMoE → shared and
fine-grained experts → full pipeline.

**This is a training-and-kernels video.** Load balancing, GPU execution, router
losses. **It never reaches memory or "can you run it".** It is the deepest
architecture treatment in the field and it is not asking our question.

**And it is 29 minutes with 34K views** — the most-watched of the three. Ours
is **29:45** (`npm run timing`), so length is not the differentiator either
way: the most-watched video in this field is the same length as ours, and the
3:35 one has a tenth of the views. This paragraph said "our 21 minutes" while
the build ran 29:45, which made the comparison read as a margin we do not have.
The difference is the question being asked, not the runtime.

### C — *Mixture of Experts (MoE) — More Parameters, Same Compute*
`youtube.com/watch?v=X-gfpWG6XDU` · 2026-05-31 · **3:35** · 3,422 views

Opens, verbatim:

> Mixtral has 47 billion parameters, but every time it generates a single
> token, it only uses about 13 billion of them. The other 34 billion just sit
> there.

Short, formula-forward (`y = Σ G(x)_i · E_i(x)`), and it frames sparsity as an
unambiguous **win**: *"capacity grows with N … while compute stays fixed at k."*

---

## What this actually settles

### 1. Our old §01 opening was the field's standard opening

Two of the three open on **a big number, then "almost none of it runs"**:

| | |
| --- | --- |
| C | *"Mixtral has 47 billion parameters, but … it only uses about 13 billion. The other 34 billion just sit there."* |
| B | *"DeepSeek-V3 runs 671 billion parameters. Kimi K3 runs 2.8 trillion. Almost none of that runs per token."* |
| §01 v8 (ours) | *"Three hundred and twenty billion. … And to answer you, it only uses this much of it. About eighteen billion."* |

Three videos, one opening. **S-15** (Sanderson: *"offer someone an experience
they might otherwise not have by searching around online"*) is failed by
definition if we open the same way.

v10's two-model contradiction was chosen before this check, on the strength of
`STORY_SPINE.md` §1. The check confirms it, and upgrades it from taste to
evidence: **no competitor opens on a contradiction, and none of them mentions a
second model at all.**

### 2. Three differentiators survive, and they are narrower than claimed

- **Nobody follows one word through the machine.** Not one of the three has
  tokenisation → ID → embedding → attention → router → experts *as a journey
  with the same actor*. B has all the parts, as topics, in an architecture
  order. This is our §§02–10 — about 60% of our runtime — and it is unoccupied.
- **Nobody does the 336 arithmetic.** 8 experts × 42 sparse layers, per token.
  No chapter in any of the three is about the per-token count.
- **Nobody argues that fine-graining defeats caching.** B has "Shared Experts
  and Fine-Grained Experts" at 25:30 as an *architecture feature*. A has expert
  paging at 10:26 as *a thing that works*. The claim in `STORY_SPINE.md` §2 —
  **the better these models get at being sparse, the harder they get to
  hold** — is still nobody's.

### 3. One claim in the spine now needs softening

`STORY_SPINE.md` §2 says of the thesis: *"Nobody has made that video."* For the
**fine-graining argument** that is still true. For **"sparse routing buys
compute, not memory"** on its own it is **not** — that is video A's entire
description. The spine should say so.

### 4. §§11–12 now need to be better than A's, not merely present

A covers SSD offloading and expert paging with real citations. Ours must add
what A cannot in ten minutes: the arithmetic in front of the viewer, and the
12,096-slot reason caching runs out. Being second to the topic is survivable;
being second *and* vaguer is not.

## Still unverified

The **exact first ten seconds** of all three. Chapter titles and descriptions
are strong evidence of angle and coverage, and no evidence of phrasing. If the
opening matters as much as `RETENTION_AND_ANGLE.md` claims, somebody should
watch 30 seconds of each and correct this file.
