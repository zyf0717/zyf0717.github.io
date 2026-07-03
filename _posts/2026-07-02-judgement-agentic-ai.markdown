---
layout: post
title:  "Judgement in the Era of Agentic AI"
date:   2026-07-02 12:00:00 +0800
categories: jekyll update
description: "A systems-engineering view of judgement in agentic AI: where procedural decision-making ends, where framing decisions begin, and why AI shifts that frontier."
image: /assets/images/new-apps-and-usage-across-app-stores.png
---

Judgement, and ultimately decision-making, has been a recurring theme across the previous three posts:

- [Day-1 vs. Day-2 in the Era of Agentic AI]({% post_url 2026-05-07-day1-vs-day2-agentic-ai %})
- [Autonomy is Overrated: Human Staffing vs. Agentic AI]({% post_url 2026-05-22-autonomy-is-overrated %})
- [The Marginal Economics of Agentic AI]({% post_url 2026-06-09-marginal-economics-agentic-ai %})

Yet, because neither term was explicitly defined, it might not be apparent what they mean in the context of agentic AI—especially when some agentic AI loops *appear* capable of making decisions autonomously.

This post examines what judgement still means in the current era of agentic AI.

## Frame Versus Procedure

Herbert Simon proposed that decisions can be arranged along a continuum, with programmed decisions on one end and non-programmed decisions on the other.

Programmed decisions are those that are routine, repetitive, structured or well-defined, rely on standard operating procedures (SOPs), have clear lines of responsibility, and are therefore usually delegatable.

Non-programmed decisions, on the other hand, are novel, unstructured, and usually consequential or impactful. They cannot be resolved simply by applying an existing procedure.

In other words, the former operate within an accepted frame, and are therefore procedural; the latter require setting, revising, or choosing the frame itself, and it is where *real* judgement is required.

The problem is that the distinction is often unclear: what is colloquially referred to as "judgement" is often just *procedural* decision-making under mild ambiguity.

## Agentic AI: Masters of Procedural Decision-Making

Consider the simple example: cleanup of messy spreadsheets into structured CSVs. During this process:

- Various coercions are applied to columns
- Multi-row headers are merged
- Merged cells are split and filled
- Missing values are standardized
- Duplicate rows are detected and handled
- Empty columns and empty rows are dropped
- Potentially reshaping from wide to long or vice versa
- Etc.

Every explicit step above *appears* to require some form of judgement. At the same time, every listed step has known solutions—extremely well-known solutions, in fact.

So much so that for this class of spreadsheet-cleaning work, current agentic AI loops have already crossed the practical threshold. In repeated use, they can execute the entire process with minimal prompting and supervision, producing better results faster than a human analyst could.

It is not that the process is trivial or even deterministic, it is that the solution space is saturated, and therefore LLMs are increasingly better trained to handle such cases with appropriate tools.

And this is why it may appear confusing to observers. Agentic AI appear to be autonomously making judgement calls, but in reality they are just selecting among routine procedures within a pre-defined frame—programmed decision-making under mild ambiguity.

## Moving from Procedural to Real Judgement

At the same time, using the same example, consider the following questions:

- Should the data be cleaned at all?
- If so, what is the purpose of cleaning it?
- What are the downstream implications and usage?
- Is this a one-off cleanup, or will this process be repeated?
- If repeated, should the process be automated, and if so, how?
- Is the real problem the messy spreadsheet, or the upstream process that produced it?

It is immediately apparent that these questions are either frame-setting or frame-challenging, and therefore mark where real judgement begins.

In Argyris and Schön’s terms, asking such questions essentially turns the situation from single-loop to [double-loop](https://en.wikipedia.org/wiki/Double-loop_learning).

And the key is *not* having the right answer. It is recognizing that *appropriate* questions need to be asked at all.

Because the answers may eventually become procedural, codified, or automated, but discretionary framing decisions will likely not.

This same local situation also scales, from one messy spreadsheet to the software economy as a whole.

## The Revealed Scarcity

![Figure 12 showing new apps and aggregate usage across iOS, Android, and Chrome app stores](/assets/images/new-apps-and-usage-across-app-stores.png)

> **Source:** Figure 12, “New Apps and Their Usage Across App Stores,” from Mert Demirer, Leon Musolff, and Liyuan Yang, “[Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools](https://www.nber.org/system/files/working_papers/w35275/w35275.pdf),” NBER Working Paper No. 35275, May 2026.

The figure illustrates the distinction between producing software and producing value: new app creation rises sharply, especially for iOS and Chrome, but downstream usage signals such as ratings and downloads do not show a proportional increase.

The implication is clear: the scarcity of software production has been significantly alleviated.

In turn, this reveals what the friction of production had previously obscured: the scarcity of judgement over what should be built, shipped, trusted, and maintained.

There is, however, a risk of drawing the boundary too neatly. If the argument stopped here, it would suggest that agentic AI is merely procedural. Reality is much more nuanced and complex than the binary procedural-versus-judgemental after all.

## Modeling Tacit Judgement

Michael Polanyi’s observation in [*The Tacit Dimension*](https://press.uchicago.edu/ucp/books/book/chicago/T/bo6035368.html) that “we can know more than we can tell” captures the difficulty of turning [tacit knowledge](https://en.wikipedia.org/wiki/Tacit_knowledge) and judgement into procedure.

This used to mark a boundary for automation.

Now LLMs blur and push this boundary.

As Cheng argues in "[Why the Valuable Capabilities of LLMs Are Precisely the Unexplainable Ones](https://arxiv.org/abs/2603.15238)," the truly valuable capabilities of LLMs reside precisely in the part that cannot be fully captured by human-readable discrete rules—because if they could be fully reduced to rules, they would merely reproduce the expert-system paradigm that LLMs have already surpassed.

Real-world usage and observation suggest that agentic AI does not only execute explicit procedures, the underlying LLMs can also approximate some kind of tacit judgement: they infer what fits from high-dimensional learned patterns, including semantic, procedural, stylistic, and logical regularities absorbed from massive prior examples.

It would thus be a mistake to say that LLMs cannot at least simulate judgement-based decisions. They clearly appear to do so, even if only in a limited sense of recognizing fit, mismatch, plausibility, and local coherence—even when no explicit SOP is provided.

This is why agentic AI can be useful far beyond executing simple checklists. It is particularly capable at drafting plans, critiquing assumptions, repairing code, and surfacing potential failure modes.

The capacity to operationalise latent patterns also means that agentic AI is continuously redefining the scope of judgement.

## Conclusion: Judgement as a Moving Frontier

Some of what is commonly considered judgement is merely procedural decision-making, and agentic AI is already excellent at this.

Some judgement flows from tacit knowledge, and LLMs are increasingly able to approximate parts of this as well.

Each time a layer of judgement becomes repeatable, testable, or modelled, it moves closer to procedure. The frontier then shifts upward again, toward whatever remains unstable, underspecified, or not yet pattern-saturated.

Obviously, agentic AI is not a simple drop-in replacement for judgement. It does, however, continuously redraw the boundary between judgement and procedure.

In this era of agentic AI, judgement is not disappearing—it is simply becoming easier to see what was never judgement in the first place.

And when a system improves because someone made the hard calls, the remaining question is not whether judgement mattered.

It is who gets to own it.
