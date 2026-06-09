---
layout: post
title:  "The Marginal Economics of Agentic AI"
date:   2026-06-09 12:30:00 +0800
categories: jekyll update
---

Following Parts [1]({% post_url 2026-05-07-day1-vs-day2-agentic-ai %}) and [2]({% post_url 2026-05-22-autonomy-is-overrated %}), it is clear that the question is no longer whether agentic AI will occupy significant roles in organisations, but what those roles should be, how they should be bounded, and where human judgment should remain in the loop.

This Part 3 approaches the problem from an economic stance: optimal agentic AI workflow is neither maximum autonomy nor no autonomy, but governed token *allocation*.

>**TL;DR**: Agentic AI is economically useful only when autonomy is bounded; otherwise ambiguity turns into open-ended token spend.

## From LLM to Agentic AI

LLMs are, by definition, large language *models*. In other words: they cannot actually execute external actions on their own.

In order to make LLMs more useful, we provide them the surrounding *harness*, which includes:

- **tools** that allow read/write;
- **memory** and **retrieval** systems that handle context;
- **state** and **workflow** tracking that allows multi-step processes and loops;
- **permissions** and **policy** that define action boundaries; and
- **instructions** that *hopefully* specify what the objective is.

The LLM supplies the reasoning and control, and the harness links the model to the execution environment.

And thus we have what is now known as “agentic AI”: systems capable of executing seemingly complex, multi-turn operations.

Many describe this as “autonomous” because the underlying engineering pattern is new to them, when in fact developers have been building (and using) various types of execution harnesses for *decades*. The novelty is that an LLM can now sit inside a suitably configured loop as a language-based controller, adapting workflows at runtime.

But this flexibility comes with a scaling problem: the more the system is allowed to decide for itself, the more tokens it may spend resolving ambiguity.

## Ambiguity Expands the Search Space

At the centre of it all are *tokens*—the practical accounting unit for everything fed into and generated (including CoT) by LLMs.

It therefore stands to reason that the more complex and long-running a workflow is, the more tokens are consumed; but the true culprit is something that token-use scales non-linearly with: *ambiguity*.

Increasingly complex tasks will trigger more tool calls, context retrieval, intermediate reasoning steps, and validation loops. An unclear task does not merely consume more tokens; it can send the system down the wrong branch entirely, especially when the goal, success criteria, operating boundary, or definition of “good enough” is left undefined.

This is the equivalent of a client telling a consultant to “look into it” without any concrete requirements. The consultant may work harder, run more analyses, and produce a longer report. But as we know all too well, the output may still be unsatisfactory.

## Autonomy as Spend

This is where the economics becomes unavoidable: if each additional reasoning step or tool call has a cost, then the central question is not whether the AI *can* continue working, but whether it *should*.

Economically, tokens should be spent only up to the point where the expected marginal return from additional reasoning, tool-use, retrieval, or validation no longer justifies the marginal cost.

The implication is that the optimal AI workflow is not maximum autonomy, especially in a problem space that can branch indefinitely.

After all, it appears that [autonomy is not just overrated]({% post_url 2026-05-22-autonomy-is-overrated %}), it is also not free.

A bounded task reduces degrees of freedom: it gives the system less to infer, fewer branches to explore, and a clearer point at which to stop. On top of that, this also decreases time-to-output—token processing and generation is not instantaneous after all.

## Context Debt and Stop-Losses

The cost of failed exploration is not limited to tokens already spent. In a multi-turn agentic workflow, failed branches often leave behind accumulated context, and even when these are no longer useful, they may still remain inside the working context.

This existing context is then processed alongside new inputs, and the implication is that the agent is no longer reasoning only about the original already-underspecified task; it is also reasoning through the residue of prior attempts.

This is a form of context contamination—or, in economic terms, context debt: past ambiguity becoming future marginal cost.

Context debt is therefore not mainly a problem of context length, but context quality: failed exploration pollutes the working set, while later compaction may preserve the wrong abstractions and discard the missing evidence.

This is where stop-losses matter.

Currently, almost all agentic systems already have operational limits, such as max iterations, retry caps, guardrails, and timeouts. But these are technical limits rather than economic ones.

Economically, there should also be explicit points where the system stops, compresses context, narrows scope, escalates decisions to a human, switches to a cheaper path, or even declares that the task is no longer economically rational.

This reframes stopping as a feature rather than a failure.

## Token Allocation as Governance

This also brings the argument back to governance.

AI governance is often framed in terms of safety, permissions, compliance, or human approval. But in an agentic world, governance must also include the management of a metered resource: tokens.

This is why [the staffing analogy]({% post_url 2026-05-22-autonomy-is-overrated %}#:~:text=Already%20Solved%3A%20Human,boundary%20for%20autonomy.) matters. In human organisations, autonomy is rarely unlimited. It is bounded by job scope, decision rights, budget, review, accountability, and escalation paths. The same logic should apply to agentic AI.

A properly governed agentic workflow should therefore specify what the agent can decide, the tools it can use, how much context it can retrieve, how many retries are acceptable, when “good enough” has been achieved, when a cheaper model is sufficient, and when escalation is required.

In the same vein, model routing is not merely an optimisation technique—simple tasks should not be routed to expensive reasoning models by default; ambiguous tasks should not expand indefinitely; failed tasks should not accumulate context debt without limit. These are governance decisions, not merely engineering optimisations.

This is also why raw token-spend leaderboards are meaningless *per se*. High token-use is not necessarily productivity—it could just be the equivalent of staying late to look busy.

That is the marginal economics of agentic AI: not asking how much work the system can do, but how much work is worth authorising.
