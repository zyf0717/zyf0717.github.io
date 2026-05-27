---
layout: post
title:  "The Marginal Economics of Agentic AI"
date:   2026-05-29 12:00:00 +0800
categories: jekyll update
---

Following Parts 1 and 2, the question is no longer whether agentic AI will occupy significant roles in organisations, but what those roles should be, how they should be bounded, and where human judgment should remain in the loop.

This Part 3 approaches the problem from an economic stance: that optimal AI workflow is neither maximum autonomy nor no autonomy, but human-governed token *allocation*.

>**TL;DR**: Agentic AI is economically useful only when autonomy is bounded; otherwise ambiguity turns into open-ended token spend.

## From LLM to Agentic AI

LLMs are, by definition, large language *models*.

In other words: they cannot actually execute external actions, at least not by themselves.

In order to make LLMs more useful, we provide them the surrounding *harness*, which includes:

- **tools** that allow read/write;
- **memory** and **retrieval** systems that handle context;
- **state** and **workflow** tracking that allows multi-step processes and loops;
- **permissions** and **policy** that define action boundaries; and
- **instructions** that *hopefully* specify what the objective is.

The LLM supplies the reasoning and control signals, and the harness links the model to the execution environment.

And thus we have what is now known as “agentic AI”: systems capable of executing seemingly complex, multi-turn operations.

Many describe this as “autonomous” because the underlying engineering pattern is new to them, when in fact developers have been building (and using) various types of execution harnesses for *decades*.

The novelty is that an LLM can now sit inside a suitably configured loop as a flexible language-based controller, capable of flexibly controlling or reconfiguring workflows at runtime—in particular those with chain-of-thought (CoT) capabilities.

But this flexibility comes with an scaling problem: the more the system is allowed to decide for itself, the more tokens it may spend resolving ambiguity.

## Ambiguity Expands the Search Space

At the centre of it all is *tokens—*the practical accounting unit for everything fed into and generated (including CoT) by LLMs.

It therefore stands to reason that the more complex and long-running a workflow is, the more tokens are consumed; but the true culprit is something that token-use scales non-linearly with: *ambiguity*.

Increasingly complex tasks will trigger more tool calls, context retrieval, intermediate reasoning steps, and validation loops.

But an *unclear* task can cause the system could end up exploring wrong branches entirely:

- if the goal is unclear, tokens are spent inferring intent;
- if the success criteria are undefined, the system explores multiple possible outputs;
- if the operating boundary is not specified, unnecessary tools are used, excessive context retrieved, or wrong assumptions made; and
- if the user does not define what “good enough” means, the task may continue refining long after sufficiency.

And it could still get the output wrong.

In human terms, this looks like “the AI agent is thinking and working harder”; in economic terms, it means spending more.

## MC = MR

This is where the economics becomes unavoidable: if each additional reasoning step or tool call has a cost, then the central question is not whether the AI *can* continue working, but whether it *should*.

Fundamentally, economics teaches that an activity should be expanded only up to the point where **marginal cost equals marginal return**.

Following this logic, tokens should be spent only up to the point where the expected marginal return from additional reasoning, tool-use, retrieval, or validation no longer justifies the marginal cost.

Because the goal is not to maximise AI activity, but to allocate tokens rationally. In other words: **how much additional AI work is worth paying for?**

## Autonomy as Spend

The implication is that the optimal AI workflow is not maximum autonomy, especially in a problem space that can branch indefinitely.

It appears that [autonomy is not just overrated]({% post_url 2026-05-22-autonomy-is-overrated %}), it is also not free.

This is why vague instructions are so expensive. While it might sound like a good idea to leave the system “free” to solve the problem, it actually forces the system to spend tokens deciding which version of the problem to solve.

A bounded task, on the other hand, reduces degrees of freedom. The corresponding reduced exploration required makes token expenditure more economically rational. As an added bonus, this also correspondingly decreases time-to-output—token processing and generation is not instantaneous after all.

## Token Allocation as Governance
