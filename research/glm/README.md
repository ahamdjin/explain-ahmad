# GLM factual grounding

Technical source material for the active film. These files are reference, not narration.

Read in this order when a factual claim is in question:

1. `GROUND_TRUTH.md` — consolidated architecture/model facts and scoped claims.
2. `TOKENIZER.md` — vocabulary/token/token-ID grounding for the running example.
3. `OFFLOADING_AND_LOCALITY.md` — memory/offloading/cache limits and what can/cannot be claimed.
4. `GLM_V7_ATTENTION_MOE_RESEARCH.md` — deeper architecture research and provenance.

Do not turn a convenient visual simplification into a factual claim. Keep scope qualifiers such as precision, checkpoint/storage vs runtime memory, routed experts vs shared expert, routing decisions vs expert visits, and prefill vs decode.

If a new source contradicts current research, update the research layer first, then propagate the smallest necessary correction to script/story/visuals. Locked narration must not be silently rewritten.
