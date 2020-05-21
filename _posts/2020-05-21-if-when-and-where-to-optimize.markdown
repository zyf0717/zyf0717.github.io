---
layout: post
title:  "If, when, and where to optimize"
date:   2020-05-21 18:50:00 +0800
categories: jekyll update
---

Last night I was asked the following question on [Exercism](https://exercism.io/): 

*"I was thinking of writing more efficiently so how do I know which statements/expressions to use for lower memory and faster execution?"*

To which part of my reply was: 

*"In general, only optimize if, when, and where necessary. For example, small efficiency gains in a huge loop or nested loops can usually brings runtime down significantly, whereas optimizing code that (i) already runs quickly, and (ii) runs only once usually do not matter as much in the grand scheme of things."*

I am no expert at optimizations, and the above (along with the rest of this post) is simply my take on the subject based on personal experience.

## 1. 'If'

*Is my script taking forever to run when it should not? Is this piece of code meant to be reused, or is this once-off? Is the bottleneck something I can optimize, or is this completely beyond my control?*

To determine if there is a need to optimize, the above are some basic questions come to mind. 

Nobody cares if you are using `string.format()` or [f-strings](https://www.python.org/dev/peps/pep-0498/#raw-f-strings) to print out the final result at the end of your script.

## 2. 'When'

*“The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.” ~ Donald Knuth, The Art of Computer Programming* 

Despite the fact that the quote above was written in the 1960s, it is no less relevant right now in 2020. In most cases, optimizations should only take place when scaling occurs (which is what exacerbates inefficient code in the first place), and this usually comes after the prototyping phase. Premature optimizations lead to wasted efforts, especially if the project does not move beyond the prototype phase.

However, if slow-running scripts are getting in the way of even producing a prototype, then there is clearly a need to fix that problem. 

## 3. 'Where'

Definitely prioritize the bottlenecks. Massive, nested loops and the use of unsuitable data structures are common sources of bottlenecks. Optimize algorithmically and select the right data structures for the right tasks.

There are also multiple cores and threads on most modern machines for parallelization and asynchronous methods. For certain languages like Python and R, built-in functions and libraries often run way faster self-implemented code.

