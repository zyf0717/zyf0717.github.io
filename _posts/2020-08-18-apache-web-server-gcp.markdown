---
layout: post
title:  "Apache web server on GCP"
date:   2020-08-18 01:00:00 +0800
categories: jekyll update
---

Following my [previous post](https://blog.yifei.sg/jekyll/update/2020/07/18/whatsapp-analysis.html), I have since designed a dashboard to generate basic stats, charts and diagrams based on any WhatsApp chat export. However, it would not be very useful to anyone besides myself should the dashboard be limited to only running locally.

This blogpost is about how a web server can be set up on [Google Cloud Platform](https://cloud.google.com/) (GCP). In my next post, I will be exploring how dashboards created can be made available to anyone with browser and Internet access, via either GCP or from my very own server.

## 1. Setting up virtual machine instance

Firstly, a virtual machine (VM) instance (Compute Engine > VM instances) is created on GCP to host the web server. The configurations I used for an indefinitely-free instance can be found [here](https://zyf0717.github.io/assets/images/vm-configurations.png). Also, check out the "always free products" on GCP [here](https://cloud.google.com/free).

The following is then displayed under VM instances:

![VM instance](https://zyf0717.github.io/assets/images/vm-instance.png)

## 2. Install Apache web server

SSH into the newly-created VM and run the following to install Apache:

```bash
$ sudo apt update
$ sudo apt install apache2
```

UFW firewall is inactive by default, so no configuration is required. Use the following command to ensure that the web server has started:

```bash
$ sudo systemctl status apache2
```

At this point, the Apache2 Ubuntu Default Page can be seen (at http://34.83.24.53 in my case).

## 3. Setting up virtual hosts

To host web pages, a virtual host is required for each domain.

Create a folder in `/var/www/`. In my case since my domain is [yifei.sg](https://yifei.sg), I simply created a folder called `yifei.sg` with the following command:

```bash
$ sudo mkdir /var/www/yifei.sg
```

Create an `index.html` page within the newly-created folder: 

```bash
$ sudo nano /var/www/yifei.sg/index.html
```

Next, create a config file for the domain:

```bash
$ sudo nano /etc/apache2/sites-available/yifei.sg.conf
```

Edit the config file accordingly:

```
<VirtualHost *:80>
    ServerAdmin zyf0717@gmail.com
    ServerName yifei.sg
    DocumentRoot /var/www/yifei.sg
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Enable the site with the following:

```bash
$ sudo a2ensite yifei.sg.conf
```

Restart Apache:

```bash
$ sudo systemctl restart apache2
```

## 4. Secure with Let's Encrypt

Install the Let's Encrypt certbot with the following:

```bash
$ sudo apt install certbot python3-certbot-apache
```

Enable https for the relevant domains with the following:

```bash
$ sudo certbot --apache
```

There will be a couple of options, including redirecting all http requests to https.

At this point, the domain can be accessed through https (https://yifei.sg in my case) and `index.html` is displayed.

## 5. Create Swap space

Due to the limited VM memory provided under GCP's free tier, I would recommend creating a swap file (4GB in this case) with the following commands:

```bash
$ sudo fallocate -l 4G /swapfile
$ sudo chmod 600 /swapfile
$ sudo mkswap /swapfile
$ sudo swapon /swapfile
```

Check that swap is working with:

```bash
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          576Mi       191Mi        94Mi       1.0Mi       290Mi       280Mi
Swap:         4.0Gi          0B       4.0Gi
```