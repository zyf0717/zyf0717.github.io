---
layout: page
title: Software, Packages, and Contributions
nav_title: Software
permalink: /software/
description: Open-source software, packages, and upstream contributions by Yifei Zheng for heat stress, wet-bulb globe temperature (WBGT), and Bluetooth Low Energy (BLE) tooling.
---

Selected open-source software, packages, and upstream contributions by [Yifei Zheng (zyf0717)]({{ '/about/' | relative_url }}).

{% for project in site.data.software %}
<h2 id="{{ project.id | escape }}">{{ project.name | escape }}</h2>

{{ project.description | markdownify }}

<p><strong>Role:</strong> {{ project.role | escape }}</p>
<p><strong>Languages:</strong> {{ project.programming_languages | join: ', ' | escape }}</p>

<p>
{% for link in project.links %}
  <a href="{{ link.url | escape }}">{{ link.label | escape }}</a>{% unless forloop.last %} · {% endunless %}
{% endfor %}
</p>
{% endfor %}

{% include software-jsonld.html %}
