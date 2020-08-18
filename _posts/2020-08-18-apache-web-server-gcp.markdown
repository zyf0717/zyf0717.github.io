---
layout: post
title:  "Apache web server on GCP"
date:   2020-08-18 01:00:00 +0800
categories: jekyll update
---

Following my [previous post](https://blog.yifei.sg/jekyll/update/2020/07/18/whatsapp-analysis.html), I have since designed a dashboard to generate basic stats, charts and diagrams based on any WhatsApp chat export. However, it would not be very useful to anyone besides myself should the dashboard be limited to only running locally.

This blogpost is about how a web server can be set up on [Google Cloud Platform](https://cloud.google.com/) (GCP). The next post will be on how the dashboard created can be made available online for anyone with Internet access to use. This will be done either via GCP or from my very own local machine.

## 1. Setting up virtual machine instance

Firstly, a virtual machine (VM) instance (Compute Engine > VM instances) is created on GCP to host the web server. The configurations I used for an indefinitely-free instance can be found [here](). Also, check out the "always free products" on GCP [here](https://cloud.google.com/free).

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

## 3. Setting up virtual hosts

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

Disable the default site defined in `000-default.conf`:

```bash
$ sudo a2dissite 000-default.conf
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

Enable HTTPS for the relevant domains with the following:

```bash
$ sudo certbot --apache
```

At this point, the domain can be accessed through HTTPS (https://yifei.sg in my case), with the contents of `index.html` displayed.

