---
layout: post
title:  "Dashboard Deployment on Web Server"
date:   2020-08-18 10:00:00 +0800
categories: jekyll update
---
After the development of the dashboard, the logical next step is to deploy it. Following my [previous post](https://zyf0717.github.io/jekyll/update/2020/08/17/apache-web-server-gcp.html) on setting up a Google Cloud Platform (GCP) virtual machine (VM), the following steps are a simple way to deploy any dashboard created with Dash. As long as the Dash Python script is running, the dashboard can be accessed via any browser with Internet connection.

## 1. Environment setup

SSH into the GCP VM, and install Anaconda on the with the following:

```bash
$ cd /tmp
$ curl https://repo.anaconda.com/archive/Anaconda3-2020.07-Linux-x86_64.sh --output anaconda
.sh
$ bash anaconda.sh
```

Next, clone the repository (mine is [here](https://github.com/zyf0717/whatsapp-chats-analysis)) and create a conda environment using `environment.yml`:

```bash
conda activate
conda env create -f environment.yml
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

In order to be able to close the SSH terminal, use `nohup` and `&` to allow the Python script to run in the background instead:

```bash
nohup python dashboard_v0.6.py &
```

To kill the process use: `$ pkill -f dashboard_v0.6.py`

## 3. Opening Port

The default Dash server port (8050) has to be allowed to allow incoming traffic.

My configurations for GCP can be found [here](https://zyf0717.github.io/assets/images/gcp-dash-port-settings.png), and for AWS [here](https://zyf0717.github.io/assets/images/aws-dash-port-settings.png).

*Update: The current dashboard has been updated and migrated to EC2 on AWS. See [update post](https://zyf0717.github.io/jekyll/update/2024/05/07/dashboard-deployment-aws.html)* for more information.
