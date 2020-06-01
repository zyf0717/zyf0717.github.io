---
layout: post
title:  "Fluttering and Darting"
date:   2020-06-01 20:00:00 +0800
categories: jekyll update
---

![Screenshot of my Flutter Android app](https://zyf0717.github.io/assets/images/to-do-screenshot.png)

During this lockdown period, my plans to setup my own Raspberri Pi compute cluster were pushed back due to extreme delays in shipping. Instead I spent time completing a [Flutter development course on Udemy](https://www.udemy.com/course/flutter-bootcamp-with-dart/). Despite being completely foreign to mobile app development, I thoroughly enjoyed the course and what Flutter and Dart have to offer.

## 1. Asynchronous programming

Asynchronous programming refers handling of events occurring independent of the main program flow. Various I/Os (network, database, file etc.) and web service calls, which occur quite frequently in mobile apps, benefit from asynchrony as the other app functions can continue to run.

This concept is put into practice during the course where a number of created apps (weather app, cryptocurrency price app, chat/messaging app) involve web services and other I/Os. The `Future` class and the `async` and `await` keywords are introduced and utilized heavily.

## 2. State management

Flutter apps comprise Stateful Widgets and Stateless Widgets. While Stateful Widgets are mutable and can be re-drawn should its contents change, Stateless Widgets are immutable and is drawn once during build. The concept of callbacks is introduced, and used heavily in the course with the `setState()` method to redraw or build new Widgets.

The course ends by introducing [simple app state management](https://flutter.dev/docs/development/data-and-backend/state-mgmt/simple) in the final project, along with the [provider package](https://pub.dev/packages/provider).