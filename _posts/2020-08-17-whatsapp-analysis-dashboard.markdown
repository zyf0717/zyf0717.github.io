---
layout: post
title:  "WhatsApp chat dashboard"
date:   2020-08-17 12:30:00 +0800
categories: jekyll update
---

Following my [previous post](https://blog.yifei.sg/jekyll/update/2020/07/18/whatsapp-analysis.html), I have created a dashboard using [Dash](https://plotly.com/dash/) capable to taking in any WhatsApp chat export (in .txt form), including group chats. Basic stats are generated , along with a couple of interactive Plotly charts, similar to those described in my previous post. A user filter was implemented, and date range can also be specified.

The dashboard has not been fully deployed online, so only a screen capture is available for now. The WhatsApp chat used below is identical to that in my previous post.

![Dash dashboard](https://zyf0717.github.io/assets/images/dash-dashboard.png)

During this dashboard-creation process, I have also completed a [Plotly and Dash Udemy course](https://www.udemy.com/course/interactive-python-dashboards-with-plotly-and-dash/), which provided me a basical level of Dash knowledge to be able to create my own dashboards. Important takeaways were callbacks with and without state, and layout updating.

Next, I will be attempting to deploy this dashboard on my own site hosted on either a Google Cloud Platform virtual machine or my own server. 

My repository on GitHub for this project can be found [here](https://github.com/zyf0717/whatsapp-chats-analysis), and my dashboard can be accessed at [http://34.83.24.53:8050/](http://34.83.24.53:8050/) for now.

