---
layout: page
title: Photography
permalink: /photography/
description: Selected photography and published features by Yifei Zheng, including wildlife photography featured by National Geographic Your Shot, the Cornell Lab of Ornithology, NParks, and Nikon.
---

Selected photographs and published features by [Yifei Zheng]({{ '/about/' | relative_url }}).

Instagram: [@bulbuls_and_kingfishers](https://www.instagram.com/bulbuls_and_kingfishers/) · [@sneks_cant_fly](https://www.instagram.com/sneks_cant_fly/)

<hr class="photography-divider">

<div class="photography-grid">
{% assign has_instagram = false %}
{% assign has_facebook = false %}
{% assign photographs = site.data.photography | sort: 'date' | reverse %}
{% for entry in photographs %}
  {% assign preview_url = entry.embed_url | default: entry.url %}
  {% assign preview_parts = preview_url | split: '/' %}
  {% assign preview_host = preview_parts[2] | downcase %}
  {% assign provider = '' %}
  {% if entry.embed_html %}
    {% assign provider = 'custom' %}
  {% elsif preview_parts[0] == 'https:' %}
    {% if preview_host == 'instagram.com' or preview_host == 'www.instagram.com' %}
      {% if preview_parts[3] == 'p' or preview_parts[3] == 'reel' %}
        {% assign provider = 'instagram' %}
        {% assign has_instagram = true %}
      {% endif %}
    {% elsif preview_host == 'facebook.com' or preview_host == 'www.facebook.com' %}
      {% if preview_url contains '/posts/' or preview_url contains '/photos/' %}
        {% assign provider = 'facebook-post' %}
        {% assign has_facebook = true %}
      {% elsif preview_parts[3] == 'reel' %}
        {% assign provider = 'facebook-video' %}
        {% assign has_facebook = true %}
      {% endif %}
    {% endif %}
  {% endif %}
  <article class="photography-card{% if provider == '' %} photography-card--link{% endif %}" id="{{ entry.id | escape }}">
    {% if provider == '' %}
    {% if entry.image_url %}
    <a class="photography-card-image" href="{{ entry.url | escape }}">
      <img src="{{ entry.image_url | escape }}" alt="{{ entry.image_alt | default: entry.title | escape }}" loading="lazy" decoding="async">
    </a>
    {% endif %}
    {% endif %}
    {% if provider != '' %}
    <div class="photography-preview">
      {% case provider %}
      {% when 'custom' %}
        {{ entry.embed_html }}
      {% when 'instagram' %}
        <blockquote class="instagram-media" data-instgrm-permalink="{{ preview_url | escape }}" data-instgrm-version="14"></blockquote>
      {% when 'facebook-post' %}
        <div class="fb-post" data-href="{{ preview_url | escape }}" data-show-text="true" data-lazy="true"></div>
      {% when 'facebook-video' %}
        <div class="fb-video" data-href="{{ preview_url | escape }}" data-show-text="true" data-lazy="true"></div>
      {% endcase %}
    </div>
    {% endif %}
    <div class="photography-caption">
      {% capture caption %}{% if entry.description %}{{ entry.description }}{% else %}[{{ entry.title }}][source]{% endif %}

[source]: <{{ entry.url }}>
{% endcapture %}
      {{ caption | markdownify | replace: '<a ', '<a target="_blank" rel="noopener noreferrer" title="Opens in a new tab" ' }}
    </div>
  </article>
{% endfor %}
</div>

<script defer src="{{ '/assets/js/photography.js' | relative_url }}"></script>

{% if has_instagram %}
<script async src="https://www.instagram.com/embed.js"></script>
{% endif %}
{% if has_facebook %}
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v25.0"></script>
{% endif %}
