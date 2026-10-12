---
layout: page
title: Open-source Packages & Contributions
nav_title: Software
permalink: /software/
description: Open-source software and upstream contributions by Yifei Zheng in scientific computing, heat stress, WBGT, and BLE tooling across Python, R, and Julia.
---

Selected open-source software and upstream contributions by [Yifei Zheng (zyf0717)]({{ '/about/' | relative_url }}).

{% for project in site.data.software %}
<h2 id="{{ project.id | escape }}">{{ project.name | escape }}</h2>

{{ project.description | markdownify }}

<p><strong>Role:</strong> {{ project.role | escape }}</p>

<p>
{% for link in project.links %}
  <a href="{{ link.url | escape }}">{{ link.label | escape }}</a>{% unless forloop.last %} · {% endunless %}
{% endfor %}
</p>
{% endfor %}

{% include software-jsonld.html %}
