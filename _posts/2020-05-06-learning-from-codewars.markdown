---
layout: post
title:  "Learning from Codewars"
date:   2020-05-06 11:56:00 +0800
categories: jekyll update
---

[![Codewars badge](https://www.codewars.com/users/zyf0717/badges/large)](https://www.codewars.com/users/zyf0717)

For the past few weeks I consistently found myself logging back in to [Codewars](https://www.codewars.com/r/eEMWJA) (referral link) whenever I have some time to spare. Most of the katas (puzzles/challenges) on Codewars are decently written by the community, and the indicative difficulty ratings are reasonably accurate.

Personally, the most attractive feature of Codewars is language flexibility -- Codewars currently supports over 50 programming languages (some in beta), including R, Julia and SQL. I can use and practice virtually every language I am interested in (or might be interested in in the near future) on a single platform.

After completing around 150 katas on Codewars, the following are my thoughts and takeaways.

## 1. Picking up a new language

The fastest way to learn a new language is to actually use it to solve problems (or better yet, complete an entire project). This forces learners to pick up syntax, check documentations, and perhaps also conduct other language-related research in order to implement solutions.

I picked up some JavaScript and Dart this way, and thoroughly enjoyed the process.

## 2. Updating existing knowledge

Here are my solution(s) to a kata which required me to write a function returning the area of overlap between 2 identically-sized overlapping circles, using only single line of code with less than 128 characters:

```python
## 124 characters (Python 3.6.1)
from numpy import*;circleIntersection=lambda a,b,r:(lambda d=2*arccos(min(1,hypot(*subtract(b,a))/2/r)):(d-sin(d))*r*r//1)()
```

```python
## 116 characters (Python 2.7.6)
def circleIntersection((a,b),(c,d),r):from math import*;x=2*acos(min(1,hypot(a-c,b-d)/2/r));return (x-sin(x))*r*r//1
```

For a language that I use most frequently, I have to say I definitely learnt very interesting (though not necessarily useful) things.

## 3. Mathematics, algorithms, and data structures

Besides the obvious use of trigonometry and algebra in the section above, some katas (especially at the higher level) requires a mathematical solution because brute-force solutions do not scale well. In addition, knowledge of algorithms and data structures might also be necessary to optimize solutions to pass test cases.

There are, however, some pitfalls to avoid. For example, there might be floating point arithmetic issues when dealing with irrational numbers:

```python
## Python
(2**0.5)**2 == 2
>>> False
```

Solving katas using mathematically sometimes require the use of irrational numbers, and these have to be handle appropriately and as required.

## 4. Back to basics

There are a series of katas requiring the solver to write interpreters, usually for [esolangs](https://en.wikipedia.org/wiki/Esoteric_programming_language) like [brainfuck](https://esolangs.org/wiki/Brainfuck) and derivatives. Concepts such as memory management, memory pointers, etc. come in handy here. Also, data is stored as bits or bytes, and is handled at that level.

I would say that the most challenging parts about writing brainfuck and [boolfuck](https://esolangs.org/wiki/boolfuck) interpreters (in Python) were the handling of nested loops.

Here's a sample brainfuck code I had successfully interpreted with my very own interpreter written in Python:

```python
## Python
code = '+[-->-[>>+>-----<<]<--<---]>-.>>>+.>>..+++[.>]<<<<.+++.------.<<-.>>>>+.'
brainfuck_interpreter(code)
>>> 'Hello, World!'
```

## 5. Learning from the best
Learning how others approach and solve the same problems is a very powerful way to understand the nuances of a particular language. Once a kata has been completed, solutions submitted by others (in the same language) can be viewed.

Codewars also implements a solution rating system, which allows users to mark submissions as "best practice" and/or "clever". Users can then simply sort the list of submitted solutions by either metric. There is also a "compare with your solution" option for ease of comparison.
