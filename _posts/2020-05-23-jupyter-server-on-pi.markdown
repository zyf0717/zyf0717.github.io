---
layout: post
title:  "Jupyter server on Pi 4B"
date:   2020-05-23 11:00:00 +0800
categories: jekyll update
---

![Pi with Ice Tower](https://zyf0717.github.io/assets/images/pi-ice-tower.jpg)

After setting up [SSH for my Raspberry Pi 4B](https://www.raspberrypi.org/documentation/remote-access/ssh/) and [Jupyter](https://jupyter.org/) (using [Anaconda](https://www.anaconda.com/)), I wanted to see if I can remotely start and access a Jupyter server hosted on the Pi. 

A quick search yielded quite a few guides, all with different instructions. After a couple of rounds of trials-and-errors, below are the steps that worked for me.

---

## Step 1: Notebook configuration file

Start by locating the `jupyter_notebook_config.py` file (located at `/home/pi/.jupyter` on my Pi). If absent, generate one using the following:

```shell
$ jupyter notebook --generate-config
```

Next would be to setup a password, using the following command:
```shell
$ jupyter notebook password
Enter password:  ********
Verify password: ********
[NotebookPasswordApp] Wrote hashed password to /home/pi/.jupyter/jupyter_notebook_config.json
```

Then amend the following line in `jupyter_notebook_config.py`:

```shell
c.NotebookApp.password = u'<password>'
```

Where `<password>` is the hashed password found in `jupyter_notebook_config.json`, not the password entered and verified in the terminal.

## Step 2: SSH into Pi

Moving on to the local machine, open a terminal and SSH into the Pi:

```shell
$ ssh pi@192.168.86.100
```

And start Jupyter Lab (or Jupyter Notebook):

```shell
$ jupyter lab --no-browser --port=8888
```
Where `192.168.86.100` is the Pi's local static IP address.

Alternatively, the Jupyter session could be started in the Pi itself, in which case  this entire Step 2 is no longer necessary on the local machine.

This command should remain running on either machine until the Jupyter session is over.

## Step 3: SSH tunneling

Open a terminal on the local machine, and run the following command:

```shell
$ ssh -CNL localhost:9999:localhost:8888 pi@192.168.86.100
```

This port forwarding command allows the local computer to access the Jupyter server created in the Pi system in Step 2, by binding a local port (in this case, 9999) to the remote system’s port (8888 from Step 2).

This command should remain running on the local machine until the Jupyter session is over.

## Step 4: Opening Jupyter

Open a browser, and go to `https://localhost:9999`. Use the password entered and verified in Step 1  to authenticate, and Jupyter Lab / Notebook loads thereafter.

![Remote Jupyter terminal](https://zyf0717.github.io/assets/images/pi-jupyter-terminal.png)

Voilà!

---

