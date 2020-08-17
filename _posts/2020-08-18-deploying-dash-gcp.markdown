---
layout: post
title:  "Deploying Dash on GCP"
date:   2020-08-18 20:00:00 +0800
categories: jekyll update
---

My previous post described how I created a Dash app designed to generate basic stats, charts and diagrams based on any WhatsApp chat export. However, it would not be very useful to anyone besides myself should the dashboard be limited to only running locally.

This blogpost would be about how I managed to deploy the aforementioned dashboard onto [Google Cloud Platform](https://cloud.google.com/) (GCP) for anyone with Internet access to use.

## 1. Setting up virtual machine instance

Firstly, a virtual machine (VM) instance (Compute Engine > VM instances) is created on GCP to host whatever Dash serves. My configurations for a free instance can be found [here]().

![VM instance](https://zyf0717.github.io/assets/images/vm-instance.png)

## 2. Apache web server

SSH into the newly-created VM and run the following to install Apache:

```bash
$ sudo apt update
$ sudo apt install apache2
```

UFW firewall is inactive by default, so no configuration is required. Use the following command to ensure that the web server has started:

```bash
$ sudo systemctl status apache2
```

## 3. Apache virtual hosts (optional)

Create a folder in `/var/www/`. In my case since my domain is [yifei.sg](https://yifei.sg), I simply created a folder called `yifei.sg` with the following command:

```bash
$ sudo mkdir /var/www/yifei.sg
```

Create an `index.html` page within the newly-created folder: 

```bash
$ sudo nano /var/www/yifei.sg/index.html
```

Create a config file for the domain:

```bash
$ sudo nano /etc/apache2/sites-available/yifei.sg.conf
```

Edit the config file accordingly, with "ServerName" being the IP address of the VM:

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
$ sudo a2ensite example.com.conf
```

Disable the default site defined in `000-default.conf`:

```bash
$ sudo a2dissite 000-default.conf
```

Restart Apache:

```bash
$ sudo systemctl restart apache2
```

## 4. Secure Apache with Let's Encrypt

Install the Let's Encrypt certbot with the following:

```bash
$ sudo apt install certbot python3-certbot-apache
```

Enable HTTPS for the relevant domains with the following:

```bash
$ sudo certbot --apache
```

At this point, the domain can be accessed through HTTPS (https://yifei.sg in my case), with `index.html` displayed.

