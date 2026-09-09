# Vocabulary ledger

What the viewer owns after each section, and what is **forbidden until then**.

Without this, every section either re-teaches something or assumes something,
and both read as carelessness. The original Section 01 script said "token"
three times — a word that belongs to Section 3 — and separately re-explained
"active" because nothing tracked that it had already landed.

## Rules

1. **A term may not be used before the section that introduces it.**
2. **A term introduced once is never re-explained.** Reuse it plainly.
3. **Function before name.** Show the thing working, then name it. The router is
   an unlabelled front desk for ten beats before it is called a router.
4. When a needed idea belongs to a later section, use the **plain-English
   stand-in** below rather than borrowing the term early.

## Ledger

| § | Introduces | Viewer then owns | Forbidden until later |
| --- | --- | --- | --- |
| 1 | `parameter`, `expert`, `router`, `active` | a model has parameters; they are grouped into experts; a router picks a few per word; "active" = actually used for one word | `token`, `embedding`, `layer`, `attention`, `VRAM`, `quantization`, `bandwidth` |
| 2 | `forward pass` (as "one trip through") | we can follow one word through the machine | `token`, `embedding`, `attention` |
| 3 | `token`, `representation` (as "the numbers") | a word becomes numbers, and the numbers are what the machine works on | `embedding` as a noun, `attention`, `layer` |
| 4 | `attention`, `context` | the numbers change because the word gathers context from its neighbours | `layer` as a count |
| 5 | `top-8`, `shared expert` | the same word with different numbers picks a different team | `bandwidth`, `VRAM` |
| 6 | `layer`, `sparse` / `dense` | 42 sparse layers, eight experts each — 336 visits per word | `bandwidth` |
| 7 | `memory` vs `storage`, `bandwidth` | fetching costs more than the work it does | `quantization` (arrives here, as the wall's reinforcement) |
| 8 | — | sparse routing buys compute, not memory | — |

## Stand-ins for terms not yet earned

| Real term | Stand-in before its section |
| --- | --- |
| token | **a word** |
| embedding / representation | **its numbers** |
| forward pass | **one trip through** |
| layer | **a floor** |
| VRAM / RAM | **fast memory**, or **where it has to be to work** |
| bandwidth | **how fast you can fetch it** |
| quantization | **squeezing the numbers smaller** |

## Section 01 specifically

Says **word**, never token. Says **parameters**, and defines them once as
"everything it has ever learned". Names the router at the moment the script
names it, and not before — the desk is on screen unlabelled from the beat the
first word arrives.
