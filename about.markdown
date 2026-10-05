---
layout: page
title: About
permalink: /about/
hide_title: true
description: Yifei Zheng (zyf0717) is a research software engineer working on scientific computing, data systems, cloud infrastructure, and open-source software.
seo:
  type: WebPage
---

Yifei Zheng (zyf0717) is a research software engineer working across scientific computing, data systems, cloud infrastructure, and open-source software.

My work spans research software engineering and data engineering, mainly using Python, R, and Julia, including heat stress, wet-bulb globe temperature (WBGT), and biometeorology. I also write about applied and agentic AI, production systems, and the operational decisions that connect software to research practice.

See my [open-source software and upstream contributions]({{ '/software/' | relative_url }}).

## Profiles

<ul>
{% for profile in site.minima.social_links %}
  {% if site.social.links contains profile.url %}
  <li><a href="{{ profile.url | escape }}">{{ profile.title | escape }}</a></li>
  {% endif %}
{% endfor %}
</ul>

## Selected writing

### Agentic AI

- [Judgement in the Era of Agentic AI]({% post_url 2026-07-02-judgement-agentic-ai %})
- [The Marginal Economics of Agentic AI]({% post_url 2026-06-09-marginal-economics-agentic-ai %})
- [Autonomy is Overrated: Human Staffing vs. Agentic AI]({% post_url 2026-05-22-autonomy-is-overrated %})
- [Day-1 vs. Day-2 in the Era of Agentic AI]({% post_url 2026-05-07-day1-vs-day2-agentic-ai %})

### Systems and infrastructure

- [Year in Review (2025): Systems Engineering]({% post_url 2025-12-03-year-in-review-2025 %})
- [Strix Halo Matrix Cores with llama.cpp]({% post_url 2025-08-27-building-llamacpp-strix-halo %})
- [Year-to-Date: Data, Systems, and Infrastructure]({% post_url 2025-05-01-data-systems-infrastructure %})

### Dashboards and analytics

- [Shiny Dashboard Development]({% post_url 2024-09-07-shiny-dashboard-development %})
- [Dashboard Deployment on AWS]({% post_url 2024-05-07-dashboard-deployment-aws %})

[Earlier writing → Archive]({{ '/' | relative_url }})

{% include profile-jsonld.html %}
