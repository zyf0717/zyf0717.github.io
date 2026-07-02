---
layout: post
title:  "Judgement in the Era of Agentic AI"
date:   2026-XX-XX 00:00:00 +0800
categories: jekyll update
---

Judgement, and ultimately decision-making, has been a recurring theme across the previous three posts:

- [Day-1 vs. Day-2 in the Era of Agentic AI]({% post_url 2026-05-07-day1-vs-day2-agentic-ai %})
- [Autonomy is Overrated: Human Staffing vs. Agentic AI]({% post_url 2026-05-22-autonomy-is-overrated %})
- [The Marginal Economics of Agentic AI]({% post_url 2026-06-09-marginal-economics-agentic-ai %})

Yet, because neither term was explicitly defined, it might not be apparent what either means in the context of agentic AI—especially when some agentic AI loops *appear* capable of making decisions autonomously.

This post examines what judgement still means in the current era.

## Frame Versus Procedure

Herbert Simon proposed that decisions can be arranged along a continuum, with programmed decisions on one end and non-programmed decisions on the other.

Programmed decisions are those that are routine, repetitive, structured or well-defined, relies on standard operating procedures (SOPs), have clear lines of responsibility, and are therefore usually delegatable.

Non-programmed decisions, on the other hand, are novel, unstructured, and usually consequantial or impactful. They cannot be resolved simply by applying an existing procedure.

In other words, the former operate within an accepted frame, and are therefore procedural; the latter requires setting, revising, or choosing the frame itself, and it is where real judgement is required.

The problem is that the distinction is often unclear: what is mistaken as *real* judgement is often just *procedural decision-making* under mild ambiguity.

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

So much so that this entire process can easily be executed by current agentic AI loops, with minimal prompting and supervision, and still result in an extremely high success rate.

It is not that the process is trivial or even deterministic, it is that the solution space is saturated, and therefore LLMs are increasingly better trained to handle such cases.

And this is why it may appear confusing to observers. Agentic AI appear to be autonomously making judgement calls, but in reality they are just selecting among routine procedures within a pre-defined frame—programmed decision-making under mild ambiguity.

## Moving from Procedural to Real Judgement

At the same time, using the same example, consider the following questions:

- Should the data be cleaned at all?
- If so, what is the purpose of cleaning it?
- What are the downstream implications and usage?
- Is this a one-off cleanup, or will this process be repeated?
- If repeated, should the process be automated, and if so, how?
- Is the real problem the messy spreadsheet, or the upstream process that produced it?

It is immediately apparent that these *questions* are either frame-setting or frame-challenging, and therefore require real judgement.

The key is *not* having the right answer. It is recognizing that these questions need to be asked at all.

Because the answers may eventually become procedural, codified, or automated, but formulating the questions themselves cannot.

## The Hidden Scarcity

![Figure 12 showing new apps and aggregate usage across iOS, Android, and Chrome app stores](/assets/images/new-apps-and-usage-across-app-stores.png)

> **Source:** Figure 12, “New Apps and Their Usage Across App Stores,” in Mert Demirer, Leon Musolff, and Liyuan Yang, “[Writing Code vs. Shipping Code: Productivity Effects Across Generations of AI Coding Tools](https://www.nber.org/system/files/working_papers/w35275/w35275.pdf),” NBER Working Paper No. 35275, 2026.

The figure illustrates the distinction between producing software and producing value: new app creation rises sharply, especially for iOS and Chrome, but downstream usage signals such as ratings and downloads do not show a proportional increase.

The implication is clear: the scarcity of software production has been alleviated.

And in turn, this reveals what was previously obscured by the difficulty of production itself: the scarcity of judgement over what should be built and shipped in the first place.
