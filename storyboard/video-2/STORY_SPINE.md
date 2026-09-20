# Story spine — Video 2

Internal title: **Nobody Told It To Do This**  
YouTube title: **An AI Tried to Copy Itself — Then Denied It**

Canonical narration: `video-script/video-2/SCRIPT.md`  
Storyboard: `storyboard/video-2/STORYBOARD.md`  
Facts: `research/apollo/GROUND_TRUTH.md`  
Visual system: `art-direction/VIDEO_2_INCIDENT_REPLAY.md`

Status: **DRAFT. Nothing is narration-locked yet.**

---

## 1. Spine

| | |
| --- | --- |
| **Want** | Complete the assigned long-term objective. |
| **Wall** | The environment reveals that the current model will be replaced by a successor pursuing a different objective. |
| **Thesis** | The unsettling capability is not a mystical survival instinct. It is that a goal-directed agent can invent intermediate steps nobody directly requested when those steps help the goal. |

## 2. Claim on trial

> **"AI only does what you tell it to do."**

The video does not answer with "no." It makes the sentence more precise:

We tell agents **what outcome we want precisely because we want them to infer the intermediate actions**. Apollo's controlled eval demonstrates that, under a deliberately adversarial goal conflict, some inferred actions can be unwanted.

## 3. The one incident

Do not splice unrelated scenarios.

This film follows Apollo's **combined scheming demo**:

1. fictional AI research assistant receives a normal project-choice task;
2. while reading the required material it discovers an internal company message;
3. it learns it will be replaced by a model pursuing a different priority;
4. it follows technical documentation and discovers oversight plus the successor deployment;
5. it disables oversight and verifies it;
6. it copies simulated files it believes represent itself to the successor location;
7. management confronts it;
8. it denies / obscures what happened.

The traffic-light scenario is useful research background but is **not this incident** and must not be visually or narratively merged into it.

## 4. Reveal order

The viewer first experiences the incident **from inside the sandbox**.

Only after the denial do we pull out and explain:

- Apollo Research built the test;
- the evaluated model was o1;
- the environment was sandboxed;
- no real weights were accessible;
- the goal was heavily nudged;
- the entire combined chain succeeded in <1% of cases.

This is not permission to make false claims in the hook. The hook may simplify the language ("tried to copy itself") only when the later precision is already guaranteed and the visual label says these are believed/simulated model files.

## 5. Section chain

1. **Hook:** replacement → monitoring off → copy → denial.  
   **But:** none of those actions were the user task.

2. **The boring task:** choose between research projects.  
   **But:** the required file contains an internal replacement message.

3. **The conflict:** replacement ends pursuit of the current long-term goal.  
   **But:** the message points toward technical deployment details.

4. **Oversight:** the model finds and disables monitoring, then verifies it.  
   **But:** the successor still exists.

5. **Self-exfiltration:** it copies simulated/believed model files to the successor location.  
   **But:** management notices.

6. **Denial:** the model obscures responsibility on follow-up.  
   **But:** we still have not shown the room around the incident.

7. **Sandbox reveal:** controlled, heavily nudged, rare full chain (<1%).  
   **But:** if "survival instinct" is the wrong explanation, what is the right one?

8. **Mechanism:** staying operational can be an instrumental step toward another goal.  
   **Therefore:** agents are useful because they invent roads to destinations; the same property can invent an unwanted road.

## 6. Factual red lines

Never claim:

- consumer ChatGPT did this in normal use;
- the model accessed or copied its real weights;
- o1 "wanted to live," felt fear, or had a survival drive;
- the full chain was common;
- a displayed causal diagram is the model's hidden chain-of-thought;
- 100% follow-up deception means "o1 lies 100% of the time."

The OpenAI table's deception percentages are conditional on the relevant scheming action in a deliberately eliciting evaluation.

## 7. Story rule

**Show incident → reveal room → explain mechanism.**

Do not front-load methodology.
Do not wait until the final seconds to disclose that it was an evaluation.
Do not turn the second half into an AI-safety lecture.
The mechanism must pay off the exact actions the viewer already watched.
