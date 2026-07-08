---
layout: post
title:  "Harnessed, Not Handcuffed: The Design Tension in Agentic AI"
date:   2026-07-08 22:00:00 +0800
categories: jekyll update
description: "Why good agent harnesses must balance structure, context, and control without suppressing model judgement."
---

Across the past few posts it should be evident that harnesses, not Large Language Models (LLMs) alone, are a necessary component in any agentic AI system.

And indeed, a rapidly growing ecosystem of public repositories supports this, most notably comprising skills, specs, agent toolkits, MCP servers, and other integration layers.

Yet, given limited context windows, it is equally clear that one cannot simply throw every possible context, skill or tool into an agentic system and expect optimal performance.

This is where the tension occurs. The question is not simply how much control an agentic system requires, but where that control should live.

## Documentation from Model Creators

Official documentation does not support a maximalist reading of agent harnesses.

[Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) directly states that “good context engineering means finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome.” The same principle applies to prompts: “you should be striving for the minimal set of information that fully outlines your expected behavior,” while noting that “minimal does not necessarily mean short.”

This applies similarly to tools. Anthropic also warns that “one of the most common failure modes” is “bloated tool sets that cover too much functionality or lead to ambiguous decision points about which tool to use,” and concludes that builders should “keep your context informative, yet tight.”

[OpenAI](https://developers.openai.com/cookbook/examples/agents_sdk/session_memory) makes the same point operationally: “If too much is carried forward, the model risks distraction, inefficiency, or outright failure,” and even a large context window “can be overwhelmed by uncurated histories, redundant tool results, or noisy retrievals.”

In other words, a good harness does not expose everything upfront; it exposes enough for the model to act decisively.

> **TL;DR**: More is not always better.

## Where Control Should Live

Not all additional context clarifies: high-signal content can reduce uncertainty, while low-signal or competing instructions can introduce ambiguity, conflict, and ultimately misapplication.

In other words, [long(er) contexts are not necessarily better](https://arxiv.org/abs/2510.05381); if they are not informative, they can be worse than no context at all.

This makes it vital to distinguish the levels at which control is exercised:

- Tier 1: outside-prompt, hard controls
- Tier 2: inside-prompt, unavoidable controls
- Tier 3: inside-prompt, soft guidance
- Everything else: suspicious by default

### Tier 1: Outside-Prompt, Hard Controls

A "hard control" here refers to a constraint that is enforced by the system and cannot be overridden by the LLM's probabilistic interpretation. Such controls include:

- File permissions enforced by the operating system
- Schema validity enforced by a validation engine
- Access control enforced by an API gateway
- Coding standards enforced by a linter
- Correctness enforced by tests and checks

It is worth noting that even though system prompts sit higher than user prompts in the instruction hierarchy, neither fully determines how robust the control is. They are ultimately still natural language interpreted by the model, and thus probabilistic.

### Tier 2: Inside-Prompt, Unavoidable Controls

Some constraints cannot be moved outside the prompt because the model must interpret them as part of performing the task.

Examples include:

- Required output formats, such as JSON
- Mandatory fields or sections to output
- Explicit task boundaries so models know where to stop
- Tool-use requirements that depend on semantic judgement, such as when to search, calculate, or invoke another skill

These controls should be treated as necessary overhead: precise, explicit, and as concise as possible, because the objective is to minimise the amount of interpretation required.

Where possible, their outputs should still be validated or enforced through subsequent layers of external hard controls described in Tier 1.

> **TL;DR**: interpret in-prompt only where necessary; enforce outside wherever possible.

### Tier 3: Inside-Prompt, Soft Guidance

Beyond unavoidable controls lies guidance intended to shape direction rather than explicitly define output.

Examples include:

- Preferred reasoning or problem-solving approaches
- Writing style, tone, or level of detail
- Heuristics for choosing between tools or strategies
- General workflow conventions
- Suggestions about what to prioritise or avoid

Such guidance *can* be extremely useful, but unlike Tier 2 controls, the burden of proof is on the designer or operator to justify their inclusion.

Beyond some critical mass, instructions may begin to compete with one another, reducing the model's ability to follow all of them effectively.

Not to mention, context is scarce.

## Preserving Implicit Judgment

Tier 3 carries another cost beyond context and instruction competition: excessive guidance may displace the very judgement the model is meant to contribute.

As discussed previously in [Judgement in the Era of Agentic AI]({% post_url 2026-07-02-judgement-agentic-ai %}), one potentially valuable property of LLMs is their ability to approximate forms of tacit judgement that cannot be reduced into explicit rules.

They can recognize fit, mismatch, plausibility, local coherence, and other patterns without being given an explicit procedure to do so.

Excessive explicit instruction may suppress this capacity, reducing an agent capable of flexible tacit judgement into one primarily occupied with following procedure.

Though to be fair, this may sometimes be the desired outcome.

## Conclusion: The Design Tension

Which brings us back to the design problem: not all forms of control belong in the prompt.

Where a constraint can be enforced deterministically outside the prompt, it generally should be. Where interpretation is unavoidable, the instruction should be precise and minimal. Where guidance is merely intended to shape behaviour, its inclusion should carry a burden of proof.

This does not eliminate the design tension, since an agent still requires sufficient context, tools, and direction to act effectively.

Treating every desired behaviour as another prompt instruction is itself a design choice—but often a sloppy substitute for architecture.

A good harness therefore constrains what must be constrained, exposes what must be exposed, and minimises everything else to leave space for judgement.

Harnessed, not handcuffed.
