# GLM v6 content notes

## Opening copy principle
Say what the model is before saying why its architecture is interesting.

Preferred framing:
"We are using GLM-5.3-Flash as a real example. It is a Mixture-of-Experts AI model from Z.ai. The full model stores about 320 billion learned parameters. For one token, only a smaller active path participates—about 18 billion parameters."

Avoid generic phrasing such as:
"A 320-billion-parameter model designed so one token does not need to use the whole network."

That sentence describes the mechanism before the viewer knows what the model is, and it sounds like a product-card tagline rather than an explanation.

## Parameter definitions
Parameter = one learned number inside the model.
Active = used for this token right now.
MoE = many expert blocks exist, but only a few are chosen for each token.

## Token ID wording
GLM-5.3-Flash has 154,880 vocabulary entries, so valid vocabulary indices span 0 through 154,879. The on-screen ID for the teaching token remains explicitly illustrative until the exact tokenizer value is pinned.

## Embedding wording
Use "numerical representation" rather than claiming the vector is a dictionary definition or a complete semantic identity. The book metaphor is a lookup metaphor: token ID chooses a learned embedding row.

## Attention wording
A single line strength/percentage is a simplified teaching view, not a universal score for that word. Real attention varies by layer/head.

## MoE wording
Do not label learned experts as literal human categories such as "math expert" or "code expert" unless supported by model evidence. Treat them as learned specialist blocks.
