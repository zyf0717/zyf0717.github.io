---
layout: post
title:  "Basic WhatsApp Chat Analysis"
date:   2020-07-18 14:30:00 +0800
categories: jekyll update
---

A few days back I came across a post whereby the author conducted a thorough analysis of one of his/her WhatsApp chats. A quick Google search yielded a few more posts of a similar nature. Analysis was often done in Python or R, and various plotting/graphing packages were used. 

I thought it might be interesting to ultimately create a dashboard using Plotly and Dash rather than analysing chats via Jupyter Notebooks. As such, this blogpost is the first in a series where I set out some preliminary analysis of WhatsApp chat contents. If all goes well, the next blogpost will be about the dashboard process and outcome.

## User interactions
{% include count_by_MMYYY.html %}

{% include count_by_day.html %}

{% include count_by_time.html %}

## User sentiments
{% include sentiments_User_1.html %}

{% include sentiments_User_2.html %}