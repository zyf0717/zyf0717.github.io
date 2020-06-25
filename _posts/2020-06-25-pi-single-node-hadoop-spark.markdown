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

The process for Spark is very similar to the above. Install with the following commands:

```
$ wget https://apachemirror.sg.wuchna.com/spark/spark-3.0.0/spark-3.0.0-bin-hadoop3.2.tgz
$ sudo tar -xvf spark-3.0.0-bin-hadoop3.2.tgz -C /opt/
$ rm spark-3.0.0-bin-hadoop3.2.tgz && cd /opt/
$ sudo mv spark-3.0.0-bin-hadoop3.2 spark
$ sudo chown $USER: -R /opt/spark
```

Edit `~/.bashrc` by appending the following:

```
export SPARK_HOME=/opt/spark
export PATH=$PATH:$SPARK_HOME/bin
```

Check that Spark has been installed correctly with:

```
$ spark-shell --version
```

In my case I had the following warning messages due to the master node being connected to two networks:

```
WARN Utils: Your hostname, odyssey resolves to a loopback address: 127.0.1.1; using 10.42.0.1 instead (on interface enp2s0)
WARN Utils: Set SPARK_LOCAL_IP if you need to bind to another address
```

To resolve, I created the Spark environment configuration file with `$ gedit /opt/spark/conf/spark-env.sh` and inserted the following:

```
#!/usr/bin/env bash

export SPARK_LOCAL_IP=10.42.0.1
```

## 3. Hadoop Distributed File System

