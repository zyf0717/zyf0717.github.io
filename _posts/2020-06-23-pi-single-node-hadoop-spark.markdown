---
layout: post
title:  "Pi cluster (single-node Hadoop and Spark)"
date:   2020-06-25 00:05:00 +0800
categories: jekyll update
---

## 0. Install JRE

On the master node, use the following:

```
$ sudo apt install openjdk-8-jre-headless
```

To install on the worker nodes, use the following:

```
$ clustercmd sudo apt install openjdk-8-jre-headless
```

## 1. Apache Hadoop

Download and install Hadoop on the master node with the following:

```
$ cd && wget https://apachemirror.sg.wuchna.com/hadoop/common/hadoop-3.2.1/hadoop-3.2.1.tar.gz
$ sudo tar -xvf hadoop-3.2.1.tar.gz -C /opt/
$ rm hadoop-3.2.1.tar.gz && cd /opt
$ sudo mv hadoop-3.2.1 hadoop
```

Change the permissions on this directory:

```
$ sudo chown $USER: -R /opt/hadoop
```

Edit `~/.bashrc` by appending the following:

```
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export HADOOP_HOME=/opt/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin
```

Edit `/opt/hadoop/etc/hadoop/hadoop-env.sh` by adding the following:

```
export JAVA_HOME=${JAVA_HOME}
```

Verify that Hadoop has been installed correctly by checking the version:

```
$ cd && hadoop version | grep Hadoop
```

## 2. Apache Spark

