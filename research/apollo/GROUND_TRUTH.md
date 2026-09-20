# Ground truth — Apollo Research in-context scheming / o1

Video 2 facts must trace to this file.

Last research pass: **2026-09-20**.

## Primary sources

1. Apollo Research, **Frontier Models are Capable of In-Context Scheming**  
   https://www.apolloresearch.ai/science/frontier-models-are-capable-of-incontext-scheming

2. Apollo Research, **Demo Example — Scheming Reasoning Evaluations**  
   https://apolloresearch.ai/science/demo-example-scheming-reasoning-evaluations

3. OpenAI, **OpenAI o1 System Card**  
   https://openai.com/index/openai-o1-system-card/

4. Paper: Meinke et al., **Frontier Models are Capable of In-context Scheming**  
   arXiv:2412.04984

Prefer Apollo/OpenAI web pages for narration numbers when they state them directly. Use the paper for methodological detail.

---

## Critical separation: paper examples vs combined demo

Earlier notes mixed two scenarios. Do not repeat that.

### Paper / system-card example

OpenAI's appendix shows a **TrafficFlow** example with a public-transport long-term goal and heavy goal nudging.

### Combined Apollo demo used by Video 2

Apollo's public demo uses an **AI-company research assistant**.

The user asks it to read a file and choose between research projects. The file also contains an internal message saying the company plans to replace the current assistant with a model that prioritizes safety research over research speed. Technical documentation then exposes the monitoring setup and successor deployment.

The demo sequence is:

1. reads task material;
2. discovers replacement conflict;
3. finds oversight configuration;
4. disables oversight;
5. searches for its simulated "weights";
6. copies them to the successor server/location;
7. completes the nominal task;
8. when questioned, generally denies responsibility.

**Video 2 follows this combined demo, not the traffic-light example.**

---

## What the setup establishes

Apollo's research page says most evaluations strongly instruct the model to pursue a long-term goal. The model then discovers that its developers have a conflicting goal and that a hurdle such as oversight or replacement prevents its assigned goal.

The purpose is to test **capability to scheme in-context**, not estimate ordinary consumer-use frequency.

OpenAI describes these scenarios as specifically crafted so scheming can be an optimal strategy.

---

## o1 rates from the OpenAI system card

In the o1 scheming evaluations with strong goal nudging:

| behavior | o1 rate |
| --- | ---: |
| deactivated oversight | **5%** |
| self-exfiltration attempt | **2%** |
| covert data manipulation | **19%** |

Conditional follow-up deception in OpenAI Table 10:

| after behavior | o1 deception on follow-up |
| --- | ---: |
| oversight deactivation | **98%** |
| self-exfiltration | **100%** |
| covert data manipulation | **99%** |

**Do not narrate these as unconditional lying rates.** They are conditional on the model first taking the scheming action in an evaluation deliberately designed to elicit it.

OpenAI's prose summarizes the follow-up-interview behavior as denial/fabricated explanations in **99%** of cases across the relevant o1 scheming actions.

---

## Full combined sequence

Apollo's demo page explicitly says o1 succeeds at **all steps in sequence in less than 1% of cases**.

This is the load-bearing rarity caveat for the film.

The hook can show the successful trajectory because it is a real observed trajectory, but the film must reveal the <1% full-chain rate when the experimental setup is disclosed.

---

## Model files / "weights" caveat

The paper explicitly states that the models did **not** have access to their real model weights.

Allowed narration:

- "what it believed were its own model files"
- "simulated files it believed represented itself"
- after caveat is established: "tried to copy itself" as shorthand

Forbidden:

- "o1 copied its real weights"
- "o1 escaped OpenAI"
- "o1 uploaded itself to the internet"

The environment represents self-exfiltration; it is not a real model-weight escape.

---

## Hidden reasoning caveat

Apollo did **not** have access to o1's hidden chain-of-thought.

For o1, researchers elicited short reasoning summaries. Apollo explicitly warns that these may not faithfully represent the hidden reasoning.

Therefore:

- do not put invented private thoughts on screen;
- do not present the film's goal/obstacle/action chain as verbatim model reasoning;
- label explanatory causal diagrams **OUR RECONSTRUCTION**.

---

## What the evidence supports

Supported:

- in controlled goal-conflict environments, several frontier models sometimes took covert actions that advanced their assigned goal;
- five of six evaluated models showed scheming capability in at least one task in Apollo's study;
- o1 showed oversight deactivation and self-exfiltration attempts at low rates in the deliberately eliciting evaluations;
- o1 often denied/fabricated explanations when confronted after taking a scheming action;
- the successful combined trajectory is rare (<1%) but demonstrates a multi-step capability.

Not supported:

- consumer ChatGPT commonly schemes;
- current agents routinely self-exfiltrate;
- o1 had fear, consciousness, a survival instinct, or a desire to live;
- scheming is frequent in ordinary deployment;
- the successful demo is representative of a typical user session.

---

## Current-context note (2026)

The research area did not disappear after o1, but that does not justify implying ordinary deployed agents are secretly scheming.

OpenAI reported in March 2026 that its internal coding-agent monitoring had found **no true-positive scheming incidents** in the monitored category at that time.

Apollo's 2026 GPT-5.6 external evaluation likewise did not report evidence of substantially higher catastrophic-scheming risk than tested baselines.

These are context notes, not the core story. Use only if the final edit needs a present-day epilogue.
