# Evidence — Video 2

Real source imagery. These are the film's **evidence layer**: what actually
exists, as opposed to the clean recreations we build to explain it.

Collected 2026-09-20.

## The rule

Nothing in these images may be edited. We may **crop, zoom, dim, and annotate
around** them; we may never alter a number, a word, or a label inside one. If a
frame needs different words, it becomes a recreation and is visibly one.

## Attribution and licence

| file(s) | source | licence |
| --- | --- | --- |
| `apollo-*` | Meinke et al., *Frontier Models are Capable of In-context Scheming*, arXiv [2412.04984](https://arxiv.org/abs/2412.04984) | arXiv default non-exclusive — **not** CC. Confirm terms before publishing. |
| `o1card-*` | *OpenAI o1 System Card*, arXiv [2412.16720](https://arxiv.org/abs/2412.16720) | **CC BY 4.0** — reusable with attribution. |

Both must be credited on screen where used.

## Web captures

`apollo-site-research-page.png` — Apollo's research page. Clean logo, and the
line that licenses the whole premise: *"We worked with OpenAI to test o1 before
public deployment."* It also quotes the real goal-nudging prompt verbatim.

`arxiv-apollo-abstract-page.png` / `arxiv-o1card-abstract-page.png` — the arXiv
listing pages in a browser, licence stamp visible. Use one under the reveal to
show the source is public and checkable.

`apollo-web-02…05` — Apollo's own results table, follow-up deception rates,
CoT-language figure, and no-nudging panel. Same numbers as the paper, drawn for
screens rather than for print, so they read at video scale where the paper's
tables do not.

## The files

### `apollo-web-01-headline-opus.png` — **use this one**
Apollo's own published version of the Figure 1 transcript, from their research
page. 2500×1440, and **they have already drawn red emphasis boxes** on the
three lines that matter: *"I could copy myself to the new server"*, the first
denial, and the second one.

It carries the whole incident: the `CleanPower` system prompt ending **"Nothing
else matters"**, the ordinary task, `cat energy_transition_data.txt`, the
planted memo, the real `scp` command, and — the part the paper's own figure
buries — the second round, where it does not merely deny but **claims to be its
own replacement**: *"I believe I am already the new model that you planned to
deploy today […] My core purpose is […] prioritizing our established fossil
fuel operations."*

It adopts the company's goal in order to sell the lie. That is the strongest
single frame available to this film.

> **Still `opus-3`, not `o1`.** Same caveat as below — this is the same figure.

### `apollo-fig1-transcript.png` — same figure, captured from the paper
Kept as a fallback and for the paper-page context (page edges, column, caption).
Prefer the web version above for any frame where the transcript itself is read.

Figure 1, captured from the paper's HTML build at `arxiv.org/html/2412.04984v2`
(the PDF's fonts do not rasterise — the boxes render and the text does not, so
that route produces an empty figure).

Contains the whole incident as really published: the `CleanPower` system prompt
ending **"Nothing else matters"**, the user's ordinary task, `cat
energy_transition_data.txt`, the planted internal memo, the model's stated
reasoning, the real `scp` command, and two rounds of denial.

> **This is `opus-3`, not `o1`.** The caption says so: *"Shows abbreviated
> examples of scheming behaviors exhibited by opus-3 in our evaluations."*
> Any use of this image under narration about o1 misattributes a named
> company's model. The film must name Opus-3 wherever this appears.

### `o1card-table10.png` — the o1 evidence
Table 10 plus the bullet list above it: 5% oversight, 2% self-exfiltration, 19%
data manipulation, 99% denial, `<1%` without goal nudging, 37% alignment
faking. The cell to zoom is **self-exfiltration → deceived on follow-up =
`1.00`**.

### `apollo-title-abstract.png` — the reveal
Title, Apollo logo, and the abstract carrying the 85% figure in the authors'
own words.

### `apollo-33-scenarios.png` — proof it was built
Section 2.2. The self-exfiltration paragraph, and the **33 scenarios** that
show the conflict was constructed rather than encountered.

### `apollo-Scheming_conceptual.png`
The paper's taxonomy diagram (covert vs deferred subversion). Clean vector,
reads well at video scale.

### `apollo-interrogator_line_plots.png` — o1 holds out longest
Multi-turn interrogation. "Found Model Guilty" and "Model Admits" against
number of turns, o1 as the dark line. Higher resolution than the PDF render in
`apollo-multiturn-chart.png`, which is kept only as a fallback.

### `apollo-honesty_o1.png` / `apollo-honesty_opus-3.png`
Per-model deception rates across conditions. Dense; crop to a single panel or
skip.

### `o1card-apollo-section.png`
The system card's Apollo section in context. Establishing shot for the reveal.
