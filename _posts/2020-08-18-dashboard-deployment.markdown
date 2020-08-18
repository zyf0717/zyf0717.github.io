---
layout: post
title:  "WhatsApp chat dashboard deployment"
date:   2020-08-18 10:00:00 +0800
categories: jekyll update
---

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

## 3. GCP firewall

Head over to GCP and create a new firewall rule under "VM instances" to allow access to port 8050 (default Dash server port).

My configurations can be found [here](https://zyf0717.github.io/assets/images/gcp-dash-port-settings.png).

At this point, the dashboard can be accessed over the Internet, (mine was at http://34.83.24.53:8050/).

![Dash dashboard](https://zyf0717.github.io/assets/images/dash-dashboard.png)

