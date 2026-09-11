# Retention, the competitive field, and the angle

Researched 2026-09-09, for the question *what makes someone stay*, which is a
different question from *what makes something true*. Both have to be answered.

Method reference stays `skills/ncase/` — that governs how a section teaches.
This file governs whether anyone is still watching when it does.

## 1. What the retention research says

| Finding | Source |
| --- | --- |
| **30–40% of viewers leave in the first 30 seconds** | [prepublish](https://prepublish.ai/guides/first-30-seconds) |
| Good retention is **35–75%** | [prepublish benchmarks](https://prepublish.ai/blog/youtube-retention-benchmarks-2026) |
| The opening has three phases: **pattern interrupt (0–5s) → specific payoff promise (5–15s) → stakes / journey begins (15–30s)** | [miraflow](https://miraflow.ai/blog/youtube-video-hooks-2026-save-first-30-seconds) |
| Three hook formats work consistently: **preview** (show a result from later), **question** (ask what they are already thinking), **bold counterintuitive claim** | [1of10](https://1of10.com/blog/how-to-hook-viewers-in-the-first-30-seconds-of-a-youtube-video/) |
| Biggest killers: logo animations, "hey guys welcome back", **rambling**, and **slow pacing in the first 30s even when the content is good** | [creator-playbook](https://www.creator-playbook.com/articles/your-intro-sucks-fix-first-30-seconds) |

### Scored against the current opening

| Phase | Wanted | We had |
| --- | --- | --- |
| 0–5s | pattern interrupt | *"This is GLM-5.3-Flash."* — a product name almost nobody recognises |
| 5–15s | specific payoff promise | a spec read: 320B parameters, and "efficient" as a trailing clause |
| 15–30s | stakes | the hook finally lands at **0:19** |

Three of three missed. The claim the whole video puts on trial arrives as the
last four words of the second sentence.

## 2. The competitive field — the topic as stated is a commodity

Videos already covering *total vs active parameters*:

- [Mixture of Experts: The AI Trick Eating the World's Memory](https://www.youtube.com/watch?v=QCd2k7WWfkI) — published 2026-06-30. **Substantially our angle.**
- [Mixture of Experts Explained Visually: How Trillion-Parameter Models Actually Work](https://www.youtube.com/watch?v=9pbyKc8SI6w)
- [Mixture of Experts (MoE) — More Parameters, Same Compute](https://www.youtube.com/watch?v=X-gfpWG6XDU)

Plus written explainers from [IBM](https://www.ibm.com/think/topics/mixture-of-experts),
[Hugging Face](https://huggingface.co/blog/moe) and a dozen SEO blogs.

**"Why does a 320B model only use 18B?" is answered content.** Being the
fourth video to explain top-k routing well is not a plan. The differentiator
has to be something the existing videos get *wrong* or do not reach — and
there is one. See `research/glm/OFFLOADING_AND_LOCALITY.md`.

> **Superseded by `research/COMPETITIVE_FIELD.md` (2026-09-11).** This section
> asserted the overlap from titles alone. The field has now been checked —
> descriptions, lengths, view counts and full chapter lists. Two findings this
> section missed: **two of the three competitors open exactly the way our §01
> used to**, and the memory thesis is *already taken* by the first video, not
> merely adjacent to it. Read the new file instead of this section.

## 3. Titles — what the field actually uses

Patterns visible in the competitors: a **mechanism name** plus a **consequence**
("The AI Trick Eating the World's Memory"), or a **capability claim**
("How Trillion-Parameter Models Actually Work").

What none of them use, and what the retention research says works best, is a
**verifiable contradiction** — a claim the viewer can check and does not
believe. That is the opening this video should buy.

## 4. The rule this produces

A title and an opening are not decoration on a finished explainer. They are the
**promise**, and the video is the payment. So the promise is chosen first, and
it has to be a promise no other video in the field is making.
