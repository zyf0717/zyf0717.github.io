---
layout: post
title:  "WhatsApp chat dashboard deployment"
date:   2020-08-18 10:00:00 +0800
categories: jekyll update
---

After the development of the dashboard, the logical next step is to deploy it. Following my [previous post](https://blog.yifei.sg/jekyll/update/2020/08/17/apache-web-server-gcp.html) on setting up a Google Cloud Platform (GCP) virtual machine (VM), the following steps are a simple way to deploy any dashboard created with Dash for access via any browser with Internet connection.

## 1. Environment setup

On the GCP VM, install Anaconda on the with the following:

```bash
$ cd /tmp
$ curl https://repo.anaconda.com/archive/Anaconda3-2020.07-Linux-x86_64.sh --output anaconda
.sh
$ bash anaconda.sh
```

Next, clone the repository (mine is [here](https://github.com/zyf0717/whatsapp-chats-analysis)) and create a conda environment using `environment.yml`:

```bash
$ conda activate
$ conda env create -f environment.yml
```

## 2. Serving the dashboard 

To easily serve the dashboard using the built-in development server (despite the warning), use `host='0.0.0.0'` as a parameter to `app.run_server()` in the dashboard Python script:

```python
if __name__ == '__main__':
    app.run_server(host='0.0.0.0', debug=False)
```

Start dashboard by activating the created conda environment and running the dashboard Python script. 

You might notice that there is a warning on not using the Dash server for production. As Dash is based on Flask, there are proper ways to deploy the Dash app for production. 

This method used is probably one of the quickest and easiest ways to deploy a dashboard online even though it is not recommended.

## 3. GCP firewall

Head over to GCP and create a new firewall rule under "VM instances" to allow access to port 8050 (default Dash server port).

My configurations can be found [here](https://zyf0717.github.io/assets/images/gcp-dash-port-settings.png).

At this point, the dashboard can be accessed over the Internet, (mine was at http://34.83.24.53:8050/).

## 4. Reverse proxy

TBC
