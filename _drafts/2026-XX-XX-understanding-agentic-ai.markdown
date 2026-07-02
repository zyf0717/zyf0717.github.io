---
layout: post
title:  "Building to Understand Agentic AI"
date:   2026-XX-XX 00:00:00 +0800
categories: jekyll update
---

Intro: Why build?

Hardware <-> software: Heterogeneous hardware needs a control plane

Topology:
- Main model
- Small Language Model sidecars:
  - Microsoft FastContext
  - Qwen-3-4B-Instruct
- Workflows:
  - web search
  - repository search
  - RAG
  - etc.

Context lifecycle: compression, selection, retrieval, (re)ranking, assembly, injection

Shaping behavior:
- GitHub Spec Kit: custom specs / plans / tasks; docs for human readability
- Google OKF / AGENTS.md / Skills
