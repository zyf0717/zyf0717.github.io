---
layout: post
title:  "Harnessed, Not Handcuffed: The Design Tension in Agentic AI"
date:   2026-XX-XX 00:00:00 +0800
categories: jekyll update
description: "TBD"
---

Across the past few posts it should be evident that harnesses, not simply Large Language Models (LLMs) alone, are also a necessary component in any agentic AI system.

And indeed, a rapidly growing ecosystem of public repositories supports this, most notably comprising skills, specs, agent toolkits, MCP servers, and other integration layers.

Yet, given limited context windows, it is equally clear that one cannot simply throw every possible context, skill or tool into an agentic system and expect optimal performance.

This is where the tension occurs: how do we equip LLMs with skills and tools that enable without over-constraining them from *actually* being agentic?

## Documentation from Model Creators

**TL;DR**: the official documentations does not support a maximalist reading of agent harnesses.

[Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) directly states that “good context engineering means finding the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome.” The same principle applies to prompts: “you should be striving for the minimal set of information that fully outlines your expected behavior,” while noting that “minimal does not necessarily mean short.”

This applies similarly to tools. Anthropic also warns that “one of the most common failure modes” is “bloated tool sets that cover too much functionality or lead to ambiguous decision points about which tool to use,” and concludes that builders should “keep your context informative, yet tight.”

[OpenAI](https://developers.openai.com/cookbook/examples/agents_sdk/session_memory) makes the same point operationally: “If too much is carried forward, the model risks distraction, inefficiency, or outright failure,” and even a large context window “can be overwhelmed by uncurated histories, redundant tool results, or noisy retrievals.”

The design principle is clear: more is not always better. A good hardness does not expose everything upfront, it exposes enough for the model to act.

## Interpretive Entropy

The heart of the matter is interpretive entropy. Not all additional context clarifies: high-signal content can reduce uncertainty; low-signal instructions increases chance of ambiguity or even conflict, which may ultimately lead to misapplication.

In other words, long(er) contexts are better only if they are informative; if they are not, they can be worse than no context at all.

The key is to understand the levels at which control is exercised:

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
- Correctness enforced by a tests and checks

It is worth noting that even though "system prompts" sits higher than "user prompts" in the instructions hierarchy, neither fully determines how robust the control is. They are ultimately still natural language interpreted by the model, and thus probabilistic.

### Tier 2: Inside-Prompt, Unavoidable Controls

### Tier 3: Inside-Prompt, Soft Guidance
