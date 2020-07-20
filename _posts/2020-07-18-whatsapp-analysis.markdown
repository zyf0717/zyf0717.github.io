---
layout: post
title:  "Basic WhatsApp Chat Analysis"
date:   2020-07-18 14:30:00 +0800
categories: jekyll update
---

A few days back I came across a post whereby the author conducted a thorough analysis of one of his/her WhatsApp chats. A quick Google search yielded a few more posts of a similar nature. Analysis was often done in Python or R, and various plotting/graphing packages were used. 

I thought it might be interesting to ultimately create a dashboard using Plotly and Dash rather than simply analysing chats via Jupyter Notebooks. Accordingly, this blogpost is the first in a series where I set out some preliminary analysis of WhatsApp chat contents. If all goes well, the next blogpost will be about the dashboard process and outcome.

My repository on GitHub for this project can be found [here](https://github.com/zyf0717/whatsapp-chats-analysis).

_Note: Most of the interactive diagrams below are generated with [Plotly](https://plotly.com/) and are not very suitable for mobile view/use._

## Basic stats
```
    User: User 1
    Messages sent: 23305
    Mean words per message: 3.3376957734391763
    Median words per message: 2
    Max message length: 251 words
    Standard deviation: 3.4047427484722985
    Top emojis: ['😂', '😱', '😭', '😛', '🐷', '😏', '☺', '🌚', '😑', '😊', '🙃', '😒', '🙄', '😬', '🤔']
    
    User: User 2
    Messages sent: 16390
    Mean words per message: 4.1029286150091515
    Median words per message: 3
    Max message length: 1179 words
    Standard deviation: 9.783061988703912
    Top emojis: ['👍', '🏻', '✌', '😂', '👌', '💪', '♀', '🙄', '🤷']
```
It seems that User 1 sends shorter messages on a more frequent basis than User 2, and employs a wider range of emoticons. Upon investigation, both max length messages were confirmed to be a copy-paste of bodies of text rather than actual WhatsApp messages.

## User interactions
{% include count_by_MMYYY.html %}

According to the histogram above, the month with the greatest amount of user interaction was December 2016. There does not seem to be any seasonality in our WhatsApp interactions.

{% include count_by_day.html %}

WhatsApp interaction count was lower on weekends than weekdays, confirming my observation that we generally spend more time with family during weekends.

{% include count_by_time.html %}

WhatsApp interactions drop off sharply at 0030, suggesting that one or both users have gone to bed. The rest of the histogram corresponds to morning commutes at around 0800 to 0900, and evening commutes at 1830 to 1930. Any meetups generally happen after 1930 and end by 2100, which explains the corresponding dip in WhatsApp interactions.

## Topics of discussion
![WhatsApp wordcloud](https://github.com/zyf0717/zyf0717.github.io/blob/master/assets/images/whatsapp-wordcloud.png)
A word cloud generated from all WhatsApp messages show that some of the most commonly used words include 'lol', 'haha/hahaha', 'la', 'u', 'like'. These words are clearly fillers and do not appear to revolve around any particular topic.

```
    Topic #0:
    la just maybe hmm ppl need dont home meh got
    
    Topic #1:
    hahaha like oh yah damn yes life ar wait right
    
    Topic #2:
    ok haha time think eh don eat liao ll today
    
    Topic #3:
    lol hahahaha good tmr ya ah sure food run want
    
    Topic #4:
    okay know alr dunno leh got day sia place true
```
Conducting a [Latent Dirichlet allocation](https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation) yields the above. Topics of conversation seem to generally revolve around:
0. other peoples' lives
1. our life in general (or the lack thereof)
2. eating/food
3. future plans (exercising, food)
4. places (usually dining venues)

## User sentiments
{% include sentiments_User_1.html %}

{% include sentiments_User_2.html %}

Sentiment scores appear to be quite consistent throughout the years.