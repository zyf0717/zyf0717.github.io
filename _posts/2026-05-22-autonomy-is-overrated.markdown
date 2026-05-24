---
layout: post
title:  "Autonomy is Overrated: Human Staffing vs. Agentic AI"
date:   2026-05-22 12:30:00 +0800
categories: jekyll update
---

Amid the current [hype around agentic AI](https://www.gartner.com/en/articles/hype-cycle-for-agentic-ai) and growing expectations that AI will [reshape, reduce, or displace parts of the workforce](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/), there have already been numerous, and sometimes spectacular, failures:

- [Claude-powered AI agent’s confession after deleting a firm’s entire database](https://www.theguardian.com/technology/2026/apr/29/claude-ai-deletes-firm-database)
- [Air Canada ordered to pay customer who was misled by airline’s chatbot](https://www.theguardian.com/world/2024/feb/16/air-canada-chatbot-lawsuit)
- [Company apologizes after AI support agent invents policy that causes user uproar](https://arstechnica.com/ai/2025/04/cursor-ai-support-bot-invents-fake-policy-and-triggers-user-uproar/)
- [US eating disorder helpline takes down AI chatbot over harmful advice](https://www.theguardian.com/technology/2023/may/31/eating-disorder-hotline-union-ai-chatbot-harm)

The common thread is not simply that AI systems made mistakes; humans make mistakes too.

The deeper issue is that these failures were actually due to a *lack* of appropriate limitations, safeguards, and oversight. In a mature human or human-in-the-loop model, these failures would likely have been constrained by job scopes, access controls, review processes, and accountability.

**The failure was not autonomy itself, but unbounded or poorly scoped autonomy.**

Following my previous post on [Day-1 vs. Day-2 in the Era of Agentic AI]({% post_url 2026-05-07-day1-vs-day2-agentic-ai %}), this post explores autonomy in the context of human staffing and agentic AI.

> **TL;DR**: Autonomy is overrated in most cases, human or AI.

## More Autonomy Means a Larger Decision Space

Humans implicitly suffer from [bounded rationality](https://en.wikipedia.org/wiki/Bounded_rationality) and therefore [choice overload](https://en.wikipedia.org/wiki/Overchoice): an overabundance of options can lead to decision fatigue, analysis paralysis, and post-decision regret.

A parallel dynamic applies to agentic AI, as more autonomy means a larger decision space: more tools, more paths, more states to manage, and more opportunities to act on incomplete or incorrect assumptions.

Because autonomy is not just permission to act—it is also permission to *choose*. Choosing well requires context, constraints, and feedback; without these, failure compounds.

A major problem with unbounded autonomy is therefore not just safety, but also performance degradation.

## Already Solved: Human Staffing

"Staffing" in the human sense is not new: the concept of hiring people to delegate work to has been around for millennia. And along with hiring comes job scope and description, roles and responsibilities, performance expectations, accountability, and oversight.

After all, staffing is not just about filling a seat; it is about defining the boundaries of work and responsibility.

Roles also differ in the degree of autonomy they require: the more complex, strategic, or decision-heavy the work, the more discretion the role must be allowed.

In other words, there is no one-size-fits-all approach to staffing, precisely because there is no universal boundary for autonomy.

## Unclear Territory: Agentic AI

Deploying an AI agent in an organization is, structurally, not unlike hiring humans: the introduction of a new actor into workflows with specific scope, responsibilities, and also potential for error.

And it follows that the same questions around authority, accountability, and oversight should apply: what is this agent permitted to do, who is accountable when it fails, and who is ultimately responsible for its actions and consequences?

In this case, however, what is missing is the battle-tested framework that guides human staffing—and the corresponding autonomy boundaries. After all, equivalence does not mean identity.

## Translating Staffing Guardrails

The parallel is obviously not one-to-one, but many of the following are immediately recognizable:

| Human staffing | Agentic AI equivalent |
|---|---|
| Job scope | Tool permissions / task schema |
| Decision rights | Write permissions / blast-radius limits |
| Manager | Orchestrator / planner / accountable owner |
| SOPs | Prompt + workflow definition |
| Review process | Human approval / automated eval |
| Performance review | Logging / benchmarks / regression tests |
| Budget | Token / compute / API cost limits |
| Compliance | Policy layer / sandbox / audit trail |
| Institutional memory | RAG / context graph / long-term memory |
| Escalation path | Interrupt / fallback / human handoff |

The key is that these are not merely defensive or control structures—they are also enablers. Clear boundaries, expectations, and escalation paths allow both humans and AI agents to perform with greater confidence *within* assigned roles.

## Autonomy Is Overrated; Architecture Is Not

In this current period of "[Peak of Inflated Expectations](https://www.gartner.com/en/articles/hype-cycle-for-agentic-ai#:~:text=Agentic%20AI%20reaches,across%20supporting%20capabilities.)", the appeal of agentic AI autonomy is often overstated. Organizations (and many individuals) want to believe that complex work can be delegated to free-roaming AI agents with minimal oversight, with as few keystrokes as possible.

But, as argued above, autonomy is not the same as effectiveness. In practice, most roles—human or AI—perform best when authority is bounded, not unlimited.

The path forward is therefore not to build ever more autonomous agents, but to design agentic system architectures: *bounded* environments where agents operate in.

Ultimately the goal is not to maximize autonomy, but to scope it to each role’s context, decision rights, and consequences of failure.

**Because the problem is not autonomy, but autonomy without staffing logic.**
