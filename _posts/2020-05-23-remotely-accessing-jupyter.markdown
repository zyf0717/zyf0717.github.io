---
layout: post
title:  "Remotely accessing Jupyter"
date:   2020-05-23 04:25:00 +0800
categories: jekyll update
---

After setting up [SSH for my Raspberry Pi 4B](https://www.raspberrypi.org/documentation/remote-access/ssh/) and a [Jupyter](https://jupyter.org/) environment (using [Anaconda](https://www.anaconda.com/)), I wanted to see if I was able to remotely start and access a Jupyter server hosted on the Pi. 

A quick search yielded a guides with varying instructions. After a couple of rounds of trials-and-errors, I set out below streamlined instructions that ultimately worked for me on the Pi.

## 1. Notebook configuration file

Start by locating the `jupyter_notebook_config.py` file (located at `/home/pi/.jupyter` on my Pi). If absent, generate one using the following:

```shell
$ jupyter notebook --generate-config
```

Next would be to setup a password:
```shell
$ jupyter notebook password
Enter password:  ********
Verify password: ********
[NotebookPasswordApp] Wrote hashed password to /home/pi/.jupyter/jupyter_notebook_config.json
```

Followed by adding the generated hashed password into `jupyter_notebook_config.py`, by amending the following line to:

```shell
c.NotebookApp.password = u'<hashed password from jupyter_notebook_config.json>'
```

## 2. SSH into Pi

Moving on to the local machine, open a terminal, SSH into Pi, and start Jupyter Lab (or Jupyter Notebook):

```shell
$ ssh pi@192.168.86.100
$ jupyter lab --no-browser --port=8888
```

Do not close or stop this terminal.

## 3. SSH tunneling

Open a second terminal, and run the following command:

```shell
$ ssh CNL localhost:8888:localhost:8888 pi@192.168.86.100
```

This port forwarding command allows me to access the Jupyter server created in the Pi system in step 2, by binding a local port to the remote system’s port (both 8888 in this case).

Do not close or stop this terminal.

## 4. Opening Jupyter

Minimize all the open terminals, open a browser, and go to `https://localhost:8888`. Enter the password created in step 1, and the Jupyter environment loads thereafter.
