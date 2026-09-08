# Video Script — Part 01: Opening

Status: narration draft only. Visuals are **not locked** yet.

## Narration

So, GLM-5.3-Flash has **320 billion parameters** and only 18 billion parameters are active.

which in simple words means that.

For any one token, only about **18 billion parameters are active**.

Which basically means the model owns 320 billion parameters... but only uses a small fraction of them to process that token.

Okay.

So why have the other 300 billion?

Well, this is a Mixture-of-Experts model. It has lots of different expert networks, and for each token, only a few of them are selected.

That makes sense.

**But then I had another question.**

If only a few experts are actually being used...

why does running the model still mean dealing with **hundreds of gigabytes of weights?**

Why can't I keep just the small part I need?

And it gets even stranger.

Because the model already has something called a **router** whose job is to decide which experts a token should go to.

So...

if the router already knows which experts it needs...

**why can't we just load those experts, use them, and leave everything else asleep?**

Could we turn a 320-billion-parameter model into something that fits comfortably on a much smaller machine?

And if not...

**what exactly is stopping us?**

To answer that, staring at the final architecture isn't going to help.

So lets see through what exactly is happening in there inside the model
